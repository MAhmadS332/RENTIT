import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ADMIN_ID = import.meta.env.VITE_ADMIN_ID;

const SideHeader = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    setDropdown(false);
  }, [location.pathname]);

  return (
    <ul className="flex items-center gap-4 text-sm">
      {authContext.isLoggedIn && authContext.user.role === "host" && (
        <li className="p-3 hover:bg-gray-100 transition hidden sm:inline">
          <Link to="/listing/add">Rent your home</Link>
        </li>
      )}
      <li className="relative z-[100]">
        <div
          className="flex items-center gap-3 cursor-pointer p-3 shadow hover:bg-gray-100 transition"
          onClick={() => setDropdown(!dropdown)}
        >
          {dropdown ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="black"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="black"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          )}
          {authContext.isLoggedIn ? (
            <div className="flex gap-2 items-center">
              <img
                src={`/imgs/avatars/avatar${authContext.user.avatar}.jpg`}
                alt={`Avatar${authContext.user.avatar}`}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col">
                <div className="font-semibold text-gray-800 truncate w-24 -my-0.5">
                  {authContext.user.name}
                </div>
                <div className="text-sky-500 font-medium -my-1">
                  {authContext.user.userId !== ADMIN_ID
                    ? authContext.user.role.charAt(0).toUpperCase() +
                      authContext.user.role.slice(1)
                    : "Admin"}
                </div>
              </div>
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="black"
            >
              <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
            </svg>
          )}
        </div>
        {dropdown && (
          <div
            className="absolute right-0 top-full mt-2 w-48 bg-white shadow-md shadow-gray-500 border border-gray-400"
            onClick={() => setDropdown(false)}
          >
            {authContext.isLoggedIn && authContext.user.userId !== ADMIN_ID && (
              <>
                <Link
                  className="block px-4 py-2 text-gray-700 hover:bg-sky-500 hover:text-white"
                  to={`/bookings/${authContext.user.userId}`}
                >
                  My Bookings
                </Link>
                {authContext.user.role === "host" && (
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:bg-sky-500 hover:text-white"
                    to={`/listings/user/${authContext.user.userId}`}
                  >
                    My Listings
                  </Link>
                )}
                <button
                  className="block px-4 py-2 text-gray-700 hover:bg-sky-500 hover:text-white w-full text-left"
                  onClick={() => {
                    authContext.logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            )}
            {authContext.isLoggedIn && authContext.user.userId === ADMIN_ID && (
              <>
                <Link
                  className="block px-4 py-2 text-gray-700 hover:bg-sky-500 hover:text-white "
                  to={`/admin/bookings/`}
                >
                  Admin Bookings
                </Link>
                {authContext.user.role === "host" && (
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:bg-sky-500 hover:text-white"
                    to={`/admin/listings/`}
                  >
                    Admin Listings
                  </Link>
                )}
                <button
                  className="block px-4 py-2 text-gray-700 hover:bg-sky-500 hover:text-white w-full text-left"
                  onClick={() => {
                    authContext.logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            )}
            {!authContext.isLoggedIn && (
              <>
                <Link
                  className="block px-4 py-2 text-gray-700 hover:bg-sky-500 hover:text-white "
                  to="/auth/register"
                >
                  Signup
                </Link>
                <Link
                  className="block px-4 py-2 text-gray-700 hover:bg-sky-500 hover:text-white "
                  to="/auth/login"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </li>
    </ul>
  );
};

export default SideHeader;
