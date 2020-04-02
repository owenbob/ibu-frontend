import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./navbar";
import instance from "../config";

class AddPatientTreatment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      reason: "",
      patientId: this.props.match.params.id,
      category: "",
      type_of_syndrome: "",
      new_client: "",
      bp: "",
      weight: "",
      refered_to_other_facility: "",
      facility_refered_to: "",
      condom_given: "",
      lubricant_given: "",
      date_of_next_visit: "",
      comment: ""
    };
  }

  onChange = e => {
    //Updates state with user input
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  onSubmit = e => {
    let patientId = this.props.match.params.id;
    e.preventDefault();
    instance
      .post(`/patients/${patientId}/treatments`, {
        reason: this.state.reason,
        category: this.state.category,
        type_of_syndrome: this.state.type_of_syndrome,
        new_client: JSON.parse(this.state.new_client),
        bp: this.state.bp,
        weight: this.state.weight,
        refered_to_other_facility: JSON.parse(this.state.refered_to_other_facility),
        facility_refered_to: this.state.facility_refered_to,
        condom_given: JSON.parse(this.state.condom_given),
        lubricant_given: JSON.parse(this.state.lubricant_given),
        date_of_next_visit: this.state.date_of_next_visit,
        comment: this.state.comment
      })
      .then(response => {
        console.log(this.state);
        console.log(response.data);
        this.props.history.push(`/patients/${patientId}`);
        toast.success(response.data.status);
      })
      .catch(err => {
        toast.error(err.response.data.status);
      });
  };

  render() {
    const { reason, category, type_of_syndrome, new_client, bp, weight, refered_to_other_facility, facility_refered_to, authenticated, patientId, condom_given, lubricant_given, date_of_next_visit, comment } = this.state;
    //Blocks unauthorized access
    if (!authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Navbar />
        <div className="container">
          <br />
          <Link className="btn grey" to={`/patients/${patientId}`}>
            Back
          </Link>
          <h1>Add Treatment</h1>
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
                id="reason"
                name="reason"
                ref="reason"
                onChange={e => this.onChange(e)}
                value={reason}
              />
              <label htmlFor="reason">Reason</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="category"
                name="category"
                ref="category"
                onChange={e => this.onChange(e)}
                value={category}
              />
              <label htmlFor="category">Category</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="type_of_syndrome"
                name="type_of_syndrome"
                ref="type_of_syndrome"
                onChange={e => this.onChange(e)}
                value={type_of_syndrome}
              />
              <label htmlFor="type_of_syndrome">Type Of Syndrome</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="new_client"
                name="new_client"
                ref="new_client"
                onChange={e => this.onChange(e)}
                value={new_client}
              />
              <label htmlFor="new_client">New Client</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="bp"
                name="bp"
                ref="bp"
                onChange={e => this.onChange(e)}
                value={bp}
              />
              <label htmlFor="bp">BP</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="weight"
                name="weight"
                ref="weight"
                onChange={e => this.onChange(e)}
                value={weight}
              />
              <label htmlFor="weight">Weight</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="refered_to_other_facility"
                name="refered_to_other_facility"
                ref="refered_to_other_facility"
                onChange={e => this.onChange(e)}
                value={refered_to_other_facility}
              />
              <label htmlFor="refered_to_other_facility">Refered To Other Facility</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="facility_refered_to"
                name="facility_refered_to"
                ref="facility_refered_to"
                onChange={e => this.onChange(e)}
                value={facility_refered_to}
              />
              <label htmlFor="facility_refered_to">Facility Refered To</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="condom_given"
                name="condom_given"
                ref="condom_given"
                onChange={e => this.onChange(e)}
                value={condom_given}
              />
              <label htmlFor="condom_given">Condom Given</label>
            </div>
          <div className="input-field">
              <input
                type="text"
                id="lubricant_given"
                name="lubricant_given"
                ref="lubricant_given"
                onChange={e => this.onChange(e)}
                value={lubricant_given}
              />
              <label htmlFor="lubricant_given">Lubricant Given</label>
            </div>
            <div className="input-field">
              <input
                type="date"
                id="date_of_next_visit"
                name="date_of_next_visit"
                ref="date_of_next_visit"
                className="datepicker"
                onChange={e => this.onChange(e)}
                value={date_of_next_visit}
              />
              <label id="date_label" htmlFor="date_of_next_visit">Date Of Next Visit</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="comment"
                name="comment"
                ref="comment"
                onChange={e => this.onChange(e)}
                value={comment}
              />
              <label htmlFor="comment">Comment</label>
            </div>
            <input type="submit" value="Save" className="btn" />
          </form>
        </div>
      </div>
    );
  }
}

export default AddPatientTreatment;
