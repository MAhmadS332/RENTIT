import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const ADMIN_ID = import.meta.env.VITE_ADMIN_ID;
  const authContext = useContext(AuthContext);
  return (
    <nav className="sticky top-0 text-sm">
      {authContext.isLoggedIn && authContext.user.userId !== ADMIN_ID && (
        <ul className="flex gap-4 text-sky-600">
          <Link
            className="hover:text-black w-max"
            to={"/bookings/" + authContext.user.userId}
          >
            My Bookings
          </Link>

          {authContext.user.role === "host" && (
            <Link
              className="hover:text-black w-max"
              to={"/listings/user/" + authContext.user.userId}
            >
              My Listings
            </Link>
          )}
        </ul>
      )}
      {authContext.isLoggedIn && authContext.user.userId === ADMIN_ID && (
        <ul className="flex gap-4 text-sky-600">
          <Link
            className="hover:text-black w-max"
            to={"/admin/bookings/"}
          >
            Manage Bookings
          </Link>

          {authContext.user.role === "host" && (
            <Link
              className="hover:text-black w-max"
              to={"/admin/listings/"}
            >
              Manage Listings
            </Link>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
