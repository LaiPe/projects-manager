import { memo, useState } from 'react';

import { useListDispatchMethodsContext } from '../context/ListContext';

const AddProjectForm = memo(() => {
    const [isOpened, setIsOpened] = useState(false);

    const addProject = useListDispatchMethodsContext().addItem;

    const toggleForm = () => {
        setIsOpened(!isOpened);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            name: e.target[0].value,
            creatorId: 999
        };
        addProject(newProject);
        setIsOpened(false);
    }

    console.log('Render AddProjectForm');

    return (
        <li>
            { isOpened ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Project Name"
                        required
                    />
                    <button type="submit">Create</button>
                    <button type="button" onClick={toggleForm}>Cancel</button>
                </form>
            ) : (
                <button onClick={toggleForm}>Add Project</button>
            )}
        </li>
    );
});

AddProjectForm.displayName = 'AddProjectForm';

export default AddProjectForm;