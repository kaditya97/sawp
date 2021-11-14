import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormLabel from "../../common/FormLabel";
import FormInput from "../../common/FormInput";
import FormFile from "../../common/FormFile";
import Submit from "../../common/btn/Submit";
import { bufferVector } from '../../../actions/dataPrep';

export default function BufferVector() {
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState("")
    const [buffer, setBuffer] = useState(null)
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();

        form_data.append("file", file, file.name);
        form_data.append("file_name", fileName);
        form_data.append("buffer", buffer);
        dispatch(bufferVector(form_data));
        setFile(null);
        setFileName("");
        setBuffer(null);
    };

    const onBufferChange = (e) => {
        setBuffer(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0]?.name);
    };
    return (
        <div>
            <div className="container-fluid mt-5">
                <h3 className="text-center heading">Buffer Vector</h3>
                <div className="row mx-5">
                    <div className="col-xl-12">
                        <div className="row">
                            <div className="row col-lg-12 m-1">
                                <FormLabel name="Vector File" />
                                <FormFile
                                    onChange={handleFileChange}
                                    accept=".zip"
                                    placeholder="Select Vector file"
                                    value={file}
                                />
                            </div>
                            <div className="row col-lg-12 m-1">
                                <FormLabel name="Buffer Value"/>
                                <FormInput
                                    name={"Buffer"}
                                    onChange={onBufferChange}
                                    placeholder="Enter buffer value"
                                    required="required"
                                    value={buffer}
                                />
                            </div>
                            <div className="row float-right mx-auto">
                                <Submit name="Submit" onClick={onSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
