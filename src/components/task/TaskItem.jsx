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
            <div className="card mb-3 shadow-sm">
                {isEditing ? (
                    <div className="card-body">
                        <h6 className="card-title mb-3">Modifier la tâche</h6>
                        <form onSubmit={handleUpdate}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor={`task-title-${task.id}`} className="form-label">
                                        Titre de la tâche
                                    </label>
                                    <input
                                        type="text"
                                        id={`task-title-${task.id}`}
                                        className={`form-control ${titleError ? 'is-invalid' : ''}`}
                                        value={editedTitle}
                                        onChange={handleTitleChange}
                                        disabled={isSubmitting}
                                        required
                                    />
                                    {titleError && (
                                        <div className="invalid-feedback">
                                            {titleError}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor={`task-assignee-${task.id}`} className="form-label">
                                        ID Utilisateur assigné
                                    </label>
                                    <input 
                                        type="number"
                                        id={`task-assignee-${task.id}`}
                                        className={`form-control ${assigneeError ? 'is-invalid' : ''}`}
                                        value={editedAssigneeId}
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
                                            Enregistrement...
                                        </>
                                    ) : (
                                        'Enregistrer'
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
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="d-flex align-items-center">
                                    <h6 className="card-title mb-1 me-2">{task.title}</h6>
                                    <span className="badge bg-secondary small">#{task.id}</span>
                                </div>
                                <p className="card-text text-muted small mb-0">
                                    <i className="bi bi-person"></i> Assigné à l'utilisateur {task.assigneeId}
                                </p>
                            </div>
                            <div className="col-md-3">
                                <div className="d-flex align-items-center">
                                    <span className="small text-muted me-2">Statut:</span>
                                    <select
                                        className="form-select form-select-sm"
                                        value={editedStatus}
                                        onChange={handleStatusChange}
                                    >
                                        <option value="TODO">À faire</option>
                                        <option value="IN_PROGRESS">En cours</option>
                                        <option value="DONE">Terminé</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 text-md-end">
                                <div className="d-flex gap-2 justify-content-md-end">
                                    <button 
                                        className="btn btn-secondary btn-sm"
                                        onClick={toggleForm}
                                        disabled={isSubmitting}
                                    >
                                        <i className="bi bi-pencil"></i> Modifier
                                    </button>
                                    <button 
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={handleDelete}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : (
                                            <>
                                                <i className="bi bi-trash"></i> Supprimer
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } 
    else {
        return (
            <div className="card mb-3 shadow-sm">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <div className="d-flex align-items-center">
                                <h6 className="card-title mb-1 me-2">{task.title}</h6>
                                <span className="badge bg-secondary small">#{task.id}</span>
                            </div>
                            <p className="card-text text-muted small mb-0">
                                <i className="bi bi-folder"></i> Projet: {task?.project?.name}
                            </p>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <div className="d-flex align-items-center justify-content-md-end gap-2">
                                <span className="small text-muted me-2">Statut:</span>
                                <select
                                    className="form-select form-select-sm"
                                    style={{width: 'auto'}}
                                    value={editedStatus}
                                    onChange={handleStatusChange}
                                >
                                    <option value="TODO">À faire</option>
                                    <option value="IN_PROGRESS">En cours</option>
                                    <option value="DONE">Terminé</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskItem;