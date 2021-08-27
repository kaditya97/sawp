import React, { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';

export default function LayerListing(props) {
  const [layerListingToggle, setLayerListingToogle] = useState(true)
  const onLayerListingTogglerClick = (e) => {
    setLayerListingToogle(!layerListingToggle);
  };

  const handleClick = (e) => {
    e.target.checked ? props.setView(1.0) : props.setView(0.0);
    e.target.checked ? props.setLegendWindow(true) : props.setLegendWindow(false);
  };

  const layers = [
    {
      id: "1",
      name: "Final Overlay",
      workspace: "swap",
      layer_name: "final_overlay_geo",
    }
  ]
  return (
    <div
      className={`leaflet-control ${layerListingToggle ? "layerListing" : "layerListing-hide"
        }`}
    >
      <div className="layerlisting-sidebar-overflow">
        <div
          className="leaflet-control layerlisting-sidebar-btn"
          onClick={onLayerListingTogglerClick}
        >
          <i className="fas fa-caret-right"></i>
        </div>
        <div className="ml-2">
          <h4>
            <span>Layers</span>
          </h4>
          <Scrollbars
            autoHeight
            autoHeightMax={270}
            className="custom-scrollbars">

            {layers.map((layer) => (
              <div key={layer.id} className="layers" style={{ verticalAlign: "middle" }}>
                <input
                  type="checkbox"
                  className="mr-2"
                  name="layer"
                  id={layer.id}
                  defaultChecked={true}
                  onChange={handleClick}
                />
                <label htmlFor={layer.id}>{layer.name}</label>
                <i
                  className="fas fa-edit float-right position-relative mr-4 optionToggler"
                  onClick={() => {props.setStyleWindow(!props.styleWindow)}}
                ></i>
              </div>
            ))}
          </Scrollbars>
        </div>
      </div>
    </div>
  )
}
