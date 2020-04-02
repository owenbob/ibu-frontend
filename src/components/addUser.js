import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./navbar";
import instance from "../config";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      name: "",
      email: "",
      password: ""
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
      .post("/users", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        this.props.history.push("/users");
        toast.success(response.data.status);
      })
      .catch(err => {
        toast.error(err.response.data.status);
      });
  };

  render() {
    const { name, email, password, authenticated } = this.state;
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
          <h1>Add User</h1>
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
            <div className="input-field">
              <input
                type="email"
                id="email"
                name="email"
                ref="email"
                onChange={e => this.onChange(e)}
                value={email}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                id="password"
                name="password"
                ref="password"
                onChange={e => this.onChange(e)}
                value={password}
              />
              <label htmlFor="password">Password</label>
            </div>
            <input type="submit" value="Save" className="btn" />
          </form>
        </div>
      </div>
    );
  }
}

export default AddUser;
