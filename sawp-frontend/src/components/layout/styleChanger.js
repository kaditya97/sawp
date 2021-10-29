import React from 'react'
import Nouislider from 'nouislider-react'

export default function StyleChanger(props) {
    const handleSlider = (e) => {
        props.setOpacity(e[0]/100)
    }
    const handleChange = (e) => {
        props.setStyle(e.target.value)
    }
    return (
        <div className="leaflet-control float-right" style={{height: "200px", width: "200px", background: "white"}}>
            <Nouislider connect="lower" keyboardSupport={true} start={100} range={{ min: 0, max: 100 }} tooltips={true} onUpdate={handleSlider}/>
            <select class="form-select p-1 bg-info text-light mt-5" aria-label="style changer" onChange={handleChange}>
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
