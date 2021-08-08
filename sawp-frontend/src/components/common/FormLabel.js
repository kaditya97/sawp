import React, { Component } from "react";

class FormLabel extends Component {
  static defaultProps = {
    className: "mb-0 mt-4 font-weight-bold",
  };
  render() {
    const { name, tooltip, className } = this.props;

    return (
      <span>
        <label htmlFor={name} className={className} {...this.props}>
          {name}
        </label>{" "}
        {tooltip ? (
          <span data-toggle="tooltip" title={tooltip}>
            <i className="fas fa-question-circle"></i>
          </span>
        ) : (
          ""
        )}
      </span>
    );
  }
}

export default FormLabel;
