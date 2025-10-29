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
            id: Date.now(),
            name: e.target[0].value,
            creatorId: 999
        };
        addProject(newProject);
        setIsOpened(false);
    }

    console.log('Render AddProjectForm');

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
});

AddProjectForm.displayName = 'AddProjectForm';

export default AddProjectForm;