import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getRasterStyles } from "../../../actions/geoserver"
import {Modal} from 'react-bootstrap'
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet'
import StyleChanger from '../styleChanger';
const geoserverUrl = process.env.REACT_APP_GEOSERVER_URL;

export default function RasterView(props) {
    const [modal, setModal] = useState(false)
    const handleClose = () => setModal(false)
    const [map, setMap] = useState(null)
    const [opacity, setOpacity] = useState(1.0)
    const [style, setStyle] = useState("raster_bw")
    const dispatch = useDispatch();

    const styles = useSelector((state) => state.geoserver.styles);
    useEffect(() => {
        dispatch(getRasterStyles());
        if(props.cond === true){
          setModal(true);
          props.setCond(false)
        }
      }, [props.cond, props, dispatch]);
    return (
        <>
            <Modal show={modal} onHide={handleClose} size="lg" onEntered={() => map.invalidateSize()}>
                <Modal.Header closeButton className="p-2 bg-warning text-sucess">
                    <Modal.Title>View Raster Data</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="mapview">
                        <Map center={[28.20, 84.0]} zoom={11} zoomControl={false} ref={m => setMap(m && m.leafletElement)}>
                            <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <WMSTileLayer
                                layers={`sawp:${props.name}`}
                                url={`${geoserverUrl}/wms`}
                                styles={[`sawp:${style}`]}
                                opacity={opacity}
                                transparent={true}
                                format={'image/png'} 
                            />
                            {/* <StyleChanger styles={styles} setStyle={setStyle} opacity={opacity} setOpacity={setOpacity}/> */}
                        </Map>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
