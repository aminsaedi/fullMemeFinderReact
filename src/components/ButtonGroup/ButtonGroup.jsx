import React from "react";

import "./buttonGroup.css";

const ButtonGroup = ({ items, onChange, activeItem }) => {
  return (
    <div className="buttonGroup">
      <div className="buttonGroup__container">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onChange(item)}
            className={
              item.id === activeItem
                ? "buttonGroup__item buttonGroup__item--active"
                : "buttonGroup__item"
            }
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
