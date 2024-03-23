import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CustomInput from '../Components/UI/CustomInput';
import { useEffect, useState } from 'react';
import GasStationCard from '../Components/GasStationList/GasStationCard';
import { DEFAULT_PREFERENCE } from './Home';
import { useAuth } from '../context/AuthContext';
import { getCrrLocation, getGasStations } from '../api/gasStation';
export default function SearchScreen() {
  const { token } = useAuth();
  const [gasStation, setGasStation] = useState();
  const [text, setText] = useState();
  const [searchedList, setSearchedList] = useState();

  useEffect(() => {
    if (!token) return;
    getCrrLocation().then(getGasStations).then(setGasStation);
  }, [token]);

  useEffect(() => {
    if (!gasStation) return;
    setSearchedList(
      gasStation.filter(({ name }) =>
        text ? name.toLowerCase().includes(text.toLowerCase()) : true
      )
    );
  }, [gasStation, text]);

  return (
    <div className=' w-screen h-screen flex flex-col bg'>
      <div className='h-[56px] w-full sbg px-2 flex flex-row items-center border-b-[1px] cborder'>
        <CustomInput
          placeHolder='Search'
          paddingLeft='36px'
          value={text}
          handleChange={(e) => {
            setText(e.target.value);
          }}
        >
          <SearchOutlinedIcon className='absolute left-2 tp text-2xl bottom-[8px]' />
        </CustomInput>
      </div>

      <div className='flex-1 my-4  w-full min-w-auto flex h-full flex-col overflow-y-auto px-2 gap-4 items-center max-[519px]:pb-12'>
        {searchedList &&
          searchedList.map((station, index) => (
            <div className='sbg' key={station._id}>
              <GasStationCard
                station={station}
                index={index}
                preferences={DEFAULT_PREFERENCE}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
