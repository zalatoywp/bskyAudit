import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-[200px]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#2196F3]"></div>
    </div>
  );
};

export default LoadingIndicator;