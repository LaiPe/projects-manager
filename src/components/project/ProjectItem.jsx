import { memo, useState } from 'react';

import { useListDispatchMethodsContext } from '../../contexts/ListContext';

const ProjectItem = memo(({ project }) => {
    const { deleteItem: onDelete, updateItem: onUpdate } = useListDispatchMethodsContext();
    const [isEditing, setIsEditing] = useState(false);

    const toggleForm = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const editedName = e.target[0].value;
        onUpdate({ id: project.id, name: editedName });
        setIsEditing(false);
    };

    return (
        <>
            { isEditing ? (
                <li>
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            defaultValue={project.name}
                            required
                        />
                        <button type="submit">Valider</button>
                        <button type="button" onClick={toggleForm}>Annuler</button>
                    </form>
                </li>
            ) : (
                <li>
                    {project.id} {project.name} (Créé par l'utilisateur {project.creatorId})
                    <button onClick={toggleForm}>Modifier</button>
                    <button onClick={() => onDelete(project)}>Supprimer</button>
                </li>
            )}

        </>
    );
});

ProjectItem.displayName = 'ProjectItem';

export default ProjectItem;