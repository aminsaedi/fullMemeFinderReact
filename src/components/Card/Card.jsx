import React, { useState, useContext } from "react";
import {
  FaTelegram,
  FaInfo,
  FaHeart,
  FaRegHeart,
  FaFileDownload,
} from "react-icons/fa";

import AuthContext from "../../auth/context";
import "./card.css";

const Card = ({ meme, onClick, onLike, likes,onTelegram }) => {
  const { user } = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="card">
      <img
        aria-label="meme"
        style={{ cursor: "pointer" }}
        onClick={onClick}
        src={meme.file}
        className="card__image"
      />
      <div className="card__actions">
        <FaFileDownload
          style={{ cursor: "pointer", color: "gold" }}
          onClick={() => {
            window.open(meme.file);
          }}
        />
        <FaTelegram
          style={{ cursor: "pointer", color: "#2AA5E0" }}
          onClick={onTelegram}
        />
       
        {user && likes.includes(user._id) ? (
          <FaHeart
            style={{ cursor: "pointer", color: "red" }}
            onClick={onLike}
          />
        ) : (
          <FaRegHeart
            style={{ cursor: "pointer", color: "red" }}
            onClick={onLike}
          />
        )}

        <FaInfo
          style={{ cursor: "pointer", color: "yellowgreen" }}
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
        <p>{meme.keywords.map((key) => key.title).join(" ")}</p>
      </div>
    </div>
  );
};

export default Card;
