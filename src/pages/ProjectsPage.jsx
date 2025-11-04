import { useState, useEffect, Suspense } from 'react';
import { Await } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserProjects } from '../services/ProjectService';

import ProjectList from '../components/project/ProjectList';
import Spinner from '../components/spinner/Spinner';

function ProjectsPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getUserProjects(user.id);
            setProjects(data || []);
        };

        fetchProjects();
    }, [user.id]);

    return (
        <div>
            <h1>Projets</h1>
            <p>Bienvenue sur la page des projets. Ici, vous pouvez gérer vos projets.</p>
            <Suspense fallback={<Spinner />}>
                <Await resolve={projects}>
                    <ProjectList projects={projects} />
                </Await>
            </Suspense>
        </div>
    );
}

export default ProjectsPage;