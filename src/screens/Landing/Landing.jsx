import React, { useState, useEffect, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

import AuthContext from "../../auth/context";
import AppButton from "../../components/AppButton/AppButton";
import Select from "react-select";
import IconHolder from "../../components/IconHolder/IconHolder";
import "./landing.css";
import Card from "../../components/Card/Card";
import { getAllMemes } from "../../api/memes";
import { getWelcomeMessage } from "../../api/main";
import { getKeywords } from "../../api/keywords";

const Landing = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const [memes, setMemes] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const getMemes = async () => {
    const result = await getAllMemes(5);
    if (result.status !== 200)
      return toast.error(result.data.message || "خطا در ارتباط با سرور");
    else if (result.status === 200) return setMemes(result.data);
  };
  const getServerMessage = async () => {
    const result = await getWelcomeMessage();
    if (result.status !== 200) return toast.error("خطا در ارتباط با سرور");
    else if (result.status === 200)
      return toast.info(result.data.message, { position: "bottom-center" });
  };
  const getAllKeywords = async () => {
    const result = await getKeywords();
    if (result.status !== 200) {
      if (result.data) return toast.error(result.data.message);
      else return toast.error("خطا در دیافت کیورد ها از سرور");
    }
    if (result.status === 200) return setKeywords(result.data);
  };
  const filterKeywords = (keys) => {
    let newKeys = [];
    newKeys = keys.map((key) => ({ value: key._id, label: key.title }));
    return newKeys;
  };
  useEffect(() => {
    getMemes();
    getServerMessage();
    getAllKeywords();
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
          iconName={user ? "people" : "person"}
          onClick={() => props.history.push("/login")}
        />
      </div>
      <h1 className="landing__mainText">به میم فایند خوش اومدی</h1>
      <Select
        style={{ width: "100%" }}
        isRtl
        className="add__selectKeyWord"
        onChange={(selected) => setSelectedKeyword(selected)}
        options={filterKeywords(keywords)}
        noOptionsMessage={() => "چیزی نجستم! بزور بگردم؟"}
        // isLoading
        isClearable
        placeholder="دنبال میم میگردی؟"
      ></Select>
      <AppButton
        style={{
          width: "75%",
          marginTop: "1rem",
          cursor: selectedKeyword ? "pointer" : "not-allowed",
        }}
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
