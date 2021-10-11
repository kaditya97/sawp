import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Scrollbars from 'react-custom-scrollbars-2';
import { getVector } from "../../actions/vector"
import { getRaster } from "../../actions/raster"
import { getBoundary } from "../../actions/boundary"
import { deleteSuitability, getSuitability } from "../../actions/suitability"
import MapView from '../layout/mapView';
import DeleteModal from '../layout/deleteModal';
import SuitabilityEdit from '../layout/suitability/suitabilityEdit';
import Select from 'react-select'
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

    const vectorOptions = vectors?.map((d) => ({value: d.id,label: d.name,}));
    const rasterOptions = rasters?.map((d) => ({value: d.id,label: d.name,}));
    const boundaryOptions = boundaries?.map((d) => ({value: d.id,label: d.name,}));

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

    const onDelete = (id) => {
        dispatch(deleteSuitability(id))
    }

    return (
        <>
            <MapView cond={viewModal} setCond={setViewModal} name={suitability} type={"Suitability"} />
            <SuitabilityEdit cond={editModal} setCond={setEditModal} />
            <DeleteModal cond={deleteModal} setCond={setDeleteModal} id={dataId} handleDelete={onDelete} type={"Suitability"} />
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
                                <Select
                                    isMulti
                                    name="vector"
                                    options={vectorOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                            <div className="col-md-3">
                                <h2 className={"layer-title"}>Raster Layers</h2>
                                <Select
                                    isMulti
                                    name="raster"
                                    options={rasterOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                            <div className="col-md-3">
                                <h2 className={"layer-title"}>Boundary Layers</h2>
                                <Select
                                    name="boundary"
                                    options={boundaryOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div>
                        <div className="row mx-5 d-flex justify-content-center mt-5">
                            <a href="https://bpmsg.com/ahp/ahp-calc.php" rel="noreferrer" target="_blank"><button>Calculate Weightages using Ahp   <i className="fa fa-external-link-alt"></i></button></a>
                            {/* <Ahp /> */}
                        </div>
                        <div className="row mx-5 d-flex justify-content-center mt-5">
                            <button onClick={() => setActiveLayer(!activeLayer)}>Show Selected Layers</button>
                        </div>
                        <div className="row mx-5">
                            {activeLayer && <AllLayers activeLayers={activeLayers} />}
                        </div>
                        <div className="row mx-5 d-flex justify-content-center mt-5">
                            {activeLayer && <div className="row mx-5 d-flex justify-content-center mt-5">
                                <button onClick={() => window.alert("Suitability Calculated")}>Calculate Suitability</button>
                            </div>}
                        </div>
                        <div className="row mx-5 mt-5">
                            <div className="col-md-9 mt-5">
                                <h3>Suitability List</h3>
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
                </Scrollbars>
            </div>
        </>
    )
}
