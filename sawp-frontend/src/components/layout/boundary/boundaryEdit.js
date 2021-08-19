import { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import FormLabel from "../../common/FormLabel";
import FormInput from "../../common/FormInput";
import TextArea from "../../common/TextArea";

export default function BoundaryEdit(props) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [modal, setModal] = useState(false)
    const handleClose = () => setModal(false)
    const onNameChange = (e) => setName(e.target.value);
    const onDescriptionChange = (e) => setDescription(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit")
    }
    useEffect(() => {
        if (props.cond === true) {
            setModal(true);
            props.setCond(false)
        }
    }, [props.cond, props])
    return (
        <>
            <Modal show={modal} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Boundary Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-6 required">
                            <FormLabel name="Name" />
                            <FormInput
                                name={"Suitability"}
                                onChange={onNameChange}
                                placeholder="Enter name of boundary..."
                                required="required"
                                value={name}
                            />
                        </div>

                        <div className="col-lg-6 ">
                            <FormLabel name="Description" />
                            <TextArea
                                name="description"
                                value={description}
                                rows="1"
                                onChange={onDescriptionChange}
                                placeholder="Add description of the boundary..."
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
