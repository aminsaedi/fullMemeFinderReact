import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Helmet} from "react-helmet";

import AppButton from "../../components/AppButton/AppButton";
import AppInput from "../../components/AppInput/AppInput";
import IconHolder from "../../components/IconHolder/IconHolder";
import "./landing.css";
import Card from "../../components/Card/Card";

const Landing = (props) => {
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
      <AppInput
        style={{ width: "75%", marginTop: "1.5rem", textAlign: "center" }}
        placeholder="جستجو میم ..."
      />
      <AppButton
        style={{ width: "75%", marginTop: "1rem" }}
        placeholder="جستجو"
      />
      <Slider
        fade
        focusOnSelect
        dots
        infinite
        speed={500}
        autoplay
        style={{ width: "100%", marginTop: "4rem" }}
        slidesToShow={1}
        slidesToScroll={1}
        centerMode
      >
        <Card subTitle="meme 1" image="https://picsum.photos/350" />
        <Card subTitle="meme 2" image="https://picsum.photos/350" />
      </Slider>
      <div className="landing__background"></div>
    </div>
  );
};

export default Landing;
