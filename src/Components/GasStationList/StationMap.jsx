import React, { useEffect, useRef, useState } from 'react';
import StationInfo from './StationInfo';
import { GoogleMap, Marker } from '@react-google-maps/api';
import stationMarke from '/station.png';

export default function StationMap() {
  const [showStationInfo, setShowStationInfo] = useState(false);
  const mapRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 520);
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
  const initialPosition = {
    lat: 49.258347,
    lng: -123.076953,
  };
  const handleMarkerClick = () => {
    setShowStationInfo(true);
  };
  useEffect(() => {
    getThirdGmStyleChild();
  }, []);
  const getThirdGmStyleChild = async () => {
    const gmStyleElements = document.querySelectorAll('.gm-style');

    if (gmStyleElements.length === 0) {
      if (count < 5) {
        setCount((prev) => prev + 1);
        await sleep(1000);
        getThirdGmStyleChild();
      }
    }
    console.log(gmStyleElements);

    const thirdGmStyleElement = gmStyleElements[0].children[2];

    thirdGmStyleElement.style.border = '0px';
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return (
    <div className='w-full h-full relative'>
      {showStationInfo && (
        <StationInfo setShowStationInfo={setShowStationInfo} />
      )}
      <GoogleMap
        ref={mapRef}
        options={mapOptions}
        mapContainerStyle={mapContainerStyle}
        center={initialPosition}
        zoom={15}
      >
        <Marker
          position={initialPosition}
          title='Your Marker'
          icon={{
            url: stationMarke,
            scaledSize: { width: 36, height: 40 },
          }}
          onClick={() => handleMarkerClick()}
        />
      </GoogleMap>
    </div>
  );
}
