import React from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";

import "./report.css";
import SafeView from "../../components/SafeView/SafeView";

const Report = (props) => {
  const formik = useFormik({
    initialValues: { title: "", body: "" },
  });
  return (
    <SafeView>
      <div className="report">
        <Helmet>
          <title>گزارش مشکل</title>
        </Helmet>

        <h1 className="report__title">گزارش مشکل در میم فایندر</h1>
        <h2 className="report__subTitle">ارسال گزارش از طریق سایت</h2>
        <p className="report__text">
          برای ارسال مستقیم گزارش به پشتیبانی میتونی فرم زیر رو پر کنی
        </p>
        <form className="report__form" onSubmit={formik.handleSubmit}>
          <label className="report__form__lable" htmlFor="title">
            عنوان گزارش(اختیاری)
          </label>
          <input
            className="report__form__input"
            type="text"
            name="title"
            id="title"
            placeholder="عنوان گزارش"
          />
          <label className="report__form__lable" htmlFor="body">
            متن گزارش
          </label>
          <textarea
            className="report__form__textArea"
            name="body"
            id="body"
            cols="30"
            rows="10"
          ></textarea>
          <button type="submit" className="report__form__button">
            ارسال گزارش
          </button>
        </form>
        <h2 className="report__subTitle">ارسال گزارش از طریق بات تلگرام</h2>
        <p className="report__text">
          میتونی هم توی تلگرام برای پشتیبانی گزارش مشکل بفرستی. فقط کافیه توی
          منو بات گزارش مشکل رو انتخاب کنی و بعدش متن گزارشو بفرسی
        </p>
      </div>
    </SafeView>
  );
};

export default Report;
