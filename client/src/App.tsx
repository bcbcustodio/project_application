import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeView from "./views/homeView/HomeView";
import LoginView from "./views/loginView/LoginView";
import CreateTaskView from "./views/createTaskView/createTaskView";
import ProfileView from "./views/profileView/profileView";
import { SignUpForm } from "./components/signUpForm/SignUpForm";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/addTask" element={<CreateTaskView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </>
  );
}
