import React from "react";
import { Helmet } from "react-helmet";

import "./add.css";

const Add = () => {
  return (
    <div className="add">
      <Helmet>
        <title>افزودن میم</title>
      </Helmet>
      <div className="add__fromContainer">
        <h1>افزودن میم</h1>
      </div>
    </div>
  );
};

export default Add;
