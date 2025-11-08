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
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            { project && (
                <div>
                    <h1>{project.name}</h1>
                    <ul>
                        <li>ID: {project.id}</li>
                        <li>Créé par: {project.creatorId}</li>
                    </ul>
                </div>
            )}
            <TaskList tasks={projectTasks} onError={setError} modifyMode={true} />
        </div>
    );
}

export default ProjectPage;