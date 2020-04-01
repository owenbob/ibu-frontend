import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../config";

class Patient extends Component {
  constructor(props) {
    super(props);
    let { patient } = this.props;
    this.state = {
      item: patient,
      redirect: false
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    instance
      .delete(`/patients/${this.state.item.id}`)
      .then(response => {
        this.setState({ redirect: true });
        toast.success(response.data.message);
      })
      .catch(err => {
        toast.error(err);
      });
  }

  render() {
    const { id, first_name } = this.state.item;
    const { redirect, item } = this.state;
    if (redirect) {
      return <Redirect push to={"/patients"} />;
    }
    if (!item) {
      return <div>Loading...</div>;
    }
    return (
      <li className="collection-item">
        <Link to={`/patients/${id}`}>{first_name}</Link>
        <Link className="btn right" to={`/patients/edit/${id}`}>
          Edit
        </Link>
        <button onClick={this.onDelete} className="btn red right">
          Delete
        </button>
      </li>
    );
  }
}

export default Patient;
