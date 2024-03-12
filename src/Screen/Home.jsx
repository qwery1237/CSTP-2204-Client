import React, { useContext, useEffect, useRef, useState } from 'react';
import GasStationList from '../Components/GasStationList/GasStationList';
import Preferences from '../Components/User/Preferences';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GoogleMap, Marker } from '@react-google-maps/api';
import stationMarke from '/station.png';
import CloseIcon from '@mui/icons-material/Close';
import { useOutletContext } from 'react-router-dom';
import TopNav from '../Components/TopNav/TopNav';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { setUserData } from '../api/setUserData';
import Context from '../context';
import { useNavigate } from 'react-router-dom';
import { setGasStationData } from '../api/setGasStationData';
import getUserCoord from '../api/getUserCoord';
import { useAuth } from '../context/AuthContext';
import { getCrrLocation, getGasStations } from '../api/gasStation';
import Loading from '../Components/UI/Loading';

export default function Home() {
  const [isList, setIsList] = useState(true);
  const { setIsProfilePopUp } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const { gasStation, setGasStation, userLatLng, setUserLatLng } =
    useContext(Context);
  const [preferences, setPreferences] = useState({
    sort: 'Distance',
    recent: false,
    fuelType: 'Regular',
    Amenities: [],
  });
  const navigate = useNavigate();
  useEffect(() => {
    // getStationList();
    // getData();
  }, []);
  const getStationList = async () => {
    try {
      const crrLatLng = await getCrrLocation();
      setUserLatLng(crrLatLng);
      const stationList = await getGasStations(crrLatLng);
      setGasStation(stationList);
      setLoading(false);
    } catch (e) {
      alert(e.message);
    }
  };
  // async function getData() {
  //   // await setUserData(user, setUser, navigate);
  //   async function getLocation() {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setGasStationData(
  //             gasStation,
  //             setGasStation,
  //             position.coords.latitude,
  //             position.coords.longitude
  //           );
  //           if (!userLatLng) {
  //             setUserLatLng({
  //               lat: position.coords.latitude,
  //               lng: position.coords.longitude,
  //             });
  //           }
  //         },
  //         (error) => {
  //           if (error.code === 1) {
  //             alert(
  //               'Allow access to Windows Location \n Go to Windows settings > Location > Enable location + Enable apps can access location'
  //             );
  //             getLocation();
  //           } else {
  //             console.error('Error getting user location:', error);
  //             getLocation();
  //           }
  //           console.error('Error getting user location:', error);
  //           getLocation();
  //         }
  //       );
  //     } else {
  //       alert('Geolocation is not supported by this browser.');
  //       navigate('/');
  //     }
  //   }
  //   getLocation();
  // }

  return (
    <>
      <TopNav showSearchbar setIsProfilePopUp={setIsProfilePopUp}>
        <div
          onClick={() => setIsList(true)}
          className={`flex flex-row items-center ${
            isList
              ? 'text-lightMode-button dark:text-darkMode-button'
              : 'text-lightMode-p dark:text-darkMode-p  hover:text-lightMode-header dark:hover:text-darkMode-header '
          }    w-[100px] justify-center gap-x-1 ${'cursor-pointer'}  max-[740px]:w-10`}
        >
          <FormatListBulletedOutlinedIcon />
          <div className='max-[740px]:hidden'>List</div>
        </div>
        <div className='h-full cborder border-l-[1px]'></div>

        <div
          onClick={() => setIsList(false)}
          className={`flex flex-row items-center ${
            !isList
              ? 'text-lightMode-button dark:text-darkMode-button'
              : 'text-lightMode-p dark:text-darkMode-p  hover:text-lightMode-header dark:hover:text-darkMode-header '
          } w-[100px] justify-center gap-x-1 ${'cursor-pointer'} max-[740px]:w-10`}
        >
          <MapOutlinedIcon />
          <div className='max-[740px]:hidden'>Map</div>
        </div>
      </TopNav>
      <div className='  max-[520px]:overflow-auto  max-[520px]:flex max-[520px]:flex-row max-[520px]:gap-x-4'>
        {' '}
        <Preferences
          isList={isList}
          preferences={preferences}
          setPreferences={setPreferences}
        />
      </div>
      {loading ? (
        <Loading bgColor='bg-inherit' />
      ) : (
        <GasStationList isList={isList} preferences={preferences} />
      )}
      {/* <MainBody isList={isList} preferences={preferences} /> */}
    </>
  );
}

