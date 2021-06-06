import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "./safeView.css";
import { getWelcomeMessage } from "../../api/main";

const SafeView = (props) => {
  const [message, setMessage] = useState("میم فایندر");
  const getServerMessage = async () => {
    const result = await getWelcomeMessage();
    if (result.status !== 200) return toast.error("خطا در ارتباط با سرور");
    else if (result.status === 200) return setMessage(result.data.message);
  };
  useEffect(() => getServerMessage(), []);
  return (
    <div className="SafeView">
      <div className="safeView__topBar">
        <p>{message}</p>
      </div>
      <div className="safeView__body">{props.children}</div>
    </div>
  );
};

export default SafeView;
