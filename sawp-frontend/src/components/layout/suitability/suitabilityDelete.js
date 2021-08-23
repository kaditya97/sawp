import {useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'

export default function SuitabilityDelete(props) {
    const [modal, setModal] = useState(false)
    const handleClose = () => setModal(false)
    useEffect(() => {
        if(props.cond === true){
          setModal(true);
          props.setCond(false)
        }
      }, [props.cond, props])
    return (
        <>
            <Modal show={modal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Delete Suitability Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this Suitability data?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-default" onClick={handleClose}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={() => {props.handleDelete(props.id);handleClose()}}>Delete</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
