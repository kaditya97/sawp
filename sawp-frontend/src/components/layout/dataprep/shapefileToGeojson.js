import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import FormLabel from "../../common/FormLabel";
import FormFile from "../../common/FormFile";
import Submit from "../../common/btn/Submit";
import { shapefileToGeoJSON } from '../../../actions/dataPrep';

export default function ShapefileToGeojson() {
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState("")
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();

        form_data.append("file", file, file.name);
        form_data.append("file_name", fileName);
        dispatch(shapefileToGeoJSON(form_data))
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
                <h3 className="text-center heading">Shapefile To Geojson</h3>
                <div className="row mx-5">
                    <div className="row col-lg-12 m-1">
                        <FormLabel name="Shapefile File" />
                        <FormFile
                            onChange={handleFileChange}
                            accept=".zip"
                            placeholder="Select shapefile file"
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
