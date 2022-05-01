import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormLabel from "../../common/FormLabel";
import FormFile from "../../common/FormFile";
import Submit from "../../common/btn/Submit";
import { clipRaster, getClipRaster, deleteClipRaster, downloadClipRaster } from '../../../actions/dataPrep';

export default function ClipRaster() {
    const [input_raster, setInputRaster] = useState(null)
    const [input_polygon, setInputPolygon] = useState(null)
    const [fileName, setFileName] = useState("")
    const [dataId, setDataId] = useState(null)
    const [boundary, setBoundary] = useState(null)
    const [viewModal, setViewModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const dispatch = useDispatch();
    const cliprasters = useSelector((state) => state.dataPrep.clipvectors);
    console.log(cliprasters)

    const onSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();

        form_data.append("input_raster", input_raster, input_raster.name);
        form_data.append("input_polygon", input_polygon, input_polygon.name);
        form_data.append("file_name", fileName);
        dispatch(clipRaster(form_data));
        setInputRaster(null);
        setInputPolygon(null);
        setFileName("");
    };
    const handleRasterFileChange = (e) => {
        setInputRaster(e.target.files[0]);
        setFileName(e.target.files[0]?.name);
    };
    const handlePolygonFileChange = (e) => {
        setInputPolygon(e.target.files[0]);
    };

    const download = id => {
        dispatch(downloadClipRaster(id))
    }

    useEffect(() => {
        dispatch(getClipRaster());
    }, [dispatch]);

    return (
        <div>
            <div className="container-fluid mt-5">
                <h3 className="text-center heading">Clip Raster</h3>
                <div className="row mx-5">
                    <div className="row col-lg-12 m-1">
                        <FormLabel name="Raster Files" />
                        <FormFile
                            onChange={handleRasterFileChange}
                            accept=".tif"
                            placeholder="Select Raster file"
                            value={input_raster}
                        />
                        <FormLabel name="Boundary File" />
                        <FormFile
                            onChange={handlePolygonFileChange}
                            accept=".zip"
                            placeholder="Select Boundary file"
                            value={input_polygon}
                        />
                    </div>
                    <div className="row float-right mx-auto">
                        <Submit name="Submit" onClick={onSubmit} />
                    </div>
                </div>
                <div className="row mt-5 mx-5">
                    <div className="col-lg-12 mt-5">
                        <h3>Clipped Raster List</h3>
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
                                {cliprasters ? cliprasters.map((clipvector) => {
                                    return (
                                        <tr key={clipvector.id}>
                                            <td>{clipvector}</td>
                                            <td>{clipvector.description}</td>
                                            <td>{clipvector.file_name}</td>
                                            <td>
                                                <i className="fas fa-eye" onClick={() => { setBoundary(clipvector.file_name.split(".")[0]); setViewModal(true) }}></i>
                                            </td>
                                            <td>
                                                <i className="fas fa-download" onClick={() => download(clipvector.id)}></i>
                                            </td>
                                            <td>
                                                <i className="fas fa-trash-alt" onClick={() => { setDataId(clipvector.id); setDeleteModal(true) }}></i>
                                            </td>
                                        </tr>
                                    );
                                }): null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
