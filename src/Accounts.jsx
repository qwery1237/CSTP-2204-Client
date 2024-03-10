import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Context from './context';
import AuthLayout from './Components/Layout/AuthLayout';
export default function Accounts() {
  const [user, setUser] = useState(null);
  return (
    <Context.Provider value={{ user, setUser }}>
      <AuthLayout>
        <div className='flex flex-1 flex-col'>
          <Outlet />
        </div>
      </AuthLayout>
    </Context.Provider>
  );
}