// function MainBody({ isList, preferences }) {
//   const { gasStationPreference } = useContext(Context);
//   return (
//     <>
//       {isList ? (
//         <div className='flex-1 w-full overflow-y-auto flex flex-col gap-y-4 max-[720px]:flex-row max-[720px]:flex-wrap max-[720px]:justify-evenly max-[720px]:gap-4 max-[630px]:flex-col max-[630px]:flex-nowrap max-[630px]:justify-normal  max-[630px]:items-center max-[630px]:px-2 pb-4 '>
//           {gasStationPreference &&
//             gasStationPreference.map((station) => {
//               return (
//                 <IndividualStationsList
//                   station={station}
//                   preferences={preferences}
//                 />
//               );
//             })}
//         </div>
//       ) : (
//         <div className=' flex-1 w-full '>
//           <StationMap
//             preferences={preferences}
//             gasStationPreference={gasStationPreference}
//           />
//         </div>
//       )}
//     </>
//   );
// }

// function StationMap({ gasStationPreference, preferences }) {
//   const [showStationInfo, setShowStationInfo] = useState(false);
//   const mapRef = useRef(null);
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 520);
//   const navigate = useNavigate();
//   const [target, setTarget] = useState(null);
//   const { userLatLng, setUserLatLng } = useContext(Context);
//   useEffect(() => {
//     if (!userLatLng) {
//       getCoord();
//     }
//   }, []);

//   async function getCoord() {
//     await getUserCoord(userLatLng, setUserLatLng, navigate);
//   }
//   const mapStyle = [
//     { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
//     { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
//     //  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
//     {
//       featureType: 'administrative.locality',
//       elementType: 'labels.text.stroke',
//       stylers: [{ color: '#242f3e' }],
//     },
//     {
//       featureType: 'poi',
//       elementType: 'labels.icon',
//       stylers: [{ visibility: 'off' }],
//     },
//     {
//       featureType: 'poi',
//       elementType: 'labels.text.fill',
//       stylers: [{ visibility: 'off' }],
//     },
//     {
//       featureType: 'poi.park',
//       elementType: 'geometry',
//       stylers: [{ visibility: 'off' }],
//     },
//     {
//       featureType: 'poi.park',
//       elementType: 'labels.text.fill',
//       stylers: [{ visibility: 'off' }],
//     },
//     {
//       featureType: 'road',
//       elementType: 'geometry',
//       stylers: [{ color: '#38414e' }],
//     },
//     {
//       featureType: 'road',
//       elementType: 'geometry.stroke',
//       stylers: [{ color: '#212a37' }],
//     },
//     {
//       featureType: 'road',
//       elementType: 'labels.text.fill',
//       stylers: [{ color: '#9ca5b3' }],
//     },
//     // {
//     //   featureType: "road.highway",
//     //   elementType: "geometry",
//     //   stylers: [{ color: "#746855" }],
//     // },
//     {
//       featureType: 'road.highway',
//       elementType: 'geometry.stroke',
//       stylers: [{ color: '#1f2835' }],
//     },
//     // {
//     //   featureType: "road.highway",
//     //   elementType: "labels.text.fill",
//     //   stylers: [{ color: "#f3d19c" }],
//     // },
//     {
//       featureType: 'transit',
//       elementType: 'geometry',
//       stylers: [{ visibility: 'off' }],
//     },
//     {
//       featureType: 'transit.station',
//       elementType: 'labels.text.fill',
//       stylers: [{ visibility: 'off' }],
//     },
//     {
//       featureType: 'water',
//       elementType: 'geometry',
//       stylers: [{ color: '#17263c' }],
//     },
//     {
//       featureType: 'water',
//       elementType: 'labels.text.fill',
//       stylers: [{ color: '#515c6d' }],
//     },
//     {
//       featureType: 'water',
//       elementType: 'labels.text.stroke',
//       stylers: [{ color: '#17263c' }],
//     },
//   ];
//   const mapOptions = {
//     disableDefaultUI: true,
//     styles: mapStyle,
//   };
//   const mapContainerStyle = {
//     height: '100%',
//     width: '100%',
//     border: '0px',
//     borderRadius: isSmallScreen ? '0px' : '8px',
//   };
//   const initialPosition = {
//     lat: 49.258347,
//     lng: -123.076953,
//   };
//   const handleMarkerClick = (placeId) => {
//     setTarget(placeId);
//     setShowStationInfo(true);
//   };
//   if (!gasStationPreference) {
//     return <></>;
//   }

