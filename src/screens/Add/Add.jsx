import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import CreatableSelect from "react-select/creatable";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";

import { postNewMeme } from "../../api/memes";
import { getKeywords, addNewKeyword } from "../../api/keywords";
import "./add.css";
import IconHolder from "../../components/IconHolder/IconHolder";

const Add = (props) => {
  const handleChange = async (newValue, actionMeta, removedValue) => {
    if (actionMeta.action === "create-option") {
      setLoading(true);
      const result = await addNewKeyword(newValue[newValue.length - 1].value);
      if (result.status === 200) {
        getAllKeywords();
        const newSelectedKeyword = newValue.find(key => key.__isNew__);
        const newSelectedOptions = newValue.filter(item => item !== newSelectedKeyword);
        console.log(result.data)
        newSelectedOptions.push({value : result.data._id,label : result.data.title});
        setSelectedKeywords(newSelectedOptions)
        toast.success("کیورد اضافه شد");
      } else if (result.status === 401) {
        setLoading(false);
        return toast.error("ابتدا وارد اکانت خود شوید");
      } else if (result.status !== 200) {
        setLoading(false);
        return toast.error("خطا در افزودن کیورد");
      }
      setLoading(false);
    } else if (actionMeta.action === "select-option") {
      setSelectedKeywords(newValue);
    } else if (actionMeta.action === "clear") {
      setSelectedKeywords([]);
    } else if (actionMeta.action === "remove-value") {
      setSelectedKeywords(newValue);
      // console.log(removedValue)
    }
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    // setSelectedKeywords(newValue);
  };
  const createPlaceHolder = (strd) => "افزودنه کیورده " + strd;

  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const getAllKeywords = async () => {
    const result = await getKeywords();
    if (result.status !== 200) {
      if (result.data) return toast.error(result.data.message);
      else return toast.error("خطا در دیافت کیورد ها از سرور");
    }
    if (result.status === 200) return setKeywords(result.data);
  };
  useEffect(() => {
    getAllKeywords();
  }, []);
  useEffect(() => {
    getAllKeywords();
  }, [selectedKeywords]);
  const filterKeywords = (keys) => {
    let newKeys = [];
    newKeys = keys.map((key) => ({ value: key._id, label: key.title }));
    return newKeys;
  };
  const handleAddMeme = async () => {
    const formData = new FormData();
    selectedKeywords.forEach((keyword) =>
      formData.append("keywords", keyword.value)
    );
    formData.append("image", selectedImage);
    const result = await postNewMeme(formData);
    if (result.status === 200) toast("میم با موفقیت افزوده شد");
    else if (result.status !== 200) alert(result.data.error)
  };
  return (
    <div className="add">
      <Helmet>
        <title>افزودن میم</title>
      </Helmet>
      <IconHolder
        onClick={() => props.history.push("/")}
        iconName="home"
        className="register__homeButton"
      />
      <div className="add__fromContainer">
        <h1 className="add__formTitle">افزودن میم</h1>
        <CreatableSelect
          value={selectedKeywords}
          placeholder="کیورد های میم"
          formatCreateLabel={createPlaceHolder}
          className="add__selectKeyWord"
          isMulti
          isRtl
          onChange={handleChange}
          noOptionsMessage={() => "تموم کیورد هارو انتخاب کردی"}
          options={filterKeywords(keywords)}
          isLoading={loading}
          allowCreateWhileLoading={false}
        />
        <Dropzone
          maxFiles={1}
          maxSize={5000000}
          multiple={false}
          accept="image/*"
          onDrop={(acceptedFiles) => {
            toast.info("میم انتخاب شد");
            setSelectedImage(acceptedFiles[0]);
            console.log(URL.createObjectURL(acceptedFiles[0]));
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section style={{ cursor: "pointer" }}>
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
        <button
          type="button"
          className="add__form__submitButton"
          disabled={selectedKeywords.length <= 0}
          style={{
            cursor: selectedKeywords.length <= 0 ? "not-allowed" : "pointer",
          }}
          onClick={handleAddMeme}
        >
          افزودن میم
        </button>
      </div>
    </div>
  );
};

export default Add;
