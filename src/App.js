import LoginForm from "components/LoginForm/LoginForm";
import { ADMIN_PATH, ROOT_PATH, SIGN_IN_PATH } from "constants/route";
import Admin from "feature/Admin/Admin";
import Client from "feature/Client/Client";
import { Switch } from "react-router-dom";
import PrivateRoute from "routing/PrivateRoute";
import PublicRoute from "routing/PublicRoute";
import "./App.css";
import "./assets/styles/styles.scss";
import { ToastContainer, toast } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Switch>
        <PublicRoute restricted={true} path={SIGN_IN_PATH}>
          <LoginForm />
        </PublicRoute>
        <PublicRoute path={ADMIN_PATH}>
          <Admin />
        </PublicRoute>
        <PublicRoute restricted={false} path={ROOT_PATH}>
          <Client />
        </PublicRoute>
      </Switch>
    </>
  );
}

export default App;
