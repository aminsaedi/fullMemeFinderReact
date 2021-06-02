import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer,Slide } from "react-toastify";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastStyle={{fontFamily : "Vazir"}}
      transition={Slide}
    />
  </BrowserRouter>,
  document.getElementById("root")
);
