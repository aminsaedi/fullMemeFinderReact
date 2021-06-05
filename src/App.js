import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import { usePromiseTracker } from "react-promise-tracker";


import AuthContext from "./auth/context";
import { getUser } from "./auth/storage";
import Add from "./screens/Add/Add";
import Detail from "./screens/Detail/Detail";
import Landing from "./screens/Landing/Landing";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import Search from "./screens/Search/Search";



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
      <Switch>
        <Route path="/search" component={Search} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/add" component={Add} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Landing} />
      </Switch>
      {promiseInProgress && <div className="loaderContainer">
        <HashLoader  color={"#3498DB"} loading={true} css={override} size={150} />
      </div>}
    </AuthContext.Provider>
  );
};

export default App;
