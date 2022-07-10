import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import useTitle from "../hooks/useTitle";

const Blogs = () => {
  useTitle("Blogs");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:4000/blog")
      .then((response) => response.json())
      .then((json) => {
        setBlogs(json);
        setLoading(false);
      });
  }, []);
  // console.log(blogs);

  if (loading)
    return (
      <div className="min-h-screen">
        <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800 mx-auto"></div>
      </div>
    );

  return (
    <section className="w-full min-h-screen bg-slate-50 py-10">
      <div className="container">
        <div className="grid xl:grid-cols-2 grid-cols-3">
          {blogs.length ? (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <div className="text-center font-medium text-lg">
              No article to show
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
