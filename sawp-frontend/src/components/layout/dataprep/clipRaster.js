import React, {useState} from 'react'
import Select from 'react-select'
import FormLabel from "../../common/FormLabel";
import FormInput from "../../common/FormInput";
import TextArea from "../../common/TextArea";

export default function ClipRaster() {
    const [sname, setSname] = useState('');
    const [description, setDescription] = useState('');

    const dataOptions = [{value: "hi", label: "Option1"}]

    const onNameChange = (e) => {
        setSname(e.target.value);
    };

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    return (
        <div>
            <div className="container-fluid mt-5">
                <h3 className="text-center heading">Clip Raster</h3>
                <div className="row mx-5">
                            <div className="col-xl-12">
                            <div className="row">
                                            <div className="col-lg-6 required">
                                                <FormLabel name="Clipped Raster Name" />
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
                                            <div className="col-md-6 d-inline-block">
                                                <FormLabel name="Raster Layers" />
                                                <Select
                                                    isMulti
                                                    name="raster"
                                                    options={dataOptions}
                                                    // onChange={(v) => handleRasterChange(v)}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                            <div className="col-md-6 d-inline-block">
                                                <FormLabel name="Boundary Layers" />
                                                <Select
                                                    name="boundary"
                                                    options={dataOptions}
                                                    // onChange={(v) => handleBoundaryChange(v)}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
            </div>
        </div>
    )
}
