import React, {useState}  from 'react'
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet'
import LayerListing from '../layout/layerListing'

export default function Visualization() {
    const [opacity, setOpacity] = useState(1.0)
    return (
        <div className="visualization">
            <div style={{height: "89vh", width: "100%"}}>
                <Map center={[28.20, 84.0]} zoom={12} zoomControl={false}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <WMSTileLayer
                            layers={`swap:final_overlay_geo`}
                            url={`http://127.0.0.1:8080/geoserver/wms`}
                            transparent={true}
                            opacity={opacity}
                            format={'image/png'} 
                        />
                </Map>
                <div className="left-sidebar">
                    <LayerListing view={opacity} setView={setOpacity}/>
                </div>
            </div>
        </div>
    )
}
