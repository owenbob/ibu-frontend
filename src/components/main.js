import React from "react";
import { Route, Switch } from "react-router-dom";
import Patients from "./patients";
import PatientDetails from "./patientDetails";
import Login from "./login.js";
import Register from "./register.js";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/patients" component={Patients} />
      <Route exact path="/patients/:id" component={PatientDetails} />
      <Route exact path="/register" component={Register} />
      <Route path="/" component={Login} />
    </Switch>
  </main>
);

export default Main;
