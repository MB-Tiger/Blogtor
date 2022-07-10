import React, { useState, useEffect } from "react";
import useTitle from "../hooks/useTitle";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  useTitle("Home");
  const [topBlogs, setTopBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:4000/blog/top-blogs")
      .then((response) => response.json())
      .then((json) => {
        setTopBlogs(json);
        setLoading(false);
        // console.log(json);
      });
  }, []);
  // console.log(topBlogs);

  if (loading)
    return (
      <div className="min-h-screen">
        <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800 mx-auto"></div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <Header />
      <div>
        <div className="container flex justify-between items-center pt-12">
          <div>
            <div className="sm:text-4xl text-2xl font-medium mb-4">
              Join the BlogMo Challenge
            </div>
            <div className="text-[#949494] text-sm sm:text-base sm:font-medium">
              Get dialy prompts. Write a post each day in january.
            </div>
            <div className="text-[#949494] text-sm sm:text-base sm:font-medium">
              Join our community. And start growing your own
            </div>
            <Link to={"/login"}>
              <button className="bg-[#949494] text-white rounded transition-all hover:bg-[#808080] px-8 py-2 mt-4">
                Join Us
              </button>
            </Link>
          </div>
          <img
            className="md:w-[500px] w-[250px] sm:block hidden"
            src={require("../img/man-looking-phone.png")}
            alt=""
          />
        </div>
      </div>
      <div className="container flex items-center justify-center space-x-2 pt-12 pb-6">
        <div className="w-full h-[2px] rounded-full bg-gray-400"></div>
        <div className="whitespace-nowrap">Top articles</div>
        <div className="w-full h-[2px] rounded-full bg-gray-400"></div>
      </div>
      <main className="container grid grid-cols-2 lg:space-x-4 space-y-6 lg:space-y-0 mb-8">
        {topBlogs.slice(0, 2).map((topBlog) => {
          return (
            <Link
              to={`/blog/${topBlog._id}`}
              className="w-full col-span-2 lg:col-span-1 bg-white shadow hover:shadow-lg transition-all cursor-pointer rounded-sm"
              key={topBlog._id}
            >
              <img
                className="w-full xl:h-[373px] lg:h-[252px] rounded-t-sm"
                src={
                  topBlog.imgurl
                    ? topBlog.imgurl
                    : require("../img/blogging.jpg")
                }
                alt="article photo"
              />
              <div className="flex flex-wrap items-center justify-between px-2 py-4">
                <p className="lg:text-lg font-medium">{topBlog.title}</p>
                <div className="flex flex-wrap items-center space-x-1">
                  <AiFillStar className="text-yellow-500" />
                  <span>{topBlog.averageScore}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  );
};

export default Home;
