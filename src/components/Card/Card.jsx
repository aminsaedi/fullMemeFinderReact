import React, { useState } from "react";
import { FaTelegram, FaInfo, FaFileDownload } from "react-icons/fa";
import { toast } from "react-toastify";

import "./card.css";

const Card = ({ image, subTitle, onDownload, onTelegram }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="card">
      <img aria-label="meme" src={image} className="card__image" />
      <div className="card__actions">
        <FaFileDownload onClick={onDownload} />
        <FaTelegram onClick={() => toast.success("میم ارسال شد")} />
        <FaInfo onClick={() => setShowDetails(!showDetails)} />
      </div>

      <div className={showDetails ? "card__detail card__detail--show" : "card__detail card__detail--hide"}>
        <p>کیورد های میم</p>
      </div>
    </div>
  );
};

export default Card;
