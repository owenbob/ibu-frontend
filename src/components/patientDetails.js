import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PatientDetail from "./patientDetail";
import { ToastContainer } from "react-toastify";
import Navbar from "./navbar";
import SideNavbar from "./side_navbar";
import instance from "../config";

class PatientDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      patient: "",
      patientid: "",
      treatments: [],
      term: "",
      page: 1,
      response: {}
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.searchingFor = this.searchingFor.bind(this);
  }

  componentWillMount() {
    this.getPatientName();
    this.getPatientDetails(this.state.page);
  }

  searchingFor(term) {
    return function(x) {
      return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    };
  }

  searchHandler(e) {
    this.setState({ term: e.target.value });
  }

  getPatientDetails(page) {
    let patientId = this.props.match.params.id;
    instance
      .get(`/patients/${patientId}/treatments`)
      .then(response => {
        console.log(response.data);
        this.setState({
          items: response.data.treatments,
          response: response.data,
          page: response.data.current
        });
      })
      .catch(err => {});
  }

  getPatientName(page) {
    let patientId = this.props.match.params.id;
    instance
      .get(`/patients/${patientId}`)
      .then(response => {
        console.log(response.data)
        this.setState({
          patient: response.data.patient,
          patientid: response.data.patient.id
        });
      })
      .catch(err => {});
  }

  render() {
    if (!this.state.authenticated) {
      return <Redirect to="/" />;
    }

    if (!this.state.items) {
    return(
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
      );
    }
    const patientDetails = this.state.items
      .map((patientDetail, i) => {
        return (
          <PatientDetail
            patientid={this.state.patientid}
            key={patientDetail.id}
            patientDetail={patientDetail}
          />
        );
      });
    return (
      <div>
        <Navbar />
        <div className="container">
          <div>
          <br />
          <Link className="btn grey" to="/patients">
            Back
          </Link>
          <p>Name: {this.state.patient.first_name} {this.state.patient.second_name} {this.state.patient.third_name}</p>
          <p>Gender: {this.state.patient.gender}</p>
          <p>Address: {this.state.patient.address}</p>
          <p>Phone Number: {this.state.patient.phone_number}</p>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />
          <table className="striped">
            <thead>
              <tr>
                  <th>Id</th>
                  <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {patientDetails}
            </tbody>
          </table>
          <Link
            to={`/patient/treatment/add/${this.state.patientid}`}
            className="btn-large btn-floating red"
          >
            <i className="fa fa-plus" />
          </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientDetails;
