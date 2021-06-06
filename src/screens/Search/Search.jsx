import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import ReactiveButton from "reactive-button";
import { toast } from "react-toastify";

import AuthContext from "../../auth/context";
import likeMemeHelper from "../../utilities/likeMeme";
import telegramHelper from "../../utilities/telegramMeme";
import Card from "../../components/Card/Card";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import { getKeywords } from "../../api/keywords";
import "./search.css";
import Paginaitor from "../../components/Paginaitor/Paginaitor";
import { searchMemes } from "../../api/memes";

const Search = (props) => {
  const { user } = useContext(AuthContext);
  const [state, setState] = useState("idle");
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [memes, setMemes] = useState([]);
  const [onlyByRegisteredUsers, setOnlyByRegisteredUsers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [sortBy, setSortBy] = useState("-createDate");
  const [totalItems, setTotalItems] = useState(0);

  const sortValues = [
    { value: "-createDate", label: "جدید ترین" },
    { value: "createDate", label: "قدیمی ترین" },
    { value: "-likesCount", label: "بیشترن لایک" },
    { value: "likesCount", label: "کمترین لایک" },
  ];

  const getAllKeywords = async () => {
    const result = await getKeywords();
    if (result.status !== 200) {
      if (result.data) return toast.error(result.data.message);
      else return toast.error("خطا در دیافت کیورد ها از سرور");
    }
    if (result.status === 200) return setKeywords(result.data);
  };

  const getFilteredMemes = async () => {
    setState("loading");
    const result = await searchMemes(
      currentPage,
      16,
      selectedKeywords,
      onlyByRegisteredUsers,
      sortBy
    );
    if (result.status && result.status === 200) {
      setMemes(result.data.docs);
      setTotalItems(result.data.totalDocs);
      setTotalPages(result.data.totalPages);
      setHasPrevPage(result.data.hasPrevPage);
      setHasNextPage(result.data.hasNextPage);
      setState("success");
    } else if (result.status && result.data && result.status !== 200) {
      toast.error(result.data.message ? result.data.message : "خطایی رخ داد");
      setState("error");
    } else {
      toast.error("خطای ناشناخته. با پشتیبانی تماس بگیرید");
      setState("error");
    }
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
    getFilteredMemes();
  };

  const handleKeywordsSelector = (newValues, actionMeta) => {
    const newModel = newValues.map((value) => value.value);
    setSelectedKeywords(newModel);
  };

  const handleSortSelector = (newValue) => {
    setSortBy(newValue.value);
    // getFilteredMemes();
  };

  useEffect(() => {
    getAllKeywords();
    getFilteredMemes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getFilteredMemes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);


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
            onChange={handleSortSelector}
          />
        </div>
        {/* <div className="search__action">
          <p className="search__action__title">فقط توسط کاربران</p>
          <ButtonGroup
            items={[
              { id: true, title: "فعال", active: true },
              { id: false, title: "غیر فعال", active: false },
            ]}
            activeItem={onlyByRegisteredUsers}
            onChange={handleChangeByUserFilter}
          />
        </div> */}
        <div className="search__action">
          <p className="search__action__title">دسته بندی</p>
          <Select
            className="search__optionsSelector"
            options={filterKeywords(keywords)}
            isMulti
            placeholder="دسته بندی"
            isRtl
            onChange={handleKeywordsSelector}
            noOptionsMessage={() => "هیج دسته بندی ای پیدا نشد"}
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
            messageDuration={2000}
            style={{ fontFamily: "Vazir", fontSize: "1.8rem" }}
          />
        </div>
      </div>
      <div className="search__results">
        {memes &&
          memes.map((meme) => (
            <Card
              key={meme._id}
              meme={meme}
              likes={meme.likes}
              onClick={() => props.history.push("/detail/" + meme._id)}
              onLike={async () => {
                await likeMemeHelper(user, meme, meme.likes);
                await getFilteredMemes();
              }}
              onTelegram={() => telegramHelper(user, meme._id)}
            />
          ))}
      </div>
      <div className="search__paginationContainer">
        <Paginaitor
          onChange={(action) =>
            action === "nextPage"
              ? setCurrentPage(currentPage + 1)
              : setCurrentPage(currentPage - 1)
          }
          totalItems={totalItems}
          currentPage={currentPage}
          itemPerPage={16}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Search;
