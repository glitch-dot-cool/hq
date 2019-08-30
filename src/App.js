import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// eslint-disable-next-line
import styles from "./styles/global.css";

import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Error from "./components/Error";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route component={Error}></Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
