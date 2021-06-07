import React from "react";

import './contact.css'
import SafeView from "../../components/SafeView/SafeView";

const Contact = (props) => {
  return (
    <SafeView>
      <div className="contact">
        <h1>ارتباط با من</h1>
        <p>
          تو صفحه گزارش مشکل برام پیام بزار فقط یادت باشه حتما تو عنوان گزارش
          بنویسی "ارتباط با ادمین" تا خیلی زود تر پیامتو ببینم
        </p>
      </div>
    </SafeView>
  );
};

export default Contact;
