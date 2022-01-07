import { SIGN_IN_PATH } from "constants/route";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkRole } from "util/isLoggined";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest}>
      {checkRole() === "admin" ? children : <Redirect to={SIGN_IN_PATH} />}
    </Route>
  );
}

export default PrivateRoute;
