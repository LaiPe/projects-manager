import { useCallback, memo } from 'react';
import AddProjectForm from './AddProjectForm';
import ProjectItem from './ProjectItem';

import ListProvider, { useListContext } from '../context/ListContext';

const PROJECTS = [
    { id: 1, name: 'Project Alpha', creatorId: 101 },
    { id: 2, name: 'Project Beta', creatorId: 102 },
    { id: 3, name: 'Project Gamma', creatorId: 103 },
];

function ProjectList() {
    console.log('Render ProjectList');

    return (
        <div>
            <h2>Project List</h2>
            <ListProvider initialItems={PROJECTS}>
                <ProjectListContent />
            </ListProvider>
        </div>
    );
}


function ProjectListContent() {
    const projects = useListContext();

    return (
        <ul>
            {projects.map(project => (
                <ProjectItem 
                    key={project.id} 
                    project={project} 
                />
            ))}
            <AddProjectForm />
        </ul>
    );
}

export default ProjectList;