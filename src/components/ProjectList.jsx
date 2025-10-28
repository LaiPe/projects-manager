import { useState } from 'react';
import useList from '../hooks/useList';

const PROJECTS = [
    { id: 1, name: 'Project Alpha', creatorId: 101 },
    { id: 2, name: 'Project Beta', creatorId: 102 },
    { id: 3, name: 'Project Gamma', creatorId: 103 },
];

function ProjectList() {

    const handleAddProject = (e) => {
        const newProject = {
            id: Date.now(),
            name: e.target[0].value,
            creatorId: 999 // Example creator ID
        };
        addItem(newProject);
    }

    const {list, deleteItem, addItem} = useList(PROJECTS);

    return (
        <div>
            <h2>Project List</h2>
            <ul>
                {list.map(project => (
                    <li key={project.id}>
                        {project.name} (Created by User {project.creatorId})
                        <button onClick={() => deleteItem(project)}>Delete</button>
                    </li>
                ))}
                <AddProjectForm onAddProject={handleAddProject} />
            </ul>

        </div>
    );
}

function AddProjectForm({ onAddProject }) {
    const [isOpened, setIsOpened] = useState(false);

    const toggleForm = () => {
        setIsOpened(!isOpened);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddProject(e);
        setIsOpened(false);
    }

    return (
        <li>
            {!isOpened && <button onClick={toggleForm}>Add Project</button>}
            {isOpened && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Project Name"
                        required
                    />
                    <button type="submit">Create</button>
                </form>
            )}
        </li>
    );
}

export default ProjectList;