import { Outlet } from 'react-router-dom';
import AuthLayout from './Components/Layout/AuthLayout';

export default function Accounts() {
  return (
    <AuthLayout>
      <div className='flex flex-1 flex-col'>
        <Outlet />
      </div>
    </AuthLayout>
  );
}
