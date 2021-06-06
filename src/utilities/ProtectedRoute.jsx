import React from "react";
import { Redirect, Route } from "react-router-dom";

import { getToken } from "../auth/storage";

const ProtectedRoute = ({ Component, path, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!getToken())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
