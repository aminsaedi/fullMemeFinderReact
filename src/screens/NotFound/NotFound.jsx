import React from "react";

import "./notFound.css";
import SafeView from "../../components/SafeView/SafeView";

const Notfound = () => {
  return (
    <SafeView>
      <div className="notFound">
        <h1>صفحه ای که دنبالشی رو پیدا نکردم</h1>
      </div>
    </SafeView>
  );
};

export default Notfound;
