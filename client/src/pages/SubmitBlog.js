import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import useToastContext from "../hooks/useToastContext";

const SubmitBlog = () => {
  const [titleValue, setTitleValue] = useState([]);
  const [blogImg, setBlogImg] = useState([]);
  const { pushAlert } = useToastContext();
  const cookies = new Cookies();
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const submitBLog = async () => {
    fetch("http://localhost:4000/blog/write", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        title: titleValue,
        content: editorRef.current.getContent(),
        imgurl: blogImg,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(editorRef);
        console.log(editorRef.current.getContent());
        if (json.msg == "")
          return pushAlert({
            msg: "You don't fill all of inputs",
            type: "error",
            icon: "error",
          });
        navigate("/dashboard/dashboardblog");
      });
  };

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
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
      <div className="w-full flex flex-wrap justify-between items-center mt-5 md:px-10 px-5">
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
            onClick={() => submitBLog()}
          >
            Sumbit blog
          </button>
        </div>
      </div>
    </>
  );
};

export default SubmitBlog;
