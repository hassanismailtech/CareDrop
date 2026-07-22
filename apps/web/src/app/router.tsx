import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthPage } from '../pages/auth/AuthPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { HomePage } from '../pages/home/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
