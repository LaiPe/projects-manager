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
            <h2>Liste des projets</h2>
            <ListProvider initialItems={projects}>
                <ProjectListContent onError={onError} />
            </ListProvider>
        </div>
    );
}


function ProjectListContent({onError}) {
    const projects = useListContext();
    return (
        <ul>
            {projects.map(project => (
                <ProjectItem 
                    key={project.id} 
                    project={project}
                    onError={onError}
                />
            ))}
            <AddProjectForm onError={onError} />
        </ul>
    );
}

export default ProjectList;