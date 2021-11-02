import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from 'react-loading';
import FormLabel from "../../common/FormLabel";
import FormInput from "../../common/FormInput";
import FormFile from "../../common/FormFile";
import TextArea from "../../common/TextArea";
import Cancel from "../../common/btn/Cancel";
import Submit from "../../common/btn/Submit";
import { getVector, addVector, deleteVector, downloadVector } from "../../../actions/vector";
import VectorEdit from './vectorEdit';
import VectorView from './vectorView';
import VectorDelete from './vectorDelete';

export default function Vector() {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [file_name, setFileName] = useState("")
    const [file, setFile] = useState(null)
    const [dataId, setDataId] = useState(null)
    const [vector, setVector] = useState(null)
    const [editModal, setEditModal] = useState(false)
    const [viewModal, setViewModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const dispatch = useDispatch();

    const vectors = useSelector((state) => state.vector.vector);
    const loading = useSelector((state) => state.vector.loading);

    const onNameChange = (e) => {
        setName(e.target.value);
    };

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0]?.name);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();

        form_data.append("file", file, file.name);
        form_data.append("name", name);
        form_data.append("description", description);
        form_data.append("file_name", file_name);
        // form_data.append("project", localStorage.getItem("projectId"));
        dispatch(addVector(form_data));

        setName("");
        setDescription("");
        setFile(null);
        setFileName("");
    };

    const onCancel = (e) => {
        e.preventDefault();
        setName("");
        setDescription("");
        setFile(null);
        setFileName("");
    };

    const onDelete = (id) => {
        dispatch(deleteVector(id))
    }

    const download = id => {
        dispatch(downloadVector(id))
    }

    useEffect(() => {
        setIsLoading(loading)
        dispatch(getVector())
    }, [dispatch, loading])
    return (
        <div>
            {isLoading ?
                <ReactLoading type={"spokes"} color={"#116f85"} height={100} width={100} /> :
                <div>
                    <VectorView cond={viewModal} setCond={setViewModal} name={vector} />
                    <VectorEdit cond={editModal} setCond={setEditModal} />
                    <VectorDelete cond={deleteModal} setCond={setDeleteModal} id={dataId} handleDelete={onDelete} />
                    <div className="row">
                        <div className="col-lg-6 required">
                            <FormLabel name="Name" />
                            <FormInput
                                name={"Suitability"}
                                onChange={onNameChange}
                                placeholder="Enter name of vector..."
                                required="required"
                                value={name}
                            />
                        </div>

                        <div className="col-lg-6 ">
                            <FormLabel name="Description" />
                            <TextArea
                                name="description"
                                value={description}
                                rows="1"
                                onChange={onDescriptionChange}
                                placeholder="Add description of the vector..."
                            />
                        </div>
                    </div>
                    <div className="row col-lg-6">
                        <FormFile
                            onChange={handleFileChange}
                            accept=".zip"
                            placeholder="Upload vector file"
                            value={file}
                        />
                    </div>
                    <div className="row float-right mx-auto">
                        <Submit name="Submit" onClick={onSubmit} />
                        <Cancel onClick={onCancel} />
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-12 mt-5">
                            <h3>Vector List</h3>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>File</th>
                                        <th>View</th>
                                        <th>Download</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vectors.map((vector) => {
                                        return (
                                            <tr key={vector.id}>
                                                <td>{vector.name}</td>
                                                <td>{vector.description}</td>
                                                <td>{vector.file_name}</td>
                                                <td>
                                                    <i className="fas fa-eye" onClick={() => { setVector(vector.file_name.split(".")[0]); setViewModal(true) }}></i>
                                                </td>
                                                <td>
                                                    <i className="fas fa-download" onClick={() => download(vector.id)}></i>
                                                </td>
                                                <td>
                                                    <i className="fas fa-edit" onClick={() => setEditModal(true)}></i>
                                                </td>
                                                <td>
                                                    <i className="fas fa-trash-alt" onClick={() => { setDataId(vector.id); setDeleteModal(true) }}></i>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>}
        </div>
    )
}
