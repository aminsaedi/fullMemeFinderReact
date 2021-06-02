import React from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./login.css";

const Login = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required("نام کاربری را وارد کنید"),
    password: Yup.string().required("رمز عبور را وارد کنید"),
  });
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: (values) => alert(JSON.stringify(values)),
    validationSchema,
  });
  return (
    <div className="login">
      <Helmet>
        <title>ورود به میم فایندر</title>
      </Helmet>
      <div className="login__fromContainer">
        <h1 className="login__lable">ورود به میم فایندر</h1>
        <form className="login__form" onSubmit={formik.handleSubmit}>
          <label className="login__form__lable" htmlFor="username">
            نام کاربری
          </label>
          <input
            className="login__form__input"
            id="username"
            type="username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="login__form__error">{formik.errors.username}</div>
          ) : null}
          <label className="login__form__lable" htmlFor="password">
            کلمه عبور
          </label>
          <input
            className="login__form__input"
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="login__form__error">{formik.errors.password}</div>
          ) : null}
          <button
            disabled={Object.keys(formik.errors).length}
            type="submit"
            className="login__form__submitButton"
          >
            ورود
          </button>
        </form>
      </div>
      <p className="login__subText">
        کلمه عبور خود را فراموش کرده اید؟<i> اینجا کلیلک کنید</i>
      </p>
    </div>
  );
};

export default Login;
