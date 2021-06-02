import React from "react";
import { Route, Switch } from "react-router-dom";
import Add from "./screens/Add/Add";

import Landing from "./screens/Landing/Landing";
import Login from "./screens/Login/Login";

const App = () => {
  return (
    <Switch>
      <Route path="/add" component={Add} />
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Landing} />
    </Switch>
  );
};

export default App;
