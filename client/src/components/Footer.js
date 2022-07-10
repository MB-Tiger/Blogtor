import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-evenly bg-[#1d262d] w-full">
      <div className="text-[#869fb2] p-2">
        <div>
          <div className="mb-2">
            <h5 className=" font-bold text-gray-50 hover:text-gray-50 pb-0.5">
              Contact us
            </h5>
            <hr />
          </div>
          <div className="space-y-1">
            <p>27 Division St, New York NY 10002, USA</p>
            <p>Call Us 24/7 +8 (123) 456 789 12</p>
            <p>Mon-Fri: 8.00 - 20.00 St-Sun: 9.00 - 16.00</p>
          </div>
        </div>
      </div>
      <div className="text-[#869fb2] p-2">
        <div>
          <div className="mb-2">
            <h5 className=" font-bold text-gray-50 hover:text-gray-50 pb-0.5">
              Support
            </h5>
            <hr />
          </div>
          <div className="space-y-1">
            <a href="/" className="block">
              Privecy Policy
            </a>
            <a href="/" className="block">
              Cookie Policy
            </a>
            <a href="/" className="block">
              Purchasing Policy
            </a>
            <a href="/" className="block">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
      <div className="text-[#869fb2] p-2">
        <div>
          <div className=" mb-2">
            <h5 className=" font-bold text-gray-50 hover:text-gray-50 pb-0.5">
              Useful link
            </h5>
            <hr />
          </div>
          <ul className="space-y-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/myblogs">Blogs</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
