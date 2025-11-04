import { createBrowserRouter, Navigate, Outlet, RouterProvider, useNavigation } from 'react-router-dom';
import Header from './layouts/Header.jsx';
import Footer from './layouts/Footer.jsx';

import Dashboard from './pages/Dashboard.jsx'
import ProfilePage from './pages/ProfilePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';

import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import Spinner from './components/spinner/Spinner.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root><Outlet /></Root>,
    errorElement: <Root><ErrorPage /></Root>,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
      },
      {
        path: '/projects',
        element: (
          <ProtectedRoute>
            <ProjectsPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/tasks',
        element: (
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/logout',
        // utiliser la méthode logout du contexte d'authentification
        element: (
          <ProtectedRoute> 
            <Logout />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

// Composant pour les routes protégées
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // Rediriger vers la page de connexion ou afficher un message
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function Router() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

function Root({children}) {
  const { state } = useNavigation();
  const { loading } = useAuth();

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <Header />
        <main>
          {state === 'loading' ? <Spinner /> : children}
        </main>
        <Footer />
      </>
    );
  }
}

function Logout() {
  const { logout } = useAuth();

  // Appeler la fonction de déconnexion et rediriger vers la page d'accueil
  logout();
  return <Navigate to="/" replace />;
}

export default Router;