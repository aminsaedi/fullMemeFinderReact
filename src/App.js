import React from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "./screens/Landing/Landing";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
    </Switch>
  );
};

export default App;
