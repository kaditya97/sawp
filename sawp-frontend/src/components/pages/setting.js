import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'

export default function Setting() {
    const bufferChange = (e) => {
        localStorage.setItem("buffer_distance", e.target.value)
    }
    return (
        <div className="home">
        <Scrollbars
                autoHeight
                autoHeightMax={"89vh"}
                className="custom-scrollbars">
            <div className="container-fluid mt-5">
            <h3 className="text-center heading">Settings</h3>
                {/* <div className="row mx-5">
                    <label forHTML="location">Location</label>
                    <input type="text" name="location" id="location" placeholder="lat,lng"></input>
                </div> */}
                <div className="row mx-5">
                    <label forHTML="buffer_distance" className='mr-5'>Buffer Distance</label>
                    <input type="text" name="buffer_distance" id="buffer_distance" defaultValue={localStorage.getItem("buffer_distance")} onChange={e => bufferChange(e)}></input>
                </div>
            </div>
        </Scrollbars>
        </div>
    )
}
