import React from 'react';
import BgBlackOpacity from '../BgBlackOpacity';
import CustomInput from '../UI/CustomInput';
import IndividualStationsList from '../GasStationList/GasStationCard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';

export default function SearchedList({ setIsSearchActive }) {
  return (
    <BgBlackOpacity>
      <div className=' flex w-full flex-row justify-center'>
        <div className=' w-[1400px] min-w-auto flex flex-row pt-7 max-[1000px]:pt-[28px]'>
          <div className=' w-[450px] max-[1000px]:w-[126px]'></div>
          <div className=' flex-1 w-full relative max-[520px]:hidden'>
            <CustomInput placeHolder='Search' paddingLeft='36px' autoFocus>
              <SearchOutlinedIcon className='absolute left-2 tp text-2xl bottom-[8px]' />
              <CloseIcon
                onClick={() => setIsSearchActive(false)}
                className=' absolute top-[7.5px] right-2 th cursor-pointer'
              />
            </CustomInput>
          </div>
          <div className=' w-[247px] max-[1000px]:w-[303px] max-[740px]:w-[183px]'></div>
        </div>
      </div>
      <div className=' flex-1 flex flex-row mt-4 mb-4 justify-center'>
        <div className=' w-[800px] min-w-auto flex h-full flex-col overflow-y-auto px-4 gap-4  max-[720px]:flex-wrap max-[720px]:flex-row max-[720px]:justify-center'>
          <IndividualStationsList />
          <IndividualStationsList />
          <IndividualStationsList />
          <IndividualStationsList />
          <IndividualStationsList />
        </div>
      </div>
    </BgBlackOpacity>
  );
}
