import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const formData = {
            username,
            password,
        };

        try {
            await login(formData);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message || 'Échec de la connexion, veuillez vérifier vos identifiants et réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        if (value.trim() === '') {
            setUsernameError('Le nom d\'utilisateur est requis');
        } else {
            setUsernameError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (value.trim() === '') {
            setPasswordError('Le mot de passe est requis');
        } else {
            setPasswordError('');
        }
    };

    return (
        <div>
            <h2>Connexion</h2>

            {error && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nom d'utilisateur:
                        <input 
                            type="text" 
                            name="username" 
                            value={username}
                            onChange={(e) => handleUsernameChange(e)}
                            required />
                    </label>
                    {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
                </div>
                <div>
                    <label>
                        Mot de passe:
                        <input 
                            type="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => handlePasswordChange(e)}
                            required />
                    </label>
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>
                <button 
                    type="submit"
                    disabled={isSubmitting || usernameError || passwordError }
                    >
                    {isSubmitting ? 'Connexion...' : 'Se connecter'}
                </button>
            </form>

            <p>
                Pas de compte ? <Link to="/register">S'inscrire</Link>
            </p>

        </div>
    )
}

export default Login;