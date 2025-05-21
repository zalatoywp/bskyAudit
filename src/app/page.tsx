'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ProfileCard from '../components/ProfileCard';
import StatsCard from '../components/StatsCard';
import UserList from '../components/UserList';
import Footer from '../components/Footer';
import WelcomeMessage from '../components/WelcomeMessage';
import LoadingIndicator from '../components/LoadingIndicator';
import { getUserProfile, getUserStats, getFollowers, getFollowing, getBlockedBy, getBlockedUsers } from '../services/api';
import { UserProfile, UserStats, FollowerInfo, BlockedUser } from '../types';

export default function Home() {
  const [userId, setUserId] = useState<string>('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [followers, setFollowers] = useState<FollowerInfo[]>([]);
  const [following, setFollowing] = useState<FollowerInfo[]>([]);
  const [blockedBy, setBlockedBy] = useState<BlockedUser[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();

  const fetchUserData = async (id: string) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const userProfile = await getUserProfile(id);
      
      if (!userProfile || !userProfile.did) {
        throw new Error('User profile not found or invalid');
      }
      
      setProfile(userProfile);
      
      const [userStats, userFollowers, userFollowing, userBlockedBy, userBlockedUsers] = await Promise.all([
        getUserStats(userProfile),
        getFollowers(userProfile.did),
        getFollowing(userProfile.did),
        getBlockedBy(userProfile.did),
        getBlockedUsers(userProfile.did)
      ]);
      
      setStats(userStats);
      setFollowers(userFollowers);
      setFollowing(userFollowing);
      setBlockedBy(userBlockedBy);
      setBlockedUsers(userBlockedUsers);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load user data. Please try again.');
      setProfile(null);
      setStats(null);
      setFollowers([]);
      setFollowing([]);
      setBlockedBy([]);
      setBlockedUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const actorParam = searchParams.get('actor');
    if (actorParam) {
      setUserId(actorParam);
      fetchUserData(actorParam);
    }
  }, [searchParams]);

  const handleSelectUser = (did: string) => {
    setUserId(did);
    const url = new URL(window.location.href);
    url.searchParams.set('actor', did);
    window.history.pushState({}, '', url);
    fetchUserData(did);
  };

  return (
    <div className="bg-[#202027] min-h-screen text-[#cecece] font-sans">
      <Header />
      <SearchBar onSelectUser={handleSelectUser} />
      
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <div className="text-center p-4 text-red-500">{error}</div>
      ) : !profile ? (
        <WelcomeMessage />
      ) : (
        <>
          <ProfileCard profile={profile} />
          
          <div className="flex flex-wrap justify-evenly">
            {stats && <StatsCard stats={stats} />}
            
            <UserList 
              title="HA BLOQUEADO A" 
              users={blockedUsers} 
              onSelectUser={handleSelectUser}
              isBlockList={true}
            />
            
            <UserList 
              title="LO HAN BLOQUEADO" 
              users={blockedBy} 
              onSelectUser={handleSelectUser} 
              isBlockList={true}
            />
            
            <UserList 
              title="SEGUIDORES" 
              users={followers} 
              onSelectUser={handleSelectUser} 
            />
            
            <UserList 
              title="SIGUIENDO" 
              users={following} 
              onSelectUser={handleSelectUser} 
            />
          </div>
        </>
      )}
      
      <Footer />
    </div>
  );
}