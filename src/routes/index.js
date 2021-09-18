import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Components
import Home from "../components/home";
import NormalRange from "../components/exercise1";
import FixedValuesRange from "../components/exercise2";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/exercise1" component={NormalRange} />
      <Route path="/exercise2" component={FixedValuesRange} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
