import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
    const { isAuthenticated, user } = useAuth();

    return (
        <header>
            <NavLink to="/">
                <h1>Projects Manager</h1>
            </NavLink>
            <nav>
                <ul>
                    {isAuthenticated ? (
                        // Navigation pour utilisateur connecté
                        <>
                            <span>Bienvenue, {user.username}!</span>
                            <NavLink to="/projects">Projets</NavLink>
                            <NavLink to="/tasks">Tâches</NavLink>
                            <NavLink to="/logout">Déconnexion</NavLink>
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