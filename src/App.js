import React, { useState, useEffect } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import { usePromiseTracker } from "react-promise-tracker";
import { elastic as Menu } from "react-burger-menu";

import AuthContext from "./auth/context";
import { getUser } from "./auth/storage";
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
  const { promiseInProgress } = usePromiseTracker();
  const restoreUser = () => {
    const restoredUser = getUser();
    return restoredUser ? setUser(restoredUser) : null;
  };
  useEffect(() => {
    restoreUser();
    
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div id="outer-container">
        <Menu
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
          right
        >
          <NavLink className="menu__item" to="/">
            میم فایندر
          </NavLink>
          <NavLink className="menu__item" to={user ? '/account' : '/login'}>
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
        <main id="page-wrap">
          <Switch>
            <Route path="/search" component={Search} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/add" component={Add} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path='/report' component={Report} />
            <ProtectedRoute path="/account" Component={Account} />
            <Route path="/" exact component={Landing} />
            <Route path="*" component={Notfound} />
          </Switch>
        </main>
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
      </div>
    </AuthContext.Provider>
  );
};

export default App;
