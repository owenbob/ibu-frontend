import React from "react";

import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import instance from "../config";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      name: "",
      token: "",
      email: "",
      password: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    //Updates state with user input
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    //Sends user credentials to the API for verification
    instance
      .post("/auth/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        //stores user token in local storage
        window.localStorage.setItem("token", response.data.access_token);
        //updates state with data from response
        this.setState({
          token: response.data.access_token,
          name: response.data.welcome,
          authenticated: true
        });
        window.localStorage.setItem("authenticated", true);
        window.localStorage.setItem("name", response.data.welcome);
        //notifies user on successful login
        toast.success(response.data.message);
      })
      .catch(err => {
        //notifies user on issues with login
        toast.error(err.response.data.message);
      });
  };

  render() {
    const { token, email, password } = this.state;
    //Redirects user to page with his shoppinglists after successful login
    if (token) {
      return <Redirect to="/patients" />;
    }
    return (
      <div className="container">
        <main>
          <div className="valign-wrapper row login-box">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
            />
            <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
              <form className="form-signin" onSubmit={e => this.onSubmit(e)}>
                <div className="card-content">
                  <span className="card-title">Login</span>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="email"
                        className="validate"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={e => this.onChange(e)}
                        value={email}
                      />
                    </div>
                    <div className="input-field col s12">
                      <input
                        type="password"
                        className="validate"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={e => this.onChange(e)}
                        value={password}
                      />
                    </div>
                  </div>
                  <div className="card-action center-align">
                    <button
                      type="submit"
                      className="btn green waves-effect waves-light"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Login;
