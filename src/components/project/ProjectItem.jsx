import { memo, useState } from 'react';

import { useListDispatchMethodsContext } from '../context/ListContext';

const ProjectItem = memo(({ project }) => {

    console.log('Render ProjectItem for project:', project.name);

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
                        <button type="submit">Update</button>
                        <button type="button" onClick={toggleForm}>Cancel</button>
                    </form>
                </li>
            ) : (
                <li>
                    {project.id} {project.name} (Created by User {project.creatorId})
                    <button onClick={toggleForm}>Edit</button>
                    <button onClick={() => onDelete(project)}>Delete</button>
                </li>
            )}

        </>
    );
});

ProjectItem.displayName = 'ProjectItem';

export default ProjectItem;