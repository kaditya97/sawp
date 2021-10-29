import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import FormLabel from '../common/FormLabel';
import { register } from "../../actions/auth";
// import { createMessage } from "../../actions/messages";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      toast("Password not matched");
    } else {
      const newUser = {
        username,
        email,
        password,
      };
      this.props.register(newUser);
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      toast(error?.non_field_errors?.[0]);
      toast(error?.username?.[0]);
      toast(error?.email?.[0]);
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <>
        <div className="login">
          {this.props.isLoading ?
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
              <ReactLoading type={"spokes"} color={"#116f85"} height={100} width={100} />
            </div>
            :
            <div className="row text-center">
              <div className="card">
                <div className="card-body">
                <div className="row d-flex">
                    <h1>Sign Up</h1>
                  </div>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <div className="row">
                        <FormLabel name="Username" />
                      </div>
                      <input
                        type="text"
                        name="username"
                        className="form-control input-sm"
                        onChange={this.onChange}
                        value={username}
                        placeholder="Enter Username..."
                      />
                    </div>

                    <div className="form-group">
                    <div className="row">
                        <FormLabel name="Email Address" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        onChange={this.onChange}
                        value={email}
                        className="form-control input-sm"
                        placeholder="Email Address"
                      />
                    </div>

                    <div className="form-group">
                    <div className="row">
                        <FormLabel name="Password" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        onChange={this.onChange}
                        value={password}
                        className="form-control input-sm"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                    <div className="row">
                        <FormLabel name="Confirm Password" />
                      </div>
                      <input
                        type="password"
                        onChange={this.onChange}
                        value={password2}
                        name="password2"
                        className="form-control input-sm"
                        placeholder="Confirm Password"
                      />
                    </div>

                    <input
                      type="submit"
                      value="Sign up"
                      className="btn btn-info btn-block"
                    />
                    <div>
                      Already have a account? <Link to="/login">Log In</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  error: state.auth.error,
});

export default connect(mapStateToProps, { register })(Signup);
