import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import logo from "../../static/img/logo.png";

class Navbar extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLink = (
      <div className="my-2 my-lg-0">
        <ul className="navbar-nav mr-auto">

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/#"
              data-toggle="dropdown"
            >
              <i className="fas fa-user-circle"></i> {user ? user.username : ""}
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to="/user" className="dropdown-item">
                <i className="fa fa-user"></i>  User profile
              </Link>
              <hr />
              <Link to="/project" className="dropdown-item">
                <i className="fa fa-database"></i>  Project
              </Link>
              <hr />
              <Link to="/setting" className="dropdown-item">
                <i className="fa fa-cogs"></i>  Settings
              </Link>

              <hr />
              {/* eslint-disable jsx-a11y/anchor-is-valid */}
              <a
                data-toggle="modal"
                data-target="#logoutModal"
                className="dropdown-item"
                style={{ cursor: "pointer" }}
                >
                <i className="fa fa-sign-out-alt"></i>  Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <div className="my-2 my-lg-0">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/signup"} className="nav-link">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Log In
            </Link>
          </li>
        </ul>
      </div>
    );

    return (
      <>
        <nav className="navbar navbar-expand-lg py-3">
          <a href="/#" className="navbar-brand">
            <img src={logo} className="img-fluid" alt="logo"/>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fas fa-bars"></i>
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/dataInput" className="nav-link">
                  Data Management
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/suitabilityCalculation" className="nav-link">
                  Suitability Calculation
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/visualization" className="nav-link">
                  Visualization
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLink : guestLinks}
          </div>
        </nav>

        {/* bootstrap modal for logout  */}
        <div
          className="modal fade"
          id="logoutModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Logout
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Are you sure want to logout?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.props.logout}
                  data-dismiss="modal"
                  className="btn btn-primary"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({auth: state.auth});

export default connect(mapStateToProps, {logout})(Navbar);
