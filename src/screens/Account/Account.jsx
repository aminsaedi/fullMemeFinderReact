import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import * as Yup from "yup";

import ReactiveButton from "reactive-button";

import "./account.css";
import AuthContext from "../../auth/context";
import { removeToken, storeToken } from "../../auth/storage";
import { resetTelegram } from "../../api/users";
import SafeView from "../../components/SafeView/SafeView";

const Account = (props) => {
  const { user } = useContext(AuthContext);
  const [changeAvatarButtonState, setChangeAvatarButtonState] =
    useState("idle");
  const [sudoModeModal, setSudoModeModal] = useState(false);

  const handleChangeAvatar = () => {
    setChangeAvatarButtonState("loading");
    setTimeout(() => setChangeAvatarButtonState("success"), 2000);
  };

  const handleResetTelegramAccount = async (values) => {
    const result = await resetTelegram(values.password);
    console.log(result);
    if (!result.status) return toast.error("پاسخی از سرور دریافت نشد");
    else if (result.status === 200) {
      storeToken(result.data);
      window.location = "/account";
    } else if (result.status === 400) {
      toast.error(result.data.message);
    } else toast.error("خطای ناشناخته");
  };
  const handleLogout = () => {
    removeToken();
    window.location = "/";
  };
  const validationSchema = Yup.object({
    password: Yup.string().required("رمز عبور را وارد کنید"),
  });
  const formik = useFormik({
    initialValues: { password: "" },
    onSubmit: handleResetTelegramAccount,
    validationSchema,
  });

  if (!user) return null;
  return (
    <SafeView>
      <div className="account">
        <Helmet>
          <title>{user.username}</title>
        </Helmet>
        <Modal
          isOpen={sudoModeModal}
          ariaHideApp
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          onRequestClose={() => setSudoModeModal(false)}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            },
            content: {
              position: "absolute",
              top: "20%",
              left: "10%",
              right: "10%",
              bottom: "35%",
              border: "0.1rem solid #ccc",
              boxShadow: "0 0 10px rgb(96 108 236 / 70%)",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "0.5rem",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <div className="account__sudoMode">
            <h3 className="account__sudoMode__topTitle">
              شما در حال ریست کردن تنظیمات اکانت تلگرام خود می باشید
            </h3>
            <h2 className="account__sudoMode__title">
              لطفا رمز اکانت خود را وارد کنید
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="password"
                name="password"
                id="password"
                className="account__sudoMode__input"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.user && formik.errors.user ? (
                <div className="login__form__error">{formik.errors.user}</div>
              ) : null}
              <button
                disabled={Object.keys(formik.errors).length}
                type="submit"
                className="account__sudoMode__button"
              >
                ریست تنظیمات تلگرام
              </button>
            </form>
          </div>
        </Modal>
        <div className="account__mainUserInfo">
          <div className="account__mainUserInfo__image">
            <img className="account__avatar" src={user.image} alt="user" />
            <div className="account__changeAvatarButtonContainer">
              <ReactiveButton
                buttonState={changeAvatarButtonState}
                idleText="تغیر پروفایل"
                style={{ fontFamily: "Vazir", fontSize: "2rem" }}
                loadingText="منتظر بمانید"
                successText="با موفقتیت انجام شد"
                errorText="خطایی رخ داد"
                animation
                messageDuration={2000}
                rounded
                onClick={handleChangeAvatar}
              />
            </div>
          </div>
          <div className="account__mainUserInfo__username">
            {user.username}
            <br />
            {user.email}
          </div>
          <div className="account__telegramInfo">
            <h2 className="account__telegramInfo__title">
              وضعیت اکانت تلگرام من
            </h2>
            <span
              className={
                user.telegramId
                  ? "account__telegramInfo__status--conected"
                  : "account__telegramInfo__status--disconnected"
              }
            >
              {user.telegramId ? "متصل" : "وصل نشده"}
            </span>
            <p style={{ textAlign: "center" }}>آموزش اتصال به ربات تلگرام</p>
            <p style={{ textAlign: "center",maxWidth : "90%" }}>
              ابتدا{" "}
              <a
                href="https://t.me/fullMemeFinderBot"
                target="_blank"
                rel="noreferrer"
              >
                بات تلگرام میم فایند
              </a>{" "}
              را استارت کنید بعدش متن داخل کادر زیر رو براش بفرستو توی سایت ی
              بار خروج از اکانت رو بزن و دوباره وارد شو بوووم وصل شد
            </p>
            <textarea
              className="account__telegramInfo__helper"
              name="telegramHelper"
              id="telegramHelper"
              cols="10"
              rows="10"
              readOnly
            >
              {`connect/${user.email}/${user._id}`}
            </textarea>
          </div>
          <div className="account__dangerZone">
            <button
              className="account__dangerZone__button"
              onClick={handleLogout}
            >
              خروج از اکانت
            </button>
            <button
              className="account__dangerZone__button"
              onClick={() => setSudoModeModal(true)}
            >
              ریست اتصال تلگرام
            </button>
          </div>
        </div>
      </div>
    </SafeView>
  );
};

export default Account;
