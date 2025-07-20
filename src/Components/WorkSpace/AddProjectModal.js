import React, { forwardRef, useRef, useEffect, useState, useImperativeHandle } from 'react'

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { addProject, getProjects, deleteProject, updateProject } from '../../api/APIService/ProjectAPI'

const AddProjectModal = (props) => {
    console.log("ProjectModal", props.value);

    const [name, setName] = useState("");
    const [fieldType, setFieldType] = useState([]);

    useEffect(() => {
        if (props.value.variable) {
            console.log("variable::", props.value.variable);

            const updated = []
            props.value.variable.map((item, index) => (
                updated[index] = item
            ))
            setFieldType(updated)
            setName(props.value.name)
        } else {
            console.log("no variable");
            const updated = []
            props.variables.map((variable, index) => (
                updated[index] = [variable.name, false]
            ))
            setFieldType(updated)
        }
    }, [props])

    const handleAddFieldType = (index, checked, value) => {
        console.log(index, checked, value);

        const updated = [...fieldType]
        if (checked) updated[index] = [value, checked]
        else updated[index] = [value, false]
        setFieldType(updated);
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
                    Add Project
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Project Name</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <h4>Variable</h4>
                    <Form.Group className='mb-3'>
                        {fieldType.map((item, index) => (
                            <Form.Check inline type='checkbox' key={index} label={item[0]}
                                value={item[0]} checked={item[1]}
                                onChange={(e) => handleAddFieldType(index, e.target.checked, e.target.value)} />
                        ))}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.onHide}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddProjectModal;