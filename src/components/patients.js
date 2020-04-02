import React, { Component } from "react";
import Patient from "./patient";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./navbar";
import SideNavbar from "./side_navbar";
import instance from "../config";

class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      patients: [],
      term: "",
      response: {},
      page: 1
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.searchingFor = this.searchingFor.bind(this);
  }

  componentWillMount() {
    this.getPatients(this.state.page);
  }

  searchingFor(term) {
    return function(x) {
      return x.first_name.toLowerCase().includes(term.toLowerCase()) || !term;
    };
  }

  searchHandler(e) {
    this.setState({ term: e.target.value });
  }

  getPatients(page) {
    instance
      .get(`/patients`)
      .then(response => {
        console.log(response.data);
        this.setState({
          patients: response.data.patients,
          response: response.data,
          page: response.data.current
        });
      })
      .catch(err => {});
  }

  render() {
    const { patients, authenticated, term } = this.state;
    //Restrict unauthorized access
    if (!authenticated) {
      return <Redirect to="/" />;
    }

    //Notify user items are being loaded
    if (!patients) {
      return(
          <div className="loadwrap">
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
          </div>
        );
    }
    //Iterate through the patient object obtained from the API
    const patient = patients
      .filter(this.searchingFor(term))
      .map((patient, i) => {
        return (
          <Patient key={patient.id} patient={patient} />
        );
      });
    return (
      <div>
        <header><Navbar /></header>
        <SideNavbar />
        <div className="container">
          <h4>Patients</h4>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />
          <form>
            <input
              id="search"
              type="text"
              placeholder="search"
              onChange={this.searchHandler}
            />
          </form>
          <table className="striped">
            <thead>
              <tr>
                  <th>KP Code</th>
                  <th>Patient Name</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Treatment</th>
              </tr>
            </thead>
            <tbody>
              {patient}
            </tbody>
          </table>
          <div className="fixed-action-btn">
            <Link to="/patient/add" className="btn-large btn-floating red">
              <i className="fa fa-plus" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Patients;
