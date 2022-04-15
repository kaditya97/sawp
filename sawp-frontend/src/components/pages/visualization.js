import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Map, TileLayer, WMSTileLayer, withLeaflet, ScaleControl } from 'react-leaflet';
import Control from 'react-leaflet-control'
import ReactLoading from 'react-loading';
import { getSuitability } from "../../actions/suitability"
import LayerListing from '../layout/layerListing'
import Legend from '../layout/legend';
import Style from '../layout/style';
import northArrow from '../../static/img/north_arrow.png';
import { getRasterStyles } from '../../actions/geoserver';
import PrintControlDefault from 'react-leaflet-easyprint';

const PrintControl = withLeaflet(PrintControlDefault);

export default function Visualization() {
    const [isLoading, setIsLoading] = useState(false);
    const [layer, setLayer] = useState(null);
    const [opacity, setOpacity] = useState(1.0)
    const [mytime, setMytime] = useState(new Date().getTime())
    const [legendWindow, setLegendWindow] = useState(false);
    const [styleWindow, setStyleWindow] = useState(false);
    const [ishidden, setIshidden] = useState("none");
    const dispatch = useDispatch()
    const printMap = useRef(null);
    const wmslayer = useRef(null);

    const suitabilities = useSelector((state) => state.suitability.suitability);
    const loading = useSelector((state) => state.suitability.loading);

    const getLegendUrl = () => {
        const baseURL = process.env.REACT_APP_GEOSERVER_URL;
        const url =
            baseURL +
            `/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=sawp:${layer?.name}`;
        return url;
    }

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
                            ref={wmslayer}
                            layers={`sawp:${layer?.name}`}
                            url={`http://127.0.0.1:8080/geoserver/wms`}
                            transparent={true}
                            opacity={opacity}
                            format={'image/png'}
                            time={mytime}
                        />
                        <Control position="bottomright">
                            <div className='printlegend' style={{display: ishidden}}>
                            <h3>{layer?.name}</h3>
                            <img
                                src={getLegendUrl()}
                                alt="legend"
                                className={"vis-legend img-fluid"}
                            />
                            </div>
                        </Control>
                        <Control position="topright">
                            <div className='printlegend' style={{display: ishidden}}>
                                <img src={northArrow} alt="north-arrow" className="north-arrow" width={30} height={50}/>
                            </div>
                        </Control>
                        <ScaleControl position="bottomleft" />
                        <PrintControl ref={printMap} hidden={true} title="Suitability" position="topright" sizeModes={['A4Landscape']} hideControlContainer={false} exportOnly />
                    </Map>
                    <div className="left-sidebar">
                        <LayerListing
                            layers={suitabilities}
                            layer={layer}
                            setLayer={setLayer}
                            printMap={printMap}
                            setIshidden={setIshidden}
                            view={opacity}
                            setView={setOpacity}
                            setLegendWindow={setLegendWindow}
                            styleWindow={styleWindow}
                            setStyleWindow={setStyleWindow} />
                    </div>
                    {styleWindow && <Style
                        styleWindow={styleWindow}
                        setStyleWindow={setStyleWindow}
                        layer={layer}
                        opacity={opacity}
                        setMytime={setMytime}
                        setOpacity={setOpacity} />}
                    {opacity !== 0.0 ? <Legend
                        legendWindow={legendWindow}
                        setLegendWindow={setLegendWindow}
                        layer={layer}
                        workspace={'sawp'}
                    /> : null}
                </div>
            }
        </div>
    )
}
