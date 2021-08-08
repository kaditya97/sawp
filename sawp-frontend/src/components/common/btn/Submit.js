import React, { Component } from "react";

class Submit extends Component {
  render() {
    const { name, onClick } = this.props;
    return (
      <button
        onClick={onClick}
        className="btn btn-primary float-right"
      >{name}</button>
    );
  }
}

export default Submit;
