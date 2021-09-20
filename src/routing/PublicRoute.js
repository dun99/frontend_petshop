import { ADMIN_PATH, ROOT_PATH } from "constants/route";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ children, restricted, ...rest }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const user = useSelector((state) => state.users.user);
  return (
    <Route {...rest}>
      {currentUser && user.role === "admin" && restricted ? (
        <Redirect to={ADMIN_PATH} />
      ) : (
        children
      )}
    </Route>
  );
};

export default PublicRoute;
