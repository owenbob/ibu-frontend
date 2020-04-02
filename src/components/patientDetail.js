import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../config";

class PatientDetail extends Component {
  constructor(props) {
    super(props);
    let { patientid, patientDetail } = this.props;
    this.state = {
      item: patientDetail,
      patientid: patientid,
      redirect: false
    };
  }

  onDelete = () => {
    instance
      .delete(`/treatments/${this.state.item.id}`)
      .then(response => {
        this.setState({ redirect: true });
        toast.success(response.data.message);
      })
      .catch(err => {});
  };

  render() {
    const { id, reason } = this.state.item;
    const { item, patientid } = this.state;
    if (this.state.redirect) {
      return <Redirect push to={`/patients/${patientid}`} />;
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
      <td>{id}</td>
      <td>{reason}</td>
      </tr>
    );
  }
}

export default PatientDetail;
