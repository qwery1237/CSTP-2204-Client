import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Context from './context';
import AuthLayout from './Components/Layout/AuthLayout';
import { AuthProvider } from './context/AuthContext';
export default function Accounts() {
  return (
    <AuthProvider>
      <AuthLayout>
        <div className='flex flex-1 flex-col'>
          <Outlet />
        </div>
      </AuthLayout>
    </AuthProvider>
  );
}
