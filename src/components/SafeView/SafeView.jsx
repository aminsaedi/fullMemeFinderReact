import React from "react";

import "./safeView.css";

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
