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
                            <NavLink to="/">Dashboard</NavLink>
                            <NavLink to="/profile">Profile</NavLink>
                            <NavLink to="/projects">Projects</NavLink>
                            <NavLink to="/tasks">Tasks</NavLink>
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