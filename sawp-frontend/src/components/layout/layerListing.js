import React, {useState} from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';

export default function LayerListing(props) {
    const [layerListingToggle, setLayerListingToogle] = useState(true)
    const onLayerListingTogglerClick = (e) => {
        setLayerListingToogle(!layerListingToggle);
      };

    const handleClick = (e) => {
      e.target.checked ? props.setView(1.0) : props.setView(0.0);
    };

    const layers = [
        {
            id: 1,
            name: 'Layer 1',
        },
        {
            id: 2,
            name: 'Layer 2',
        },
        {
            id: 3,
            name: 'Layer 3',
        },
        {
            id: 4,
            name: 'Layer 4',
        },
        {
            id: 5,
            name: 'Layer 5',
        },
        {
            id: 6,
            name: 'Layer 6',
        },
        {
            id: 7,
            name: 'Layer 7',
        },
        {
            id: 8,
            name: 'Layer 8',
        },
    ]
    return (
        <div
        className={`leaflet-control ${
          layerListingToggle ? "layerListing" : "layerListing-hide"
        }`}
      >
        <div className="layerlisting-sidebar-overflow">
          {/* layer listing toggler button  */}
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
                <div key={layer.id} className="layers" style={{verticalAlign: "middle"}}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    name="layer"
                    id={layer.id}
                    // defaultChecked={activeLayers.some(
                    //   (l) => l.id === layer.id
                    // )}
                    onChange={handleClick}
                  />
                  <label htmlFor={layer.id}>{layer.name}</label>
                  {/* <i
                    className="fas fa-ellipsis-h float-right position-relative mr-4 optionToggler"
                    onClick={this.onOptionTogglerClick.bind(this, layer.id)}
                  >
                    {option && layer.id === activeOption && <Options />}
                  </i> */}
                </div>
              ))}
          </Scrollbars>
          </div>
        </div>
      </div>
    )
}
