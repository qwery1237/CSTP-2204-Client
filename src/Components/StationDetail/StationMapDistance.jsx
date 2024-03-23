import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import stationMarke from '/station.png';

export default function StationMapDistance({ setDistance, setDuration , latlng,userLatLng}) {
  const mapRef = useRef(null);
  
  const [directions, setDirections] = useState(null);
  const [count, setCount] = useState(0);
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
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',
    outline: 'none',
  };
  const initialPosition = {
    lat: userLatLng.lat,
    lng: userLatLng.lng,
  };
  const markerposition = {
    lat: latlng.latitude,
    lng: latlng.longitude,
  };
 


  useEffect(() => {
    calculateDirections();
  }, []);

  const calculateDirections = () => {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(
          markerposition.lat,
          markerposition.lng
        ),
        destination: new window.google.maps.LatLng(
          initialPosition.lat,
          initialPosition.lng
        ),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          // setDistance(result.routes[0].legs[0].distance.text);
          const distance = result.routes[0].legs[0].distance.text;
          const duration = result.routes[0].legs[0].duration.text;

          setDistance(distance);
          setDuration(duration);
        } else {
          console.error('Error fetching directions:', status);
        }
      }
    );
  };

  return (
    <div style={{}} className='w-full h-full relative'>
      <GoogleMap
        ref={mapRef}
        options={mapOptions}
        mapContainerStyle={mapContainerStyle}
        center={initialPosition}
        zoom={15}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: '#3498db',
                strokeWeight: 5,
              },
              suppressMarkers: true,
            }}
          />
        )}
        <Marker
          position={markerposition}
          title='Your Marker'
          icon={{
            url: stationMarke,
            scaledSize: { width: 36, height: 40 },
          }}
        />
      </GoogleMap>
    </div>
  );
}
