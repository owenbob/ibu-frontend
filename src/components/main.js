import React from "react";
import { Route, Switch } from "react-router-dom";
import ShoppingLists from "./patients";
import Login from "./login.js";
import Register from "./register.js";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/patients" component={ShoppingLists} />
      <Route exact path="/register" component={Register} />
      <Route path="/" component={Login} />
    </Switch>
  </main>
);

export default Main;
