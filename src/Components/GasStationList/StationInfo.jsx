import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';

export default function StationInfo({ setShowStationInfo }) {
  const isFavourite = false;
  const rating = 4.3;
  return (
    <div className=' absolute bottom-4 left-4 w-[300px] bg max-[520px]:rounded-none rounded-lg z-[1] max-[520px]:w-full max-[520px]:bottom-0 max-[520px]:left-0'>
      <div className=' caret-transparent w-full rounded-lg max-[520px]:rounded-none border-[1px] max-[520px]:border-0 cborder flex justify-between p-4 '>
        <div className=' flex  flex-col w-full'>
          <div className='flex flex-row w-full items-center justify-between'>
            <div className='w-[225px] max-[325px]:w-[200px] max-[300px]:w-[175px]   font-[400] th max-text-xl text-ellipsis whitespace-nowrap overflow-hidden'>
              Chevron gas stations
            </div>
            <div
              onClick={() => setShowStationInfo(false)}
              className='  th  cursor-pointer'
            >
              <CloseIcon />
            </div>
          </div>
          <div className=' relative pt-2'>
            <img
              className=' w-[320px]   min-[520px]:aspect-video max-[500px]:w-full rounded-lg object-cover'
              src='/oilrig.jpg'
              alt=''
            />
            <div className=' absolute top-0 right-0  p-2 rounded-full cursor-pointer th'>
              {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </div>
          </div>
          <div className=' flex flex-col justify-center pt-2 '>
            <div className=' flex flex-col gap-y-2'>
              <div className=' flex flex-row justify-between items-center'>
                <div className='tp flex w-full  flex-row gap-x-[2px] text-sm overflow-hidden'>
                  <div className=''>22 km - </div>
                  <div className=' text-ellipsis whitespace-nowrap overflow-hidden w-[175px] max-[285px]:w-[165px]'>
                    {' '}
                    12343 st king highwaytdrjfyugiuhoijokojihgjyfhfxdz
                  </div>
                </div>
                <div className='p-[6px] rounded-full th sbg text-xs '>
                  {rating}
                </div>
              </div>
              <div className=' flex flex-row justify-between'>
                <div className='tp flex flex-row text-sm'>
                  <div className=''>$1.23/</div> Regular
                </div>
                <div className='  tb text-sm hover:underline cursor-pointer'>
                  More info
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
