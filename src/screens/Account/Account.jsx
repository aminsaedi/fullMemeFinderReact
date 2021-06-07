import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import Dropzone from "react-dropzone";

import ReactiveButton from "reactive-button";

import "./account.css";
import AuthContext from "../../auth/context";
import { removeToken, storeToken } from "../../auth/storage";
import { resetTelegram, updateAvatar, getAvatar } from "../../api/users";
import SafeView from "../../components/SafeView/SafeView";

const Account = (props) => {
  const { user } = useContext(AuthContext);
  const [changeAvatarButtonState, setChangeAvatarButtonState] =
    useState("idle");
  const [sudoModeModal, setSudoModeModal] = useState(false);
  const [changeAvatarModal, setChangeAvatarModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [filePreview, setFilePreview] = useState("");
  const [userAvatar, setUserAvatar] = useState();

  const handleChangeAvatar = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    const result = await updateAvatar(formData);
    if (!result.status) return toast.error("خطا در تغیر آواتار");
    else if (result.status === 200) {
      setChangeAvatarButtonState("success");
      await getUserAvata();
      setChangeAvatarModal(false);
      return toast.info(result.data.message);
    } else if (result.status && result.data) {
      setChangeAvatarButtonState("error");
      return toast.error(
        result.data.message || `خطا در تغیر آواتار ${result.status.toString()}`
      );
    } else {
      setChangeAvatarButtonState("error");
      return toast.error("خطای ناشناخته در تغیر آواتار");
    }
  };
  const getUserAvata = async () => {
    const result = await getAvatar();
    if (result.status === 200) return setUserAvatar(result.data);
    else {
      console.log(result);
      return toast.error("خطا در دریافت آواتار");
    }
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
  useEffect(() => {
    getUserAvata();
  }, []);
  const thumbs = (
    <div
      style={{
        display: "inline-flex",
        borderRadius: 2,
        border: "1px solid #eaeaea",
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: "border-box",
        cursor: "pointer",
      }}
      onClick={() => {
        setSelectedImage(null);
        setFilePreview("");
      }}
    >
      <div
        style={{
          display: "flex",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <img
          src={filePreview}
          style={{
            display: "block",
            width: "auto",
            height: "100%",
          }}
          alt=""
        />
      </div>
    </div>
  );
  const modalStyle = {
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
  };
  if (!user) return null;
  return (
    <SafeView>
      <div className="account">
        <Helmet>
          <title>{user.username}</title>
        </Helmet>
        <Modal
          isOpen={changeAvatarModal}
          ariaHideApp
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          onRequestClose={() => setChangeAvatarModal(false)}
          style={modalStyle}
        >
          <div className="account__avatarModal">
            <Dropzone
              maxFiles={1}
              maxSize={3000000}
              multiple={false}
              accept="image/*"
              onDrop={(acceptedFiles) => {
                toast.info("میم انتخاب شد");
                setSelectedImage(acceptedFiles[0]);
                setFilePreview(URL.createObjectURL(acceptedFiles[0]));
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section style={{ cursor: "pointer" }}>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="account__avatarModal__title">
                      آواتار جدیدت رو انتخاب کن یا اینجا درگش کن
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            {selectedImage && thumbs}
            <button
              className="account__avatarModal__button"
              onClick={handleChangeAvatar}
            >
              تغیر آواتار
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={sudoModeModal}
          ariaHideApp
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          onRequestClose={() => setSudoModeModal(false)}
          style={modalStyle}
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
            <img className="account__avatar" src={userAvatar} alt="user" />
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
                onClick={() => {
                  setChangeAvatarModal(true);
                  setChangeAvatarButtonState("loading");
                }}
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
            <p style={{ textAlign: "center", maxWidth: "90%" }}>
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
