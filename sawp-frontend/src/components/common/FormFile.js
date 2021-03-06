import React, { Component } from "react";
import bsCustomFileInput from "bs-custom-file-input";

class FormFile extends Component {
  componentDidMount() {
    bsCustomFileInput.init();
  }

  static defaultProps = {
    fileName: "inputGroup1",
    placeholder: "Choose file...",
    required: "required",
    xtraClass: "mt-4",
    multiple: false,
  };

  render() {
    const { fileName, placeholder, onChange, required, xtraClass, accept, multiple } = this.props;

    return (
      <div className={`custom-file ${xtraClass}`}>
        <input
          id={fileName}
          type="file"
          onChange={onChange}
          className="custom-file-input"
          required={required}
          accept={accept}
          multiple={multiple}
        />
        <label className="custom-file-label" htmlFor={fileName}>
          {placeholder}
        </label>
      </div>
    );
  }
}

export default FormFile;
