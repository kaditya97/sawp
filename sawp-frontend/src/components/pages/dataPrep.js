import React from 'react'
import { Link } from 'react-router-dom'
import vector from '../../static/img/vector.png'
import mapImage from '../../static/img/map.png'

export default function DataPrep() {
    return (
        <div>
            <div className="container-fluid mt-5">
                <h3 className="text-center heading">Data Processing Tools</h3>
                <div className="row mx-5">
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <img src={mapImage} alt="clip vector" className="card-img-top" height="200" />
                                <h5 className="card-title">Clip Vector</h5>
                                <p className="card-text">
                                    Data processing is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                </p>
                                <Link to="/clipVector">
                                    <span className="btn btn-primary">Start Tool</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <img src={vector} alt="clip vector" className="card-img-top" height="200" />
                                <h5 className="card-title">Clip Raster</h5>
                                <p className="card-text">
                                    Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                </p>
                                <Link to="/clipRaster">
                                    <span className="btn btn-primary">Start Tool</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <img src={mapImage} alt="clip vector" className="card-img-top" height="200" />
                                <h5 className="card-title">Merge Vectors</h5>
                                <p className="card-text">
                                    Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                </p>
                                <Link to="/mergeVector">
                                    <span className="btn btn-primary">Start Tool</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <img src={vector} alt="clip vector" className="card-img-top" height="200" />
                                <h5 className="card-title">Buffer Vector</h5>
                                <p className="card-text">
                                    Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                </p>
                                <Link to="/bufferVector">
                                    <span className="btn btn-primary">Start Tool</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <img src={mapImage} alt="clip vector" className="card-img-top" height="200" />
                                <h5 className="card-title">Vector To Raster</h5>
                                <p className="card-text">
                                    Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                </p>
                                <Link to="/mergeVector">
                                    <span className="btn btn-primary">Start Tool</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <img src={vector} alt="clip vector" className="card-img-top" height="200" />
                                <h5 className="card-title">Raster To Vector</h5>
                                <p className="card-text">
                                    Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                </p>
                                <Link to="/mergeVector">
                                    <span className="btn btn-primary">Start Tool</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <img src={vector} alt="clip vector" className="card-img-top" height="200" />
                                <h5 className="card-title">Vector To Shapefile</h5>
                                <p className="card-text">
                                    Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                </p>
                                <Link to="/mergeVector">
                                    <span className="btn btn-primary">Start Tool</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <img src={mapImage} alt="clip vector" className="card-img-top" height="200" />
                                <h5 className="card-title">Shapefile To Geojson</h5>
                                <p className="card-text">
                                    Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                </p>
                                <Link to="/mergeVector">
                                    <span className="btn btn-primary">Start Tool</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
