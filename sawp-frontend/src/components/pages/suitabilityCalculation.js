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
import FormLabel from "../common/FormLabel";
import FormInput from "../common/FormInput";
import TextArea from "../common/TextArea";
import Info from '../layout/info';
import Ahp from '../layout/ahp_table'
import { toast } from 'react-toastify';

export default function SuitabilityCalculation() {
    const [dataId, setDataId] = useState(null)
    const [suitability, setsuitability] = useState("")
    const [editModal, setEditModal] = useState(false)
    const [viewModal, setViewModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [sname, setSname] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [boundary, setBoundary] = React.useState('')
    const dispatch = useDispatch();

    const vectors = useSelector((state) => state.vector.vector);
    const rasters = useSelector((state) => state.raster.raster);
    const boundaries = useSelector((state) => state.boundary.boundary);
    const suitabilities = useSelector((state) => state.suitability.suitability);
    const [activeLayers, setActiveLayers] = useState(null);
    const [vectorLayers, setVectorLayers] = useState([]);
    const [rasterLayers, setRasterLayers] = useState([]);
    const [activeLayer, setActiveLayer] = useState(false);

    const vectorOptions = vectors?.map((d) => ({ value: d.id, label: d.name, }));
    const rasterOptions = rasters?.map((d) => ({ value: d.id, label: d.name, }));
    const boundaryOptions = boundaries?.map((d) => ({ value: d.id, label: d.name, }));

    const handleVectorChange = (selectedOption) => {
        setActiveLayer(false)
        let array = [];
        selectedOption.map((item) => {
            array.push(item.label);
            return null
        });
        setVectorLayers(array);
        setActiveLayers(array.concat(rasterLayers));
    };

    const handleRasterChange = (selectedOption) => {
        setActiveLayer(false)
        let array = [];
        selectedOption.map((item) => {
            array.push(item.label);
            return null
        });
        setRasterLayers(array);
        setActiveLayers(vectorLayers.concat(array));
    };

    const handleBoundaryChange = (selectedOption) => {
        setBoundary(selectedOption.label)
    }

    const onDelete = (id) => {
        dispatch(deleteSuitability(id))
    }

    const onNameChange = (e) => {
        setSname(e.target.value);
    };

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    useEffect(() => {
        dispatch(getVector())
        dispatch(getRaster())
        dispatch(getBoundary())
        dispatch(getSuitability())
    }, [dispatch])
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
                            <div className="col-xl-9">
                                <ul className="nav nav-tabs mt-3" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="calculation-tab"
                                            data-toggle="tab"
                                            href="#calculation"
                                            role="tab"
                                            aria-controls="calculation"
                                            aria-selected="true"
                                        // onClick={vectorInfo}
                                        >
                                            Calculation
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="suitability-tab"
                                            data-toggle="tab"
                                            href="#suitability"
                                            role="tab"
                                            aria-controls="suitability"
                                            aria-selected="false"
                                        // onClick={rasterInfo}
                                        >
                                            Suitability
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent" style={{ minHeight: "60vh" }}>
                                    <div
                                        className="tab-pane fade show active"
                                        id="calculation"
                                        role="tabpanel"
                                        aria-labelledby="calculation-tab"
                                    >
                                        <div className="row">
                                            <div className="col-lg-6 required">
                                                <FormLabel name="Suitability Name" />
                                                <FormInput
                                                    name={"sname"}
                                                    onChange={onNameChange}
                                                    placeholder="Enter name for suitability..."
                                                    required="required"
                                                    value={sname}
                                                />
                                            </div>

                                            <div className="col-lg-6 ">
                                                <FormLabel name="Description" />
                                                <TextArea
                                                    name="description"
                                                    value={description}
                                                    rows="1"
                                                    required="required"
                                                    onChange={onDescriptionChange}
                                                    placeholder="Add description for suitability..."
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 d-inline-block">
                                                <FormLabel name="Vector Layers" />
                                                <Select
                                                    isMulti
                                                    name="vector"
                                                    options={vectorOptions}
                                                    onChange={(v) => handleVectorChange(v)}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                            <div className="col-md-4 d-inline-block">
                                                <FormLabel name="Raster Layers" />
                                                <Select
                                                    isMulti
                                                    name="raster"
                                                    options={rasterOptions}
                                                    onChange={(v) => handleRasterChange(v)}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                            <div className="col-md-4 d-inline-block">
                                                <FormLabel name="Boundary Layers" />
                                                <Select
                                                    name="boundary"
                                                    options={boundaryOptions}
                                                    onChange={(v) => handleBoundaryChange(v)}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="row mx-5 d-flex justify-content-center mt-5">
                                        <a href="https://bpmsg.com/ahp/ahp-calc.php" rel="noreferrer" target="_blank"><button>Calculate Weightages using Ahp   <i className="fa fa-external-link-alt"></i></button></a>
                                            </div> */}
                                        <div className="row mx-5 d-flex justify-content-center mt-5">
                                            {activeLayers ?
                                                <button className="btn btn-primary" onClick={() => setActiveLayer(!activeLayer)}>{activeLayer ? "Hide AHP Table" : "Show AHP Table"}</button>
                                                : <button className="btn btn-info" onClick={()=>toast("Select Vector of Raster layers first")}>Select Layers First</button>}
                                        </div>
                                        <div className="row mx-auto d-flex justify-content-start overflow-auto">
                                            {activeLayer && <Ahp sname={sname} description={description} array={activeLayers} boundary={boundary}/>}
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="suitability"
                                        role="tabpanel"
                                        aria-labelledby="suitability-tab"
                                    >
                                        <div className="row">
                                            <div className="col-md-9">
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
                                                        {suitabilities?.map((suitability) => {
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
                            </div>
                            <div className="col-xl-3">
                                <Info info={"Suitability Calculation Help"} />
                            </div>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        </>
    )
}
