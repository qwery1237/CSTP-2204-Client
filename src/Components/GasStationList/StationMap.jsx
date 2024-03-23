import React, { useContext, useEffect, useRef, useState } from 'react';
import StationInfo from './StationInfo';
import { GoogleMap, Marker } from '@react-google-maps/api';
import stationMarke from '/station.png';
import Context from '../../context';
import { getCrrLocation } from '../../api/gasStation';

export default function StationMap({ preferences }) {
  const { gasStationPreference } = useContext(Context);
  const [stations, setStations] = useState();
  useEffect(() => {
    if (!gasStationPreference) return;
    console.log(gasStationPreference);
  }, [gasStationPreference]);
  //TODO:
  const [showStationInfo, setShowStationInfo] = useState(false);
  const mapRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 520);

  const [target, setTarget] = useState(null);
  const { userLatLng, setUserLatLng } = useContext(Context);
  useEffect(() => {
    if (!userLatLng) {
      getLocation();
    }
  }, []);
  const getLocation = async () => {
    const crrLatLng = await getCrrLocation();
    setUserLatLng(crrLatLng);
  };
  const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    //  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#242f3e' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    // {
    //   featureType: "road.highway",
    //   elementType: "geometry",
    //   stylers: [{ color: "#746855" }],
    // },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    // {
    //   featureType: "road.highway",
    //   elementType: "labels.text.fill",
    //   stylers: [{ color: "#f3d19c" }],
    // },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ];
  const mapOptions = {
    disableDefaultUI: true,
    styles: mapStyle,
  };
  const mapContainerStyle = {
    height: '100%',
    width: '100%',
    border: '0px',
    borderRadius: isSmallScreen ? '0px' : '8px',
  };
  const handleMarkerClick = (station) => {
    setTarget(station);
    setShowStationInfo(true);
  };
  if (!gasStationPreference) {
    return <></>;
  }

  return (
    <div className='w-full h-full relative'>
      {showStationInfo && (
        <StationInfo
          setShowStationInfo={setShowStationInfo}
          target={target}
          preferences={preferences}
        />
      )}
      <GoogleMap
        ref={mapRef}
        options={mapOptions}
        mapContainerStyle={mapContainerStyle}
        center={userLatLng}
        zoom={13}
      >
        {gasStationPreference &&
          gasStationPreference.map((station) => {
            // const [fuelPrice, setFuelPrice] = useState(null);
            // useEffect(() => {
            //   if (preferences.fuelType === 'Regular') {
            //     if (station.price.regular.price === 0) {
            //       setFuelPrice('--');
            //     } else {
            //       setFuelPrice(station.price.regular.price);
            //     }
            //   } else if (preferences.fuelType === 'Mid-grade') {
            //     if (station.price.midGrade.price === 0) {
            //       setFuelPrice('--');
            //     } else {
            //       setFuelPrice(station.price.midGrade.price);
            //     }
            //   } else if (preferences.fuelType === 'Premium') {
            //     if (station.price.premium.price === 0) {
            //       setFuelPrice('--');
            //     } else {
            //       setFuelPrice(station.price.premium.price);
            //     }
            //   } else if (preferences.fuelType === 'Diesel') {
            //     if (station.price.diesel.price === 0) {
            //       setFuelPrice('--');
            //     } else {
            //       setFuelPrice(station.price.diesel.price);
            //     }
            //   }
            // }, [preferences.fuelType]);
            const fuelPrice =
              Object.values(station.price)[preferences[2]].price || '- -';
            const fuelType =
              Object.keys(station.price)[preferences[2]] == 'midGrade'
                ? 'mid-grade'
                : Object.keys(station.price)[preferences[2]];
            return (
              <Marker
                key={station._id}
                position={{
                  lat: station.latlng.latitude,
                  lng: station.latlng.longitude,
                }}
                title={station.name}
                icon={{
                  url: stationMarke,
                  scaledSize: { width: 36, height: 40 },
                  labelOrigin: { x: 8, y: -4 },
                }}
                label={{
                  text: `$ ${fuelPrice}/${fuelType}`,
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: '200',
                }}
                onClick={() => handleMarkerClick(station)}
              />
            );
          })}
      </GoogleMap>
    </div>
  );
}
