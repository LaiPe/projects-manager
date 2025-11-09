import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../services/ProjectService';
import { getProjectTasks } from '../services/TaskService';
import Spinner from '../components/spinner/Spinner';
import TaskList from '../components/task/TaskList';

function ProjectPage() {
    const { projectId } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState(null);
    const [projectTasks, setProjectTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                // Charger les deux en parallèle
                const [projectData, tasksData] = await Promise.all([
                    getProjectById(projectId),
                    getProjectTasks(projectId)
                ]);
                
                setProject(projectData);
                setProjectTasks(tasksData);
            } catch (error) {
                console.error('Erreur:', error);
                setError('Erreur lors du chargement des données du projet.');
            } finally {
                setLoading(false);
            }
        };

        if (projectId) {
            fetchData();
        }
    }, [projectId]);


    // Gestion des états de chargement et d'erreur
    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container py-4 hero-fullscreen-height-minus-footer">
            {error && (
                <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
            )}
            
            {project && (
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h1 className="card-title h2 mb-2">{project.name}</h1>
                                <div className="d-flex align-items-center gap-3">
                                    <span className="badge bg-primary fs-6">
                                        <i className="bi bi-hash"></i> ID: {project.id}
                                    </span>
                                    <span className="text-muted">
                                        <i className="bi bi-person"></i> Créé par l'utilisateur {project.creatorId}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <button 
                                    className="btn btn-outline-primary"
                                    onClick={() => window.history.back()}
                                >
                                    <i className="bi bi-arrow-left"></i> Retour
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <h3 className="card-title h5 mb-0">
                        <i className="bi bi-list-task me-2"></i>
                        Tâches du projet
                        {projectTasks.length > 0 && (
                            <span className="badge bg-secondary ms-2">{projectTasks.length}</span>
                        )}
                    </h3>
                </div>
                <div className="card-body">
                    <TaskList tasks={projectTasks} onError={setError} modifyMode={true} />
                </div>
            </div>
        </div>
    );
}

export default ProjectPage;