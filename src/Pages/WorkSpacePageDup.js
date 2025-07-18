import React, { forwardRef, useRef, useEffect, useState, useImperativeHandle } from 'react'

import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import '../styles/workspace.css'
// import variable_list from '../json/variable.json'
import project_list from '../api/json/project.json'

import IMG from '../img/IMG.jpg'
import { useNavigate } from 'react-router-dom';

import { addFieldType, getFieldTypes, deleteFieldType, updateFieldType } from '../api/APIService/FieldTypeAPI';
import { addProject, getProjects, deleteProject, updateProject } from '../api/APIService/ProjectAPI';

const WorkSpacePageDup = () => {
    const navigate = useNavigate();

    const handleToGo = () => {
        navigate('/'); // Navigate to the '/about' route
    };

    const [addProjectShow, setAddProjectShow] = useState(false);
    const [addVaribleShow, setAddVaribleShow] = useState(false);
    const [variable, setVariable] = useState({});
    const [variables, setVariables] = useState([]);
    const [project, setProject] = useState({});
    const [projects, setProjects] = useState([]);

    const addProjectClose = () => setAddProjectShow(false);
    const addVaribleClose = () => setAddVaribleShow(false);

    const loadData = async () => {
        const fieldTypes = await getFieldTypes();
        setVariables(fieldTypes);
        const projects = await getProjects();
        setProjects(projects)
    };

    useEffect(() => {
        loadData();
    }, [])

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
                variables.map((variable, index) => (
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
        console.log("VariableModal", props.value);

        const [showTag, setShowTag] = useState(false);
        const [name, setName] = useState("");
        const [fieldType, setFieldType] = useState("");
        const [description, setDescription] = useState("");
        const addTagsRef = useRef();

        const handleRadioChange = (e) => {
            setFieldType(e.target.value)
            setShowTag(true)
        }

        useEffect(() => {

            if (props.value) {
                console.log("Variable!!!");

                setShowTag(true)
                setName(props.value.name)
                setFieldType(props.value.field_type)
                setDescription(props.value.description)
            }


        }, [props]);

        const AddTags = forwardRef((props, ref) => {
            const [descriptionTag, setDescriptionTag] = useState(props.value);

            useImperativeHandle(ref, () => ({
                getDescription: () => descriptionTag
            }));

            if (fieldType === "date")
                return (
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Group className='md-3'>
                            <Form.Check inline label="Specify Date" type='radio' name='group2' value={"specify"}
                                checked={descriptionTag === "specify"} onChange={(e) => setDescriptionTag(e.target.value)} />
                            <Form.Check inline label="Date Range" type='radio' name='group2' value={"range"}
                                checked={descriptionTag === "range"} onChange={(e) => setDescriptionTag(e.target.value)} />
                        </Form.Group>
                    </Form.Group>
                )
            else if (fieldType === "tag")
                return (
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Group>
                            <Form.Control type="text" value={descriptionTag} onChange={(e) => setDescriptionTag(e.target.value)} />
                        </Form.Group>
                    </Form.Group>
                )
            else return (
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Group className='md-3'>
                        <Form.Select aria-label="Default select example"
                            value={descriptionTag} onChange={(e) => setDescriptionTag(e.target.value)}>
                            <option value="1">Staff 1</option>
                            <option value="2">Staff 2</option>
                            <option value="3">Staff 3</option>
                            <option value="4">Staff 4</option>
                            <option value="5">Staff 5</option>
                        </Form.Select>
                    </Form.Group>
                </Form.Group>
            )
        });

        const addVarible = async () => {
            const value = addTagsRef.current.getDescription();
            console.log("addVariable", name, fieldType, value);
            if (name && fieldType && value) {
                await addFieldType({
                    name: name,
                    field_type: fieldType,
                    description: value
                });
                // addVaribleClose();
            } else console.log("AddVariable no variable");
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
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Label>Variable Type</Form.Label>
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
                            <AddTags value={description} ref={addTagsRef} />
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={addVaribleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => addVarible(name, fieldType)}>
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
                        {addProjectShow && (
                            <AddProjectModal
                                value={project}
                                show={addProjectShow}
                                onHide={() => setAddProjectShow(false)}
                            />
                        )}
                    </Col>
                </Row>
                <Row style={{ paddingTop: "10px", textAlign: "center" }}>
                    {
                        projects.map((project, index) => (
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
                        {addVaribleShow && (
                            <AddVariableModal
                                value={variable}
                                show={addVaribleShow}
                                onHide={() => setAddVaribleShow(false)}
                            />
                        )}
                    </Col>
                </Row>
                <Row style={{ paddingTop: "10px", textAlign: "center", margin: "10px" }}>
                    {
                        variables.map((variable, index) => (
                            < Col xs lg="3" key={index} style={{ marginBottom: "10px" }}>
                                <Button variant="danger" onClick={() => { setAddVaribleShow(true); setVariable(variable); }}>{variable.name}</Button>
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
                    <Col onClick={() => { setAddVaribleShow(true); setVariable() }}>
                        <h3 className='custom-btn'>Add Project</h3>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default WorkSpacePageDup;