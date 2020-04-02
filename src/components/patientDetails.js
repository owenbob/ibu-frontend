import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PatientDetail from "./patientDetail";
import { ToastContainer } from "react-toastify";
import Pagination from "./pagination";
import Navbar from "./navbar";
import SideNavbar from "./side_navbar";
import instance from "../config";

class PatientDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      patientname: "",
      patientid: "",
      treatments: [],
      term: "",
      page: 1,
      response: {}
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.searchingFor = this.searchingFor.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
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
          patientname: response.data.patient.first_name,
          patientid: response.data.patient.id
        });
      })
      .catch(err => {});
  }

  nextPage() {
    this.getPatientDetails(this.state.response.next);
  }

  prevPage() {
    this.getPatientDetails(this.state.response.prev);
  }

  render() {
    if (!this.state.authenticated) {
      return <Redirect to="/" />;
    }

    if (!this.state.items) {
      return <div>loading</div>;
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
          <SideNavbar />
          <div>
          <br />
          <Link className="btn grey" to="/patients">
            Back
          </Link>
          <h1>{this.state.patientname}</h1>
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
          <ul className="collection">{patientDetails}</ul>
          <Pagination
            page={this.state.response.current}
            pages={this.state.response.pages}
            onNext={this.nextPage}
            onPrev={this.prevPage}
          />
          <Link
            to={`/patient/items/add/${this.state.listid}`}
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
