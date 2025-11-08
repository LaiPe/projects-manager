import { useEffect, useState } from 'react';
import { useListDispatchMethodsContext } from '../../contexts/ListContext';
import { updateTaskStatus, updateTask, deleteTask } from '../../services/TaskService';
import { getUserById } from '../../services/UserService';

function TaskItem({ task, onError, modifyMode }) {
    const [editedStatus, setEditedStatus] = useState(task.status);
    const { updateItem: onUpdate } = useListDispatchMethodsContext();

    useEffect(() => {
        setEditedStatus(task.status);
    }, [task.status]);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setEditedStatus(newStatus);
        try {
            await updateTaskStatus(task.id, newStatus);
            onUpdate({ id: task.id, status: newStatus });   
        } catch (error) {
            onError('Erreur lors de la mise à jour du statut de la tâche.');
        }
    };

    if (modifyMode) {
        const [isEditing, setIsEditing] = useState(false);
        const [editedTitle, setEditedTitle] = useState(task.title);
        const [editedAssigneeId, setEditedAssigneeId] = useState(task.assigneeId);
        const [titleError, setTitleError] = useState('');
        const [assigneeError, setAssigneeError] = useState('');
        const [isSubmitting, setIsSubmitting] = useState(false);
        const { deleteItem: onDelete } = useListDispatchMethodsContext();

        useEffect(() => {
            setEditedTitle(task.title);
            setEditedAssigneeId(task.assigneeId);
        }, [task.title]);

        const toggleForm = () => {
            setIsEditing(!isEditing);
            setEditedTitle(task.title);
            setEditedStatus(task.status);
            setEditedAssigneeId(task.assigneeId);
            onError('');
            setTitleError('');
            setAssigneeError('');
        }

        const handleUpdate = async (e) => {
            e.preventDefault();
            onError("");
            setIsSubmitting(true);
            try {
                await updateTask(task.id, { title: editedTitle, assigneeId: editedAssigneeId });
                onUpdate({ id: task.id, title: editedTitle, assigneeId: editedAssigneeId });
                toggleForm();
            } catch (error) {
                onError("Erreur lors de la mise à jour de la tâche.");
            } finally {
                setIsSubmitting(false);
            }
        }

        const handleTitleChange = (e) => {
            const value = e.target.value;
            setEditedTitle(value);
            if (value.trim() === '') {
                setTitleError('Le titre de la tâche est requis');
            } else if (value.length < 3) {
                setTitleError('Le titre de la tâche doit contenir au moins 3 caractères');
            } else if (value.length > 70) {
                setTitleError('Le titre de la tâche ne doit pas dépasser 70 caractères');
            } else {
                setTitleError('');
            }
        }

        const handleAssigneeChange = async (e) => {
            const value = e.target.value;
            setAssigneeError('');
            setEditedAssigneeId(value);

            if (!isNaN(value) && value > 0) {
                try {
                    await getUserById(value);
                } catch (error) {
                    console.error('Erreur lors de la vérification de l\'utilisateur assigné:', error);
                    setAssigneeError("ID Utilisateur assigné invalide");
                }
            } else {
                setAssigneeError("Veuillez entrer un ID utilisateur valide");
            }  
        }

        const handleDelete = async () => {
            onError("");
            setIsSubmitting(true);
            try {
                await deleteTask(task.id);
                onDelete(task);
            } catch (error) {
                onError('Erreur lors de la suppression de la tâche.');
            } finally {
                setIsSubmitting(false);
            }
        }

        return (
            <>
                { isEditing ? (
                    <li>
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={handleTitleChange}
                                disabled={isSubmitting}
                            />
                            {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
                            <input 
                                type="number"
                                value={editedAssigneeId}
                                onChange={handleAssigneeChange}
                                disabled={isSubmitting}
                            />
                            {assigneeError && <p style={{ color: 'red' }}>{assigneeError}</p>}
                            <button type="submit" disabled={isSubmitting || titleError || assigneeError}>Enregistrer</button>
                            <button type="button" onClick={toggleForm} disabled={isSubmitting}>Annuler</button>
                        </form>

                    </li>
                ) : (
                    <li>
                        {task.id} {task.title} : à réaliser par l'utilisateur {task.assigneeId}
                        <select
                            value={editedStatus}
                            onChange={handleStatusChange}
                        >
                            <option value="TODO">À faire</option>
                            <option value="IN_PROGRESS">En cours</option>
                            <option value="DONE">Terminé</option>
                        </select>
                        <button onClick={toggleForm}>Modifier</button>
                        <button onClick={handleDelete}>Supprimer</button>
                    </li>
                )}
            </>
        );
    } 
    else {
        return (
            <li>
                {task.id} {task.title} (associé au projet : {task?.project?.name})
                <select
                    value={editedStatus}
                    onChange={handleStatusChange}
                >
                    <option value="TODO">À faire</option>
                    <option value="IN_PROGRESS">En cours</option>
                    <option value="DONE">Terminé</option>
                </select>
            </li>
        );
    }
}

export default TaskItem;