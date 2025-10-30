import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const result = await register(formData);
            
            if (result.success) {
                // Redirection vers le dashboard après inscription réussie
                navigate('/');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Une erreur est survenue lors de l\'inscription');
        } finally {
            setIsSubmitting(false);
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
                            value={formData.username}
                            onChange={handleChange}
                            required 
                            disabled={isSubmitting}
                        />
                    </label>
                </div>
                
                <div>
                    <label>
                        Mot de passe:
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                            disabled={isSubmitting}
                        />
                    </label>
                </div>
                
                <button 
                    type="submit" 
                    disabled={isSubmitting}
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