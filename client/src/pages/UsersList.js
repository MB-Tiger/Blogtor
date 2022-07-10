import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const UsersList = () => {
  useTitle("Users");
  const [usersList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const searchInput = useRef();

  useEffect(() => {
    fetch("http://localhost:4000/user/")
      .then((data) => data.json())
      .then((data) => {
        setUserList(data);
        setIsLoading(false);
      });
    // searchInput.current.placeholder = "Search..."
  }, []);
  // console.log(usersList);

  if (isLoading)
    return (
      <div className="min-h-screen">
        <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800 mx-auto"></div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-slate-50 py-8">
      <div className="container text-center">
        <label className="flex whitespace-nowrap items-center md:space-x-2 mb-5">
          <span className="sm:text-lg font-medium md:inline-block hidden">
            Find your writer
          </span>
          <input
            className="w-full h-10 rounded bg-gray-100 border p-2"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            ref={searchInput}
            placeholder="Srearch ..."
            type="search"
          />
        </label>
        <div className="w-full min-h-[75vh] rounded border bg-white text-center shadow-sm">
          <div className="grid grid-cols-3 w-full rounded-t p-2 bg-gray-200 font-medium items-center">
            <div className="col-span-1">Number</div>
            <div className="col-span-1">Image</div>
            <div className="col-span-1">Name</div>
          </div>
          {usersList
            .filter((user) =>
              user.name.toLowerCase().includes(searchUser.toLowerCase())
            )
            .map((user, i) => {
              return (
                <Link
                  to={`/userinfo/${user._id}`}
                  className="grid grid-cols-3 items-center bg-[#2E3A3F] rounded m-2 p-2 text-white hover:scale-105 cursor-pointer transition-all overflow-x-auto"
                  key={user._id}
                >
                  <div className="col-span-1">{i + 1}</div>
                  <div className="col-span-1">
                    <img
                      className="w-[35px] h-[35px] rounded-full mx-auto"
                      src={
                        user.avatar
                          ? `http://localhost:4000/${user.avatar}`
                          : require("../img/man.png")
                      }
                      alt="User image"
                    />
                  </div>
                  <div className="col-span-1"> {user.name} </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
