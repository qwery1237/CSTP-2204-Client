import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

export default function ReviewOverview() {
  const rating = 3.1;
  const filledStars = Math.floor(rating);
  const totalStars = 5;
  const size = 20;
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
      stars.push(<StarIcon sx={{ fontSize: size }} />);
    } else if (halfStar > 0.7) {
      stars.push(<StarIcon sx={{ color: 'gold', fontSize: size }} />);
    } else {
      stars.push(
        <StarHalfIcon
          key={filledStars}
          sx={{ color: 'gold', fontSize: size }}
        />
      );
    }
  }

  for (let i = stars.length; i < totalStars; i++) {
    stars.push(<StarIcon key={i} sx={{ fontSize: size }} />);
  }
  const array = [5, 4, 3, 2, 1];
  return (
    <div className=' flex-1 rounded-lg border-[1px] cborder p-4 flex-col'>
      <div className=' flex flex-col w-full items-center tp gap-y-2'>
        <div className=' text-4xl th'>{rating}</div>

        <div className=' flex flex-row gap-x-[2px]'>{stars}</div>

        <div className=' text-sm tp'>246 reviews</div>
      </div>
      {array.map((item, i) => {
        return (
          <div key={i} className='flex flex-row gap-x-2 items-center mt-2'>
            <div className=' text-sm th'>{item}</div>
            <div className='flex-1 h-2 rounded-lg sbg'>
              <div className='  w-[33%] h-2 rounded-lg bg-[#fbbc04]'></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
