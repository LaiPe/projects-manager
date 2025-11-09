import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProjects } from '../services/ProjectService';

import ProjectList from '../components/project/ProjectList';
import Spinner from '../components/spinner/Spinner';

function ProjectsPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
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
        <div className="container-fluid py-4 hero-fullscreen-height-minus-footer">
            {error && (
                <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
            )}
            
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{minHeight: '300px'}}>
                    <Spinner />
                </div>
            ) : (
                <ProjectList projects={projects} onError={setError} />
            )}
        </div>
    );
}

export default ProjectsPage;