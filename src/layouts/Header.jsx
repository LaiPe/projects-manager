import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
    const { user, isAuthenticated, isLoading } = useAuth();

    return (
        <header>
            <h1>Projects Manager</h1>
            <nav>
                <ul>
                    {isAuthenticated ? (
                        // Navigation pour utilisateur connecté
                        <>
                            <NavLink to="/dashboard">Tableau de bord</NavLink>
                            <NavLink to="/profile">Profil</NavLink>
                            <NavLink to="/projects">Projets</NavLink>
                            <NavLink to="/tasks">Tâches</NavLink>
                        </>
                    ) : (
                        // Navigation pour utilisateur non connecté
                        <>
                            <NavLink to="/login">Connexion</NavLink>
                            <NavLink to="/register">Inscription</NavLink>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;