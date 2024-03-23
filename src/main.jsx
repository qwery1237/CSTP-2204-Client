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
import { AuthProvider } from './context/AuthContext.jsx';
import InviteFriend from './Screen/InviteFriend.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
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
        path: 'gs/:id',
        element: <GasStation />,
      },
      {
        path: 'search',
        element: <SearchScreen />,
      },
    ],
  },
  {
    path: '/profile',
    element: <ProfileScreen />,
  },
  {
    path: 'invite/:id',
    element: <InviteFriend />,
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
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
