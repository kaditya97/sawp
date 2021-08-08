import React from 'react'
import FormLabel from "../common/FormLabel";
import FormInput from "../common/FormInput";
import FormFile from "../common/FormFile";
import TextArea from "../common/TextArea";
import Cancel from "../common/btn/Cancel";
import Submit from "../common/btn/Submit";

class DataInput extends React.Component {
  state = {
    name: "",
    description: "",
    file: null,
    file_name: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
    this.setState({ file_name: e.target.files[0]?.name });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      description,
      file,
      file_name,
    } = this.state;

    let form_data = new FormData();

    form_data.append("file", file, file.name);
    form_data.append("name", name);
    form_data.append("description", description);
    form_data.append("file_name", file_name);
    form_data.append("project", localStorage.getItem("projectId"));

    this.setState({
      name: "",
      file: null,
      description: "",
      file_name: "",
    });
  };

  onCancel = (e) => {
    e.preventDefault();
    this.setState({
      name: "",
      file: null,
      description: "",
      file_name: "",
    });
  };

  render() {
    return (
      <div className="container-fluid mt-5">
        <h3 className="text-center heading">Data Input</h3>
        <div className="row mx-5">
          <div className="col-xl-9">
            <form
              className="form-group"
              onSubmit={this.onChange}
              encType="multipart/form-data"
            >
              <ul className="nav nav-tabs mt-3" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="raster-file-upload"
                    data-toggle="tab"
                    href="#raster"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Raster file upload
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="vector-file-upload"
                    data-toggle="tab"
                    href="#vector"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Vector file upload
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="raster"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-lg-6 required">
                      <FormLabel name="Name" />
                      <FormInput
                        name={"Suitability"}
                        value={"name"}
                        onChange={this.onChange}
                        placeholder="Enter name of raster..."
                        required="required"
                      />
                    </div>

                    <div className="col-lg-6 ">
                      <FormLabel name="Description" />
                      <TextArea
                        name="description"
                        // value={description}
                        rows="1"
                        onChange={this.onChange}
                        placeholder="Add description of the raster..."
                      />
                    </div>
                  </div>
                  <FormFile
                    onChange={this.handleFileChange}
                    accept=".tif,.tiff,.geotiff"
                    placeholder="Upload raster file"
                  />
                  <Submit name="Submit"/>
                  <Cancel onClick={this.onCancel} />
                </div>
                <div
                  className="tab-pane fade"
                  id="vector"
                  role="tabpanel"
                  aria-labelledby="vector-tab"
                >
                  <div className="row">
                    <div className="col-lg-6 required">
                      <FormLabel name="Name" />
                      <FormInput
                        name={"Suitability"}
                        value={"name"}
                        onChange={this.onChange}
                        placeholder="Enter name of vector..."
                        required="required"
                      />
                    </div>

                    <div className="col-lg-6 ">
                      <FormLabel name="Description" />
                      <TextArea
                        name="description"
                        // value={description}
                        rows="1"
                        onChange={this.onChange}
                        placeholder="Add description of the vector..."
                      />
                    </div>
                  </div>
                  <FormFile
                    onChange={this.handleFileChange}
                    accept=".zip,.shp"
                    placeholder="Upload vector file"
                  />
                  <Submit name="Submit"/>
                  <Cancel onClick={this.onCancel} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default DataInput;