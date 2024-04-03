import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

export default function ReviewOverview({station}) {
  const totalStars = 5;
  const size = 20;
  const [rating, setRating] = useState(0);
  const [filledStars, setFilledStars] = useState(0);
  const [noOfrating, setNoOfRating] = useState(0);
  const [stars, setStars] = useState([]);
  const [userRatingRange, setUserRatingRange] = useState({1:0,2:0,3:0,4:0,5:0})
  useEffect(() => {
    setRating(0)
    setFilledStars(0)
    setNoOfRating(0)
    setUserRatingRange({1:0,2:0,3:0,4:0,5:0})
    if (station.reviews && station.reviews.length > 0) {

      const sumOfRatings = station.reviews.reduce(
        (total, obj) => total + obj.rating,
        0
      );
      
      setRating(sumOfRatings / station.reviews.length);
      const flooredRating = Math.floor(sumOfRatings / station.reviews.length);
      setFilledStars(flooredRating);
      setNoOfRating(station.reviews.length);

      const ratingRange = {1:0,2:0,3:0,4:0,5:0}
     station.reviews.forEach(ratingz => {
      
        if (!ratingRange[ratingz.rating]) {
          ratingRange[ratingz.rating] = 1;
        } else {
            
            ratingRange[ratingz.rating]++;
        }
    });
    setUserRatingRange(ratingRange)
    }
    
  }, [station.reviews]);
 
  useEffect(() => {
    setStars([])
    const starsCopy = [];
    let num = 0;
    for (let i = 0; i < filledStars; i++) {
      num = num + 1;
      starsCopy.push(
        <StarIcon key={i} sx={{ color: "gold", fontSize: size }} />
      );
    }
    if (!Number.isInteger(rating)) {
      num = num + 1;
      const halfStar = rating - filledStars;
      if (halfStar < 0.3) {
        starsCopy.push(<StarIcon  sx={{ fontSize: size }} />);
      } else if (halfStar > 0.7) {
        starsCopy.push(<StarIcon   sx={{ color: "gold", fontSize: size }} />);
      } else {
        starsCopy.push(
          <StarHalfIcon
        
            sx={{ color: "gold", fontSize: size }}
          />
        );
      }
    }
    for (let i = num; i < totalStars; i++) {
      starsCopy.push(<StarIcon key={i} sx={{ fontSize: size }} />);
    }
    setStars(starsCopy);
  }, [filledStars, rating]);
 
  const array = [5, 4, 3, 2, 1];
  return (
    <div className=' flex-1 rounded-lg border-[1px] cborder p-4 flex-col'>
      <div className=' flex flex-col w-full items-center tp gap-y-2'>
        <div className=' text-4xl th'>{rating.toFixed(1)}</div>

        <div className=' flex flex-row gap-x-[2px]'>{stars}</div>

        <div className=' text-sm tp'>{noOfrating} review{noOfrating > 1 && "s"}</div>
      </div>
      {array.map((item, i) => {
       return(
        <RatingRange reviews={station.reviews} key={i} item={item} userRatingRange={userRatingRange} noOfrating={noOfrating}/>
       )
      })}
    </div>
  );
}

function RatingRange({item,userRatingRange,noOfrating}){
  const [width, setWidth] = useState(0)
       
  useEffect(()=>{
    const times = userRatingRange[item]
    if(times > 0){
      const wdt = (times / noOfrating) * 100
    
      setWidth(wdt)
    }else{
      setWidth(0)
    }  
  },[item,userRatingRange,noOfrating])
  return (
    <div  className='flex flex-row gap-x-2 items-center mt-2'>
      <div className=' text-sm th'>{item}</div>
      <div className='flex-1 h-2 rounded-lg sbg'>
        <div style={{ width: `${width}%` }} className={` h-2 rounded-lg bg-[#fbbc04]`}></div>
      </div>
    </div>
  );
}
