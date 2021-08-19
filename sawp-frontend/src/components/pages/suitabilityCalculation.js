import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getVector } from "../../actions/vector"
import { getRaster } from "../../actions/raster"
import { getBoundary } from "../../actions/boundary"
// import Ahp from '../layout/ahp_table'

export default function SuitabilityCalculation() {
    const dispatch = useDispatch();

    const vectors = useSelector((state) => state.vector.vector);
    const rasters = useSelector((state) => state.raster.raster);
    const boundaries = useSelector((state) => state.boundary.boundary);
    const [activeLayers, setActiveLayers] = useState([]); 

    useEffect(() => {
        dispatch(getVector())
        dispatch(getRaster())
        dispatch(getBoundary())
    }, [dispatch])

    const handleClick = (e) => {
        const layer = e.target.id;
        console.log(layer);
        activeLayers.push(layer);
        setActiveLayers(activeLayers);
        console.log(activeLayers);
    }

    return (
        <>
            <div className="home">
                <div className="container-fluid mt-5">
                <h3 className="text-center heading">Suitability Calculation</h3>
                    <div className="row mx-5">
                        <div className="col-md-3">
                            <h2 className={"layer-title"}>Vector Layers</h2>
                            {vectors.map((vector, index) => {
                                return (
                                    <div key={index}>
                                        <div className="row">
                                            <input type="checkbox" id={vector.name} onClick={handleClick}/>&nbsp;&nbsp;
                                            <label>{vector.name}</label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col-md-3">
                            <h2 className={"layer-title"}>Raster Layers</h2>
                            {rasters.map((raster, index) => {
                                return (
                                    <div key={index}>
                                        <div className="row">
                                            <input type="checkbox" id={raster.name} onClick={handleClick}/>&nbsp;&nbsp;
                                            <label>{raster.name}</label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col-md-3">
                            <h2 className={"layer-title"}>Boundary Layers</h2>
                            {boundaries.map((boundary, index) => {
                                return (
                                    <div key={index}>
                                        <div className="row">
                                            <input type="checkbox" id={boundary.name} onClick={handleClick}/>&nbsp;&nbsp;
                                            <label>{boundary.name}</label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="row mx-5 d-flex justify-content-center mt-5">
                        <a href="https://bpmsg.com/ahp/ahp-calc.php" rel="noreferrer" target="_blank"><button>Calculate Weightages using Ahp</button></a>
                        {/* <Ahp /> */}
                    </div>
                    <div className="row mx-5 mt-5">
                        <div className="col-md-12">
                        <h2 className={"layer-title"}>Selected Layers</h2>
                        {console.log(activeLayers)}
                            {activeLayers.map((layer, index) => {
                                return (
                                    <div key={index}>
                                        <h5>{layer}</h5>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
