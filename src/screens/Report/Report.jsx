import React from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import "./report.css";
import { postNewReport } from "../../api/reports";
import SafeView from "../../components/SafeView/SafeView";

const Report = (props) => {
  const handleSubmit = async (values) => {
    const result = await postNewReport(values);
    if (!result.status) return toast.error("خطای ناشناخته در ثبت گزارش");
    else if (result.status && result.status === 200) {
      toast.success("گزارش با موفقیت ثبت شد");
      return props.history.push("/");
    } else if (result.data && result.data.message) {
      console.log(result.data);
      return toast.error(result.data.message);
    }
  };
  const validationSchema = Yup.object({
    title: Yup.string(),
    body: Yup.string()
      .required("متن گزارش را وارد کنید")
      .max(500, "حداکثر طول پیام ۵۰۰ کاراکتر است"),
  });

  const formik = useFormik({
    initialValues: { title: "", body: "" },
    onSubmit: handleSubmit,
    validationSchema,
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
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="login__form__error">{formik.errors.title}</div>
          ) : null}
          <label className="report__form__lable" htmlFor="body">
            متن گزارش
          </label>
          <textarea
            className="report__form__textArea"
            name="body"
            id="body"
            cols="30"
            rows="10"
            {...formik.getFieldProps("body")}
          ></textarea>
          {formik.touched.body && formik.errors.body ? (
            <div className="login__form__error">{formik.errors.body}</div>
          ) : null}
          <button
            disabled={Object.keys(formik.errors).length}
            type="submit"
            className="report__form__button"
          >
            ارسال گزارش
          </button>
        </form>
        <h2 className="report__subTitle" style={{ marginTop: "5rem" }}>
          ارسال گزارش از طریق بات تلگرام
        </h2>
        <p className="report__text">
          میتونی هم توی تلگرام برای پشتیبانی گزارش مشکل بفرستی. فقط کافیه توی
          منو بات گزارش مشکل رو انتخاب کنی و بعدش متن گزارشو بفرسی
        </p>
      </div>
    </SafeView>
  );
};

export default Report;
