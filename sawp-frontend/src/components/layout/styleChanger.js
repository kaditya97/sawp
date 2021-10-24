import React from 'react'

export default function StyleChanger(props) {
    const handleOpacity = (e) => {
        const opacity = e.target.value
        props.setOpacity(opacity)
    }
    const handleChange = (e) => {
        props.setStyle(e.target.value)
    }
    return (
        <div className="leaflet-control float-right">
            <div className="form-group d-flex inline">
                {/* <label className="mr-sm-2">Opacity</label> */}
                <input type="range" min="0" max="1" step="0.01" defaultValue={props.opacity} onChange={handleOpacity} className="form-control" />
            </div>
            <select class="form-select p-1 bg-info text-light" aria-label="style changer" onChange={handleChange}>
                <option selected value="raster_bw">Choose Style</option>
                {props.styles?.styles?.style.map((style, index) => {
                    return (
                        <option key={index} value={style.name}>{style.name}</option>
                    )
                })}
            </select>
        </div>
    )
}
