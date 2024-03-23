import { useContext, useEffect, useState } from 'react';
import GasStationList from '../Components/GasStationList/GasStationList';
import Preferences from '../Components/Preference/Preferences';
import Context from '../context';
import {
  getCrrLocation,
  getFavouriteStations,
  getGasStations,
} from '../api/gasStation';
import Loading from '../Components/UI/Loading';
import TopNavHome from '../Components/TopNav/TopNavHome';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

export const DEFAULT_PREFERENCE = [
  false,
  0,
  0,
  [false, false, false, false, false],
];

export default function Home() {
  const { pathname } = useLocation();
  const isFavouritePage = pathname == '/favourite';
  const { user, token } = useAuth();
  const [isList, setIsList] = useState(true);
  const [isLoading, setIsloading] = useState(true);
  const { setGasStation } = useContext(Context);

  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCE);

  useEffect(() => {
    if (!user) return;
    fetchStations();
  }, [isFavouritePage ? user : user?._id, pathname]);

  const fetchStations = () => {
    setIsloading(true);
    isFavouritePage
      ? getFavouriteStations(user.favourite, token)
          .then(setGasStation)
          .then(() => setIsloading(false))
      : getCrrLocation()
          .then(getGasStations)
          .then(setGasStation)
          .then(() => setIsloading(false));
  };
  return (
    <>
      {user && (
        <>
          <TopNavHome isList={isList} setIsList={setIsList} />

          <Preferences
            isList={isList}
            preferences={preferences}
            setPreferences={setPreferences}
          />
          {isLoading ? (
            <Loading bgColor='bg-inherit' />
          ) : (
            <GasStationList isList={isList} preferences={preferences} />
          )}
        </>
      )}
    </>
  );
}
