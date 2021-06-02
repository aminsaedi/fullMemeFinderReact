import React from "react";

import './appButton.css'

const AppButton = ({ type = "button", onClik, placeholder, style }) => {
  return (
    <button type={type} onClick={onClik} style={style} className="appButton" >
      {placeholder}
    </button>
  );
};

export default AppButton;
