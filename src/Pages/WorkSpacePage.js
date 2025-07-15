import React, { useState } from 'react'

import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import '../styles/workspace.css'
import variable_list from './workspace.json'
import project_list from './project_list.json'

import IMG from '../img/IMG.jpg'

const WorkSpacePage = () => {
    const [addProjectShow, setAddProjectShow] = useState(false);
    const [addVaribleShow, setAddVaribleShow] = useState(false);
    const [variable, setVariable] = useState({});
    const [project, setProject] = useState({});


    const addProjectClose = () => setAddProjectShow(false);
    const addVaribleClose = () => setAddVaribleShow(false);

    const AddProjectModal = (props) => {
        console.log("wasd", props);
        return (
            <Modal
                {...props}
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
                            <Form.Control type="text" value={props.value ? props.value.name : ""} />
                        </Form.Group>
                        <h4>Variable</h4>
                        {
                            variable_list.map((variable, index) => (
                                <Form.Group className='mb-3' key={index}>
                                    <Form.Label>{variable.variable_label}</Form.Label>
                                    {variable.variable_type === "2" ? (
                                        <Form.Control type="number" step="1" />
                                    ) : variable.variable_type === "3" ? (
                                        <Form.Control as="textarea" />
                                    ) : variable.variable_type === "4" || variable.variable_type === "5" || variable.variable_type === "6" ? (
                                        <Form.Control type="number" />
                                    ) : variable.variable_type === "7" ? (
                                        <Form.Check type="checkbox" />
                                    ) : variable.variable_type === "8" ? (
                                        <Form.Control type="date" />
                                    ) : <Form.Control type="text" />
                                    }
                                </Form.Group>
                            ))
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={addProjectClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addProjectClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const AddVariableModal = (props) => {
        const [showTag, setShowTag] = useState(false);
        const [tag, setTag] = useState("");

        const handleRadioChange = (e) => {
            const target = e.target.value
            console.log(target);
            setTag(target)
            setShowTag(true)
        }

        const AddTags = (props) => {
            if (tag === "rate")
                return (
                    <Form.Group>
                        <Form.Label>Rate</Form.Label>
                    </Form.Group>
                )
            else if (tag === "descript")
                return (
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                    </Form.Group>
                )
            else return (
                <Form.Group>
                    <Form.Label>Tag</Form.Label>
                </Form.Group>
            )
        }

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Variable
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Variable Name</Form.Label>
                        <Form.Group className='mb-3'>
                            <Form.Control type="text" value={props.value ? props.value.variable_label : ''} />
                        </Form.Group>
                        <Form.Label>Variable Type</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={props.value ? props.value.variable_type : ''}>
                                <option value="1">VARCHAR(100)</option>
                                <option value="2">BINARY</option>
                                <option value="3">TEXT(1000)</option>
                                <option value="4">INT</option>
                                <option value="5">FLOAT</option>
                                <option value="6">DECIMAL</option>
                                <option value="7">BOOLEAN</option>
                                <option value="8">DATETIME</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Check inline label="A" type='radio' name='group1' value={"rate"} onChange={handleRadioChange} />
                            <Form.Check inline label="B" type='radio' name='group1' value={"descript"} onChange={handleRadioChange} />
                            <Form.Check inline label="C" type='radio' name='group1' value={"tag"} onChange={handleRadioChange} />
                        </Form.Group>

                        {showTag && (
                            <AddTags />
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={addVaribleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addVaribleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    return (
        <>
            <Container fluid="md" style={{ height: "50vh" }}>
                <h1>Project</h1>
                <Row style={{ borderBottom: "1px solid gray", paddingBottom: "10px" }}>
                    <Col style={{ textAlign: "right" }}>
                        <Button variant="danger" onClick={() => { setAddProjectShow(true); setProject(); }}>Add Project</Button>
                        <AddProjectModal
                            value={project}
                            show={addProjectShow}
                            onHide={() => setAddProjectShow(false)}
                        />
                    </Col>
                </Row>
                <Row style={{ paddingTop: "10px", textAlign: "center" }}>
                    {
                        project_list.map((project, index) => (
                            < Col xs lg="3" key={index} style={{ marginBottom: "10px" }}>
                                <Button variant="danger" onClick={() => { setAddProjectShow(true); setProject(project); }}>{project.name}</Button>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
            <Container fluid="md">
                <h1>Variable</h1>
                <Row style={{ borderBottom: "1px solid gray", paddingBottom: "10px" }}>
                    <Col style={{ textAlign: "right" }}>
                        <Button variant="danger" onClick={() => { setAddVaribleShow(true); setVariable() }}>Add Variable</Button>
                        <AddVariableModal
                            value={variable}
                            show={addVaribleShow}
                            onHide={() => setAddVaribleShow(false)}
                        />
                    </Col>
                </Row>
                <Row style={{ paddingTop: "10px", textAlign: "center", margin: "10px" }}>
                    {
                        variable_list.map((variable, index) => (
                            < Col xs lg="3" key={index} style={{ marginBottom: "10px" }}>
                                <Button variant="danger" onClick={() => { setAddVaribleShow(true); setVariable(variable); }}>{variable.variable_label}</Button>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
            <Container fluid="md" style={{ textAlign: "center", border: "1px solid red" }}>
                <Row>
                    <Col>
                        <img src={IMG} alt='' style={{ width: "100px", height: "55px" }} />
                    </Col>
                </Row>
                <Row>
                    <Col onClick={() => setAddVaribleShow(true)}>

                        <h3 className='custom-btn'>Add Project</h3>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default WorkSpacePage;