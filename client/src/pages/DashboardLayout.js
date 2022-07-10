import React, { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import Cookies from "universal-cookie";
import { useNavigate, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiEditAlt, BiHome } from "react-icons/bi";
import { MdExitToApp } from "react-icons/md";

const DashboardLayout = () => {
  useTitle("Dashboard");
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleUserError = () => {
    console.log("im being run");
    cookies.remove("ut");
    navigate("/login");
  };

  useEffect(() => {
    fetch("http://localhost:4000/user/me", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({}),
    })
      .then((data) => data.json())
      .then((response) => {
        // console.log(response);
        if (response.msg === "not logged in") return handleUserError();

        if (response && response._id) setLoading(false);

        setUser(response);
      })
      .catch((err) => {
        return handleUserError();
      });
  }, []);
  // console.log(user);

  const logout = () => {
    cookies.remove("ut");
    navigate("/");
  };

  if (loading)
    return (
      <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800"></div>
    );

  return (
    <div className="w-full grid grid-cols-4 p-5">
      <div className="lg:col-span-1 col-span-4 lg:mr-5 mb-5 lg:mb-0 max-h-[600px] lg:sticky top-0 border shadow-sm rounded-lg px-3 py-5 z-[1000]">
        <div className="flex justify-between items-center">
          <Link
            to={`/userinfo/${user._id}`}
            className="flex flex-wrap items-center space-x-4"
          >
            <img
              className="w-[60px] h-[60px] rounded-full"
              src={
                user.avatar
                  ? `http://localhost:4000/${user.avatar}`
                  : require("../img/man.png")
              }
              alt="User Profile"
            />
            <div>
              <p className="text-lg">{user.username}</p>
              <p className="text-xs">{user.name}</p>
            </div>
          </Link>
          <Link to={"useredit"}>
            <BiEditAlt className="text-xl text-blue-900 cursor-pointer" />
          </Link>
        </div>
        <hr className="my-5" />
        <ul className="space-y-4">
          <li>
            <Link to={"/"}>
              <div className="flex items-center space-x-2 cursor-pointer text-lg">
                <BiHome className="text-2xl" />
                <p>Home page</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to={"dashboardblog"}>
              <div className="flex items-center space-x-2 cursor-pointer text-lg">
                <img
                  className="w-[25px]"
                  src={require("../img/laptop.png")}
                  alt="blogging"
                />
                <p>Blog</p>
              </div>
            </Link>
          </li>
          <li onClick={() => logout()}>
            <div
              className="flex items-center space-x-2 cursor-pointer text-lg"
              onClick={() => logout()}
            >
              <MdExitToApp className="text-2xl" />
              <p>Log out</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="lg:col-span-3 col-span-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
