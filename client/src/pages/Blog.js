import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import Rating from "react-rating";
import { IoIosArrowDropupCircle } from "react-icons/io";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import CommentsCard from "../components/CommentsCard";
import RatingCard from "../components/RatingCard";
import CommentModal from "../components/CommentModal";
import useToastContext from "../hooks/useToastContext";

const Blog = () => {
  useTitle("Blog");
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { _id } = useParams();
  const [hasError, setError] = useState(false);
  const [rate, setRate] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(0);
  const { pushAlert } = useToastContext();

  const userCookie = cookies.get("ut");
  const date = new Date(blog.createdAt);

  // console.log(date);
  // console.log(comments);

  useEffect(() => {
    fetch(`http://localhost:4000/blog/single-blog/${_id}`)
      .then((response) => response.json())
      .then((json) => {
        setBlog(json);
        if (json.msg == "Unexpected token u in JSON at position 0")
          return setError(true);
        if (json) setIsLoading(false);
        // console.log(json);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/comment/by-blog/${blog._id}`)
      .then((response) => response.json())
      .then((json) => setComments(json));
  }, [blog]);
  // console.log(blog);

  useEffect(() => {
    if (rate > 0) {
      fetch("http://localhost:4000/blog/submit-rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${cookies.get("ut")}`,
        },
        body: JSON.stringify({
          blogId: `${blog._id}`,
          score: rate,
        }),
      })
        .then((response) => response.json())
        .then((json) => console.log(json));

      fetch(`http://localhost:4000/blog/single-blog/${_id}`)
        .then((response) => response.json())
        .then((json) => {
          setBlog(json);
          if (json.msg == "Unexpected token u in JSON at position 0")
            return setError(true);
          if (json) setIsLoading(false);
          // console.log(json);
        });
    }
  }, [rate]);

  const sumbitComment = () => {
    if (commentInput.trim() == "")
      return pushAlert({
        msg: "You have to write something!",
        type: "error",
        icon: "error",
      });
    fetch("http://localhost:4000/comment/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        text: `${commentInput}`,
        blogId: `${blog._id}`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.msg == "ok")
          return pushAlert({
            type: "success",
            msg: "Comment were successfully registered",
            icon: "success",
          });
        if (json.msg == "bad request: bad inputs")
          return pushAlert({
            msg: "Not valid, please check your filled",
            type: "error",
            icon: "error",
          });
      });

    fetch(`http://localhost:4000/comment/by-blog/${blog._id}`)
      .then((response) => response.json())
      .then((json) => setComments(json));
  };

  const modalHandlear = () => {
    setIsModal(!isModal);
    if (userCookie == undefined) navigate("/login");
  };

  const onScroll = () => {
    const Scrolled = document.documentElement.scrollTop;
    const MaxHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const ScrollPercent = (Scrolled / MaxHeight) * 100;
    setScroll(ScrollPercent);
  };

  window.addEventListener("scroll", onScroll);

  const ratingHandler = (rating) => {
    setRate(rating);
    return pushAlert({
      type: "success",
      msg: "Points were successfully registered",
      icon: "success",
    });
  };

  if (hasError) {
    return (
      <div className="w-full min-h-screen">
        <div className="text-lg font-medium text-center p-2">
          Error 404: article not found
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="min-h-screen">
        <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800 mx-auto"></div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-slate-100">
      <CommentModal
        isModal={isModal}
        setIsModal={setIsModal}
        Rating={Rating}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
        sumbitComment={sumbitComment}
        ratingHandler={ratingHandler}
      />
      <div
        className={`h-1 fixed bg-blue-500`}
        style={{ width: `${scroll}%` }}
      ></div>
      <div
        className="fixed right-4 bottom-4 text-blue-500 md:text-6xl text-5xl cursor-pointer"
        onClick={() =>
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
      >
        <IoIosArrowDropupCircle />
      </div>
      <div className="container py-10">
        <div className="w-full shadow border bg-white rounded min-h-[500px]">
          <div className="w-full bg-[#2E3A3F] min-h-[60px] px-4 py-2 rounded-t">
            <div className="flex items-center justify-between text-white">
              <Link
                to={`/userinfo/${blog.creator._id}`}
                className="flex items-center space-x-3"
              >
                <img
                  className="w-[50px] h-[50px] rounded-full"
                  src={
                    blog.creator.avatar
                      ? `http://localhost:4000/${blog.creator.avatar}`
                      : require("../img/man.png")
                  }
                  alt="User Profile"
                />
                <p className="text-white">{blog.creator.name}</p>
              </Link>
              <div className="text-sm font-light lg:font-medium">
                {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
              </div>
            </div>
          </div>
          <div className="p-4">
            <img
              className="w-full rounded"
              src={
                blog.imgurl.length
                  ? blog.imgurl
                  : require("../img/blogging.jpg")
              }
              alt="Article photo"
            />
            <h3 className="mt-5 text-center text-2xl font-bold">
              {blog.title}
            </h3>
            <div
              className="mt-5"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-4 shadow border bg-white rounded mt-4 p-4">
          <div className="lg:sticky top-[80px] lg:col-span-1 col-span-4 space-y-2 mb-5 lg:mb-0">
            <RatingCard blog={blog} modalHandlear={modalHandlear} />
          </div>
          <div className="w-full lg:col-span-3 lg:pl-10 col-span-4 mt-5 lg:mt-0">
            <CommentsCard comments={comments} blog={blog} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
