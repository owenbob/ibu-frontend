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
      return <div>Loading...</div>;
    }
    return (
      <li className="collection-item">
        {reason}
        <Link
          className="btn right"
          to={`/treatments/edit/${id}`}
        >
          Edit
        </Link>
        <button onClick={this.onDelete} className="btn red right">
          Delete
        </button>
      </li>
    );
  }
}

export default PatientDetail;
