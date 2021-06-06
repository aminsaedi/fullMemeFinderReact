import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "./safeView.css";
import { getWelcomeMessage } from "../../api/main";

const SafeView = (props) => {

  return (
    <div className="SafeView">
      <div className="safeView__topBar">
      </div>
      <div className="safeView__body">{props.children}</div>
    </div>
  );
};

export default SafeView;
