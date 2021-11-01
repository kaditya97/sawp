import React, { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';

export default function LayerListing(props) {
  const [layerListingToggle, setLayerListingToogle] = useState(true)
  const onLayerListingTogglerClick = (e) => {
    setLayerListingToogle(!layerListingToggle);
  };

  const handleClick = (e) => {
    const layer = props.layers.find(layer => layer.name === e.target.value);
    props.setLayer(layer);
    e.target.checked ? props.setLegendWindow(true) : props.setLegendWindow(false);
  };

  // useEffect(() => {
  //   props.setLayer(props.layers?.[0]);
  // }, [props.layers])
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
            <i
              className="fas fa-edit float-right position-relative mr-4 optionToggler"
              onClick={() => { props.setStyleWindow(!props.styleWindow) }}
            ></i>
          </h4>
          <Scrollbars
            autoHeight
            autoHeightMax={270}
            className="custom-scrollbars">

            {props.layers?.map((layer) => (
              <>
                <div className="form-check mt-2 mb-1" key={layer.id} onChange={handleClick} style={{ verticalAlign: "middle" }}>
                  <input className="form-check-input mr-2" type="radio" name="layer" defaultValue={layer.name} />
                  <label className="form-check-label" htmlFor="layer"><h3>{layer.name}</h3></label>
                </div>
              </>
            ))}
          </Scrollbars>
        </div>
      </div>
    </div>
  )
}
