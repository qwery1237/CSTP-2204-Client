import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './Screen/LandingPage.jsx';
import Login from './Screen/Login.jsx';
import Signup from './Screen/Signup.jsx';
import ForgetPassword from './Screen/ForgetPassword.jsx';
import ChangePassWord from './Screen/ChangePassWord.jsx';
import Error from './Screen/Error.jsx';
import Home from './Screen/Home.jsx';
import Rewards from './Screen/Rewards.jsx';
import GasStation from './Screen/GasStation.jsx';
import ProfileScreen from './Screen/ProfileScreen.jsx';
import SearchScreen from './Screen/SearchScreen.jsx';
import Accounts from './Accounts.jsx';

const router = createBrowserRouter([
  { index: true, element: <LandingPage /> },
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: 'error',
        element: <Error />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'favourite',
        element: <Home />,
      },
      {
        path: 'rewards',
        element: <Rewards />,
      },
      {
        path: 'gs',
        element: <GasStation />,
      },
      {
        path: 'search',
        element: <SearchScreen />,
      },
    ],
  },
  // {
  //   path: '/login',
  //   element: <Login />,
  // },
  // {
  //   path: '/signup',
  //   element: <Signup />,
  // },
  // {
  //   path: '/forgetpassword',
  //   element: <ForgetPassword />,
  // },
  // {
  //   path: '/changepassword/:id',
  //   element: <ChangePassWord />,
  // },
  {
    path: '/profile',
    element: <ProfileScreen />,
  },
  {
    path: '/accounts',
    element: <Accounts />,
    children: [
      { index: true, element: <Login /> },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'forgetpassword',
        element: <ForgetPassword />,
      },
      {
        path: 'changepassword/:id',
        element: <ChangePassWord />,
      },
      {
        path: 'profile',
        element: <ProfileScreen />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
