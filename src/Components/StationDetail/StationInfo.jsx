import React, { useEffect, useState } from "react";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Close, FavoriteBorder, MapOutlined } from "@mui/icons-material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MakeImpact from "./MakeImpact";
import StationMapDistance from "./StationMapDistance";
import { getCrrLocation } from "../../api/gasStation";
import { useAuth } from "../../context/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToFavorite, deleteFromFavorite } from "../../api/user";
export default function StationInfo({ setModal, station, placeId }) {
  const { name, profileImg, address, latlng, reviews } =
    station;
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [isDirectionMap, setIsDirectionMap] = useState(false);
  const [rating, setRating] = useState(0);
  const [filledStars, setFilledStars] = useState(0);
  const [noOfrating, setNoOfRating] = useState(0);
  const [stars, setStars] = useState([]);
  const [userLatLng, setuserLatLng] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, token, updateUserData } = useAuth();
  const totalStars = 5;
  const size = 16;
  useEffect(() => {
    if (user) {
      if (
        user.favourite &&
        user.favourite.length !== 0 &&
        user.favourite.includes(placeId)
      ) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [user.favourite]);
  useEffect(() => {
    if (reviews  && reviews.length > 0) {
      setRating(0)
    setFilledStars(0)
    setNoOfRating(0)
    
    
      
      
    
      const sumOfRatings = reviews.reduce(
        (total, obj) => total + obj.rating,
        0
      );
      setRating(sumOfRatings / station.reviews.length);
      const flooredRating = Math.floor(sumOfRatings / station.reviews.length);
      setFilledStars(flooredRating);
      setNoOfRating(reviews.length);
    }
  }, [reviews]);
  useEffect(() => {
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
        starsCopy.push(<StarIcon sx={{ fontSize: size }} />);
      } else if (halfStar > 0.7) {
        starsCopy.push(<StarIcon sx={{ color: "gold", fontSize: size }} />);
      } else {
        starsCopy.push(
          <StarHalfIcon
            key={filledStars}
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

  function directionMapHandler(bool) {
    if (bool) {
      setIsDirectionMap(true);
    } else {
      setIsDirectionMap(false);
    }
  }

  useEffect(() => {
    getUserLocation();
  }, []);
  const getUserLocation = async () => {
    const location = await getCrrLocation();
    setuserLatLng(location);
  };

  const favoriteHandler = async () => {
    if (!isFavorite) {
      const { success, message } = await addToFavorite(token, placeId);

      if (!success) {
        alert(message);
        return;
      }
       setIsFavorite(true);
      await updateUserData(token);
    } else {
      const { success, message } = await deleteFromFavorite(token, placeId);

      if (!success) {
        alert(message);
        return;
      }
       setIsFavorite(false);
      await updateUserData(token);
    }
  };
  const redirectToGoogleMaps = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      
        window.location.href = `geo:0,0?q=${encodeURIComponent(station.address)}`;
    } else {
   
        window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(station.address)}`;
    }
    
};

  return (
    <div
      className={` w-full rounded-lg  cborder flex flex-row p-4 max-[640px]:items-center max-[640px]:flex-col max-[380px]:px-2 ${
        isDirectionMap ? "h-[292px]" : ""
      }`}
    >
      <div className=" relative w-[320px] h-[180px] max-[350px]:w-full ">
        {!isDirectionMap ? (
          <div className=" relative w-full h-full top-0 left-0 overflow-hidden">
            <img
              className=" w-full h-full rounded-lg object-cover"
              src={profileImg}
              alt=""
            />
            <div
              onClick={() => {
                favoriteHandler();
              }}
              className=" absolute top-2 right-2 th cursor-pointer text-lightMode-error dark:text-darkMode-error"
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorder />}
            </div>
            <div className=" w-14 h-14 absolute bottom-[-16px] right-[-16px] th  rounded-full bg">
              <div
                onClick={() => directionMapHandler(true)}
                className=" cursor-pointer w-full h-full relative right-[-12px] bottom-[-12px]"
              >
                {" "}
                <MapOutlined />
              </div>
            </div>
          </div>
        ) : (
          <div className=" absolute top-0 right-0 w-full h-full  z-[2] rounded-lg">
            <div className=" relative w-full h-full top-0 right-0">
              <div className=" w-14 h-14 absolute top-[-16px] right-[-16px] th  rounded-full bg z-[2]">
                <div
                  onClick={() => directionMapHandler(false)}
                  className=" cursor-pointer w-full h-full relative right-[-12px] top-[16px]"
                >
                  {" "}
                  <Close />
                </div>
              </div>
              <div className=" absolute top-0 right-0 w-full h-full rounded-t-lg">
                {userLatLng && (
                  <StationMapDistance
                    latlng={latlng}
                    userLatLng={userLatLng}
                    setDuration={setDuration}
                    setDistance={setDistance}
                  />
                )}
              </div>
              <div
                className={` transition-div absolute top-[180px] right-0  w-full sbg z-[1]   rounded-b-lg overflow-hidden`}
              >
                <div className=" w-full h-full flex flex-col p-4">
                  <div className=" flex flex-row items-center justify-between th">
                    <div className=" flex flex-row items-center gap-x-1 tp">
                      {" "}
                      <DirectionsCarFilledOutlinedIcon />
                      <div className=" text-sm">Distance</div>
                    </div>

                    <div className=" text-sm">{distance}</div>
                  </div>
                  <div className=" flex flex-row items-center justify-between th mt-4">
                    <div className=" flex flex-row items-center gap-x-1 tp">
                      {" "}
                      <AccessTimeOutlinedIcon />
                      <div className=" text-sm">Duration</div>
                    </div>
                    <div className=" text-sm">{duration}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className=" flex flex-col ml-12 my-4 justify-between max-[640px]:ml-0 max-[640px]:w-[320px]
      max-[350px]:w-full "
      >
        <div className="flex flex-row w-full items-center justify-between">
          <div className="w-[225px] max-[325px]:w-[200px] max-[300px]:w-[175px]  text-2xl font-[400] th max-[640px]:text-xl text-ellipsis whitespace-nowrap overflow-hidden">
            {name}
          </div>
          <div className="p-[6px] rounded-full th fbg text-xs min-[640px]:hidden">
            {rating.toFixed(1)}
          </div>
        </div>
        <div className=" flex flex-row tp items-center gap-x-2 text-sm max-[640px]:hidden">
          <div>{rating.toFixed(1)}</div>
          <div className="  relative ">
            <div className=" flex flex-row gap-x-[2px]">{stars}</div>
          </div>
          <div className=" text-[12px] relative top-0 right-[4px]">
            ({noOfrating})
          </div>
        </div>
        <div className="tp flex  w-full  max-[640px]:mt-2 flex-col max-[640px]:flex-row max-[640px]:justify-between max-[640px]:items-end">
          <div className=" w-[230px] max-[640px]:w-[calc(100%-95px)] max-[350px]:w-[220px] max-[330px]:w-[200px] max-[310px]:w-[180px] max-[290px]:w-[160px] text-ellipsis whitespace-nowrap overflow-hidden ">
            {address}
          </div>
          <div onClick={()=>redirectToGoogleMaps()} className=" tb text-sm hover:underline cursor-pointer min-[640px]:hidden ml-2 whitespace-nowrap">
            Get directions
          </div>
        </div>
        <div onClick={()=>redirectToGoogleMaps()} className=" tb text-sm hover:underline cursor-pointer max-[640px]:hidden ">
          Get directions
        </div>
      </div>
      <div className="flex-1"></div>
      <div className="h-[180px] w-[170px] max-[1150px]:hidden max-[1000px]:flex max-[850px]:hidden">
        <MakeImpact setModal={setModal} />
      </div>
    </div>
  );
}
