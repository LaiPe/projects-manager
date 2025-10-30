import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Header from './layouts/Header.jsx';
import Footer from './layouts/Footer.jsx';

import Dashboard from './pages/Dashboard.jsx'
import ProfilePage from './pages/ProfilePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootOutlet />,
    errorElement: <ErrorPageWithLayout />,
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
        element: <ProjectsPage />
      },
      {
        path: '/tasks',
        element: <TasksPage />
      }
    ]
  }
]);

function Router() {
    return <RouterProvider router={router} />;
}

function RootOutlet() {
    return (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    );
}

function ErrorPageWithLayout() {
  return (
    <>
      <Header />
      <main>
        <ErrorPage />
      </main>
      <Footer />
    </>
  );
}

export default Router;