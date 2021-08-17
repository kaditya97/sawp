import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import FormLabel from "../common/FormLabel";
import FormInput from "../common/FormInput";
import FormFile from "../common/FormFile";
import TextArea from "../common/TextArea";
import Cancel from "../common/btn/Cancel";
import Submit from "../common/btn/Submit";
import { getVector, addVector, deleteVector } from "../../actions/vector";

export default function Vector() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [file_name, setFileName] = useState("")
    const [file, setFile] = useState(null)
    const dispatch = useDispatch();

    const vectors = useSelector((state) => state.vector.vector);
    
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
        console.log(form_data.file);
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

    useEffect(() => {
        dispatch(getVector())
    }, [dispatch])
    return (
        <div>
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
                    accept=".zip,.shp"
                    placeholder="Upload vector file"
                    value={file}
                />
            </div>
            <div className="row float-right mx-auto">
                <Submit name="Submit" onClick={onSubmit}/>
                <Cancel onClick={onCancel} />
            </div>
            <div className="row mt-5">
                <div className="col-lg-12">
                    <h3>Vector List</h3>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>File</th>
                                <th>Action</th>
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
                                            <a href="." onClick={() => {
                                                dispatch(deleteVector(vector.id))
                                            }}>Delete</a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
