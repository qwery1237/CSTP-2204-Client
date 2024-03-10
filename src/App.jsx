import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Context from './context';
import SideBar from './Components/SideBar/SideBar';
import BottomNav from './Components/BottomNav/BottomNav';
import MainLayout from './Components/Layout/MainLayout';
import { setUserData } from './api/setUserData';

export default function App() {
  const [user, setUser] = useState(null);
  const [gasStation, setGasStation] = useState(null)
  const [gasStationPreference, setGasStationPreference] = useState(null)
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [userLatLng, setUserLatLng] = useState(null);
  return (
    <Context.Provider value={{ user, setUser,gasStation, setGasStation,gasStationPreference, setGasStationPreference ,userLatLng, setUserLatLng}}>
      <MainLayout>
        <SideBar />
        <div className='flex flex-1 flex-col overflow-hidden'>
          <Outlet context={{ setIsProfilePopUp }} />
          <BottomNav />
        </div>
        {isProfilePopUp && (
          <SideBar isProfilePopUp={isProfilePopUp} setIsProfilePopUp={setIsProfilePopUp} />
        )}
      </MainLayout>
    </Context.Provider>
  );
}
