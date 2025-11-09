import { createBrowserRouter, Navigate, Outlet, RouterProvider, useNavigation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './layouts/Header.jsx';
import Footer from './layouts/Footer.jsx';

import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';

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
        path: '/projects',
        element: (
          <ProtectedRoute>
            <ProjectsPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/projects/:projectId',
        element: (
          <ProtectedRoute>
            <ProjectPage />
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
        element: <LogoutPage />
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />
      },
      {
        path: '/terms-of-service',
        element: <TermsOfService />
      }
    ]
  }
]);

// Composant pour les routes protégées
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // Rediriger vers la page de connexion ou afficher un message
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function Root({children}) {
  const { state } = useNavigation();
  const { initialLoading } = useAuth();

  if (initialLoading) {
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

function LogoutPage() {
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      logout();
    }
  }, [logout, isAuthenticated]);

  // Rediriger immédiatement vers la page d'accueil
  return <Navigate to="/" replace />;
}

export default function Router() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}