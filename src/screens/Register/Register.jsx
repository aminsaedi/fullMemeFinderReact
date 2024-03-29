import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./register.css";
import SafeView from "../../components/SafeView/SafeView";
import { registerUser } from "../../api/users";
import { storeToken } from "../../auth/storage";
import AuthContext from "../../auth/context";

const Register = (props) => {
  const { user } = useContext(AuthContext);
  const handleRegister = async (values) => {
    const result = await registerUser(values);
    if (!result.status) return toast.error("خطا در ثبت نام");
    if (result.status === 200) {
      toast.success("ثبت نام با موفقیت انجام شد");
      storeToken(result.data);
      return (window.location = "/");
    } else return toast.error(`خطا کد : ${result.status.toString()} رخ داد`);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("نام کاربری را وارد کنید"),
    email: Yup.string()
      .email("آدرس ایمیل معتبر وارد کنید")
      .required("آدرس ایمیل را وارد کنید"),
    password: Yup.string().required("رمز عبور را وارد کنید"),
  });
  const formik = useFormik({
    initialValues: { email: "", username: "", password: "" },
    onSubmit: handleRegister,
    validationSchema,
  });
  if (user) {
    toast.error("غیر مجاز")
    props.history.push("/");
  }
  return (
    <SafeView>
      <div className="register">
        <Helmet>
          <title>ثبت نام در میم فایندر</title>
        </Helmet>
        <div className="register__fromContainer">
          <h1 className="register__lable">ثبت نام در میم فایندر</h1>
          <form onSubmit={formik.handleSubmit} className="register__form">
            <label className="login__form__lable" htmlFor="password">
              آدرس ایمیل
            </label>
            <input
              className="login__form__input"
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="example@sample.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="login__form__error">{formik.errors.email}</div>
            ) : null}
            <label className="login__form__lable" htmlFor="username">
              نام کاربری
            </label>
            <input
              className="login__form__input"
              id="username"
              type="username"
              {...formik.getFieldProps("username")}
              placeholder="username"
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
              placeholder="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="login__form__error">{formik.errors.password}</div>
            ) : null}
            <button
              disabled={Object.keys(formik.errors).length}
              type="submit"
              className="login__form__submitButton"
            >
              ثبت نام
            </button>
          </form>
          <Link
            to="/login"
            className="login__subText"
            style={{
              textDecoration: "none",
              marginTop: "0.5rem",
              color: "black",
            }}
          >
            اکانت داری؟ خب برو توش
          </Link>
        </div>
      </div>
    </SafeView>
  );
};

export default Register;
