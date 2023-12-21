import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Scrollbars from 'react-custom-scrollbars-2';
import ReactLoading from 'react-loading';
import { getVector } from "../../actions/vector"
import { getRaster } from "../../actions/raster"
import { getBoundary } from "../../actions/boundary"
import { deleteSuitability, getSuitability, downloadSuitability } from "../../actions/suitability"
import MapView from '../layout/mapView';
import DeleteModal from '../layout/deleteModal';
import SuitabilityEdit from '../layout/suitability/suitabilityEdit';
import Select from 'react-select'
import FormLabel from "../common/FormLabel";
import FormInput from "../common/FormInput";
import TextArea from "../common/TextArea";
import Ahp from '../layout/ahp_table'
import { toast } from 'react-toastify';

export default function SuitabilityCalculation() {
    const [isLoading, setIsLoading] = useState(false);
    const [dataId, setDataId] = useState(null)
    const [suitability, setsuitability] = useState("")
    const [editModal, setEditModal] = useState(false)
    const [viewModal, setViewModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [sname, setSname] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [boundary, setBoundary] = React.useState('')
    const [buffer_distance, setBufferDistance] = React.useState('')
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

    const loading = useSelector((state) => state.suitability.loading);

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

    const handleLayer = () => {
        toast("Select Vector or Raster layers first");
    }

    const download = id => {
        dispatch(downloadSuitability(id))
    }

    useEffect(() => {
        setBufferDistance(localStorage.getItem('buffer_distance'), 100);
        setIsLoading(loading)
        dispatch(getVector())
        dispatch(getRaster())
        dispatch(getBoundary())
        dispatch(getSuitability())
    }, [dispatch, loading]);
    return (
        <>
            <MapView cond={viewModal} setCond={setViewModal} name={suitability} type={"Suitability"} />
            <SuitabilityEdit cond={editModal} setCond={setEditModal} />
            <DeleteModal cond={deleteModal} setCond={setDeleteModal} id={dataId} handleDelete={onDelete} type={"Suitability"} />
            {isLoading ?
                <ReactLoading type={"spokes"} color={"#116f85"} height={100} width={100} /> :
            <div className="home">
                <Scrollbars
                    autoHeight
                    autoHeightMax={"95vh"}
                    className="custom-scrollbars">
                    <div className="container-fluid mt-5">
                        <h3 className="text-center heading">Suitability Calculation</h3>
                        <div className="row mx-5">
                            <div className="col-xl-12">
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
                                            Suitability Calculation
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="calculation-tab-single"
                                            data-toggle="tab"
                                            href="#calculation-single"
                                            role="tab"
                                            aria-controls="calculation-single"
                                            aria-selected="false"
                                        // onClick={vectorInfo}
                                        >
                                            Suitability Single Layer
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
                                            Suitability List
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
                                                : <button className="btn btn-info" onClick={handleLayer}>Select Layers First</button>}
                                        </div>
                                        <div className="row mx-auto d-flex justify-content-center overflow-auto">
                                            {activeLayer && <Ahp setActiveLayer={setActiveLayer} sname={sname} description={description} array={activeLayers} boundary={boundary} buffer_distance={buffer_distance}/>}
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="calculation-single"
                                        role="tabpanel"
                                        aria-labelledby="calculation-tab-single"
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
                                        </div>
                                        <div className="row mx-5 d-flex justify-content-center mt-5">
                                            {activeLayers ?
                                                <button className="btn btn-primary" onClick={() => setActiveLayer(!activeLayer)}>{activeLayer ? "Hide AHP Table" : "Show AHP Table"}</button>
                                                : <button className="btn btn-info" onClick={handleLayer}>Select Layers First</button>}
                                        </div>
                                        <div className="row mx-auto d-flex justify-content-center overflow-auto">
                                            {activeLayer && <Ahp setActiveLayer={setActiveLayer} sname={sname} description={description} array={activeLayers} boundary={boundary} buffer_distance={buffer_distance}/>}
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="suitability"
                                        role="tabpanel"
                                        aria-labelledby="suitability-tab"
                                    >
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h3>Suitability List</h3>
                                                <table className="table table-striped table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Description</th>
                                                            <th>File</th>
                                                            <th>View</th>
                                                            <th>Download</th>
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
                                                                        <i className="fas fa-download" onClick={() => download(suitability.id)}></i>
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
                        </div>
                    </div>
                </Scrollbars>
            </div>}
        </>
    )
}
