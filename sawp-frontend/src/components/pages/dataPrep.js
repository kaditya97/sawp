import React from 'react'
import { Link } from 'react-router-dom'
import vector from '../../static/img/vector.png'
import mapImage from '../../static/img/map.png'
import bufferImage from '../../static/img/buffer.jpg'
import mergeImage from '../../static/img/merge.jpg'
import clipVectorImage from '../../static/img/clip_vector.jpg'
import clipRasterImage from '../../static/img/clip_raster.png'
import shapefileImage from '../../static/img/shapefile.png'
import vectorToRasterImage from '../../static/img/vector_raster.jpg'

export default function DataPrep() {
    return (
        <div>
            <div className="container-fluid mt-5">
                <h3 className="text-center heading">Data Processing Tools</h3>
                <div className="row mx-5">
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <img src={clipVectorImage} alt="clip vector" className="card-img-top" height="200" />
                                <h5 className="card-title">Clip Vector</h5>
                                <p className="card-text">
                                    Clip Vector Data tool helps to clip vector layer as provided boundary layer.
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
                                <img src={clipRasterImage} alt="clip raster" className="card-img-top" height="200" />
                                <h5 className="card-title">Clip Raster</h5>
                                <p className="card-text">
                                Clip Raster Data tool helps to clip raster layer as provided boundary layer.
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
                                <img src={mergeImage} alt="clip vector" className="card-img-top" height="200" />
                                <h5 className="card-title">Merge Vectors</h5>
                                <p className="card-text">
                                    Merge Vector layers tool helps to merge multiple vector layers provided by user.
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
                                <img src={bufferImage} alt="clip vector" className="card-img-top" height="200" />
                                <h5 className="card-title">Buffer Vector</h5>
                                <p className="card-text">
                                    Buffer Vector tool helps to buffer vector layer as provided buffer distance.
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
                                <img src={vectorToRasterImage} alt="clip vector" className="card-img-top" height="200" />
                                <h5 className="card-title">Vector To Raster</h5>
                                <p className="card-text">
                                    Vector to Raster tool helps to convert vector layer to raster layer.
                                </p>
                                <Link to="/vectorToRaster">
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
                                    Raster to Vector tool helps to convert raster layer to vector layer.
                                </p>
                                <Link to="/rasterToVector">
                                    <span className="btn btn-primary">Start Tool</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <img src={shapefileImage} alt="clip vector" className="card-img-top" height="200" />
                                <h5 className="card-title">Vector To Shapefile</h5>
                                <p className="card-text">
                                    Vector to Shapefile tool helps to convert vector layer to shapefile.
                                </p>
                                <Link to="/vectorToShapefile">
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
                                    Shapefile to Geojson tool helps to convert shapefile to geojson.
                                </p>
                                <Link to="/shapefileToGeojson">
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
