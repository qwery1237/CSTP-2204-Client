import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getGasStationById } from '../../api/gasStation';
import { addToFavorite, deleteFromFavorite } from '../../api/user';

export default function GasStationCard({
  station,
  preferences,
  index,
  isFavoritePage,
}) {
  const navigate = useNavigate();

  const { user, token, updateUserData } = useAuth();
  const { placeId: id, name, profileImg, distanceFromUser, address } = station;

  const [isFavorite, setIsfavorite] = useState(user.favourite.includes(id));
  const [rating, setRating] = useState();
  const [totalRating, setTotalRating] = useState();
  const [fuelPrice, setFuelPrice] = useState();
  const [fuelType, setFuelType] = useState();

  useEffect(() => {
    if (!station) return;
    setRating(station.fuelGoRating.rating);
    setTotalRating(station.fuelGoRating.totalRating);
    setFuelPrice(Object.values(station.price)[preferences[2]].price);
    const type = Object.keys(station.price)[preferences[2]];
    type == 'midGrade' ? setFuelType('mid-grade') : setFuelType(type);
  }, [station, preferences]);
  const handleAddFavorite = async () => {
    const { success, message } = await addToFavorite(token, id);

    if (!success) {
      alert(message);
      return;
    }
    setIsfavorite(true);
    await updateUserData(token);
  };
  const handleDeleteFavorite = async () => {
    const { success, message } = await deleteFromFavorite(token, id);

    if (!success) {
      alert(message);
      return;
    }
    setIsfavorite(false);
    await updateUserData(token);
  };
  //TODO: organize and fix some code from here
  const filledStars = Math.floor(rating);
  const totalStars = 5;
  const size = 16;
  const stars = [];
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
  if (!index) {
    getGasStationById(id, token);
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
          <div className=' absolute top-0 right-0  p-2 rounded-full cursor-pointer text-darkMode-error min-[720px]:hidden'>
            {isFavorite ? (
              <FavoriteIcon onClick={handleDeleteFavorite} />
            ) : (
              <FavoriteBorderIcon onClick={handleAddFavorite} />
            )}
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
                  {!fuelPrice ? '- -' : '$' + fuelPrice?.toFixed(2)} /
                  <span className='capitalize'> {fuelType}</span>
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
        <div className='  p-2 rounded-full text-darkMode-error tbg cursor-pointer'>
          {isFavorite ? (
            <FavoriteIcon onClick={handleDeleteFavorite} />
          ) : (
            <FavoriteBorderIcon onClick={handleAddFavorite} />
          )}
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
