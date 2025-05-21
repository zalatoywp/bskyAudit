import React from 'react';
import { UserStats } from '../types';

interface StatsCardProps {
  stats: UserStats;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatHandle = (handle: string) => {
    return handle.replace('.bsky.social', '');
  };

  return (
    <div className="min-w-max mt-[20px] flex-none inline-grid gap-[30px] rounded-[20px] p-[10px] border border-solid w-[337px] bg-[#121111] shadow-md transition-transform duration-300 hover:scale-[1.02]">
      <table>
        <tbody>
          <tr>
            <td className="border-t border-b border-l border-[rgb(160,160,160)] rounded-l-[5px] pl-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              Cuenta creada el:
            </td>
            <td className="text-[rgb(252,103,4)] text-right border-t border-b border-r border-[rgb(160,160,160)] rounded-r-[5px] pr-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              {formatDate(stats.accountCreated)}
            </td>
          </tr>
          <tr className="bg-[rgb(27,26,37)]">
            <td className="border-t border-b border-l border-[rgb(160,160,160)] rounded-l-[5px] pl-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              Cambios de @:
            </td>
            <td className="text-[rgb(252,103,4)] text-right border-t border-b border-r border-[rgb(160,160,160)] rounded-r-[5px] pr-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              {stats.handleChanges}
            </td>
          </tr>
          <tr>
            <td className="border-t border-b border-l border-[rgb(160,160,160)] rounded-l-[5px] pl-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              Cuenta:
            </td>
            <td className="text-[rgb(252,103,4)] text-right border-t border-b border-r border-[rgb(160,160,160)] rounded-r-[5px] pr-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              @{formatHandle(stats.handle)}
            </td>
          </tr>
          <tr className="bg-[rgb(27,26,37)]">
            <td className="border-t border-b border-l border-[rgb(160,160,160)] rounded-l-[5px] pl-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              Seguidores:
            </td>
            <td className="text-[rgb(252,103,4)] text-right border-t border-b border-r border-[rgb(160,160,160)] rounded-r-[5px] pr-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              {stats.followers}
            </td>
          </tr>
          <tr>
            <td className="border-t border-b border-l border-[rgb(160,160,160)] rounded-l-[5px] pl-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              Siguiendo:
            </td>
            <td className="text-[rgb(252,103,4)] text-right border-t border-b border-r border-[rgb(160,160,160)] rounded-r-[5px] pr-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              {stats.following}
            </td>
          </tr>
          <tr className="bg-[rgb(27,26,37)]">
            <td className="border-t border-b border-l border-[rgb(160,160,160)] rounded-l-[5px] pl-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              Publicaciones:
            </td>
            <td className="text-[rgb(252,103,4)] text-right border-t border-b border-r border-[rgb(160,160,160)] rounded-r-[5px] pr-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              {stats.posts}
            </td>
          </tr>
          <tr>
            <td className="border-t border-b border-l border-[rgb(160,160,160)] rounded-l-[5px] pl-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              Listas:
            </td>
            <td className="text-[rgb(252,103,4)] text-right border-t border-b border-r border-[rgb(160,160,160)] rounded-r-[5px] pr-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              {stats.lists}
            </td>
          </tr>
          <tr className="bg-[rgb(27,26,37)]">
            <td className="border-t border-b border-l border-[rgb(160,160,160)] rounded-l-[5px] pl-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              Lo han Bloqueado:
            </td>
            <td className="text-[rgb(252,103,4)] text-right border-t border-b border-r border-[rgb(160,160,160)] rounded-r-[5px] pr-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              {stats.blockedBy}
            </td>
          </tr>
          <tr>
            <td className="border-t border-b border-l border-[rgb(160,160,160)] rounded-l-[5px] pl-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              Ha Bloqueado:
            </td>
            <td className="text-[rgb(252,103,4)] text-right border-t border-b border-r border-[rgb(160,160,160)] rounded-r-[5px] pr-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              {stats.hasBlocked}
            </td>
          </tr>
          <tr className="bg-[rgb(27,26,37)]">
            <td className="border-t border-b border-l border-[rgb(160,160,160)] rounded-l-[5px] pl-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              Feeds creados:
            </td>
            <td className="text-[rgb(252,103,4)] text-right border-t border-b border-r border-[rgb(160,160,160)] rounded-r-[5px] pr-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              {stats.feeds}
            </td>
          </tr>
          <tr>
            <td className="border-t border-b border-l border-[rgb(160,160,160)] rounded-l-[5px] pl-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              Pack de inicio:
            </td>
            <td className="text-[rgb(252,103,4)] text-right border-t border-b border-r border-[rgb(160,160,160)] rounded-r-[5px] pr-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              {stats.starterPacks}
            </td>
          </tr>
          <tr className="bg-[rgb(27,26,37)]">
            <td className="border-t border-b border-l border-[rgb(160,160,160)] rounded-l-[5px] pl-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              Identidad:
            </td>
            <td className="text-[rgb(252,103,4)] text-right border-t border-b border-r border-[rgb(160,160,160)] rounded-r-[5px] pr-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              {stats.handle}
            </td>
          </tr>
          <tr>
            <td className="border-t border-b border-l border-[rgb(160,160,160)] rounded-l-[5px] pl-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              Usuario Nº:
            </td>
            <td className="text-[rgb(252,103,4)] text-right border-t border-b border-r border-[rgb(160,160,160)] rounded-r-[5px] pr-[5px] shadow-[0_0_10px_hsla(251,90.5%,58.6%,0.5)]">
              {stats.userRanking}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatsCard;