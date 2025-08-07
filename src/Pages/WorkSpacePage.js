import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProjectModal from '../Components/WorkSpace/ProjectModal';
import '../styles/workspace.css'
import { getProjects } from '../api/APIService/ProjectAPI';
import { getFieldTypes } from '../api/APIService/FieldTypeAPI';

import { useNavigate } from 'react-router-dom';

const WorkSpacePage = () => {
    const navigate = useNavigate();

    const handleToGo = () => {
        navigate('/workspacedup'); // Navigate to the '/about' route
    };

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [variables, setVariables] = useState([]);
    const [ProjectShow, setProjectShow] = useState(false);

    const loadData = async () => {
        const fieldTypes = await getFieldTypes();
        setVariables(fieldTypes);
        const projects = await getProjects();
        setProjects(projects)
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            {/* PROJECT */}
            <Container fluid="md" style={{ height: "50vh" }}>
                <h1 onClick={handleToGo}>Project</h1>
                {ProjectShow && (
                    <ProjectModal
                        value={project}
                        variables={variables}
                        show={ProjectShow}
                        onHide={() => setProjectShow(false)}
                    />
                )}
                <Row style={{ paddingTop: "10px", textAlign: "center" }}>
                    {
                        projects.map((project, index) => (
                            < Col xs lg="4" key={index} style={{ marginBottom: "10px" }}>
                                <div className='workspace-btn' onClick={() => { setProjectShow(true); setProject(project); }}>
                                    {project.name}
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default WorkSpacePage;