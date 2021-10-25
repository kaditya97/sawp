import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Rnd } from "react-rnd";
import { Scrollbars } from 'react-custom-scrollbars-2';

function Legend(props) {
    const [legendHeight, setLegendHeight] = useState("40vh");

    const activeLayers = [
        {
            id: "1",
            name: "Final Overlay",
            workspace: "sawp",
            layer_name: "final_suitability",
        }
    ];

    const closeLegendWindow = () => {
        props.setLegendWindow(false);
    };

    const onLegendTogglerClick = (e) => {
        e.preventDefault();
        props.setLegendWindow(true);
    };

    const getLegendUrl = (layer) => {
        const { layer_name, workspace } = layer;
        const baseURL = process.env.REACT_APP_GEOSERVER_URL;
        const url =
            baseURL +
            `/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${workspace}:${layer_name}`;
        return url;
    }
    return (
        <>
            {!props.legendWindow ? (
                <div className="leaflet-control legend-btn">
                    <a href="/" onClick={onLegendTogglerClick}>
                        View legend
                    </a>
                </div>
            ) : (
                <div className="leaflet-control legend-abs">
                    <Rnd
                        default={{
                            x: 0,
                            y: 0,
                            width: 200,
                            height: legendHeight,
                        }}
                        onResize={(e, direction, ref, delta, position) => {
                            setLegendHeight(ref.style.height);
                        }}
                        minHeight="250px"
                        minWidth="200px"
                        className="mapLegend"
                    >
                        <Scrollbars
                            autoHeight
                            autoHeightMax={legendHeight}
                            className="custom-scrollbars">
                            <Alert onClose={closeLegendWindow} dismissible>
                                <Alert.Heading>Map legend</Alert.Heading>
                                <hr />
                                {activeLayers.map((layer) => (
                                    <>
                                        <div key={layer.id}>{layer.name}</div>
                                        <p>
                                            <img
                                                src={getLegendUrl(layer)}
                                                alt="legend"
                                                className={"vis-legend img-fluid " + layer.layer_name}
                                            />
                                        </p>
                                        <br className={layer.layer_name}></br>
                                    </>
                                ))}
                            </Alert>
                        </Scrollbars>
                    </Rnd>
                </div>
            )}
        </>
    );
}

export default Legend;
