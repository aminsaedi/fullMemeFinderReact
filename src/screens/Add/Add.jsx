import React from "react";
import { Helmet } from "react-helmet";
import CreatableSelect from "react-select/creatable";
import Dropzone from "react-dropzone";

import "./add.css";
import IconHolder from "../../components/IconHolder/IconHolder";


const Add = (props) => {
  const handleChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  const createPlaceHolder = (strd) => "افزودنه کیورده " + strd;
  return (
    <div className="add">
      <Helmet>
        <title>افزودن میم</title>
      </Helmet>
      <IconHolder onClick={() => props.history.push('/')} iconName="home" className="register__homeButton" />
      <div className="add__fromContainer">
        <h1 className="add__formTitle">افزودن میم</h1>
        <CreatableSelect
          placeholder="کیورد های میم"
          formatCreateLabel={createPlaceHolder}
          className="add__selectKeyWord"
          isMulti
          isRtl
          onChange={handleChange}
          noOptionsMessage={() => "تموم کیورد هارو انتخاب کردی"}
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
        />
        <Dropzone
          maxFiles={1}
          maxSize={5000000}
          multiple={false}
          accept="image/*"
          onDrop={(acceptedFiles) => console.log(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                  فایل میمی که میخوایی اپلود کنی رو انتخاب کن یا درگش کن اینجا
                  ولش بده
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        <button type="submit" className="add__form__submitButton">
          افزودن میم
        </button>
      </div>
    </div>
  );
};

export default Add;
