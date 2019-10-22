import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// redux stuff
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { getB2Auth } from "./actions/files";
import setAuthToken from "./utils/setAuthToken";

// eslint-disable-next-line
import styles from "./styles/global.css";
import routes from "./routes";

import Layout from "./components/Layout/Layout";
import Browser from "./components/Layout/Browser";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import Alert from "./components/Alert";
import PrivateRoute from "./components/PrivateRoute";
import Files from "./components/Files";

// check token on each app load
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getB2Auth());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Alert />
        <Layout>
          <Switch>
            <Route exact path={routes.login.path} component={Login} />
            <PrivateRoute path={routes.dashboard.path} component={Dashboard} />
            <PrivateRoute path={routes.files.path} component={Files} />
            <PrivateRoute path={routes.trello.path} component={Browser} />
            <PrivateRoute path={routes.github.path} component={Browser} />
            <Route component={Error} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
