import React, { useState, useEffect, useContext } from "react";
import Cookies from "universal-cookie";
import useToastContext from "../hooks/useToastContext";

const UserEdit = () => {
  const { pushAlert } = useToastContext();

  const cookies = new Cookies();
  const [userEdit, setUserEdit] = useState({});
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);

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
      .then((json) => {
        setUserEdit(json);
        setImage(`http://localhost:4000/${json.avatar}`);
      });
  }, []);
  // console.log(userEdit);

  useEffect(() => {
    submitAvatar();
  }, [file]);

  const editUser = async () => {
    console.log("salam salam");
    fetch("http://localhost:4000/user/edit", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        name: userEdit.name,
        bio: userEdit.bio,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.msg === "bad input")
          return pushAlert({
            type: "error",
            msg: "please fill inputs whith correct value",
            icon: "error",
          });

        if (json.msg === "ok")
          return pushAlert({
            type: "success",
            msg: "Changes were successfully recorded",
            icon: "success",
          });
      });
  };
  // console.log(editUserMsg)

  const handlePictureLoad = (e) => {
    const filetoload = e.target.files[0];

    const fileReader = new FileReader();

    fileReader.onload = async function (fileloadedevent) {
      setImage(fileloadedevent.target.result);
    };

    fileReader.readAsDataURL(filetoload);

    console.log(e.target.files);
    setFile(filetoload);
  };

  const submitAvatar = async () => {
    try {
      if (!file) return;

      console.log(file);

      const formData = new FormData();
      formData.append("avatar", file);

      fetch("http://localhost:4000/user/update-avatar", {
        method: "POST",
        headers: {
          auth: `ut ${cookies.get("ut")}`,
        },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => console.log(data));
    } catch (error) {
      console.log("lol");
    }
  };

  return (
    <div className="w-full min-h-[600px] border rounded-lg shadow-sm p-5">
      <h2 className="text-xl font-bold text-blue-800 mt-3 text-center">
        Edit User
      </h2>
      <div className="flex flex-wrap justify-evenly mt-10">
        <label className="lg:w-[60%] w-full items-center mb-5 mx-[10px]">
          <img
            className="md:w-[200px] md:h-[200px] w-36 h-36 mx-auto rounded-full mb-4"
            src={image}
            alt="User Profile"
            // onError={(e) => (e.target.src = require("../img/man.png"))}
          />
          <input onChange={(e) => handlePictureLoad(e)} id="file" type="file" />
          <div className="text-center">
            <label htmlFor="file" className="cursor-pointer text-blue-600">
              Change profile photo
            </label>
            {/* <button onClick={() => submitAvatar()}>sumbit</button> */}
          </div>
        </label>
        <label className="lg:w-[60%] w-full items-center mb-5 mx-[10px]">
          <span className="mr-2 mb-2 inline-block">Name</span>
          <input
            value={userEdit.name}
            onChange={(e) => setUserEdit({ ...userEdit, name: e.target.value })}
            className="bg-gray-100 rounded w-full h-8 p-2"
            type="text"
          />
        </label>
        <label className="lg:w-[60%] w-full items-center mb-5 mx-[10px]">
          <span className="mr-2 mb-2 inline-block">Bio</span>
          <textarea
            value={userEdit.bio}
            onChange={(e) => setUserEdit({ ...userEdit, bio: e.target.value })}
            className="bg-gray-100 rounded w-full p-2 resize-none"
            maxLength={200}
            name=""
            id=""
            cols="30"
            rows="4"
          ></textarea>
        </label>
      </div>
      <div className="text-center">
        <button
          onClick={() => editUser()}
          className="px-3 py-2 text-white bg-blue-500 rounded mt-5 mx-5 hover:bg-blue-700 transition-all"
        >
          Sumbit changes
        </button>
      </div>
    </div>
  );
};

export default UserEdit;
