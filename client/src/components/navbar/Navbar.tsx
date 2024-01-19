import React from "react";
import "./NavbarStyle.css";
import { Badge, Link, ListItem } from "@material-ui/core";
import { Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SERVER_BASEURL } from "../config/config";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = async (e: any) => {
    e.preventDefault();

    const logoutAPI = `${SERVER_BASEURL}/logout`;
    await Axios.post(logoutAPI, { withCredentials: true })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={"header"}>
      <Link href="/" style={{ position: "fixed" }}>
        <h1>Project Application</h1>
      </Link>
      <p></p>
      <Stack direction="row" spacing={2}>
        <ListItem>
          <Link href="/">
            <Badge badgeContent={0} color="primary">
              <HomeIcon color="action" fontSize="large" />
            </Badge>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/addTask">
            <Badge badgeContent={0} color="primary">
              <AddBoxIcon color="action" fontSize="large" />
            </Badge>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/profile">
            <Badge badgeContent={0} color="primary">
              <AccountCircleIcon color="action" fontSize="large" />
            </Badge>
          </Link>
        </ListItem>
      </Stack>

      <Link
        href="/login"
        onClick={logout}
        style={{ position: "absolute", right: 0, paddingRight: "1.5rem" }}
      >
        <h2>Logout</h2>
      </Link>
      <p></p>
    </div>
  );
};

export default Navbar;
