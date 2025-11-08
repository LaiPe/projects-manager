import { memo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useListDispatchMethodsContext } from '../../contexts/ListContext';
import { useAuth } from '../../contexts/AuthContext';

import { createTask } from '../../services/TaskService';
import { getUserById } from '../../services/UserService';

const AddTaskForm = memo(({ onError }) => {
    const { user } = useAuth();
    const { projectId } = useParams();
    const [isOpened, setIsOpened] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [assigneeId, setAssigneeId] = useState(null);
    const [titleError, setTitleError] = useState('');
    const [assigneeError, setAssigneeError] = useState('');
    const addTask = useListDispatchMethodsContext().addItem;

    const toggleForm = () => {
        setIsOpened(!isOpened);
        setTitleError('');
        onError('');
        setTaskTitle('');
        setAssigneeId(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        onError("");
        setIsSubmitting(true);
        try {
            const newTask = await createTask({
                title: taskTitle, 
                creatorId: user.id, 
                assigneeId: assigneeId, 
                status: 'TODO',
                projectId: projectId
            });
            addTask(newTask);
            setIsOpened(false);
        }
        catch (error) {
            onError("Une erreur est survenue lors de la création de la tâche. Veuillez vérifier votre connexion internet.");
        }
        finally {
            setTaskTitle("");
            setAssigneeId(null);
            setIsSubmitting(false);
        }
    }

    const handleTaskTitleChange = (e) => {
        const value = e.target.value;
        setTaskTitle(value);
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
        setAssigneeId(value);

        if (!isNaN(value) && value > 0) {
            try {
                await getUserById(value);
            } catch (error) {
                setAssigneeError("ID Utilisateur assigné invalide");
            }
        } else {
            setAssigneeError("Veuillez entrer un ID utilisateur valide");
        }  
    }

    return (
        <li>
            { isOpened ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nom de la tâche"
                        value={taskTitle}
                        onChange={handleTaskTitleChange}
                        required
                    />
                    {titleError && <p style={{color: 'red'}}>{titleError}</p>}
                    <input
                        type="text"
                        placeholder="ID de l'utilisateur assigné"
                        value={assigneeId || ''}
                        onChange={handleAssigneeChange}
                    />
                    {assigneeError && <p style={{color: 'red'}}>{assigneeError}</p>}
                    <button 
                        type="submit"
                        disabled={isSubmitting || titleError || assigneeError}
                    >
                        Créer
                    </button>
                    <button 
                        type="button" 
                        onClick={toggleForm}
                        disabled={isSubmitting}
                    >
                        Annuler
                    </button>
                </form>
            ) : (
                <button onClick={toggleForm}>Ajouter une tâche</button>
            )}
        </li>
    );
});

AddTaskForm.displayName = 'AddTaskForm';

export default AddTaskForm;