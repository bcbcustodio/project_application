import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useState } from "react";
import Axios from "axios";
import { SERVER_BASEURL } from "../config/config";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submit = async (e: any) => {
    e.preventDefault();

    const loginAPI = `${SERVER_BASEURL}/login`;
    await Axios.post(
      loginAPI,
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    )
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        alert("Invalid username or password.");
        console.log(err);
      });
  };

  return (
    <div className="wrapper">
      <form onSubmit={submit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            id="user-password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/login">Forgot Password?</Link>
        </div>

        <button type="submit">Login</button>

        <div className="register-link">
          <p>
            Don't have an account? <Link to="/signUp">Register here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
