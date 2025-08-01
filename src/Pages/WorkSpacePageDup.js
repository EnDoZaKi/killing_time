import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import '../styles/workspace.css'

import { useNavigate } from 'react-router-dom';

import AddProjectModal from '../Components/WorkSpace/AddProjectModal';
import AddVariableModal from '../Components/WorkSpace/AddVariableModal';
import AddTags from '../Components/WorkSpace/AddTags';

import { getProjects } from '../api/APIService/ProjectAPI';
import { getFieldTypes, deleteFieldTypes } from '../api/APIService/FieldTypeAPI';

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

    const loadData = async () => {
        const fieldTypes = await getFieldTypes();
        setVariables(fieldTypes);
        const projects = await getProjects();
        setProjects(projects)
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleVariableAdded = async () => {
        await loadData(); // ⬅️ run only once on success
        setAddProjectShow(false); // close modal
        setAddVaribleShow(false);// close modal
    };

    const [showDelBtn, setShowDelBtn] = useState(false);
    const [deleteData, setDeleteData] = useState([]); // ค่านี้ๆ

    // ฟังค์ชันที่เก็บค่าของ deleteData
    const onChangeDeleteCheckBox = (checked, value) => {
        console.log("DeleteCheckBox", checked, typeof (value));

        if (checked) {
            setDeleteData(prev => [...prev, value]);
        } else {
            setDeleteData(prev => prev.filter(data => data !== value));
            if (deleteData) setShowDelBtn(false);
        }
    }
    // แล้วเอาค่านี้แหละ ไปใช้ต่อที่ onclickDelete

    const onclickDelete = async () => {
        console.log("want to delete::", deleteData);
        try {
            const res = await deleteFieldTypes({
                data: deleteData
            });
            console.log("res:", res);
            await handleVariableAdded();

        } catch (err) {
            console.error("Error fetching data:", err);
        }

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
                                variables={variables}
                                onHide={() => setAddProjectShow(false)}
                                onAdded={handleVariableAdded}
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
                <h1>Field Type</h1>
                <Row style={{ borderBottom: "1px solid gray", paddingBottom: "10px" }}>
                    <Col style={{ textAlign: "right" }}>
                        <Button variant="danger" onClick={() => { setAddVaribleShow(true); setVariable(); }}>Add Field Type</Button>
                        {addVaribleShow && (
                            <AddVariableModal
                                value={variable}
                                show={addVaribleShow}
                                onHide={() => setAddVaribleShow(false)}
                                onAdded={handleVariableAdded}
                            />
                        )}
                        {showDelBtn && (
                            <Button variant="danger" style={{ marginLeft: "10px" }} onClick={() => onclickDelete()}>DEL</Button>
                        )}

                    </Col>
                </Row>
                <Row style={{ paddingTop: "10px", margin: "10px" }}>
                    {
                        variables.map((variable, index) => (
                            < Col xs lg="4" key={index} style={{ marginBottom: "10px" }}>
                                <div variant="danger"
                                    style={{ backgroundColor: "grey", border: "1px solid grey", borderRadius: "10px", color: "black", padding: "10px" }}
                                    onClick={() => { setAddVaribleShow(true); setVariable(variable); }}>
                                    <Form.Label>{variable.name}</Form.Label>
                                    <Form.Check className="mb-3" reverse type='checkbox'
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            setShowDelBtn(true);
                                            onChangeDeleteCheckBox(e.target.checked, variable);
                                        }}
                                        onClick={(e) => e.stopPropagation()} />
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
            {/* <Container fluid="md" style={{ textAlign: "center", border: "1px solid red" }}>
                <Row>
                    <Col>
                        <img src={IMG} alt='' style={{ width: "100px", height: "55px" }} />
                    </Col>
                </Row>
                <Row>
                    <Col onClick={() => { loadData() }}>
                        <h3 className='custom-btn'>Refresh</h3>
                    </Col>
                </Row>
            </Container> */}
            <AddTags />
        </>
    )
}

export default WorkSpacePageDup;