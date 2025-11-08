import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const { register } = useAuth();
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
            await register(formData);
            navigate('/projects');
        } catch (err) {
            setError(err.message || 'Une erreur est survenue lors de l\'inscription, veuillez réessayer plus tard.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        if (value.trim() === '') {
            setUsernameError('Le nom d\'utilisateur est requis');
        } else if (value.length < 3) {
            setUsernameError('Le nom d\'utilisateur doit contenir au moins 3 caractères');
        } else if (value.length > 70) {
            setUsernameError('Le nom d\'utilisateur ne peut pas dépasser 70 caractères');
        } else {
            setUsernameError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (value.trim() === '') {
            setPasswordError('Le mot de passe est requis');
        } else if (value.length < 3) {
            setPasswordError('Le mot de passe doit contenir au moins 3 caractères');
        } else if (value.length > 70) {
            setPasswordError('Le mot de passe ne peut pas dépasser 70 caractères');
        } else {
            setPasswordError('');
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            
            {error && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nom d'utilisateur:
                        <input 
                            type="text" 
                            name="username" 
                            value={username}
                            onChange={(e) => handleUsernameChange(e)}
                            required 
                            disabled={isSubmitting}
                        />
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
                            required 
                            disabled={isSubmitting}
                        />
                    </label>
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>
                
                <button 
                    type="submit" 
                    disabled={isSubmitting || usernameError || passwordError}
                >
                    {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
                </button>
            </form>

            <p>
                Déjà un compte ? <Link to="/login">Se connecter</Link>
            </p>
        </div>
    );
}

export default Register;