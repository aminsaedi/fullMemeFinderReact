import React from "react";
import { Helmet } from "react-helmet";
import { FaTelegram, FaShare, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";

import "./detail.css";

const Detail = () => {
  return (
    <div className="detail">
      <Helmet>
        <title>مشخصات میم</title>
      </Helmet>
      <div className="detail__imageContainer">
        <img
          src="https://images.unsplash.com/photo-1573614999645-e5f0f16ec15d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="meme"
          className="detail__backgroundImage"
        />
        <img
          src="https://images.unsplash.com/photo-1573614999645-e5f0f16ec15d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="meme"
          className="detail__mainImage"
        />
      </div>
      <div className="detail__textContainer">
        <h1 className="detail__memeTitle">میم شماره یک</h1>
        <p className="detail__memeTags">کلید واژه های میم : </p>
        <div className="detail__tagsContainer">
          <span className="detail__tag">گربه</span>
          <span className="detail__tag">ی دونه کلید واژه خیلی دراز</span>
          <span className="detail__tag">ی دونه ر دراه</span>
          <span className="detail__tag">بغل</span>
          <span className="detail__tag">گریه</span>
          <span className="detail__tag">سمیه</span>
          <span className="detail__tag">گربه</span>
          <span className="detail__tag">عباس بواذار</span>
          <span className="detail__tag">بغل</span>
          <span className="detail__tag">گریه</span>
          <span className="detail__tag">سمیه</span>
        </div>
        <div className="detail__actionsContainer" >
            <div className="detail__action" onClick={() => toast.success("میم ارسال شد")} >
                <FaTelegram />
                <p>ارسال به اکانت تلگرام</p>
            </div>
            <div className="detail__action" >
                <FaDownload />
                <p>دانلود میم</p>
            </div>
            <div className="detail__action" onClick={() => toast.info("لینک میم کپی شد")} >
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
