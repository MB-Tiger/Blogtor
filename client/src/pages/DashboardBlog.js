import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { BiEditAlt } from "react-icons/bi";

const DashboardBlog = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    fetch("http://localhost:4000/blog/my-blogs", {
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        return setUserBlogs(json);
      });
  }, []);
  // console.log(userBlogs);

  return (
    <div className="w-full min-h-[600px] border rounded-lg shadow-sm p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 py-4 ">
          <div className="w-4 h-1 rounded-full bg-yellow-600"></div>
          <div className="font-semibold text-lg">Your blogs</div>
        </div>
        <Link to={"/dashboard/submitblog"}>
          <button className="text-white bg-blue-500 rounded px-2 py-1 hover:bg-blue-700 transition-all ml-1">
            Create blog
          </button>
        </Link>
      </div>
      <div className="w-full h-[68vh] overflow-y-auto rounded border text-center">
        <div className="w-full rounded-t p-2 bg-gray-200 font-medium sticky top-0 grid md:grid-cols-6 grid-cols-3 items-center">
          <div className="col-span-1">Number</div>
          <div className="col-span-1">Title</div>
        </div>
        <div>
          {userBlogs.map((userBlog, i) => {
            return (
              <Link key={userBlog._id} to={`/blog/${userBlog._id}`}>
                <div className="rounded p-2 grid md:grid-cols-6 grid-cols-3 bg-[#2E3A3F] m-2 text-white hover:shadow-lg cursor-pointer transition-all items-center">
                  <div className="col-span-1">{i + 1}</div>
                  <div className="col-span-1">
                    {userBlog.title ? userBlog.title : "Empty"}
                  </div>
                  <div className="md:col-span-1 md:inline-block hidden"></div>
                  <div className="md:col-span-1 md:inline-block hidden"></div>
                  <div className="md:col-span-1 md:inline-block hidden"></div>
                  <Link
                    to={`/dashboard/blogedit/${userBlog._id}`}
                    className="flex items-center md:space-x-1 col-span-1 mx-auto"
                  >
                    <button className="text-lg">
                      <BiEditAlt />
                    </button>
                    <div className="md:inline-block hidden text-center">
                      Edit
                    </div>
                  </Link>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardBlog;
