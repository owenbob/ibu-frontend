import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./navbar";
import instance from "../config";

class AddDrug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      name: ""
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
      .post("/drugs", {
        name: this.state.name
      })
      .then(response => {
        this.props.history.push("/drugs");
        toast.success(response.data.status);
      })
      .catch(err => {
        toast.error(err.response.data.status);
      });
  };

  render() {
    const { name, authenticated } = this.state;
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
          <h1>Add Drug</h1>
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
                id="name"
                name="name"
                ref="name"
                onChange={e => this.onChange(e)}
                value={name}
              />
              <label htmlFor="name">Name</label>
            </div>
            <input type="submit" value="Save" className="btn" />
          </form>
        </div>
      </div>
    );
  }
}

export default AddDrug;
