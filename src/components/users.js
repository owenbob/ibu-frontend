import React, { Component } from "react";
import User from "./user";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./navbar";
import SideNavbar from "./side_navbar";
import instance from "../config";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      users: [],
      term: "",
      response: {},
      page: 1
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.searchingFor = this.searchingFor.bind(this);
  }

  componentWillMount() {
    this.getUsers(this.state.page);
  }

  searchingFor(term) {
    return function(x) {
      return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    };
  }

  searchHandler(e) {
    this.setState({ term: e.target.value });
  }

  getUsers(page) {
    instance
      .get(`/users`)
      .then(response => {
        console.log(response.data);
        this.setState({
          users: response.data.users,
          response: response.data,
          page: response.data.current
        });
      })
      .catch(err => {});
  }

  render() {
    const { users, authenticated, term } = this.state;
    //Restrict unauthorized access
    if (!authenticated) {
      return <Redirect to="/" />;
    }

    //Notify user items are being loaded
    if (!users) {
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

    const user = users
      .filter(this.searchingFor(term))
      .map((user, i) => {
        return (
          <User key={user.id} user={user} />
        );
      });
    return (
      <div>
        <header><Navbar /></header>
        <SideNavbar />
        <div className="container">
          <h4>Users</h4>
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
                  <th>Id</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>email</th>
              </tr>
            </thead>
            <tbody>
              {user}
            </tbody>
          </table>
          <div className="fixed-action-btn">
            <Link to="/user/add" className="btn-large btn-floating red">
              <i className="fa fa-plus" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
