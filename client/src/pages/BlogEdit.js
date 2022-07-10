import React, { useState, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import { Editor } from "@tinymce/tinymce-react";
import { useParams, useNavigate } from "react-router-dom";
import useToastContext from "../hooks/useToastContext";

const BlogEdit = () => {
  const [titleValue, setTitleValue] = useState([]);
  const [blogImg, setBlogImg] = useState([]);
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();
  const editorRef = useRef(null);
  const { id } = useParams();
  const { pushAlert } = useToastContext();

  const navigate = useNavigate();

  // console.log(id);
  // console.log(titleValue);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    fetch(`http://localhost:4000/blog/single-blog/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setBlog(json);
        setBlogImg(json.imgurl);
        setTitleValue(json.title);
        if (json) setIsLoading(false);
      });
  }, []);
  // console.log(blog);

  const editBlog = async () => {
    console.log("salam salam");
    fetch("http://localhost:4000/blog/edit", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        blogId: id,
        data: {
          title: titleValue,
          content: editorRef.current.getContent(),
          imgurl: blogImg,
        },
      }),
    })
      .then((response) => {
        console.log("!!!!");
        response.json();
      })
      .then((json) => {
        navigate("/dashboard/dashboardblog");

        if (json.msg == "bad request: bad inputs")
          return pushAlert({
            msg: "You don't fill all of inputs",
            type: "error",
            icon: "error",
          });
      });
  };

  if (isLoading)
    return (
      <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800"></div>
    );

  return (
    <div className="w-full min-h-screen">
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={`${blog.content}`}
        init={{
          height: 600,
          selector: "textarea#local-upload",
          plugins: "image code",
          toolbar:
            "undo redo | image code |" +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat",

          /* without images_upload_url set, Upload tab won't show up*/
          images_upload_url: "postAcceptor.php",
          /* we override default upload handler to simulate successful upload*/
          images_upload_handler: function (blobInfo, success, failure) {
            setTimeout(function () {
              /* no matter what you upload, we will turn it into TinyMCE logo :)*/
              success(
                "http://moxiecode.cachefly.net/tinymce/v9/images/logo.png"
              );
            }, 2000);
          },
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <div className="w-full flex flex-wrap justify-between mt-5 md:px-10 px-5">
        <div className="mx-auto">
          <label className="inline-block mb-5 md:w-[40%] w-full mx-4">
            <span className="mr-2">Blog title</span>
            <input
              className="h-8 bg-gray-100 rounded-sm p-2 w-full"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              type="text"
            />
          </label>
          <label className="inline-block mb-5 md:w-[40%] w-full mx-4">
            <span className="mr-2">Blog image</span>
            <input
              className="h-8 bg-gray-100 rounded-sm p-2 w-full"
              value={blogImg}
              onChange={(e) => setBlogImg(e.target.value)}
              type="text"
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center space-x-5 mx-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 transition-all text-white px-3 py-2 rounded mb-5 hidden md:inline-block"
            onClick={() => log()}
          >
            Log editor content
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 transition-all text-white px-3 py-2 rounded mb-5"
            onClick={() => editBlog()}
          >
            Sumbit edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogEdit;
