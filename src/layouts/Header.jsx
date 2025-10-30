import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>Projects Manager</h1>
            <nav>
                <ul>
                    <NavLink to="/">Dashboard</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/tasks">Tasks</NavLink>
                </ul>
            </nav>
        </header>
    );
}

export default Header;