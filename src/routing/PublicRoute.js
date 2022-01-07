import { ADMIN_PATH } from "constants/route";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ children, restricted, ...rest }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <Route {...rest}>
      {currentUser && currentUser.role === "admin" && restricted ? (
        <Redirect to={ADMIN_PATH} />
      ) : (
        children
      )}
    </Route>
  );
};

export default PublicRoute;
