import React from "react";
import { Route, Redirect } from "react-router-dom";
import LocalStorageService from "../services/LocalStorageService";

export const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const userToken = LocalStorageService.getItem("accessToken");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userToken) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};
