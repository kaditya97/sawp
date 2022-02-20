import React, { useState } from 'react'
import FormLabel from "../../common/FormLabel";
import FormFile from "../../common/FormFile";
import Submit from "../../common/btn/Submit";

export default function RasterToVector() {
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState("")

    const onSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();

        form_data.append("file", file, file.name);
        form_data.append("file_name", fileName);
        // dispatch(bufferVector(form_data));
        setFile(null);
        setFileName("");
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0]?.name);
    };
    return (
        <div>
            <div className="container-fluid mt-5">
                <h3 className="text-center heading">Raster To Vector</h3>
                <div className="row mx-5">
                    <div className="row col-lg-12 m-1">
                        <FormLabel name="Raster File" />
                        <FormFile
                            onChange={handleFileChange}
                            accept=".tif"
                            placeholder="Select Raster file"
                            value={file}
                        />
                    </div>
                    <div className="row float-right mx-auto">
                        <Submit name="Convert" onClick={onSubmit} />
                    </div>
                </div>
            </div>
        </div>
    )
}
