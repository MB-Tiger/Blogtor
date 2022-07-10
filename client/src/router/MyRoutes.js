import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import DashboardLayout from "../pages/DashboardLayout";
import SubmitBlog from "../pages/SubmitBlog";
import UsersList from "../pages/UsersList";
import UserEdit from "../pages/UserEdit";
import BlogEdit from "../pages/BlogEdit";
import DashboardBlog from "../pages/DashboardBlog";
import UserInfo from "../pages/UserInfo";
import Blogs from "../pages/Blogs";
import ErrorPage from "../pages/ErrorPage";

const MyRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:_id" element={<Blog />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userinfo/:id" element={<UserInfo />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="submitblog" element={<SubmitBlog />} />
        <Route path="useredit" element={<UserEdit />} />
        <Route path="dashboardblog" element={<DashboardBlog />} />
        <Route path="blogedit/:id" element={<BlogEdit />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default MyRoutes;
