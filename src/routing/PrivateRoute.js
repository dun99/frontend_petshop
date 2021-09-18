import { SIGN_IN_PATH } from "constants/route";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const user = useSelector((state) => state.users.user);
  return (
    <Route {...rest}>
      {currentUser && user.role === "admin" ? (
        children
      ) : (
        <Redirect to={SIGN_IN_PATH} />
      )}
    </Route>
  );
}

export default PrivateRoute;
