import React, { useEffect } from "react";
import { CustomCreateTodoForm } from "../../components/createTodoForm/CreateTodoForm";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CreateTaskView = () => {
  const navigate = useNavigate();

  const accessPrivilege = () => {
    const accessToken = Cookies.get("token");

    if (!accessToken) {
      navigate("/login");
    }
  };

  useEffect(() => {
    accessPrivilege();
  });
  return (
    <>
      <Navbar />
      <CustomCreateTodoForm />
    </>
  );
};

export default CreateTaskView;
