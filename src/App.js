import { ADMIN_PATH, ROOT_PATH } from "constants/route";
import Admin from "feature/Admin/Admin";
import Client from "feature/Client/Client";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "./assets/styles/styles.scss";

function App() {
  return (
    <Switch>
      <Route path={ADMIN_PATH}>
        <Admin />
      </Route>
      <Route path={ROOT_PATH}>
        <Client />
      </Route>
    </Switch>
  );
}

export default App;
