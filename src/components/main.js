import React from "react";
import { Route, Switch } from "react-router-dom";
import Patients from "./patients";
import Drugs from "./drugs";
import Users from "./users";
import PatientDetails from "./patientDetails";
import AddPatient from "./addPatient";
import AddDrug from "./addDrug";
import AddUser from "./addUser";
import AddPatientTreatment from "./addPatientTreatment";
import Login from "./login";
import Register from "./register";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/patients" component={Patients} />
      <Route exact path="/patients/:id" component={PatientDetails} />
      <Route exact path="/drugs" component={Drugs} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/patient/add" component={AddPatient} />
      <Route exact path="/drug/add" component={AddDrug} />
      <Route exact path="/user/add" component={AddUser} />
      <Route
        exact
        path="/patient/treatment/add/:id"
        component={AddPatientTreatment}
      />
      <Route exact path="/register" component={Register} />
      <Route path="/" component={Login} />
    </Switch>
  </main>
);

export default Main;
