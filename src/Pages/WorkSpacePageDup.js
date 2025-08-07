import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { GoArrowLeft } from "react-icons/go";

import '../styles/workspace.css'

import { useNavigate } from 'react-router-dom';

import AddProjectModal from '../Components/WorkSpace/AddProjectModal';
import AddVariableModal from '../Components/WorkSpace/AddVariableModal';

import { getProjects } from '../api/APIService/ProjectAPI';
import { getFieldTypes, deleteFieldTypes } from '../api/APIService/FieldTypeAPI';

const WorkSpacePageDup = () => {
    const navigate = useNavigate();

    const handleToGo = (path) => {
        if (!path) navigate('/'); // Navigate to the '/about' route
        else navigate(`${path}`);
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

    useEffect(() => {
        if (deleteData.length !== 0) setShowDelBtn(true);
        else setShowDelBtn(false);
    }, [deleteData])
    // ฟังค์ชันที่เก็บค่าของ deleteData
    const onChangeDeleteCheckBox = (checked, value) => {
        console.log("DeleteCheckBox", checked, typeof (value));

        if (checked) {
            setDeleteData(prev => [...prev, value]);
        } else {
            setDeleteData(prev => prev.filter(data => data !== value));
        }
    }
    // แล้วเอาค่านี้แหละ ไปใช้ต่อที่ onclickDelete

    const onclickDelete = async () => {
        console.log("want to delete::", deleteData);
        const result = deleteData.map(del => {
            const value = projects.some(project =>
                project.variable.some(variable =>
                    variable.id === del.id && variable.checked
                )
            );
            return {
                "project_name": del.name,
                "is_use": value
            }
        })

        console.log("can DEL::", result);
        
        // try {
        //     const res = await deleteFieldTypes({
        //         data: deleteData
        //     });
        //     console.log("res:", res);
        //     await handleVariableAdded();

        // } catch (err) {
        //     console.error("Error fetching data:", err);
        // }

    }

    return (
        <>
            {/* PROJECT */}
            <Container fluid="md" style={{ height: "50vh" }}>
                <GoArrowLeft onClick={() => handleToGo("/workspace")} />
                <h1 onClick={() => handleToGo()}>Project DUPLICATE</h1>
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
                            < Col xs lg="4" key={index} style={{ marginBottom: "10px" }}>
                                <div className='workspace-btn' onClick={() => { setAddProjectShow(true); setProject(project); }}>
                                    {project.name}
                                </div>
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
                                <div className='workspace-btn'
                                    onClick={() => { setAddVaribleShow(true); setVariable(variable); }}>
                                    <Form.Label>{variable.name}</Form.Label>
                                    <Form.Check type='checkbox'
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
        </>
    )
}

export default WorkSpacePageDup;