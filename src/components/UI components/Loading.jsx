import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 my-28">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-500 border-opacity-75"></div>
    </div>
  );
};

export default Loading;
