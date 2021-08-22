import React from 'react'

export default function StyleChanger(props) {
    const handleChange = (e) => {
        props.setStyle(e.target.value)
    }
    return (
        <div className="leaflet-control float-right">
            <select class="form-select p-1 bg-info text-light" aria-label="style changer" onChange={handleChange}>
                <option selected value="raster_bw">Choose Style</option>
                {props.styles.styles.style.map((style, index) => {
                    return (
                        <option key={index} value={style.name}>{style.name}</option>
                    )
                })}
            </select>
        </div>
    )
}
