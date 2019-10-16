import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// redux stuff
import { Provider } from "react-redux";
import store from "./store";

// eslint-disable-next-line
import styles from "./styles/global.css";
import routes from "./routes";

import Layout from "./components/Layout";
import Browser from "./components/Browser";
import Home from "./components/Home";
import About from "./components/About";
import Error from "./components/Error";
import Alert from "./components/Alert";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Alert />
          <Switch>
            <Route exact path={routes.home.path} component={Home} />
            <Route path={routes.about.path} component={About}></Route>
            <Route
              path={routes.trello.path}
              render={() => <Browser title={"trello"}></Browser>}
            />
            <Route
              path={routes.github.path}
              render={() => <Browser title={"github"}></Browser>}
            />
            <Route component={Error} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
