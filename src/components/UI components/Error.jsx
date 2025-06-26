import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">Failed to Load</h1>
      <p className="text-gray-600 mt-2 text-center">
        Sorry, something went wrong while loading this page. <br />
        Please try refreshing or come back later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-3 bg-sky-500 text-white font-medium text-lg rounded shadow hover:bg-sky-600"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default Error;
