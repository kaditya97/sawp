import React from 'react'
import { Link } from 'react-router-dom'

export default function DataPrep() {
    return (
        <div>
            <div className="container-fluid mt-5">
                <h3 className="text-center heading">Data Preparation Tools</h3>
                <div className="row mx-5">
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Clip Vector</h5>
                                <p className="card-text">
                                    Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                </p>
                                <Link to="/clipVector">
                                    <a href="#" className="btn btn-primary">Start Tool</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Clip Raster</h5>
                                <p className="card-text">
                                    Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                </p>
                                <Link to="/clipRaster">
                                    <a href="#" className="btn btn-primary">Start Tool</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Merge Vectors</h5>
                                <p className="card-text">
                                    Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                </p>
                                <Link to="/mergeVector">
                                    <a href="#" className="btn btn-primary">Start Tool</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Data Preparation</h5>
                                <p className="card-text">
                                    Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                </p>
                                <a href="#" className="btn btn-primary">Start Tool</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Data Preparation</h5>
                                <p className="card-text">
                                    Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                </p>
                                <a href="#" className="btn btn-primary">Start Tool</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
