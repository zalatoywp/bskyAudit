'use  server';
import React from 'react';
import { FollowerInfo, BlockedUser } from '../types';

interface UserListProps {
  title: string;
  users: (FollowerInfo | BlockedUser)[];
  onSelectUser: (did: string) => void;
  isBlockList?: boolean;
}

const UserList: React.FC<UserListProps> = ({
  title,
  users,
  onSelectUser,
  isBlockList = false
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatHandle = (handle?: string) => {
    if (!handle) return [];
    return handle.replace('.bsky.social', '');
  };

  // Filter out suspended accounts
  const activeUsers = users.filter(user => user.displayName !== '💀 Cuenta Suspendida 💀');

  return (
    <div className="bg-[#121111] overflow-auto overflow-wrap-anywhere rounded-[20px] rounded-tr-[10px] rounded-br-[10px] p-[20px] pl-[20px] border-4 border-solid w-[400px] mt-[20px] h-[375px] shadow-md custom-scrollbar">
      <div className="bg-[rgb(38,39,39)] border-solid border text-[rgb(252,103,4)] font-semibold border-white rounded-[20px] text-center pt-[5px] pb-[5px] mb-[15px]">
        {title} 
      </div>

      {activeUsers.length > 0 ? (
        activeUsers.map((user, index) => (
          <div
            key={`${user.did}-${index}`}
            onClick={() => onSelectUser(user.did)}
            className="cursor-pointer"
          >
            <div className="transition-transform duration-300 hover:scale-[1.03] w-full rounded-[10px] border-[2px] border-[rgb(4,49,252)] mb-[5px] bg-[rgb(21,24,24)] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)] hover:bg-[rgb(34,34,39)]">
              <div className="flex items-center p-2">
                <img
                  className="transition-transform duration-300 hover:scale-[1.2] rounded-full mt-[5px] ml-[5px] border-[3px] border-[rgba(85,178,240,0.48)]"
                  width={100}
                  height={100}
                  style={{ width: '60px', height: '60px' }}
                  src={user.avatar || "/images/banner_error.jpg"}
                  alt="avatar"
                />
                <div className="transition-transform duration-300 hover:scale-[1.09] ml-3 flex-1">
                  <p className="text-right pr-[5px] mt-0 mb-0 text-white">
                    {user.displayName || formatHandle(user.handle)}
                  </p>

                  <p className="overflow-wrap-anywhere text-right pr-[5px] mb-0 mt-[3px] text-[9px] text-[rgb(252,103,4)]">
                    @{formatHandle(user.handle)}
                  </p>

                  <p className="overflow-wrap-anywhere text-right pr-[5px] mb-0 mt-[3px] text-[9px] text-[rgb(118,121,109)]">
                    {user.did}
                  </p>

                  {isBlockList && 'blockedDate' in user && (
                    <p className="overflow-wrap-anywhere text-right pr-[5px] mb-0 mt-[3px] text-[12px] text-[rgb(252,103,4)]">
                      Bloqueado el {formatDate(user.blockedDate)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-4 text-gray-400">No hay usuarios para mostrar</div>
      )}
    </div>
  );
};

export default UserList;