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
        <div className="container-fluid d-flex align-items-center justify-content-center hero-fullscreen-height bg-light">
            <div className="card shadow-sm" style={{maxWidth: '400px', width: '100%'}}>
                <div className="card-body p-4">
                    <h2 className="card-title text-center mb-4">Inscription</h2>
                    
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Nom d'utilisateur
                            </label>
                            <input 
                                type="text" 
                                id="username"
                                name="username" 
                                className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                                value={username}
                                onChange={(e) => handleUsernameChange(e)}
                                required 
                                disabled={isSubmitting}
                            />
                            {usernameError && (
                                <div className="invalid-feedback">
                                    {usernameError}
                                </div>
                            )}
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Mot de passe
                            </label>
                            <input 
                                type="password" 
                                id="password"
                                name="password" 
                                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                value={password}
                                onChange={(e) => handlePasswordChange(e)}
                                required 
                                disabled={isSubmitting}
                            />
                            {passwordError && (
                                <div className="invalid-feedback">
                                    {passwordError}
                                </div>
                            )}
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary w-100 mb-3"
                            disabled={isSubmitting || usernameError || passwordError}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Inscription en cours...
                                </>
                            ) : (
                                'S\'inscrire'
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="mb-0 text-muted">
                            Déjà un compte ? <Link to="/login" className="link-primary text-decoration-none">Se connecter</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;