//   return (
//     <div className='w-full h-full relative'>
//       {showStationInfo && (
//         <StationInfo
//           setShowStationInfo={setShowStationInfo}
//           target={target}
//           preferences={preferences}
//         />
//       )}
//       <GoogleMap
//         ref={mapRef}
//         options={mapOptions}
//         mapContainerStyle={mapContainerStyle}
//         center={userLatLng}
//         zoom={13}
//       >
//         {gasStationPreference.map((station) => {
//           const [fuelPrice, setFuelPrice] = useState(null);
//           useEffect(() => {
//             if (preferences.fuelType === 'Regular') {
//               if (station.price.regular.price === 0) {
//                 setFuelPrice('--');
//               } else {
//                 setFuelPrice(station.price.regular.price);
//               }
//             } else if (preferences.fuelType === 'Mid-grade') {
//               if (station.price.midGrade.price === 0) {
//                 setFuelPrice('--');
//               } else {
//                 setFuelPrice(station.price.midGrade.price);
//               }
//             } else if (preferences.fuelType === 'Premium') {
//               if (station.price.premium.price === 0) {
//                 setFuelPrice('--');
//               } else {
//                 setFuelPrice(station.price.premium.price);
//               }
//             } else if (preferences.fuelType === 'Diesel') {
//               if (station.price.diesel.price === 0) {
//                 setFuelPrice('--');
//               } else {
//                 setFuelPrice(station.price.diesel.price);
//               }
//             }
//           }, [preferences.fuelType]);
//           return (
//             <Marker
//               key={station._id}
//               position={{
//                 lat: station.latlng.latitude,
//                 lng: station.latlng.longitude,
//               }}
//               title={station.name}
//               icon={{
//                 url: stationMarke,
//                 scaledSize: { width: 36, height: 40 },
//                 labelOrigin: { x: 8, y: -4 },
//               }}
//               label={{
//                 text: `$${fuelPrice}/ ${preferences.fuelType}`,
//                 color: 'white',

//                 fontSize: '12px',
//                 fontWeight: '200',
//               }}
//               onClick={() => handleMarkerClick(station.placeId)}
//             />
//           );
//         })}
//       </GoogleMap>
//     </div>
//   );
// }

// function StationInfo({ setShowStationInfo, placeId, preferences }) {
//   const { gasStation } = useContext(Context);
//   const navigate = useNavigate();
//   const [fuelPrice, setFuelPrice] = useState(null);
//   const [station, setStation] = useState(null);
//   useEffect(() => {
//     const targerStation = gasStation.find((obj) => obj.id === placeId);
//     setStation(targerStation);
//   }, [placeId]);
//   useEffect(() => {
//     if (station) {
//       if (preferences.fuelType === 'Regular') {
//         if (station.price.regular.price === 0) {
//           setFuelPrice('--');
//         } else {
//           setFuelPrice(station.price.regular.price);
//         }
//       } else if (preferences.fuelType === 'Mid-grade') {
//         if (station.price.midGrade.price === 0) {
//           setFuelPrice('--');
//         } else {
//           setFuelPrice(station.price.midGrade.price);
//         }
//       } else if (preferences.fuelType === 'Premium') {
//         if (station.price.premium.price === 0) {
//           setFuelPrice('--');
//         } else {
//           setFuelPrice(station.price.premium.price);
//         }
//       } else if (preferences.fuelType === 'Diesel') {
//         if (station.price.diesel.price === 0) {
//           setFuelPrice('--');
//         } else {
//           setFuelPrice(station.price.diesel.price);
//         }
//       }
//     }
//   }, [preferences.fuelType, station]);

