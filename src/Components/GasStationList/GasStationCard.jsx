import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

export default function GasStationCard({ station, preferences }) {
  const navigate = useNavigate();
  const { _id: id, name, profileImg, distanceFromUser, address } = station;
  const rating =
    station.fuelGoRating.rating || parseFloat((Math.random() * 5).toFixed(1));
  const totalRating =
    station.fuelGoRating.totalRating || Math.floor(Math.random() * 1300);
  const fuelPrice =
    station.price[
      preferences.fuelType == 'Mid-grade'
        ? 'midGrade'
        : preferences.fuelType.toLowerCase()
    ].price || parseFloat((Math.random() * 1).toFixed(2)) + 1;
  const filledStars = Math.floor(rating);
  const totalStars = 5;
  const size = 16;
  const stars = [];
  const isFavourite = false;
  // Filled stars
  for (let i = 0; i < filledStars; i++) {
    stars.push(<StarIcon key={i} sx={{ color: 'gold', fontSize: size }} />);
  }

  // Half star
  if (!Number.isInteger(rating)) {
    const halfStar = rating - filledStars;
    if (halfStar < 0.3) {
      stars.push(<StarIcon key={rating} sx={{ fontSize: size }} />);
    } else if (halfStar > 0.7) {
      stars.push(
        <StarIcon key={rating} sx={{ color: 'gold', fontSize: size }} />
      );
    } else {
      stars.push(
        <StarHalfIcon
          key={filledStars}
          sx={{ color: 'gold', fontSize: size }}
        />
      );
    }
  }

  // Empty stars
  for (let i = stars.length; i < totalStars; i++) {
    stars.push(<StarIcon key={i} sx={{ fontSize: size }} />);
  }
  return (
    <div
      className={` caret-transparent w-full rounded-lg bg-transparent border-[1px] cborder flex justify-between p-4  max-[720px]:w-fit  `}
    >
      <div className=' flex flex-row gap-x-12 max-[720px]:flex-col '>
        <div className=' relative'>
          <img
            className=' w-[320px] max-[720px]:w-[260px] max-[630px]:w-[320px]  aspect-video rounded-lg object-cover'
            src={profileImg}
            alt=''
          />
          <div className=' absolute top-0 right-0  p-2 rounded-full cursor-pointer th min-[720px]:hidden'>
            {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </div>
        </div>
        <div className=' flex flex-col justify-center max-[720px]:pt-2 '>
          <div className=' flex flex-col gap-y-5 max-[720px]:gap-y-2'>
            <div className='flex flex-row w-full items-center justify-between'>
              <div className='w-[225px] max-[325px]:w-[200px] max-[300px]:w-[175px]  text-2xl font-[400] th max-[720px]:text-xl text-ellipsis whitespace-nowrap overflow-hidden'>
                {name}
              </div>
              <div className='p-[6px] rounded-full th fbg text-xs min-[720px]:hidden'>
                {rating}
              </div>
            </div>
            <div className=' flex flex-row tp items-center gap-x-2 text-sm max-[720px]:hidden'>
              <div>{rating}</div>
              <div className='  relative '>
                <div className=' flex flex-row gap-x-[2px]'>{stars}</div>
              </div>
              <div>({totalRating})</div>
            </div>
            <div className='tp flex w-full  flex-row gap-x-[2px] text-sm overflow-hidden'>
              <div className=''>{distanceFromUser} - </div>
              <div className=' text-ellipsis whitespace-nowrap overflow-hidden w-[175px] max-[285px]:w-[165px]'>
                {address}
              </div>
            </div>
            <div className=' flex flex-row justify-between'>
              <div className='tp flex flex-row text-sm'>
                <div>
                  ${fuelPrice}/{preferences.fuelType}
                </div>
              </div>
              <div
                onClick={() => navigate(`/gs/${id}`, { state: { station } })}
                className=' min-[720px]:hidden tb text-sm hover:underline cursor-pointer'
              >
                More info
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=' flex flex-col justify-between th max-[720px]:hidden ml-4'>
        <div className='  p-2 rounded-full tbg cursor-pointer'>
          {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>
        <div
          onClick={() => navigate(`/gs/${id}`, { state: { station } })}
          className=' tb p-2 rounded-full tbg cursor-pointer'
        >
          <NavigateNextIcon />
        </div>
      </div>
    </div>
  );
}
