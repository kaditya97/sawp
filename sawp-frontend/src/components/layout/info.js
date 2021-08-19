import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';

export default function Info(props) {
    const [visible, setVisible] = React.useState(false);
    const handleClick = () => setVisible(!visible);
    return (
        <div>
            <div className="col help">
                <Scrollbars
                    autoHeight
                    autoHeightMax={380}
                    className="custom-scrollbars">
                    <div style={{ paddingRight: "10px" }}>
                        <h3 className="heading">Help</h3>
                        <p>{props.info ? props.info : "How to do it"}</p>
                        <Button variant='secondary' onClick={handleClick}>Watch video tutorial</Button>
                    </div>
                </Scrollbars>
            </div>

            <Modal
                show={visible}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClick}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-capitalize">Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <iframe className="video-iframe" src="" frameBorder="0" title="video"></iframe>
                </Modal.Body>
            </Modal>
        </div>
    )
}
