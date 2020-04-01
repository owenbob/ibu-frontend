import React, { Component } from "react";
import Patient from "./patient";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Pagination from "./pagination";
import Navbar from "./navbar";
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
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
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
    document.getElementById("pagination").style.display = "none";
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

  nextPage() {
    this.getPatients(this.state.response.next);
  }

  prevPage() {
    this.getPatients(this.state.response.prev);
  }

  render() {
    const { patients, authenticated, term } = this.state;
    //Restrict unauthorized access
    if (!authenticated) {
      return <Redirect to="/" />;
    }

    //Notify user items are being loaded
    if (!patients) {
      return <div>Loading...</div>;
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
        <Navbar />
        <div className="container">
          <h1>Patients</h1>
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
          <ul className="collection">{patient}</ul>
          <Pagination
            page={this.state.response.current}
            pages={this.state.response.pages}
            onNext={this.nextPage}
            onPrev={this.prevPage}
          />
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
