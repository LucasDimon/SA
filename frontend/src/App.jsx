import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AnimalDetail from './pages/AnimalDetail';
import AdoptionForm from './pages/AdoptionForm';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminAddPet from "./pages/AdminAddPet";

const router = createBrowserRouter([
  { path: '/', element: <><Header /><Home /></> },
  { path: '/login', element: <><Header /><Login /></> },
  { path: '/register', element: <><Header /><Register /></> },
  { path: '/animals/:id', element: <><Header /><AnimalDetail /></> },
  { path: '/adotar/:id', element: <><Header /><AdoptionForm /></> },

  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <><Header /><AdminDashboard /></>
      </ProtectedRoute>
    )
  },

  {
    path: "/admin/add-pet",
    element: (
      <ProtectedRoute>
        <><Header /><AdminAddPet /></>
      </ProtectedRoute>
    )
  },
]);

export default function AppShell() {
  return <RouterProvider router={router} />;
}
