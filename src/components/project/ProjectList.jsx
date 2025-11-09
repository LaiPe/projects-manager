import AddProjectForm from './AddProjectForm';
import ProjectItem from './ProjectItem';

import {ListProvider, useListContext } from '../../contexts/ListContext';

const MOCKUP_PROJECTS = [
    { id: 1, name: 'Projet Alpha', creatorId: 101 },
    { id: 2, name: 'Projet Beta', creatorId: 102 },
    { id: 3, name: 'Projet Gamma', creatorId: 103 },
];

function ProjectList({ projects=MOCKUP_PROJECTS, onError }) {
    return (
        <div>
            <ListProvider initialItems={projects}>
                <ProjectListContent onError={onError} />
            </ListProvider>
        </div>
    );
}


function ProjectListContent({onError}) {
    const projects = useListContext();
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="mb-1">Mes Projets</h1>
                    <p className="text-muted mb-0">Gérez et suivez l'avancement de vos projets</p>
                </div>
                {projects.length > 0 && (
                    <span className="badge bg-primary fs-6">{projects.length} projet{projects.length > 1 ? 's' : ''}</span>
                )}
            </div>

            <div className="container">
                <div className="row g-4">
                    {projects.map(project => (
                        <div key={project.id} className="col-12 col-md-6 col-lg-4">
                            <ProjectItem 
                                project={project}
                                onError={onError}
                            />
                        </div>
                    ))}
                    <div className="col-12 col-md-6 col-lg-4">
                        <AddProjectForm onError={onError} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectList;