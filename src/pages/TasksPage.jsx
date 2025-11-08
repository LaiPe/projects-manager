import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { getUserTasks } from '../services/TaskService';
import { getProjectById } from '../services/ProjectService';
import TaskList from '../components/task/TaskList';
import Spinner from '../components/spinner/Spinner';

function TasksPage() {
    const {user} = useAuth();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const userTasks = await getUserTasks(user.id);
                const tasksWithProjects = await Promise.all(userTasks.map(async (task) => {
                    const projectData = await getProjectById(task.projectId);
                    return { ...task, project: projectData };
                }));
                setTasks(tasksWithProjects);
            } catch (err) {
                console.error('Erreur lors de la récupération des tâches :', err);
                setError('Erreur lors de la récupération des tâches.');
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) {
            fetchTasks();
        }
    }, [user.id]);

    return (
        <div>
            <h1>Tâches</h1>
            <p>Bienvenue sur la page des tâches. Ici, vous pouvez gérer vos tâches.</p>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {loading ? <Spinner /> : <TaskList tasks={tasks} onError={setError} />}
        </div>
    );
}

export default TasksPage;