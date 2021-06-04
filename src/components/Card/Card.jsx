import React, { useState } from "react";
import { FaTelegram, FaInfo, FaHeart, FaFileDownload } from "react-icons/fa";
import { toast } from "react-toastify";

import "./card.css";

const Card = ({ image, subTitle, onTelegram, onClick }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="card">
      <img
        aria-label="meme"
        style={{ cursor: "pointer" }}
        onClick={onClick}
        src={image}
        className="card__image"
      />
      <div className="card__actions">
        <FaFileDownload
          style={{ cursor: "pointer",color : "gold" }}
          onClick={() => {
            window.open(image)
          }}
        />
        <FaTelegram
          style={{ cursor: "pointer",color : "#2AA5E0" }}
          onClick={() => toast.success("میم ارسال شد")}
        />
        <FaHeart
          style={{ cursor: "pointer",color : "red" }}
          onClick={() => toast.error("لینک میم کپی شد")}
        />
        <FaInfo
          style={{ cursor: "pointer",color : "yellowgreen" }}
          onClick={() => setShowDetails(!showDetails)}
        />
      </div>

      <div
        className={
          showDetails
            ? "card__detail card__detail--show"
            : "card__detail card__detail--hide"
        }
      >
        <p>{subTitle || "کیورد های میم"}</p>
      </div>
    </div>
  );
};

export default Card;
