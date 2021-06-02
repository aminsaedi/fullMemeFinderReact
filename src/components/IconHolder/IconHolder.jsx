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
      <Icon fontSize="large">{iconName}</Icon>
    </div>
  );
};

export default IconHolder;
