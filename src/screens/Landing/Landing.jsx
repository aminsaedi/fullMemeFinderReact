import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

import AppButton from "../../components/AppButton/AppButton";
import Select from "react-select";
import IconHolder from "../../components/IconHolder/IconHolder";
import "./landing.css";
import Card from "../../components/Card/Card";
import { getAllMemes } from "../../api/memes";
import { getWelcomeMessage } from "../../api/main";

const Landing = (props) => {
  const [memes, setMemes] = useState([]);
  const getMemes = async () => {
    const result = await getAllMemes(5);
    if (result.status !== 200)
      return toast.error(result.data.message || "خطا در ارتباط با سرور");
    else if (result.status === 200) return setMemes(result.data);
  };
  const getServerMessage = async () => {
    const result = await getWelcomeMessage();
    if (result.status !== 200) return toast.error("خطا در ارتباط با سرور");
    else if (result.status === 200) return toast.info(result.data.message,{position : "bottom-center"});
  };
  useEffect(() => {
    getMemes();
    getServerMessage();
  }, []);
  return (
    <div className="landing">
      <Helmet>
        <title>میم فایندر</title>
      </Helmet>
      <div className="landing__topActions">
        <IconHolder
          iconName="add"
          style={{ marginRight: "1rem" }}
          onClick={() => props.history.push("/add")}
        />
        <IconHolder
          iconName="person"
          onClick={() => props.history.push("/login")}
        />
      </div>
      <h1 className="landing__mainText">به میم فایند خوش اومدی</h1>
      <Select
        style={{ width: "100%" }}
        isRtl
        className="add__selectKeyWord"
        options={[
          { value: "sogand", label: "سوگند" },
          { value: "zahkmi", label: "زخمی" },
          { value: "leito", label: "لیتو" },
          { value: "justina", label: "جاستینا" },
          { value: "hayedeh", label: "هایده" },
          { value: "mahasti", label: "مهستی" },
          { value: "erfan", label: "عرفان" },
          { value: "gdaal", label: "جیدال" },
        ]}
        noOptionsMessage={() => "چیزی نجستم! بزور بگردم؟"}
        // isLoading
        isClearable
        placeholder="دنبال میم میگردی؟"
      ></Select>
      <AppButton
        style={{ width: "75%", marginTop: "1rem" }}
        placeholder="جستجو"
      />
      {memes && (
        <Slider
          fade
          focusOnSelect
          dots
          infinite
          speed={500}
          autoplay
          style={{
            width: "100%",
            marginTop: "4rem",
          }}
          slidesToShow={1}
          slidesToScroll={1}
          centerMode={true}
        >
          {memes.map((meme) => (
            <Card
              key={meme._id}
              subTitle={meme.keywords.map((key) => key.title).join(" ")}
              image={meme.file}
              onClick={() => props.history.push("/detail")}
            />
          ))}
        </Slider>
      )}
      <div className="landing__background"></div>
    </div>
  );
};

export default Landing;
