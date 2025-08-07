import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { addProject, deleteProject, updateProject } from '../../api/APIService/ProjectAPI'

const ProjectModal = (props) => {

    const [name, setName] = useState("");
    const [fieldType, setFieldType] = useState([]);

    const [alert, setAlert] = useState(false);
    const [alertAt, setAlertAt] = useState("");

    useEffect(() => {
        if (props.value.variable) {
            // console.log("variable::", props.value.variable);
            const variables = props.value.variable;
            const fieldType_list = props.variables
            // Create the new array
            const result = variables.map(item => {
                const value = item.checked ? fieldType_list.find(fieldType => fieldType.id === item.id) : {};

                return value;
            });
            const filteredArray = result.filter(obj => {
                return Object.keys(obj).length > 0;
            });
            setFieldType(filteredArray)
            setName(props.value.name)
        }
    }, [props])

    useEffect(() => {
        console.log(fieldType);

    }, [fieldType]);

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
            scrollable={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Project Name: {name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        {fieldType.map((item, index) => (
                            <>
                                <Form.Label>{item.name}</Form.Label>
                                {item.field_type === "date" ? (
                                    item.description === "specify" ? (
                                        <Form.Control key={index} type="date" />
                                    ) : (
                                        <>
                                            <Form.Label>{item.name}</Form.Label>
                                            <InputGroup className="mb-3" key={index}>
                                                <InputGroup.Text>From</InputGroup.Text>
                                                <Form.Control type="date" />
                                                <InputGroup.Text>To</InputGroup.Text>
                                                <Form.Control type="date" />
                                            </InputGroup>
                                        </>
                                    )
                                ) : item.field_type === "tag" ? (
                                    item.description.map((tag, tagIndex) => {
                                        if (tagIndex % 2 === 0) {
                                            const nextItem = item.description[tagIndex + 1];

                                            return (
                                                <InputGroup key={index} style={{ paddingBottom: "5px" }}>
                                                    <InputGroup.Text>{tag}</InputGroup.Text>
                                                    <Form.Control key={tag} type='text' />
                                                    {nextItem && (
                                                        <>
                                                            <InputGroup.Text>{nextItem}</InputGroup.Text>
                                                            <Form.Control key={nextItem} type='text' />
                                                        </>
                                                    )}
                                                </InputGroup>
                                            )
                                        }
                                        return null;
                                    })
                                ) : item.field_type === "staff" ? (
                                    <Form.Control key={index} type='text' />
                                ) : null}
                            </>
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

export default ProjectModal;