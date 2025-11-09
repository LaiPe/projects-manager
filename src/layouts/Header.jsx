import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
    const { isAuthenticated, user } = useAuth();

    return (
        <header className='navbar navbar-expand-lg bg-body-tertiary sticky-top'>
            <div className='container-fluid d-flex justify-content-between'>
                <NavLink to="/" className='navbar-brand'>
                    <h1>Projects Manager</h1>
                </NavLink>
                <nav className='collapse navbar-collapse'>
                    <ul className='navbar-nav ms-auto'>
                        {isAuthenticated ? (
                            // Navigation pour utilisateur connecté
                            <>
                                <span className='navbar-text me-2'>Bienvenue, {user.username}!</span>
                                <NavLink to="/projects" className='nav-link'>Projets</NavLink>
                                <NavLink to="/tasks" className='nav-link'>Tâches</NavLink>
                                <NavLink to="/logout" className='nav-link'>Déconnexion</NavLink>
                            </>
                        ) : (
                            // Navigation pour utilisateur non connecté
                            <>
                                <NavLink to="/login" className='nav-link'>Connexion</NavLink>
                                <NavLink to="/register" className='nav-link'>Inscription</NavLink>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;