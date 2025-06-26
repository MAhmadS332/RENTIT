import React from 'react'
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
  return (
    <div className="my-10 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Dashboard
        </h2>
        <div className="flex flex-col gap-4">
          <Link
            to="/admin/listings"
            className="text-center bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Manage Listings
          </Link>
          <Link
            to="/admin/bookings"
            className="text-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Manage Bookings
          </Link>
        </div>
      </div>
  );
}

export default AdminHomePage