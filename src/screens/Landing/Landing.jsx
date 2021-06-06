import React, { useState, useEffect, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

import AuthContext from "../../auth/context";
import AppButton from "../../components/AppButton/AppButton";
import "./landing.css";
import Card from "../../components/Card/Card";
import { getAllMemes } from "../../api/memes";
// import { getWelcomeMessage } from "../../api/main";
import likeMemeHelper from "../../utilities/likeMeme";
import telegramMemeHelper from '../../utilities/telegramMeme'

const Landing = (props) => {
  const { user } = useContext(AuthContext);
  const [memes, setMemes] = useState([]);
  const getMemes = async () => {
    const result = await getAllMemes(10);
    if (!result.status) return toast.error("خطا در ارتباط با سرور");
    else if (result.status && result.status !== 200)
      return toast.error(result.data.message);
    else if (result.status === 200) return setMemes(result.data);
  };
  // const getServerMessage = async () => {
  //   const result = await getWelcomeMessage();
  //   if (result.status !== 200) return toast.error("خطا در ارتباط با سرور");
  //   else if (result.status === 200)
  //     return toast.info(result.data.message, { position: "bottom-center" });
  // };
  
  useEffect(() => {
    getMemes();
    // getServerMessage();
  }, []);
  
  return (
    <div className="landing">
      <Helmet>
        <title>میم فایندر</title>
      </Helmet>
      <h1 className="landing__mainText">به میم فایند خوش اومدی</h1>
      <AppButton
        style={{
          width: "75%",
          marginTop: "1rem",
          cursor:  "pointer",
        }}
        placeholder="جستجو میم"
        onClik={() => props.history.push("/search")}
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
              meme={meme}
              subTitle={meme.keywords.map((key) => key.title).join(" ")}
              image={meme.file}
              onClick={() => props.history.push("/detail/" + meme._id)}
              onLike={async () => {
                await likeMemeHelper(user, meme, meme.likes);
                await getMemes();
              }}
              likes={meme.likes}
              onTelegram={() => telegramMemeHelper(user,meme._id)}
            />
          ))}
        </Slider>
      )}
      <div className="landing__background"></div>
    </div>
  );
};

export default Landing;
