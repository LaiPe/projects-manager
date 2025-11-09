import { memo, useState } from 'react';

import { useListDispatchMethodsContext } from '../../contexts/ListContext';
import { useAuth } from '../../contexts/AuthContext';

import { createProject } from '../../services/ProjectService'

const AddProjectForm = memo(({ onError }) => {
    const { user } = useAuth();
    const [isOpened, setIsOpened] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [projectName, setProjectName] = useState('')
    const [error, setError] = useState('');
    const addProject = useListDispatchMethodsContext().addItem;

    const toggleForm = () => {
        setIsOpened(!isOpened);
        setError('');
        onError('');
        setProjectName('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        onError("");
        setIsSubmitting(true);
        try {
            const newProject = await createProject({name: projectName, creatorId: user.id});
            addProject(newProject);
            setIsOpened(false);
        }
        catch (error) {
            onError("Une erreur est survenue lors de la création du projet. Veuillez vérifier votre connexion internet.");
        }
        finally {
            setProjectName("");
            setIsSubmitting(false);
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setProjectName(value);
        if (value.trim() === '') {
            setError('Le nom du projet est requis');
        } else if (value.length < 3) {
            setError('Le nom du projet doit contenir au moins 3 caractères');
        } else if (value.length > 100) {
            setError('Le nom du projet ne doit pas dépasser 100 caractères');
        } else {
            setError('');
        }
    }

    return (
        <div className="card h-100 shadow-sm">
            {isOpened ? (
                <div className="card-body">
                    <h5 className="card-title">Nouveau projet</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="new-project-name" className="form-label">
                                Nom du projet
                            </label>
                            <input
                                type="text"
                                id="new-project-name"
                                className={`form-control ${error ? 'is-invalid' : ''}`}
                                placeholder="Nom du projet"
                                value={projectName}
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
                    className="card-body d-flex align-items-center justify-content-center text-center h-100 cursor-pointer"
                    role="button"
                    onClick={toggleForm}
                    style={{cursor: 'pointer', minHeight: '125px'}}
                >
                    <div>
                        <div className="mb-3">
                            <svg 
                                width="48" 
                                height="48" 
                                fill="currentColor" 
                                className="text-muted"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </div>
                        <h6 className="text-muted mb-0">Ajouter un projet</h6>
                    </div>
                </div>
            )}
        </div>
    );
});

AddProjectForm.displayName = 'AddProjectForm';

export default AddProjectForm;