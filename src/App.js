import React, { useState, useEffect } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import { usePromiseTracker } from "react-promise-tracker";
import { stack as Menu } from "react-burger-menu";
import { Spin as Hamburger } from "hamburger-react";
import { toast } from "react-toastify";

import AuthContext from "./auth/context";
import { getUser } from "./auth/storage";
import { getWelcomeMessage } from "./api/main";
import Add from "./screens/Add/Add";
import Detail from "./screens/Detail/Detail";
import Landing from "./screens/Landing/Landing";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import Search from "./screens/Search/Search";
import Account from "./screens/Account/Account";
import ProtectedRoute from "./utilities/ProtectedRoute";
import Report from "./screens/Report/Report";
import Notfound from "./screens/NotFound/NotFound";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const App = () => {
  const [user, setUser] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { promiseInProgress } = usePromiseTracker();
  const restoreUser = () => {
    const restoredUser = getUser();
    return restoredUser ? setUser(restoredUser) : null;
  };
  useEffect(() => {
    restoreUser();
    getServerMessage();
  }, []);

  const [message, setMessage] = useState("میم فایندر");
  const getServerMessage = async () => {
    const result = await getWelcomeMessage();
    if (result.status !== 200) return toast.error("خطا در ارتباط با سرور");
    else if (result.status === 200) return setMessage(result.data.message);
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="appTopBar">
        <div className="appTopBar__menuIcon">
          <Hamburger
            label="Show menu"
            size={48}
            direction="right"
            duration={0.8}
            rounded
            toggled={isMenuOpen}
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
        <div className="appTopBar__textContainer">
          <p className="appTopBar__text">{message}</p>
        </div>
      </div>
      <Menu
        isOpen={isMenuOpen}
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        onClose={() => setIsMenuOpen(false)}
        right
        customBurgerIcon={false}
        customCrossIcon={
          <Hamburger
          
            label="Show menu"
            size={48}
            direction="left"
            duration={1.8}
            rounded
            toggled={isMenuOpen}
            color="white"
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
          />
        }
      >
        <NavLink className="menu__item" to="/">
          میم فایندر
        </NavLink>
        <NavLink className="menu__item" to={user ? "/account" : "/login"}>
          {user ? user.username : "ورود به اکانت"}
        </NavLink>
        <NavLink className="menu__item" to="/search">
          جستجو میم
        </NavLink>
        <NavLink className="menu__item" to="/add">
          افزودن میم
        </NavLink>
        <NavLink className="menu__item" to="/report">
          گزارش مشکل
        </NavLink>
        <NavLink className="menu__item" to="/contact">
          تماس با من
        </NavLink>
      </Menu>

      <Switch>
        <Route path="/search" component={Search} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/add" component={Add} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/report" component={Report} />
        <ProtectedRoute path="/account" Component={Account} />
        <Route path="/" exact component={Landing} />
        <Route path="*" component={Notfound} />
      </Switch>

      {promiseInProgress && (
        <div className="loaderContainer">
          <HashLoader
            color={"#3498DB"}
            loading={true}
            css={override}
            size={150}
          />
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default App;
