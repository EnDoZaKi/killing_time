import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../styles/workspace.css'

import IMG from '../img/IMG.jpg'
import { useNavigate } from 'react-router-dom';

import AddProjectModal from '../Components/WorkSpace/AddProjectModal';
import AddVariableModal from '../Components/WorkSpace/AddVariableModal';

import { getProjects } from '../api/APIService/ProjectAPI';
import { getFieldTypes } from '../api/APIService/FieldTypeAPI';

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
                        <Button variant="danger" onClick={() => { setAddVaribleShow(true); setVariable() }}>Add Field Type</Button>
                        {addVaribleShow && (
                            <AddVariableModal
                                value={variable}
                                show={addVaribleShow}
                                onHide={() => setAddVaribleShow(false)}
                                onAdded={handleVariableAdded}
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
                    <Col onClick={() => { loadData() }}>
                        <h3 className='custom-btn'>Refresh</h3>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default WorkSpacePageDup;