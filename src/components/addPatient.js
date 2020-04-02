import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./navbar";
import instance from "../config";

class AddPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      first_name: "",
      second_name: "",
      third_name: "",
      gender: "",
      date_of_birth: "",
      kp_hotspot_site: "",
      phone_number: ""
    };
  }
  //Updates state with user input
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    instance
      .post("/patients", {
        first_name: this.state.first_name,
        second_name: this.state.second_name,
        third_name: this.state.third_name,
        gender: this.state.gender,
        date_of_birth: this.state.date_of_birth,
        kp_hotspot_site: this.state.kp_hotspot_site,
        phone_number: this.state.phone_number
      })
      .then(response => {
        this.props.history.push("/patients");
        toast.success(response.data.status);
      })
      .catch(err => {
        toast.error(err.response.data.status);
      });
  };

  render() {
    const { first_name, second_name, third_name, gender, date_of_birth, kp_hotspot_site, phone_number, authenticated } = this.state;
    //Blocks unauthorized access
    if (!authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Navbar />
        <div className="container">
          <br />
          <Link className="btn grey" to="/patients">
            Back
          </Link>
          <h1>Add Patient</h1>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />
          <form onSubmit={e => this.onSubmit(e)}>
            <div className="input-field">
              <input
                type="text"
                id="first_name"
                name="first_name"
                ref="first_name"
                onChange={e => this.onChange(e)}
                value={first_name}
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="second_name"
                name="second_name"
                ref="second_name"
                onChange={e => this.onChange(e)}
                value={second_name}
              />
              <label htmlFor="second_name">Second Name</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="third_name"
                name="third_name"
                ref="third_name"
                onChange={e => this.onChange(e)}
                value={third_name}
              />
              <label htmlFor="third_name">Third Name</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="gender"
                name="gender"
                ref="gender"
                onChange={e => this.onChange(e)}
                value={gender}
              />
              <label htmlFor="gender">Gender</label>
            </div>
            <div className="input-field">
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                ref="date_of_birth"
                onChange={e => this.onChange(e)}
                value={date_of_birth}
              />
              <label id="date_label" htmlFor="date_of_birth">Date Of Birth</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="kp_hotspot_site"
                name="kp_hotspot_site"
                ref="kp_hotspot_site"
                onChange={e => this.onChange(e)}
                value={kp_hotspot_site}
              />
              <label htmlFor="kp_hotspot_site">KP Hotspot Site</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                ref="phone_number"
                onChange={e => this.onChange(e)}
                value={phone_number}
              />
              <label htmlFor="phone_number">Phone Number</label>
              <p>
  <label>
    <input type="checkbox" disabled="disabled" />
    <span>Brown</span>
  </label>
</p>
            </div>
            <input type="submit" value="Save" className="btn" />
          </form>
        </div>
      </div>
    );
  }
}

export default AddPatient;
