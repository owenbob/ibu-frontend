import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./login.js";
import Register from "./register.js";
// import Logout from "./logout.js";
// import ResetPassword from "./reset-password.js";

const Main = () => (
  <main>
    <Switch>
      {/* <Route exact path="/logout" component={Logout} /> */}
      <Route exact path="/register" component={Register} />
      {/* <Route exact path="/reset-password" component={ResetPassword} /> */}
      <Route path="/" component={Login} />
    </Switch>
  </main>
);

export default Main;
