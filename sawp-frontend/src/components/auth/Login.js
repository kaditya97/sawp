import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import FormLabel from "../common/FormLabel";
import { login } from "../../actions/auth";

class Login extends Component {
  state = {
    username: "",
    password: "",
    isLoading: false
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      toast(error?.non_field_errors[0]);
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;
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
                    <h1>Log In</h1>
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

                    <input
                      type="submit"
                      value="Login"
                      className="btn btn-info btn-block rounded"
                    />
                    <div>
                      Doesn't have a account?{" "}
                      <Link to="/signup">Create account</Link>
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

export default connect(mapStateToProps, { login })(Login);
