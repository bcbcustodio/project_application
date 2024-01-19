import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ProfileForm } from "../../components/profile/Profile";
const ProfileView = () => {
  const navigate = useNavigate();

  const accessPrivilege = () => {
    const accessToken = Cookies.get("token");

    if (!accessToken) {
      navigate("/login");
    }
  };

  useEffect(() => {
    accessPrivilege();
  }, []);

  const userId = Cookies.get("userId")!;
  return (
    <>
      <Navbar />
      <ProfileForm userId={userId} />
    </>
  );
};

export default ProfileView;
