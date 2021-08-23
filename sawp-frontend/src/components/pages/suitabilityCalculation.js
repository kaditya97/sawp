import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Scrollbars from 'react-custom-scrollbars-2';
import { getVector } from "../../actions/vector"
import { getRaster } from "../../actions/raster"
import { getBoundary } from "../../actions/boundary"
import { deleteSuitability, getSuitability } from "../../actions/suitability"
import SuitabilityDelete from '../layout/suitability/suitabilityDelete';
import SuitabilityView from '../layout/suitability/suitabilityView';
// import Ahp from '../layout/ahp_table'

export default function SuitabilityCalculation() {
    const [dataId, setDataId] = useState(null)
    const [suitability, setsuitability] = useState("")
    const [editModal, setEditModal] = useState(false)
    const [viewModal, setViewModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const dispatch = useDispatch();

    const vectors = useSelector((state) => state.vector.vector);
    const rasters = useSelector((state) => state.raster.raster);
    const boundaries = useSelector((state) => state.boundary.boundary);
    const suitabilities = useSelector((state) => state.suitability.suitability);
    const [activeLayers, setActiveLayers] = useState([]);
    const [activeLayer, setActiveLayer] = useState(false);

    const AllLayers = (props) => {
        return (
            <div className="row mx-5 mt-5">
                <div className="col-md-12">
                    <h2 className={"layer-title"}>Selected Layers</h2>
                    {props.activeLayers.map((layer, index) => {
                        return (
                            <div key={index}>
                                <h5>{layer}</h5>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    useEffect(() => {
        dispatch(getVector())
        dispatch(getRaster())
        dispatch(getBoundary())
        dispatch(getSuitability())
    }, [dispatch])

    const handleClick = (e) => {
        if (e.target.checked) {
            const layer = e.target.id;
            activeLayers.push(layer);
            setActiveLayers(activeLayers);
        } else {
            const index = activeLayers.indexOf(e.target.id);
            if (index > -1) {
                activeLayers.splice(index, 1);
            }
        }
    }

    const onDelete = (id) => {
        dispatch(deleteSuitability(id))
      }

    return (
        <>
            <SuitabilityView cond={viewModal} setCond={setViewModal} name={suitability}/>
            <SuitabilityDelete cond={deleteModal} setCond={setDeleteModal} id={dataId} handleDelete={onDelete}/>
            <div className="home">
            <Scrollbars
                autoHeight
                autoHeightMax={"89vh"}
                className="custom-scrollbars">
                <div className="container-fluid mt-5">
                    <h3 className="text-center heading">Suitability Calculation</h3>
                    <div className="row mx-5">
                        <div className="col-md-3">
                            <h2 className={"layer-title"}>Vector Layers</h2>
                            {vectors.map((vector, index) => {
                                return (
                                    <div key={index}>
                                        <div className="row">
                                            <input type="checkbox" id={vector.name} onClick={handleClick} />&nbsp;&nbsp;
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
                                            <input type="checkbox" id={raster.name} onClick={handleClick} />&nbsp;&nbsp;
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
                                            <input type="checkbox" id={boundary.name} onClick={handleClick} />&nbsp;&nbsp;
                                            <label>{boundary.name}</label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="row">
                            <div className="row mx-5 d-flex justify-content-center mt-5">
                                <a href="https://bpmsg.com/ahp/ahp-calc.php" rel="noreferrer" target="_blank"><button>Calculate Weightages using Ahp   <i className="fa fa-external-link-alt"></i></button></a>
                                {/* <Ahp /> */}
                            </div>
                        </div>
                        <div className="row mx-5 d-flex justify-content-center mt-5">
                            <button onClick={() => setActiveLayer(!activeLayer)}>Show Selected Layers</button>
                        </div>
                        <div className="row mx-5 d-flex justify-content-center mt-5">
                            {activeLayer && <AllLayers activeLayers={activeLayers} />}
                            {activeLayer && <div className="row mx-5 d-flex justify-content-center mt-5">
                                <button onClick={() => window.alert("Suitability Calculated")}>Calculate Suitability</button>
                            </div>}
                        </div>
                        <div className="row mt-5">
                            <div className="col-lg-12 mt-5">
                                <h3>Raster List</h3>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>File</th>
                                            <th>View</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {suitabilities.map((suitability) => {
                                            return (
                                                <tr key={suitability.id}>
                                                    <td>{suitability.name}</td>
                                                    <td>{suitability.description}</td>
                                                    <td>{suitability.file_name}</td>
                                                    <td>
                                                        <i className="fas fa-eye" onClick={() => { setsuitability(suitability.name); setViewModal(true) }}></i>
                                                    </td>
                                                    <td>
                                                        <i className="fas fa-edit" onClick={() => setEditModal(true)}></i>
                                                    </td>
                                                    <td>
                                                        <i className="fas fa-trash-alt" onClick={() => { setDataId(suitability.id); setDeleteModal(true) }}></i>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Scrollbars>
            </div>
        </>
    )
}
