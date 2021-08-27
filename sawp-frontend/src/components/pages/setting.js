import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'

export default function Setting() {
    return (
        <div className="home">
        <Scrollbars
                autoHeight
                autoHeightMax={"89vh"}
                className="custom-scrollbars">
            <div className="container-fluid mt-5">
            <h3 className="text-center heading">Settings</h3>
                <div className="row mx-5">
                    <label forHTML="location">Location</label>
                    <input type="text" name="location" id="location" placeholder="lat,lng"></input>
                </div>
            </div>
        </Scrollbars>
        </div>
    )
}
