import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const UserInfo = () => {
  useTitle("User information");
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userBlogs, setUserBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const date = new Date(user.createdAt);

  useEffect(() => {
    fetch(`http://localhost:4000/user/singleUser/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
        setIsLoading(false);
      });
    fetch("http://localhost:4000/blog/by-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: `${id}`,
      }),
    })
      .then((response) => response.json())
      .then((json) => setUserBlogs(json));
  }, []);

  // console.log(user);
  // console.log(userBlogs);

  if (isLoading)
    return (
      <div className="min-h-screen">
        <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800 mx-auto"></div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10">
      <div className="container">
        <div className="w-full shadow border bg-white rounded min-h-[500px] px-3 py-5">
          {Object.keys(user).length ? (
            <>
              <div className="flex flex-wrap justify-center items-center">
                <img
                  className="w-[175px] h-[175px] rounded-full mb-6"
                  src={
                    user.avatar
                      ? `http://localhost:4000/${user.avatar}`
                      : require("../img/man.png")
                  }
                  alt="User Profile"
                />
                <div className="ml-10">
                  <p className="text-3xl">{user.username}</p>
                  <div className="flex space-x-6 my-5">
                    <div>
                      <span className="font-semibold">
                        {date.getMonth() + 1}/{date.getDate()}/
                        {date.getFullYear()}
                      </span>{" "}
                      created
                    </div>
                    <div>
                      <span className="font-semibold">{user.blogs.length}</span>{" "}
                      blogs
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="max-w-[500px]">
                      {user.bio ? (
                        <div className="w-full">
                          {user.bio}
                        </div>
                      ) : (
                        <div className="w-full">
                          This is the initial value for the bio of user. You can
                          easily chang your bio, just need to go your dashboard
                          an edit your profile.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 py-4 my-4">
                <div className="w-[300px] h-[2px] rounded-full bg-gray-300"></div>
                <div className="whitespace-nowrap">User blogs</div>
                <div className="w-[300px] h-[2px] rounded-full bg-gray-300"></div>
              </div>
              <div className="flex flex-wrap justify-evenly">
                {userBlogs.map((userBlog) => {
                  return (
                    <Link
                      className="flex flex-wrap justify-evenly"
                      to={`/blog/${userBlog._id}`}
                      key={userBlog._id}
                    >
                      <div className="w-[250px] bg-white rounded shadow p-2 cursor-pointer transition-all hover:shadow-lg mx-3 mb-5">
                        <img
                          className="w-full rounded min-h-[156px] max-h-[156px]"
                          src={
                            userBlog.imgurl
                              ? userBlog.imgurl
                              : require("../img/blogging.jpg")
                          }
                          onError={(e) =>
                            (e.target.src = require("../img/blogging.jpg"))
                          }
                          alt="blogging"
                        />
                        <div className="my-2">
                          <p className="text-lg font-semibold">
                            {userBlog.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center font-medium text-lg">
              No user to show
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
