import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { addFieldType, deleteFieldType, updateFieldType } from '../../api/APIService/FieldTypeAPI';

const AddVariableModal = (props) => {

    const [showTag, setShowTag] = useState(false);
    const [name, setName] = useState("");
    const [fieldType, setFieldType] = useState("");
    const [description, setDescription] = useState("");

    const [alert, setAlert] = useState(false);
    const [alertAt, setAlertAt] = useState("");

    useEffect(() => {

        if (props.value) {
            console.log("Variable!!!");

            setShowTag(true)
            setName(props.value.name)
            setFieldType(props.value.field_type)
            setDescription(props.value.description)
        }
    }, [props]);

    const handleRadioChange = (e) => {
        setFieldType(e.target.value)
        setShowTag(true)
    }

    const addVarible = async () => {
        console.log("addVariable name:", name, "field type:", fieldType, "value:", description);
        if (name !== "" && fieldType !== "" && description !== "") {
            await addFieldType({
                name: name,
                field_type: fieldType,
                description: description
            });
            props.onAdded();

        } else {
            setAlert(true);
            setAlertAt("");
        }
    }

    const updateVarible = async () => {
        const id = props.value.id
        console.log("updateVariable", id, name, fieldType, description);
        if (name !== "" && fieldType !== "" && description !== "") {
            await updateFieldType(id, {
                name: name,
                field_type: fieldType,
                description: description
            });
            
            props.onAdded();

        } else console.log("can't updateVarible", id);
    }

    const deleteVariable = async () => {
        const id = props.value.id
        if (id) {
            await deleteFieldType(id);
            props.onAdded();

        } else console.log("can't deleteVariable", id);
    }

    const AlertModal = (props) => {
        const [body, setBody] = useState("")
        useEffect(() => {
            if (props.alertAt === "edit") setBody("Are you sure to update?")
            else if (props.alertAt === "delete") setBody("Are you sure to delete?")
            else setBody("You aren't completely any field yet.")
        }, [props.alertAt])

        return (
            <Modal
                show={props.show}
                onHide={() => setAlert(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    {props.alertAt === "edit" ? (
                        <Button variant="success" onClick={() => updateVarible()}>Edit</Button>
                    ) : props.alertAt === "delete" ? (
                        <Button variant="danger" onClick={() => deleteVariable()}>Delete</Button>
                    ) : null}
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <Modal
            show={props.show} onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Field Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Field Type Name</Form.Label>
                    <Form.Group className='mb-3'>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Label>Field Type</Form.Label>
                    <Form.Group className='mb-3'>
                        <Form.Check inline label="Date" type='radio'
                            name='group1' value={"date"} checked={fieldType === "date"}
                            onChange={handleRadioChange} />
                        <Form.Check inline label="Tag" type='radio'
                            name='group1' value={"tag"} checked={fieldType === "tag"}
                            onChange={handleRadioChange} />
                        <Form.Check inline label="Staff" type='radio'
                            name='group1' value={"staff"} checked={fieldType === "staff"}
                            onChange={handleRadioChange} />
                    </Form.Group>

                    {showTag && (
                        fieldType === "date" ? (
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Group className='md-3'>
                                    <Form.Check inline label="Specify Date" type='radio' name='group2' value={"specify"}
                                        checked={description === "specify"} onChange={(e) => setDescription(e.target.value)} />
                                    <Form.Check inline label="Date Range" type='radio' name='group2' value={"range"}
                                        checked={description === "range"} onChange={(e) => setDescription(e.target.value)} />
                                </Form.Group>
                            </Form.Group>
                        ) : fieldType === "tag" ? (
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Group>
                                    <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </Form.Group>
                            </Form.Group>
                        ) : fieldType === "staff" ? (
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Group className='md-3'>
                                    <Form.Select aria-label="Default select example"
                                        value={description} onChange={(e) => setDescription(e.target.value)}>
                                        <option value="1">Staff 1</option>
                                        <option value="2">Staff 2</option>
                                        <option value="3">Staff 3</option>
                                        <option value="4">Staff 4</option>
                                        <option value="5">Staff 5</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form.Group>
                        ) : null
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                {props.value ? (
                    <>
                        <Button variant="danger" onClick={() => { setAlert(true); setAlertAt("delete"); }}>
                            Delete
                        </Button>
                        <Button variant="success" onClick={() => { setAlert(true); setAlertAt("edit"); }}>
                            Edit
                        </Button>
                    </>
                ) : (
                    <Button variant="success" onClick={() => addVarible()}>
                        Save
                    </Button>)}
                {alert && (
                    <AlertModal
                        show={alert}
                        alertAt={alertAt}
                        onHide={() => setAlert(false)}
                    />
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default AddVariableModal;