import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { addProject, deleteProject, updateProject } from '../../api/APIService/ProjectAPI'

const AddProjectModal = (props) => {

    const [name, setName] = useState("");
    const [fieldType, setFieldType] = useState([]);

    const [alert, setAlert] = useState(false);
    const [alertAt, setAlertAt] = useState("");

    useEffect(() => {
        if (props.value.variable) {
            // console.log("variable::", props.value.variable);
            const variable = props.value.variable;
            // Create the new array
            const result = props.variables.map(item => {

                const value = variable.some(obj => obj.name === item.name) ? variable.find(obj => obj.name === item.name) : {
                    "id": item.id,
                    "name": item.name,
                    "checked": false
                };

                return {
                    "id": value.id,
                    "name": value.name,
                    "checked": value.checked
                };
            });

            setFieldType(result)
            setName(props.value.name)
        } else {
            console.log("no variable");
            const updated = []
            props.variables.map((variable, index) => (
                updated[index] = {
                    "id": variable.id,
                    "name": variable.name,
                    "checked": false
                }
            ))
            setFieldType(updated)
        }
    }, [props])

    const handleAddFieldType = (index, checked, value) => {
        console.log(index, checked, value);

        const updated = [...fieldType]
        if (checked) updated[index] = {
            "id": value.id,
            "name": value.name,
            "checked": checked
        }
        else updated[index] = {
            "id": value,
            "name": value.name,
            "checked": false
        }
        setFieldType(updated);
    }

    const addNewProject = async () => {
        // console.log(name, fieldType);
        if (name !== "" && fieldType) {
            await addProject({
                name: name,
                variable: fieldType
            })

            props.onAdded();
        } else {
            setAlert(true);
            setAlertAt("");
        }
    }

    const updateThisProject = async () => {
        const id = props.value.id
        console.log("updateVariable", id, name, fieldType);
        if (name !== "" && fieldType) {
            await updateProject(id, {
                name: name,
                variable: fieldType
            });

            props.onAdded();

        } else console.log("can't updateVarible", id);
    }

    const deleteThisProject = async () => {
        const id = props.value.id
        if (id) {
            await deleteProject(id);
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
                        <Button variant="success" onClick={() => updateThisProject()}>Edit</Button>
                    ) : props.alertAt === "delete" ? (
                        <Button variant="danger" onClick={() => deleteThisProject()}>Delete</Button>
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
                            <Form.Check inline type='checkbox' key={index} label={item.name}
                                value={item} checked={item.checked}
                                onChange={(e) => handleAddFieldType(index, e.target.checked, item)} />
                        ))}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                {props.value.variable ? (
                    <>
                        <Button variant="danger" onClick={() => { setAlert(true); setAlertAt("delete"); }}>
                            Delete
                        </Button>
                        <Button variant="success" onClick={() => { setAlert(true); setAlertAt("edit"); }}>
                            Edit
                        </Button>
                    </>
                ) : (
                    <Button variant="success" onClick={() => addNewProject()}>
                        Save
                    </Button>
                )}
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

export default AddProjectModal;