//   const isFavourite = false;

//   if (!station) {
//     return <></>;
//   }
//   return (
//     <div className=' absolute bottom-4 left-4 w-[300px] bg max-[520px]:rounded-none rounded-lg z-[1] max-[520px]:w-full max-[520px]:bottom-0 max-[520px]:left-0'>
//       <div className=' caret-transparent w-full rounded-lg max-[520px]:rounded-none border-[1px] max-[520px]:border-0 cborder flex justify-between p-4 '>
//         <div className=' flex  flex-col w-full'>
//           <div className='flex flex-row w-full items-center justify-between'>
//             <div className='w-[225px] max-[325px]:w-[200px] max-[300px]:w-[175px]   font-[400] th max-text-xl text-ellipsis whitespace-nowrap overflow-hidden'>
//               {station.name}
//             </div>
//             <div
//               onClick={() => setShowStationInfo(false)}
//               className='  th  cursor-pointer'
//             >
//               <CloseIcon />
//             </div>
//           </div>
//           <div className=' relative pt-2'>
//             <img
//               className=' w-[320px]   min-[520px]:aspect-video max-[500px]:w-full rounded-lg object-cover'
//               src='/oilrig.jpg'
//               alt=''
//             />
//             <div className=' absolute top-0 right-0  p-2 rounded-full cursor-pointer th'>
//               {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//             </div>
//           </div>
//           <div className=' flex flex-col justify-center pt-2 '>
//             <div className=' flex flex-col gap-y-2'>
//               <div className=' flex flex-row justify-between items-center'>
//                 <div className='tp flex w-full  flex-row gap-x-[2px] text-sm overflow-hidden'>
//                   <div className=''>{station.distanceFromUser}/</div>
//                   <div className=' text-ellipsis whitespace-nowrap overflow-hidden w-[175px] max-[285px]:w-[165px]'>
//                     {' '}
//                     {station.address}
//                   </div>
//                 </div>
//                 <div className='p-[6px] rounded-full th sbg text-xs '>
//                   {station.fuelGoRating.rating.toFixed(1)}
//                 </div>
//               </div>
//               <div className=' flex flex-row justify-between'>
//                 <div className='tp flex flex-row text-sm'>
//                   <div className=''>${fuelPrice}/</div>
//                   {preferences.fuelType}
//                 </div>
//                 <div
//                   onClick={() => navigate('/gs')}
//                   className='  tb text-sm hover:underline cursor-pointer'
//                 >
//                   More info
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function IndividualStationsList({ station, preferences }) {
//   const navigate = useNavigate();
//   const [fuelPrice, setFuelPrice] = useState(null);
//   useEffect(() => {
//     if (preferences.fuelType === 'Regular') {
//       if (station.price.regular.price === 0) {
//         setFuelPrice('--');
//       } else {
//         setFuelPrice(station.price.regular.price);
//       }
//     } else if (preferences.fuelType === 'Mid-grade') {
//       if (station.price.midGrade.price === 0) {
//         setFuelPrice('--');
//       } else {
//         setFuelPrice(station.price.midGrade.price);
//       }
//     } else if (preferences.fuelType === 'Premium') {
//       if (station.price.premium.price === 0) {
//         setFuelPrice('--');
//       } else {
//         setFuelPrice(station.price.premium.price);
//       }
//     } else if (preferences.fuelType === 'Diesel') {
//       if (station.price.diesel.price === 0) {
//         setFuelPrice('--');
//       } else {
//         setFuelPrice(station.price.diesel.price);
//       }
//     }
//   }, [preferences.fuelType]);
//   const rating = station.fuelGoRating.rating;
//   const filledStars = Math.floor(rating);
//   const totalStars = 5;
//   const size = 16;
//   const stars = [];
//   const isFavourite = false;
//   // Filled stars
//   for (let i = 0; i < filledStars; i++) {
//     stars.push(<StarIcon key={i} sx={{ color: 'gold', fontSize: size }} />);
//   }

//   // Half star
//   if (!Number.isInteger(rating)) {
//     const halfStar = rating - filledStars;
//     if (halfStar < 0.3) {
//       stars.push(<StarIcon key={filledStars} sx={{ fontSize: size }} />);
//     } else if (halfStar > 0.7) {
//       stars.push(
//         <StarIcon key={filledStars} sx={{ color: 'gold', fontSize: size }} />
//       );
//     } else {
//       stars.push(
//         <StarHalfIcon
//           key={filledStars}
//           sx={{ color: 'gold', fontSize: size }}
//         />
//       );
//     }
//   }

//   for (let i = stars.length; i < totalStars; i++) {
//     stars.push(<StarIcon key={i} sx={{ fontSize: size }} />);
//   }
//   return (
//     <div className=' caret-transparent w-full rounded-lg border-[1px] cborder flex justify-between p-4  max-[720px]:w-fit  '>
//       <div className=' flex flex-row gap-x-12 max-[720px]:flex-col '>
//         <div className=' relative'>
//           <img
//             className=' w-[320px] max-[720px]:w-[260px] max-[630px]:w-[320px]  aspect-video rounded-lg object-cover'
//             src={station.profileImg}
//             alt=''
//           />
//           <div className=' absolute top-0 right-0  p-2 rounded-full cursor-pointer th min-[720px]:hidden'>
//             {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//           </div>
//         </div>
//         <div className=' flex flex-col justify-center max-[720px]:pt-2 '>
//           <div className=' flex flex-col gap-y-5 max-[720px]:gap-y-2'>
//             <div className='flex flex-row w-full items-center justify-between'>
//               <div className='w-[225px] max-[325px]:w-[200px] max-[300px]:w-[175px]  text-2xl font-[400] th max-[720px]:text-xl text-ellipsis whitespace-nowrap overflow-hidden'>
//                 {station.name}
//               </div>
//               <div className='p-[6px] rounded-full th fbg text-xs min-[720px]:hidden'>
//                 {rating.toFixed(1)}
//               </div>
//             </div>
//             <div className=' flex flex-row tp items-center gap-x-2 text-sm max-[720px]:hidden'>
//               <div>{rating.toFixed(1)}</div>
//               <div className='  relative '>
//                 <div className=' flex flex-row gap-x-[2px]'>{stars}</div>
//               </div>
//               <div className=' text-[9px] relative top-[-4px] right-[4px]'>
//                 ({station.fuelGoRating.totalRating})
//               </div>
//             </div>
//             <div className='tp flex w-full  flex-row gap-x-[2px] text-sm overflow-hidden'>
//               <div className=''>{station.distanceFromUser}/</div>
//               <div className=' text-ellipsis whitespace-nowrap overflow-hidden w-[175px] max-[285px]:w-[165px]'>
//                 {' '}
//                 {station.address}
//               </div>
//             </div>
//             <div className=' flex flex-row justify-between'>
//               <div className='tp flex flex-row text-sm'>
//                 <div className=''>${fuelPrice}/</div> {preferences.fuelType}
//               </div>
//               <div
//                 onClick={() => navigate('/gs')}
//                 className=' min-[720px]:hidden tb text-sm hover:underline cursor-pointer'
//               >
//                 More info
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className=' flex flex-col justify-between th max-[720px]:hidden ml-4'>
//         <div className='  p-2 rounded-full sbg cursor-pointer'>
//           {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//         </div>
//         <div
//           onClick={() => navigate('/gs')}
//           className=' tb p-2 rounded-full sbg cursor-pointer'
//         >
//           <NavigateNextIcon />
//         </div>
//       </div>
//     </div>
//   );
// }

// shadow-[0px_0px_6px_#e2e8f033]  dark:shadow-[0px_0px_6px__#e2e8f033]
