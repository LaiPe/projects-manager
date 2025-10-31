import { memo, useState } from 'react';

import { useListDispatchMethodsContext } from '../../contexts/ListContext';

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

    // console.log('Render AddProjectForm');

    return (
        <li>
            { isOpened ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nom du projet"
                        required
                    />
                    <button type="submit">Créer</button>
                    <button type="button" onClick={toggleForm}>Annuler</button>
                </form>
            ) : (
                <button onClick={toggleForm}>Ajouter un projet</button>
            )}
        </li>
    );
});

AddProjectForm.displayName = 'AddProjectForm';

export default AddProjectForm;