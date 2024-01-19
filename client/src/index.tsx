import React, { Component } from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Axios from "axios";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
Axios.defaults.withCredentials = true;

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
