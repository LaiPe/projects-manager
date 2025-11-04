import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Fonction pour effectuer des requêtes API avec gestion des erreurs
    const apiRequest = async (endpoint, method = 'GET', body = null) => {
        try {
            const config = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Important pour inclure les cookies httpOnly
            };

            if (body) {
                config.body = JSON.stringify(body);
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
            
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error("Vérifiez vos informations d'identification.");
                }
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Une erreur s'est produite ! Veuillez réessayer plus tard.", { cause: response.status });
            }

            // Vérifier si la réponse contient du JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return null;
        } catch (error) {
            throw error;
        }
    };

    // Fonction pour vérifier le statut d'authentification
    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const response = await apiRequest('/auth/verify');
            
            setIsAuthenticated(true);
            setUser(response.user);
            
        } catch (error) {
            if (error.cause !== 403) {
                console.error('Erreur lors de la vérification de l\'authentification:', error);
            }
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    //fonction de login
    const login = async (credentials) => {
        try {
            setLoading(true);
            const response = await apiRequest('/auth/login', 'POST', credentials);
            
            if (response) {
                setIsAuthenticated(true);
                setUser(response.user);
                return { success: true };
            } else {
                throw new Error('Réponse invalide du serveur');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setIsAuthenticated(false);
            return { 
                success: false, 
                error: error.message || 'Erreur lors de la connexion'
            };
        } finally {
            setLoading(false);
        }
    };

    //fonction de logout
    const logout = async () => {
        try {
            setLoading(true);
            await apiRequest('/auth/logout', 'POST');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        } finally {
            // Nettoyer l'état local même en cas d'erreur
            setIsAuthenticated(false);

            setLoading(false);
        }
    };

    //fonction d'inscription
    const register = async (userData) => {
        try {
            setLoading(true);
            const response = await apiRequest('/auth/register', 'POST', userData);

            if (response) {
                setIsAuthenticated(true);
                setUser(response.user);
                return { success: true };
            } else {
                throw new Error('Réponse invalide du serveur');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    // Vérifier l'authentification au montage du composant
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        register,
        apiRequest,
        checkAuthStatus,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};