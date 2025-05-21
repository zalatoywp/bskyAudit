import React from 'react';
import { UserProfile } from '../types';

interface ProfileCardProps {
  profile: UserProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const formatHandle = (handle: string) => {
    return handle.replace('.bsky.social', '');
  };

  return (
    <div className="w-full lg:w-4/5 mx-auto rounded-[20px] p-[20px] border border-solid bg-[#121111] transition-transform duration-300 hover:scale-[1.01]">
      <div>
        <img 
          className="max-w-full rounded-[20px] mt-[5px] border-[3px] border-[#2196F3] shadow-[0_0_10px_hsla(212,90.5%,58.6%,0.73)]" 
          src={profile.banner || "/images/banner_error.jpg"} 
          alt="banner"
        />

        <div className="relative top-[-60px] left-0 w-full flex items-center">
          <a 
            className="no-underline text-white" 
            href={`https://bsky.app/profile/${profile.did}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="absolute pb-0 pt-0">
              <img 
                className="rounded-full mt-[5px] border-[3px] border-[#2196F3] shadow-[0_0_10px_hsla(212,90.5%,58.6%,0.73)]" 
                width="70px" 
                height="70px" 
                src={profile.avatar || "/images/banner_error.jpg"} 
                alt="avatar"
              />
            </div>
          </a>
        </div>
      </div>
      
      <p className="text-shadow-[2px_2px_4px_#000000] overflow-wrap-anywhere mt-0 text-[11px] pl-[90px] text-[rgb(252,103,4)] mb-0">
        {profile.did}
      </p>
      
      <h1 className="text-shadow-[2px_2px_4px_#000000] pl-[75px] mt-0 mb-0 pt-0">
        {profile.displayName || formatHandle(profile.handle)}
      </h1>
      
      <p className="pl-[50px] overflow-wrap-anywhere text-gray-300">
        {profile.description ? `${profile.description.substring(0, 300)}...` : 'No description provided'}
      </p>
    </div>
  );
};

export default ProfileCard;