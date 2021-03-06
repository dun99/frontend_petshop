import LoginForm from "components/LoginForm/LoginForm";
import { ADMIN_PATH, ROOT_PATH, SIGN_IN_PATH } from "constants/route";
import Admin from "feature/Admin/Admin";
import Client from "feature/Client/Client";
import { Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "routing/PrivateRoute";
import PublicRoute from "routing/PublicRoute";
import "./App.css";
import "./assets/styles/styles.scss";

function App() {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Switch>
        <PublicRoute restricted={true} path={SIGN_IN_PATH}>
          <LoginForm />
        </PublicRoute>
        <PrivateRoute path={ADMIN_PATH}>
          <Admin />
        </PrivateRoute>
        <PublicRoute restricted={false} path={ROOT_PATH}>
          <Client />
        </PublicRoute>
      </Switch>
    </>
  );
}

export default App;
