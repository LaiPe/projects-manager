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
        <div className="card mb-3 shadow-sm">
            {isOpened ? (
                <div className="card-body">
                    <h6 className="card-title mb-3">Nouvelle tâche</h6>
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="new-task-title" className="form-label">
                                    Titre de la tâche
                                </label>
                                <input
                                    type="text"
                                    id="new-task-title"
                                    className={`form-control ${titleError ? 'is-invalid' : ''}`}
                                    placeholder="Nom de la tâche"
                                    value={taskTitle}
                                    onChange={handleTaskTitleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                                {titleError && (
                                    <div className="invalid-feedback">
                                        {titleError}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="new-task-assignee" className="form-label">
                                    ID Utilisateur assigné
                                </label>
                                <input
                                    type="number"
                                    id="new-task-assignee"
                                    className={`form-control ${assigneeError ? 'is-invalid' : ''}`}
                                    placeholder="ID de l'utilisateur assigné"
                                    value={assigneeId || ''}
                                    onChange={handleAssigneeChange}
                                    disabled={isSubmitting}
                                    required
                                />
                                {assigneeError && (
                                    <div className="invalid-feedback">
                                        {assigneeError}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="d-flex gap-2 mt-3">
                            <button 
                                type="submit"
                                className="btn btn-success btn-sm"
                                disabled={isSubmitting || titleError || assigneeError}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                        Création...
                                    </>
                                ) : (
                                    'Créer'
                                )}
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary btn-sm"
                                onClick={toggleForm}
                                disabled={isSubmitting}
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div 
                    className="card-body d-flex align-items-center justify-content-center text-center"
                    role="button"
                    onClick={toggleForm}
                    style={{cursor: 'pointer', minHeight: '70px'}}
                >
                    <div>
                        <div className="d-flex align-items-center justify-content-center">
                            <svg 
                                width="24" 
                                height="24" 
                                fill="currentColor" 
                                className="text-muted me-2"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            <span className="text-muted">Ajouter une tâche</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

AddTaskForm.displayName = 'AddTaskForm';

export default AddTaskForm;