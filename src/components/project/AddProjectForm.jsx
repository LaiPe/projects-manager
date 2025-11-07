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
        <li>
            { isOpened ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nom du projet"
                        value={projectName}
                        onChange={handleChange}
                        required
                    />

                    <button 
                        type="submit"
                        disabled={isSubmitting || error}
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
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </form>
            ) : (
                <button onClick={toggleForm}>Ajouter un projet</button>
            )}
        </li>
    );
});

AddProjectForm.displayName = 'AddProjectForm';

export default AddProjectForm;