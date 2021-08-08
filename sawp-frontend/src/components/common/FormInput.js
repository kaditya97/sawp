import React, { Component } from "react";

class FormInput extends Component {
  static defaultProps = {
    type: "text",
    extraclass: "mt-2",
    placeholder: "",
    readonly: false,
  };

  render() {
    const { placeholder, type, name, onChange, value } = this.props;

    return (
      <input
        type={type}
        name={name}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...this.props}
      />
    );
  }
}

export default FormInput;
