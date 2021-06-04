import React from "react";
import Icon from "@material-ui/core/Icon";

import "./iconHolder.css";

const IconHolder = ({
  onClick,
  iconName = "person",
  image,
  className,
  style,
}) => {
  return (
    <div
      className={["iconHolder", className].join(" ")}
      onClick={onClick}
      style={style}
    >
      {!image && <Icon fontSize="large">{iconName}</Icon>}
      {image && <img className="iconHolder__image" src={image} alt="user" />}
    </div>
  );
};

export default IconHolder;
