import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProjects } from '../services/ProjectService';

import ProjectList from '../components/project/ProjectList';
import Spinner from '../components/spinner/Spinner';

function ProjectsPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);

            try {
                const data = await getUserProjects(user.id);
                setProjects(data);
            } catch (error) {
                setError('Erreur chargement projets:');
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) {
            fetchProjects();
        }
    }, [user.id]);

    return (
        <div>
            <h1>Projets</h1>
            <p>Bienvenue sur la page des projets. Ici, vous pouvez gérer vos projets.</p>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {loading ? <Spinner /> : <ProjectList projects={projects} onError={setError} />}
        </div>
    );
}

export default ProjectsPage;