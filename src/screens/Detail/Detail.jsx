import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { FaTelegram, FaShare, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import "./detail.css";
import AuthContext from "../../auth/context";
import { getMemeById } from "../../api/memes";
import memeTelgramSender from "../../utilities/telegramMeme";

const Detail = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [meme, setMeme] = useState();
  const getMeme = async () => {
    const result = await getMemeById(id);
    if (result.status && result.status === 200) setMeme(result.data);
  };
  useEffect(() => {
    getMeme();
  }, [id]);
  if (!meme) return null;
  return (
    <div className="detail">
      <Helmet>
        <title>مشخصات میم</title>
      </Helmet>
      <div className="detail__imageContainer">
        <img src={meme.file} alt="meme" className="detail__backgroundImage" />
        <img src={meme.file} alt="meme" className="detail__mainImage" />
      </div>
      <div className="detail__textContainer">
        <h1 className="detail__memeTitle">{meme.likes.length}</h1>
        <p className="detail__memeTags">کلید واژه های میم : </p>
        <div className="detail__tagsContainer">
          {meme.keywords.map((key) => (
            <span className="detail__tag">{key.title}</span>
          ))}
        </div>
        <div className="detail__actionsContainer">
          <div
            className="detail__action"
            onClick={() => memeTelgramSender(user, meme._id)}
          >
            <FaTelegram />
            <p>ارسال به اکانت تلگرام</p>
          </div>
          <div className="detail__action">
            <FaDownload />
            <p>دانلود میم</p>
          </div>
          <div
            className="detail__action"
            onClick={() => toast.info("لینک میم کپی شد")}
          >
            <FaShare />
            <p>اشتراک گذاری</p>
          </div>
        </div>
        <p className="detail__subText">
          اضافه شده توسط کاربر : امین در تاریخ : ۱۴۰۰/۰۳/۰۵
        </p>
      </div>
    </div>
  );
};

export default Detail;
