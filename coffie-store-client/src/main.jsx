import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './Root/Root';
import AddCoffee from './Components/AddCoffee';
import UpdateCoffee from './Components/UpdateCoffee';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import AuthProvider from './Providers/AuthProvider';
import PrivateRoute from './Components/PrivateRoute';
import Users from './Components/Users';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        loader: () => fetch("https://coffee-store-server-musleh.vercel.app/coffee"),
        element: <Home></Home>,
      },
      {
        path: "/addcoffee",
        element: <AddCoffee></AddCoffee>,
      },
      {
        path: "/users",
        loader: () => fetch("https://coffee-store-server-musleh.vercel.app/users"),
        element: <Users></Users>,
      },
      {
        path: "/updatecoffee/:id",
        loader: ({ params }) =>
          fetch(`https://coffee-store-server-musleh.vercel.app/coffee/${params.id}`),
        element: <UpdateCoffee></UpdateCoffee>,
      },
      {
        path: "/register",
        element: (
          <PrivateRoute>
            <Register></Register>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PrivateRoute>
            <Login></Login>
          </PrivateRoute>
        ),
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
