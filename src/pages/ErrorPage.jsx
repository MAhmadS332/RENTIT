import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-5 my-28">
      <h1 className="text-9xl font-bold text-sky-500">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 text-center">
        Oops! The page you're looking for doesn't exist. <br />
        Please check the URL or return to the homepage.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-sky-500 text-white font-medium text-lg rounded shadow hover:bg-sky-600"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
