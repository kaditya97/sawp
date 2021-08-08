import React from 'react'
import { Map, TileLayer } from 'react-leaflet'

export default function Visualization() {
    return (
        <div style={{height: "89vh", width: "100%"}}>
            <Map center={[28.3949, 84.1240]} zoom={7} zoomControl={false}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
              </Map>
        </div>
    )
}
