import React, { useState } from 'react'

import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import '../styles/workspace.css'
import variable_list from '../json/variable.json'
import project_list from '../json/project.json'

import IMG from '../img/IMG.jpg'
import { useNavigate } from 'react-router-dom';

const WorkSpacePageDup = () => {
    const navigate = useNavigate();

    const handleToGo = () => {
        navigate('/'); // Navigate to the '/about' route
    };

    const [addProjectShow, setAddProjectShow] = useState(false);
    const [addVaribleShow, setAddVaribleShow] = useState(false);
    const [variable, setVariable] = useState({});
    const [project, setProject] = useState({});


    const addProjectClose = () => setAddProjectShow(false);
    const addVaribleClose = () => setAddVaribleShow(false);

    const AddProjectModal = (props) => {
        console.log("wasd", props.value);
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
                            props.value.variable ? (
                                props.value.variable.map((item, index) => (
                                    <Form.Group className='mb-3' key={index}>
                                        {
                                            item.variable_type !== "7" ? (
                                                <Form.Label>{item.variable_label}</Form.Label>
                                            ) : null
                                        }
                                        {
                                            item.variable_type === "2" ? (
                                                <Form.Control type="number" step="1"
                                                    value={item.value ? item.value : ""} />
                                            ) : item.variable_type === "3" ? (
                                                <Form.Control as="textarea"
                                                    value={item.value ? item.value : ""} />
                                            ) : item.variable_type === "4" || item.variable_type === "5" || item.variable_type === "6" ? (
                                                <Form.Control type="number"
                                                    value={item.value ? item.value : ""} />
                                            ) : item.variable_type === "7" ? (
                                                <Form.Check type="checkbox" label={item.variable_label}
                                                    checked={item.value ? item.value : ""} />
                                            ) : item.variable_type === "8" ? (
                                                <Form.Control type="date"
                                                    value={item.value ? item.value : ""} />
                                            ) : <Form.Control type="text"
                                                value={item.value ? item.value : ""} />
                                        }
                                    </Form.Group>
                                ))
                            ) : (
                                variable_list.map((variable, index) => (
                                    <Form.Group className='mb-3' key={index}>
                                        {
                                            variable.variable_type !== "7" ? (
                                                <Form.Label>{variable.variable_label}</Form.Label>
                                            ) : null
                                        }
                                        {
                                            variable.variable_type === "2" ? (
                                                <Form.Control type="number" step="1" />
                                            ) : variable.variable_type === "3" ? (
                                                <Form.Control as="textarea" />
                                            ) : variable.variable_type === "4" || variable.variable_type === "5" || variable.variable_type === "6" ? (
                                                <Form.Control type="number" />
                                            ) : variable.variable_type === "7" ? (
                                                <Form.Check type="checkbox" label={variable.variable_label} />
                                            ) : variable.variable_type === "8" ? (
                                                <Form.Control type="date" />
                                            ) : <Form.Control type="text" />
                                        }
                                    </Form.Group>
                                ))
                            )
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
            setTag(target)
            setShowTag(true)
        }

        const AddTags = () => {
            if (tag === "date")
                return (
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Group className='md-3'>
                            <Form.Check inline label="Specify Date" type='radio'
                                name='group2' value={"specify"} />
                            <Form.Check inline label="Date Range" type='radio'
                                name='group2' value={"range"} />
                        </Form.Group>
                    </Form.Group>
                )
            else if (tag === "tag")
                return (
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Group>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form.Group>
                )
            else return (
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Group className='md-3'>
                        <Form.Select aria-label="Default select example">
                            <option value="1">Staff 1</option>
                            <option value="2">Staff 2</option>
                            <option value="3">Staff 3</option>
                            <option value="4">Staff 4</option>
                            <option value="5">Staff 5</option>
                        </Form.Select>
                    </Form.Group>
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
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Label>Variable Type</Form.Label>
                        <Form.Group className='mb-3'>
                            <Form.Check inline label="A" type='radio'
                                name='group1' value={"date"}
                                onChange={handleRadioChange} />
                            <Form.Check inline label="B" type='radio'
                                name='group1' value={"tag"}
                                onChange={handleRadioChange} />
                            <Form.Check inline label="C" type='radio'
                                name='group1' value={"staff"}
                                onChange={handleRadioChange} />
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
            {/* PROJECT */}
            <Container fluid="md" style={{ height: "50vh" }}>
                <h1 onClick={handleToGo}>Project DUPLICATE</h1>
                <Row style={{ borderBottom: "1px solid gray", paddingBottom: "10px" }}>
                    <Col style={{ textAlign: "right" }}>
                        <Button variant="danger" onClick={() => { setAddProjectShow(true); setProject({}); }}>Add Project</Button>
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

            {/* VARIABLE */}
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

export default WorkSpacePageDup;