import { memo, useState, useEffect } from 'react';

import { useListDispatchMethodsContext } from '../../contexts/ListContext';
import { updateProject, deleteProject } from '../../services/ProjectService';

const ProjectItem = memo(({ project, onError }) => {
    const { deleteItem: onDelete, updateItem: onUpdate } = useListDispatchMethodsContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(project.name);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setEditedName(project.name);
    }, [project.name]);

    const toggleForm = () => {
        setIsEditing(!isEditing);
        setError('');
        setEditedName(project.name);
        onError('');
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        onError("");
        setIsSubmitting(true);
        try {
            await updateProject(project.id, { name: editedName, creatorId: project.creatorId });
            onUpdate({ id: project.id, name: editedName });
            setIsEditing(false);
        } catch (error) {
            onError("Erreur lors de la mise à jour du projet");
        } finally {
            setIsSubmitting(false);
        } 
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setEditedName(value);
        if (value.trim() === '') {
            setError('Le nom du projet est requis');
        } else if (value.length < 3) {
            setError('Le nom du projet doit contenir au moins 3 caractères');
        } else if (value.length > 100) {
            setError('Le nom du projet ne doit pas dépasser 100 caractères');
        } else {
            setError('');
        }
    };

    const handleDelete = async () => {
        onError("");
        setIsSubmitting(true);
        try {
            await deleteProject(project.id);
            onDelete(project);
        } catch (error) {
            onError("Erreur lors de la suppression du projet");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            { isEditing ? (
                <li>
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            value={editedName}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" disabled={isSubmitting || error}>Valider</button>
                        <button type="button" onClick={toggleForm} disabled={isSubmitting}>Annuler</button>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                    </form>
                </li>
            ) : (
                <li>
                    {project.id} {project.name} (Créé par l'utilisateur {project.creatorId})
                    <button onClick={toggleForm}>Modifier</button>
                    <button onClick={handleDelete}>Supprimer</button>
                </li>
            )}

        </>
    );
});

ProjectItem.displayName = 'ProjectItem';

export default ProjectItem;