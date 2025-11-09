import { memo, useState, useEffect } from 'react';

import { useListDispatchMethodsContext } from '../../contexts/ListContext';
import { updateProject, deleteProject } from '../../services/ProjectService';
import { useNavigate } from 'react-router-dom';

const ProjectItem = memo(({ project, onError }) => {
    const { deleteItem: onDelete, updateItem: onUpdate } = useListDispatchMethodsContext();
    const navigate = useNavigate();
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

    const handleViewDetails = () => {
        navigate(`/projects/${project.id}`);
    };

    return (
        <div className="card h-100 shadow-sm">
            {isEditing ? (
                <div className="card-body">
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label htmlFor={`project-name-${project.id}`} className="form-label">
                                Nom du projet
                            </label>
                            <input
                                type="text"
                                id={`project-name-${project.id}`}
                                className={`form-control ${error ? 'is-invalid' : ''}`}
                                value={editedName}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                            {error && (
                                <div className="invalid-feedback">
                                    {error}
                                </div>
                            )}
                        </div>
                        <div className="d-flex gap-2">
                            <button 
                                type="submit" 
                                className="btn btn-success btn-sm"
                                disabled={isSubmitting || error}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                        Validation...
                                    </>
                                ) : (
                                    'Valider'
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
                <>
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title me-1">{project.name}</h5>
                            <p className="card-text text-muted small">
                                <i className="bi bi-hash"></i> #{project.id}
                            </p>
                        </div>
                        <p className="card-text text-muted small">
                            <i className="bi bi-person"></i> Créé par l'utilisateur {project.creatorId}
                        </p>
                    </div>
                    <div className="card-footer bg-transparent">
                        <div className="d-flex flex-wrap gap-2">
                            <button 
                                className="btn btn-primary btn-sm"
                                onClick={handleViewDetails}
                                disabled={isSubmitting}
                            >
                                <i className="bi bi-eye"></i> Détails
                            </button>
                            <button 
                                className="btn btn-outline-primary btn-sm"
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
                </>
            )}
        </div>
    );
});

ProjectItem.displayName = 'ProjectItem';

export default ProjectItem;