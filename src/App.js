import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// redux stuff
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

// eslint-disable-next-line
import styles from "./styles/global.css";
import routes from "./routes";

import Layout from "./components/Layout";
import Browser from "./components/Browser";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import Alert from "./components/Alert";
import PrivateRoute from "./components/PrivateRoute";

// check token on each app load
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Alert />
          <Switch>
            <Route exact path={routes.login.path} component={Login} />
            <PrivateRoute path={routes.dashboard.path} component={Dashboard} />
            <PrivateRoute
              path={routes.trello.path}
              component={Browser}
            />
            <PrivateRoute
              path={routes.github.path}
              component={Browser}
            />
            <Route component={Error} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
