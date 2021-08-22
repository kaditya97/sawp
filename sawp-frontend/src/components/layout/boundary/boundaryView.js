import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getVectorStyles } from "../../../actions/geoserver"
import {Modal} from 'react-bootstrap'
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet'
import StyleChanger from '../styleChanger';

export default function BoundaryView(props) {
    const [modal, setModal] = useState(false)
    const handleClose = () => setModal(false)
    const [map, setMap] = useState(null)
    const [style, setStyle] = useState("polygon")
    const dispatch = useDispatch();

    const styles = useSelector((state) => state.geoserver.styles);
    useEffect(() => {
        dispatch(getVectorStyles())
        if(props.cond === true){
          setModal(true);
          props.setCond(false)
        }
      }, [props.cond, props, dispatch])
    return (
        <>
            <Modal show={modal} onHide={handleClose} size="lg" onEntered={() => map.invalidateSize()}>
                <Modal.Header closeButton className="p-2 bg-warning text-sucess">
                    <Modal.Title>View Boundary Data</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="mapview">
                        <Map center={[28.20, 84.0]} zoom={11} zoomControl={false} ref={m => setMap(m && m.leafletElement)}>
                            <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <WMSTileLayer
                                layers={`sawp:${props.name}`}
                                url={`http://127.0.0.1:8080/geoserver/wfs`}
                                styles={[`${style}`]}
                                transparent={true}
                                format={'image/png'} 
                            />
                            <StyleChanger styles={styles} setStyle={setStyle}/>
                        </Map>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
