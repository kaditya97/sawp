import React, { Component } from "react";
import { connect } from "react-redux";

class User extends Component {

  render() {
    const { auth } = this.props;
    return (
      <>
        <div className="m-5">
          <h1 className="text-center" style={{ color: "#ff8700" }}>
            <h2>User</h2>
          </h1>
          <p className="text-center">Welcome to the user dashboard</p>
          <div className="row">
            <div className="col">
              <h4>Username</h4>
              <h6>{ auth != null ? auth.username : null}</h6>
            </div>
            <div className="col">
              <h4>Email</h4>
              <h6>{auth != null ? auth.email : null}</h6>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.user,
});

export default connect(mapStateToProps)(User);
