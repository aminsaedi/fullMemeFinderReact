import React from "react";
import { Route, Switch } from "react-router-dom";
import Add from "./screens/Add/Add";
import Detail from "./screens/Detail/Detail";

import Landing from "./screens/Landing/Landing";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";

const App = () => {
  return (
    <Switch>
      <Route path="/detail" component={Detail} />
      <Route path="/add" component={Add} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Landing} />
    </Switch>
  );
};

export default App;
