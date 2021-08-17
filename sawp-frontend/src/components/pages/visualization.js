import React from 'react'
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet'
import LayerListing from '../layout/layerListing'

export default function Visualization() {
    return (
        <div className="visualization">
            <div style={{height: "89vh", width: "100%"}}>
                <Map center={[28.3949, 84.1240]} zoom={7} zoomControl={false}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <WMSTileLayer
                            layers={`topp:states`}
                            url={`http://127.0.0.1:8080/geoserver/wms`}
                            transparent={true}
                            format={'image/png'} 
                        />
                </Map>
                <div className="left-sidebar">
                    <LayerListing />
                </div>
            </div>
        </div>
    )
}
