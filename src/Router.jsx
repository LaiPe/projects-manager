import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Header from './layouts/Header.jsx';
import Footer from './layouts/Footer.jsx';

import Dashboard from './pages/Dashboard.jsx'
import ProfilePage from './pages/ProfilePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root><Outlet /></Root>,
    errorElement: <Root><ErrorPage /></Root>,
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/projects',
        element: <ProjectsPage />,
      },
      {
        path: '/tasks',
        element: <TasksPage />
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

function Router() {
    return (
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
}

export default Router;