import React, { Component } from "react";

class TextArea extends Component {
  render() {
    const { name, value, onChange, placeholder, rows } = this.props;
    return (
      <textarea
        name={name}
        id={name}
        value={value}
        className="form-control"
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      >
        {value}
      </textarea>
    );
  }
}

export default TextArea;
