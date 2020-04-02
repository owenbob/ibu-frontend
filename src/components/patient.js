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
    const { id, first_name, kp_code, gender, second_name, third_name, address, phone_number, date_of_birth } = this.state.item;
    const { redirect, item } = this.state;
    if (redirect) {
      return <Redirect push to={"/patients"} />;
    }
    if (!item) {
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
    return (
      <tr>
        <td>{kp_code}</td>
        <td><Link to={`/patients/${id}`}>{first_name} {second_name} {third_name}</Link></td>
        <td>{gender}</td>
        <td>{date_of_birth}</td>
        <td>{address}</td>
        <td>{phone_number}</td>
        <td><Link to={`/patient/treatment/add/${id}`}>Add Treatment</Link></td>
      </tr>
    );
  }
}

export default Patient;
