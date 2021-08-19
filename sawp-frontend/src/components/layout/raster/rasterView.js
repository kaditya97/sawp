import {useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet'

export default function RasterView(props) {
    const [modal, setModal] = useState(false)
    const handleClose = () => setModal(false)
    const [map, setMap] = useState(null)
    useEffect(() => {
        if(props.cond === true){
          setModal(true);
          props.setCond(false)
        }
      }, [props.cond, props])
    return (
        <>
            <Modal show={modal} onHide={handleClose} size="lg" onEntered={() => map.invalidateSize()}>
                <Modal.Header closeButton className="p-2">
                    <Modal.Title>View Raster Data</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="mapview">
                        <Map center={[28.20, 84.0]} zoom={11} zoomControl={false} ref={m => setMap(m && m.leafletElement)}>
                            <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <WMSTileLayer
                                layers={`swap:${props.name}`}
                                url={`http://127.0.0.1:8080/geoserver/wms`}
                                transparent={true}
                                format={'image/png'} 
                            />
                        </Map>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
