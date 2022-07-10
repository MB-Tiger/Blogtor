import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { TiTickOutline } from "react-icons/ti";

const UID = () => `${new Date().getTime()}${String(Math.random()).slice(3, 9)}`;

const Toast = ({ alert: { type, msg, _id, icon }, removeMe }) => {
  const obj = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-400",
    info: "bg-blue-400",
  };

  const msgIcon = {
    success: <TiTickOutline />,
    error: <BiErrorCircle />,
  };

  // console.log(obj)

  if (!obj[type]) return null;
  if (!msgIcon[icon]) return null;

  return (
    <div
      className={`${obj[type]} text-white p-4 rounded-lg mr-8 mt-8 w-[250px] toast relative flex items-center`}
    >
      <AiOutlineClose
        className="absolute top-1 right-1 cursor-pointer"
        onClick={() => removeMe(_id)}
      />
      <div className="text-white text-2xl mr-2">{msgIcon[icon]}</div>
      {msg}
    </div>
  );
};

export const ToastContext = React.createContext();

const ContextProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const removeMe = (_id) => {
    const arr = [...alerts];

    const p = arr.findIndex((item) => item._id == _id);

    if (p == -1) console.log("gotchya");

    arr.splice(p, 1);

    setAlerts(arr);
  };

  const pushAlert = (obj) => {
    const _id = UID();
    const arr = [...alerts, { ...obj, _id }];
    // arr.push();
    setAlerts(arr);

    setTimeout(() => {
      setAlerts([]);
    }, 3000);
  };

  console.log(alerts);

  return (
    <ToastContext.Provider value={{ alerts, setAlerts, pushAlert }}>
      <div className="fixed right-0 top-0 flex flex-col items-center justify-start z-[1001]">
        {alerts.map((alert, i) => {
          return <Toast key={i} alert={alert} removeMe={removeMe} />;
        })}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export default ContextProvider;
