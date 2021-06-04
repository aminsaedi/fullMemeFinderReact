import React from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { storeToken } from "../../auth/storage";
import "./login.css";
import IconHolder from "../../components/IconHolder/IconHolder";
import { loginUser } from "../../api/users";

const Login = (props) => {
  const validationSchema = Yup.object({
    user: Yup.string().required("نام کاربری را وارد کنید"),
    password: Yup.string().required("رمز عبور را وارد کنید"),
  });

  const handleLogin = async (values) => {
    const result = await loginUser(values);
    if (result.status === 200) {
      toast.info("ورود موفقیت آمیز بود");
      storeToken(result.data);
      window.location = "/";
    } else if (result.status !== 200) {
      toast.error("مشکل داریم");
      if (result.data) return toast.error(result.data.message);
      else if (!result.data) return toast.error("خطا در ورود کاربر");
    }
  };

  const formik = useFormik({
    initialValues: { user: "", password: "" },
    onSubmit: handleLogin,
    validationSchema,
  });
  return (
    <div className="login">
      <Helmet>
        <title>ورود به میم فایندر</title>
      </Helmet>
      <IconHolder
        onClick={() => props.history.push("/")}
        iconName="home"
        className="register__homeButton"
      />
      <div className="login__fromContainer">
        <h1 className="login__lable">ورود به میم فایندر</h1>
        <form className="login__form" onSubmit={formik.handleSubmit}>
          <label className="login__form__lable" htmlFor="user">
            ایمیل یا نام کاربری
          </label>
          <input
            className="login__form__input"
            id="user"
            type="user"
            {...formik.getFieldProps("user")}
          />
          {formik.touched.user && formik.errors.user ? (
            <div className="login__form__error">{formik.errors.user}</div>
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
        <Link
          to="/register"
          className="login__subText"
          style={{
            textDecoration: "none",
            marginTop: "0.5rem",
            color: "black",
          }}
        >
          اکانت نداری؟ خب یکی بساز
        </Link>
      </div>
      <p className="login__subText">
        کلمه عبور خود را فراموش کرده اید؟<i> اینجا کلیلک کنید</i>
      </p>
    </div>
  );
};

export default Login;
