import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      console.log("password not matched");
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

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <>
      <div className="container login">
        <div className="row text-center">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Sign up for SAWP</h5>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
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
                  <input
                    type="email"
                    name="email"
                    onChange={this.onChange}
                    value={email}
                    className="form-control input-sm"
                    placeholder="Email Address"
                  />
                </div>

                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6">
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        onChange={this.onChange}
                        value={password}
                        className="form-control input-sm"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6">
                    <div className="form-group">
                      <input
                        type="password"
                        onChange={this.onChange}
                        value={password2}
                        name="password2"
                        className="form-control input-sm"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
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
        </div>
      </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Signup);
