import { SearchResult, UserProfile, FollowerInfo, BlockedUser, UserStats } from '../types';

const BSKY_API = 'https://public.api.bsky.app/xrpc';
const CLEARSKY_API = 'https://api.clearsky.services/api/v1/anon';


// Search for users with typeahead
export const searchUsers = async (term: string): Promise<SearchResult[]> =>
{
  try {
    const response = await fetch(
      `${BSKY_API}/app.bsky.actor.searchActorsTypeahead?term=${term}&limit=6`
    );

    if (!response.ok) throw new Error(`Search failed: ${response.status} ${response.statusText}`);

    const data = await response.json();
    return data.actors || [];
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
};

// Get user profile information
export const getUserProfile = async (identifier: string): Promise<UserProfile> =>
{
  try {
    const response = await fetch(`${BSKY_API}/app.bsky.actor.getProfiles?actors=${identifier}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const profile = data.profiles?.[0];

    if (!profile) {
      throw new Error(`Profile not found for identifier: ${identifier}`);
    }

    return profile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Get followers
export const getFollowers = async (identifier: string): Promise<FollowerInfo[]> =>
{
  try {

    const response = await fetch(
      `${BSKY_API}/app.bsky.graph.getFollowers?actor=${identifier}&limit=100`
    );

    if (!response.ok) {
      const errorMessage = response.status === 404
        ? `User not found: ${identifier}`
        : `Failed to fetch followers: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.followers || [];
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw error;
  }
};

// Get following
export const getFollowing = async (identifier: string): Promise<FollowerInfo[]> =>
{
  try {
    const response = await fetch(
      `${BSKY_API}/app.bsky.graph.getFollows?actor=${identifier}&limit=100`
    );

    if (!response.ok) {
      const errorMessage = response.status === 404
        ? `User not found: ${identifier}`
        : `Failed to fetch following: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.follows || [];
  } catch (error) {
    console.error('Error fetching following:', error);
    throw error;
  }
};

// Get block count (who blocked this user)
export const getBlockedByCount = async (identifier: string): Promise<number> =>
{
  try {
    const response = await fetch(`${CLEARSKY_API}/single-blocklist/total/${identifier}`);

    if (!response.ok) throw new Error(`Failed to fetch blocked by count: ${response.status} ${response.statusText}`);

    const data = await response.json();
    return data.data?.count || 0;
  } catch (error) {
    console.error('Error fetching blocked by count:', error);
    return 0;
  }
};

// Get block list count (users this person has blocked)
export const getBlockListCount = async (identifier: string): Promise<number> =>
{
  try {
    const response = await fetch(`${CLEARSKY_API}/blocklist/total/${identifier}`);

    if (!response.ok) throw new Error(`Failed to fetch block list count: ${response.status} ${response.statusText}`);

    const data = await response.json();
    return data.data?.count || 0;
  } catch (error) {
    console.error('Error fetching block list count:', error);
    return 0;
  }
};

// Get handle history count
export const getHandleHistory = async (identifier: string): Promise<number> =>
{
  try {
    const response = await fetch(`${CLEARSKY_API}/get-handle-history/${identifier}`);

    if (!response.ok) throw new Error(`Failed to fetch handle history: ${response.status} ${response.statusText}`);

    const data = await response.json();
    const handleHistory = data.data?.handle_history || [];
    return Math.max(0, handleHistory.length - 2);
  } catch (error) {
    console.error('Error fetching handle history:', error);
    return 0;
  }
};

// Get user ranking
export const getUserRanking = async (identifier: string): Promise<number> =>
{
  try {
    const response = await fetch(`${CLEARSKY_API}/placement/${identifier}`);

    if (!response.ok) throw new Error(`Failed to fetch user ranking: ${response.status} ${response.statusText}`);

    const data = await response.json();
    return data.data?.placement || 0;
  } catch (error) {
    console.error('Error fetching user ranking:', error);
    return 0;
  }
};

// Get users who blocked this account
export const getBlockedBy = async (identifier: string): Promise<BlockedUser[]> =>
{
  try {
    const response = await fetch(`${CLEARSKY_API}/single-blocklist/${identifier}`);

    if (!response.ok) throw new Error(`Failed to fetch blocked by list: ${response.status} ${response.statusText}`);

    const data = await response.json();

    // Format the response to match our BlockedUser type
    interface BlocklistItem
    {
      did: string;
      blocked_date: string;
    }

    const blockedBy = (data.data?.blocklist || []).map((item: BlocklistItem) => ({
      did: item.did,
      blockedDate: item.blocked_date
    }));

    // Fetch additional info for each user
    const enrichedBlockedBy = await Promise.all(
      blockedBy.map(async (user: BlockedUser) =>
      {
        try {
          const profile = await getUserProfile(user.did);
          return {
            ...user,
            handle: profile?.handle,
            displayName: profile?.displayName,
            avatar: profile?.avatar
          };
        } catch {
          // If we can't fetch a profile, return the basic info we have
          return {
            ...user,
            handle: user.displayName,
            displayName: '💀 Cuenta Suspendida 💀',
            avatar: user.avatar
          };
        }
      })
    );

    return enrichedBlockedBy;
  } catch (error) {
    console.error('Error fetching blocked by list:', error);
    return [];
  }
};
// Get users who blocked this account
export const getBlockedUsers = async (identifier: string): Promise<BlockedUser[]> =>
{
  try {
    const response = await fetch(`${CLEARSKY_API}/blocklist/${identifier}`);

    if (!response.ok) throw new Error(`Failed to fetch blocked by list: ${response.status} ${response.statusText}`);

    const data = await response.json();

    // Format the response to match our BlockedUser type
    interface BlocklistItem
    {
      did: string;
      blocked_date: string;
    }

    const blockedUsers = (data.data?.blocklist || []).map((item: BlocklistItem) => ({
      did: item.did,
      blockedDate: item.blocked_date
    }));

    // Fetch additional info for each user
    const enrichedblockedUsers = await Promise.all(
      blockedUsers.map(async (user: BlockedUser) =>
      {
        try {
          const profile = await getUserProfile(user.did);
          return {
            ...user,
            handle: profile?.handle,
            displayName: profile?.displayName,
            avatar: profile?.avatar
          };
        } catch {
          // If we can't fetch a profile, return the basic info we have
          return {
            ...user,
            handle: user.displayName,
            displayName: '💀 Cuenta Suspendida 💀',
            avatar: user.avatar
          };
        }
      })
    );

    return enrichedblockedUsers;
  } catch (error) {
    console.error('Error fetching blocked by list:', error);
    return [];
  }
};



// Get all user stats in one call
export const getUserStats = async (profile: UserProfile): Promise<UserStats> =>
{
  const [blockedByCount, blockListCount, handleChanges, userRanking] = await Promise.all([
    getBlockedByCount(profile.did),
    getBlockListCount(profile.did),
    getHandleHistory(profile.did),
    getUserRanking(profile.did)
  ]);

  return {
    accountCreated: profile.createdAt,
    handleChanges,
    followers: profile.followersCount,
    following: profile.followsCount,
    posts: profile.postsCount,
    lists: profile.associated?.lists || 0,
    blockedBy: blockedByCount,
    hasBlocked: blockListCount,
    feeds: profile.associated?.feedgens || 0,
    starterPacks: profile.associated?.starterPacks || 0,
    handle: profile.handle,
    userRanking
  };
};