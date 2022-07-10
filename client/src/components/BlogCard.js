import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <>
      <div
        key={blog._id}
        className="xl:col-span-1 max-h-[216px] col-span-3 bg-white shadow mx-2 mb-4 transition-all hover:shadow-lg md:flex rounded-sm hidden"
      >
        <img
          className="w-1/2 h-full overflow-hidden rounded-l-sm"
          src={blog.imgurl ? blog.imgurl : require("../img/blogging.jpg")}
          alt="blogging"
          onError={(e) => (e.target.src = require("../img/blogging.jpg"))}
        />
        <div className="w-1/2 ml-2 px-2 md:py-4 py-2 flex flex-col justify-between">
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-lg font-semibold mb-1">
              {blog.title ? blog.title : "Title is empty"}
            </p>
            <Link to={`/blog/${blog._id}`}>
              <button className="px-2 py-[2px] bg-[#69995D] transition-all hover:bg-[#646536] text-white rounded">
                Read
              </button>
            </Link>
          </div>
          <Link
            to={`/userinfo/${blog.creator._id}`}
            className="flex flex-wrap items-center space-x-2 mt-4"
          >
            <img
              className="sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] rounded-full"
              src={
                blog.creator.avatar
                  ? `http://localhost:4000/${blog.creator.avatar}`
                  : require("../img/man.png")
              }
              alt="User photo"
            />
            <span className="md:inline-block hidden">{blog.creator.name}</span>
          </Link>
        </div>
      </div>
      {/* Mobile screen */}
      <div className="w-fll sm:h-[300px] h-[230px] md:hidden block col-span-3 shadow mb-[130px]">
        <img
          className="w-full h-full rounded-t-sm"
          src={blog.imgurl ? blog.imgurl : require("../img/blogging.jpg")}
          alt="blogging"
          onError={(e) => (e.target.src = require("../img/blogging.jpg"))}
        />
        <div className="w-full p-2 flex flex-col justify-between bg-white shadow">
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-lg font-semibold mb-1">
              {blog.title ? blog.title : "Title is empty"}
            </p>
            <Link to={`/blog/${blog._id}`}>
              <button className="px-2 py-[2px] bg-[#69995D] transition-all hover:bg-[#646536] text-white rounded text-sm">
                Read
              </button>
            </Link>
          </div>
          <Link
            to={`/userinfo/${blog.creator._id}`}
            className="flex flex-wrap items-center space-x-2 mt-4"
          >
            <img
              className="sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] rounded-full"
              src={
                blog.creator.avatar
                  ? `http://localhost:4000/${blog.creator.avatar}`
                  : require("../img/man.png")
              }
              alt="User photo"
            />
            <span className="sm:text-base text-sm">{blog.creator.name}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
