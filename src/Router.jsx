import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
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
      }
    ]
  }
]);

// Composant pour les routes protégées
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Chargement...</div>;
  }
  
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
    return (
      <>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </>
    );
}

export default Router;