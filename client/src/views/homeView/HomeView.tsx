import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import CustomTable from "../../components/table/Table";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const navigate = useNavigate();

  const accessPrivilege = () => {
    const accessToken = Cookie.get("token");

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
      <CustomTable />
    </>
  );
};

export default HomeView;
