import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const formData = {
            username: e.target.username.value,
            password: e.target.password.value,
        };

        try {
            await login(formData);
            navigate('/dashboard');
        } catch (error) {
            setError('Échec de la connexion, veuillez vérifier vos identifiants et réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nom d'utilisateur:
                        <input type="text" name="username" required />
                    </label>
                </div>
                <div>
                    <label>
                        Mot de passe:
                        <input type="password" name="password" required />
                    </label>
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    )
}

export default Login;