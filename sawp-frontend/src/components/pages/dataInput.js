import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import Vector from '../layout/vector/vector';
import Raster from '../layout/raster/raster';
import Boundary from '../layout/boundary/boundary';

function DataInput() {
    return (
      <div className="home">
        <Scrollbars
          autoHeight
          autoHeightMax={"89vh"}
          className="custom-scrollbars">
          <div className="container-fluid mt-5">
            <h3 className="text-center heading">Data Management</h3>
            <div className="row mx-5">
              <div className="col-xl-12">
                <form
                  className="form-group"
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
                      <Vector/>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="raster"
                      role="tabpanel"
                      aria-labelledby="raster-tab"
                    >
                      <Raster/>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="boundary"
                      role="tabpanel"
                      aria-labelledby="boundary-tab"
                    >
                      <Boundary/>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
    );
}

export default DataInput;