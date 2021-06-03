import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

import AppButton from "../../components/AppButton/AppButton";
import Select from "react-select";
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
        {[220, 221, 222, 223, 225].map((id) => (
          <Card
            key={id}
            subTitle="meme 1"
            image={`https://picsum.photos/id/${id}/300`}
            onClick={ () => props.history.push('/detail')}
          />
        ))}
      </Slider>
      <div className="landing__background"></div>
    </div>
  );
};

export default Landing;
