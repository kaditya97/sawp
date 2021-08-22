import React,{useState} from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import Vector from '../layout/vector/vector';
import Raster from '../layout/raster/raster';
import Boundary from '../layout/boundary/boundary';
import Info from '../layout/info';

function DataInput() {
  const [helpInfo, setHelpInfo] = useState("Zip shapefile before upload.")
  const vectorInfo = () => {
    setHelpInfo("Zip shapefile before upload.")
  }
  const rasterInfo = () => {
    setHelpInfo("Raster")
  }
  const boundaryInfo = () => {
    setHelpInfo("Zip shapefile before upload. Upload only Polygon file, Multipolygon not supported.")
  }
    return (
      <div className="home">
        <Scrollbars
          autoHeight
          autoHeightMax={"89vh"}
          className="custom-scrollbars">
          <div className="container-fluid mt-5">
            <h3 className="text-center heading">Data Management</h3>
            <div className="row mx-5">
              <div className="col-xl-9">
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
                        onClick={vectorInfo}
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
                        onClick={rasterInfo}
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
                        onClick={boundaryInfo}
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
              <div className="col-xl-3">
                <Info info={helpInfo}/>
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
    );
}

export default DataInput;