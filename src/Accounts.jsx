import { Navigate, Outlet } from 'react-router-dom';
import AuthLayout from './Components/Layout/AuthLayout';
import { useAuth } from './context/AuthContext';

export default function Accounts() {
  const { token } = useAuth();
  if (token) {
    return <Navigate to='/' />;
  }
  return (
    <AuthLayout>
      <div className='flex flex-1 flex-col'>
        <Outlet />
      </div>
    </AuthLayout>
  );
}
