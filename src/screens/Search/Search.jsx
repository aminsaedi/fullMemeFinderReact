import React, { useState, useEffect } from "react";
import Select from "react-select";
import ReactiveButton from "reactive-button";
import { toast } from "react-toastify";

import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import { getKeywords } from "../../api/keywords";
import "./search.css";
import Paginaitor from "../../components/Paginaitor/Paginaitor";

const Search = (props) => {
  const [state, setState] = useState("idle");
  const [keywords, setKeywords] = useState([]);
  const [onlyByRegisteredUsers, setOnlyByRegisteredUsers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const sortValues = [
    { value: "newest", label: "جدید ترین" },
    { value: "oldest", label: "قدیمی ترین" },
    { value: "byLikes", label: "بیشترن لایک" },
    { value: "-byLikes", label: "کمترین لایک" },
  ];

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

  const handleChangeByUserFilter = (item) => {
    if (item.id === true) setOnlyByRegisteredUsers(true);
    else if (item.id === false) setOnlyByRegisteredUsers(false);
  };
  const onClickHandler = () => {
    setState("loading");
    setTimeout(() => {
      setState("error");
    }, 20000);
  };

  useEffect(() => getAllKeywords(), []);

  return (
    <div className="search">
      <h1 className="search__header">جستجو در میم فایندر</h1>
      <div className="search__actionsContainer">
        <div className="search__action">
          <p className="search__action__title">ترتیب نمایش</p>
          <Select
            className="search__optionsSelector"
            options={sortValues}
            defaultValue={sortValues[0]}
            isRtl
          />
        </div>
        <div className="search__action">
          <p className="search__action__title">فقط توسط کاربران</p>
          <ButtonGroup
            items={[
              { id: true, title: "فعال", active: true },
              { id: false, title: "غیر فعال", active: false },
            ]}
            activeItem={onlyByRegisteredUsers}
            onChange={handleChangeByUserFilter}
          />
        </div>
        <div className="search__action">
          <p className="search__action__title">دسته بندی</p>
          <Select
            className="search__optionsSelector"
            options={filterKeywords(keywords)}
            isMulti
            placeholder="دسته بندی"
            isRtl
          />
        </div>
        <div className="search__action search__action__button">
          {/* <p className="search__action__title">جستجو</p> */}
          <ReactiveButton
            buttonState={state}
            onClick={onClickHandler}
            idleText="جستجو"
            loadingText="در حال جستجو"
            successText="جستجو موفق"
            errorText="خطایی رخ داد"
            rounded
            animation
            block
            messageDuration={4000}
            style={{ fontFamily: "Vazir", fontSize: "1.8rem" }}
          />
        </div>
      </div>
      <div className="search__results"></div>
      <div className="search__paginationContainer">
        <Paginaitor
          onChange={(action) => action === "nextPage" ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage - 1)}
          totalItems={200}
          currentPage={currentPage}
          itemPerPage={16}
        />
      </div>
    </div>
  );
};

export default Search;
