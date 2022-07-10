import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { BiUserCircle } from "react-icons/bi";

const Navbar = () => {
  const cookies = new Cookies();
  const userCookie = cookies.get("ut");
  // console.log(userCookie);

  return (
    <nav className="sticky top-0 p-2 px-5 md:px-10 bg-white shadow z-[1000]">
      <div className="flex justify-between items-center space-x-5">
        <ul className="flex items-center space-x-4">
          <li>
            <Link to={"/"}>
              <img
                className="md:w-12 sm:w-10 w-8"
                src={require("../img/MR.Logo2.png")}
                alt="Logo"
              />
            </Link>
          </li>
          <li>
            <Link
              className="hover:border-b-2 focus:border-b-2 border-red-500 p-2"
              to={"/blogs"}
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              className="hover:border-b-2 focus:border-b-2 border-red-500 p-2"
              to={"/users"}
            >
              Users
            </Link>
          </li>
        </ul>
        {userCookie == undefined ? (
          <ul className="flex items-center space-x-5">
            {/* <li className="hover:bg-blue-500 hover:text-white hover:p-2 transition-all rounded hidden lg:inline-block">
              <Link to={"/signup"}>Sign up</Link>
            </li> */}
            <li className="hover:bg-blue-500 hover:text-white hover:p-2 transition-all sm:text-base text-sm rounded">
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        ) : (
          <li className="list-none">
            <Link to={"/dashboard/dashboardblog"}>
              <BiUserCircle className="text-3xl" />
            </Link>
          </li>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
