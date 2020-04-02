import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../config";

class Drug extends Component {
  constructor(props) {
    super(props);
    let { drug } = this.props;
    this.state = {
      item: drug,
      redirect: false
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    instance
      .delete(`/drugs/${this.state.item.id}`)
      .then(response => {
        this.setState({ redirect: true });
        toast.success(response.data.message);
      })
      .catch(err => {
        toast.error(err);
      });
  }

  render() {
    const { id, name } = this.state.item;
    const { redirect, item } = this.state;
    if (redirect) {
      return <Redirect push to={"/drugs"} />;
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
        <td>{name}</td>
      </tr>
    );
  }
}

export default Drug;
