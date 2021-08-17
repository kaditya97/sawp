import React from 'react'
import Vector from '../layout/vector';
import Raster from '../layout/raster';
import Boundary from '../layout/boundary';

class DataInput extends React.Component {
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
                    id="vector-file-upload"
                    data-toggle="tab"
                    href="#vector"
                    role="tab"
                    aria-controls="vector"
                    aria-selected="true"
                  >
                    Vector file upload
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="raster-file-upload"
                    data-toggle="tab"
                    href="#raster"
                    role="tab"
                    aria-controls="raster"
                    aria-selected="false"
                  >
                    Raster file upload
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="boundary-file-upload"
                    data-toggle="tab"
                    href="#boundary"
                    role="tab"
                    aria-controls="boundary"
                    aria-selected="false"
                  >
                    Boundary file upload
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="vector"
                  role="tabpanel"
                  aria-labelledby="vector-tab"
                >
                  <Vector />
                </div>
                <div
                  className="tab-pane fade"
                  id="raster"
                  role="tabpanel"
                  aria-labelledby="raster-tab"
                >
                  <Raster />
                </div>
                <div
                  className="tab-pane fade"
                  id="boundary"
                  role="tabpanel"
                  aria-labelledby="boundary-tab"
                >
                  <Boundary />
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