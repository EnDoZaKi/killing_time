import React, { useState } from 'react'

import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import '../App.css'
import variable_list from './workspace.json'

const WorkSpacePage = () => {
    const [addProjectShow, setAddProjectShow] = useState(false);
    const [addVaribleShow, setAddVaribleShow] = useState(false);
    const [variable, setVariable] = useState({});

    const addProjectClose = () => setAddProjectShow(false);
    const addVaribleClose = () => setAddVaribleShow(false);

    // แบบนี้ป่าว
    const AddProjectModal = (props) => {
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
                        <Form.Group className="mb-3">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
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
        console.log(props);
        
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
                        <Form.Group className='mb-3'>
                            <Form.Label>Variable Name</Form.Label>
                            <Form.Control type="text">{props.value.variable_name}</Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Variable Type</Form.Label>
                            <Form.Select aria-label="Default select example">
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
                        <Button variant="danger" onClick={() => setAddProjectShow(true)}>Add Project</Button>
                        {/*                       onclick ใช้จริงๆคือรูปแบบนี้ () => ตามด้วยการเรียก function */}
                        {/* เป็นการเรียกเปิด Popup ใช่ป่าว  */}
                        {/* ช่ายยยยย ดูจากตรงนั้นได้ */}
                        <AddProjectModal
                            show={addProjectShow}
                            onHide={() => setAddProjectShow(false)}
                        />
                    </Col>
                </Row>
                <Row style={{ paddingTop: "10px", textAlign: "center" }}>
                    <Col xs lg="3" style={{ marginBottom: "10px" }}>
                        <Button variant="danger" onClick={() => setAddProjectShow(true)}>Project Name</Button>
                    </Col>
                    <Col xs lg="3">
                        <Button variant="danger" onClick={() => setAddProjectShow(true)}>Project Name</Button>
                    </Col>
                    <Col xs lg="3">
                        <Button variant="danger" onClick={() => setAddProjectShow(true)}>Project Name</Button>
                    </Col>
                    <Col xs lg="3">
                        <Button variant="danger" onClick={() => setAddProjectShow(true)}>Project Name</Button>
                    </Col>
                    <Col xs lg="3">
                        <Button variant="danger" onClick={() => setAddProjectShow(true)}>Project Name</Button>
                    </Col>
                    <Col xs lg="3">
                        <Button variant="danger" onClick={() => setAddProjectShow(true)}>Project Name</Button>
                    </Col>
                    <Col xs lg="3">
                        <Button variant="danger" onClick={() => setAddProjectShow(true)}>Project Name</Button>
                    </Col>
                    <Col xs lg="3">
                        <Button variant="danger" onClick={() => setAddProjectShow(true)}>Project Name</Button>
                    </Col>
                    <Col xs lg="3">
                        <Button variant="danger" onClick={() => setAddProjectShow(true)}>Project Name</Button>
                    </Col>
                    <Col xs lg="3">
                        <Button variant="danger" onClick={() => setAddProjectShow(true)}>Project Name</Button>
                    </Col>
                    <Col xs lg="3">
                        <Button variant="danger" onClick={() => setAddProjectShow(true)}>Project Name</Button>
                    </Col>
                    <Col xs lg="3">
                        <Button variant="danger" onClick={() => setAddProjectShow(true)}>Project Name</Button>
                    </Col>
                </Row>
            </Container>
            <Container fluid="md">
                <h1>Variable</h1>
                <Row style={{ borderBottom: "1px solid gray", paddingBottom: "10px" }}>
                    <Col style={{ textAlign: "right" }}>
                        <Button variant="danger" onClick={() => setAddVaribleShow(true)}>Add Variable</Button>
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
            </Container >
        </>
    )
}

export default WorkSpacePage;