import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet'
import ReactLoading from 'react-loading';
import { getSuitability } from "../../actions/suitability"
import LayerListing from '../layout/layerListing'
import Legend from '../layout/legend';
import Style from '../layout/style';
import { getRasterStyles } from '../../actions/geoserver';

export default function Visualization() {
    const [isLoading, setIsLoading] = useState(false);
    const [layer, setLayer] = useState('final_suitability');
    const [style, setStyle] = useState('raster_web');
    const [opacity, setOpacity] = useState(1.0)
    const [legendWindow, setLegendWindow] = useState(true)
    const [styleWindow, setStyleWindow] = useState(false)
    const dispatch = useDispatch()

    const suitabilities = useSelector((state) => state.suitability.suitability);
    const loading = useSelector((state) => state.suitability.loading);
    const styles = useSelector((state) => state.geoserver.styles);

    useEffect(() => {
        setIsLoading(loading);
        dispatch(getSuitability())
        dispatch(getRasterStyles())
    }, [dispatch, loading])
    return (
        <div className="visualization">
            {isLoading ?
                <div className="d-flex justify-content-center align-items-center" style={{ height: "91vh", width: "100%" }}>
                    <ReactLoading type={"spokes"} color={"#116f85"} height={100} width={100} />
                </div> :
                <div style={{ height: "91vh", width: "100%" }}>
                    <Map center={[28.20, 84.0]} zoom={12} zoomControl={false}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <WMSTileLayer
                            layers={`sawp:${layer}`}
                            url={`http://127.0.0.1:8080/geoserver/wms`}
                            styles={[`sawp:${style}`]}
                            transparent={true}
                            opacity={opacity}
                            format={'image/png'}
                        />
                    </Map>
                    <div className="left-sidebar">
                        <LayerListing
                            layers={suitabilities}
                            layer={layer}
                            setLayer={setLayer}
                            view={opacity}
                            setView={setOpacity}
                            setLegendWindow={setLegendWindow}
                            styleWindow={styleWindow}
                            setStyleWindow={setStyleWindow} />
                    </div>
                    {styleWindow && <Style
                        styleWindow={styleWindow}
                        setStyleWindow={setStyleWindow}
                        styles={styles}
                        setStyle={setStyle}
                        opacity={opacity}
                        setOpacity={setOpacity} />}
                    {opacity !== 0.0 ? <Legend legendWindow={legendWindow} setLegendWindow={setLegendWindow} /> : null}
                </div>
            }
        </div>
    )
}
