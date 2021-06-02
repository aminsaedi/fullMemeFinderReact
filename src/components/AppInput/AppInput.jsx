import React from "react";

import './appInput.css'

const AppInput = ({ placeholder, value, onChange,style }) => {
  return <input placeholder={placeholder} value={value} onChange={onChange}  className="appInput" style={style} />;
};

export default AppInput;
