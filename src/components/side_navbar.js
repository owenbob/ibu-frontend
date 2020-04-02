import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideNavbar extends Component {
  constructor() {
    super();
    this.state = {
      name: window.localStorage.getItem("name")
    };
  }
  render() {
    return (
      <aside id="left-sidebar-nav">
        <ul className="side_bar">
        <li>
          <Link to="/patients">
            <i className="fa fa-user-plus" aria-hidden="true" />
            <span>Patients</span>
          </Link>
        </li>
          <li>
            <Link to="/users">
              <i className="fa fa-users" aria-hidden="true" />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link to="/drugs">
              <i className="fa fa-ambulance" aria-hidden="true" />
              <span>Drugs</span>
            </Link>
          </li>
        </ul>
      </aside>
    );
  }
}

export default SideNavbar;
