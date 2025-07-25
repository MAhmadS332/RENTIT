import React from "react";
import SideHeader from "./UI components/SideHeader";
import Navbar from "./UI components/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="items-center flex h-min">
      <div className="flex items-center gap-2 ml-5">
        <Link to="/">
          <img src="/imgs/logo.png" alt="Rent It Logo" width={60} />
        </Link>
        <Link
          to="/"
          className="text-base sm:text-xl text-sky-600 font-extrabold hidden sm:flex"
        >
          Rent It
        </Link>
      </div>
      <div className="ml-10 hidden lg:flex">
        <Navbar />
      </div>
      <div className="justify-self-end ml-auto">
        <SideHeader />
      </div>
    </header>
  );
};

export default Header;
