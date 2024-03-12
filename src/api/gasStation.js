import serverLink from '../serverLink';
import axios from 'axios';
export const getGasStations = async (userLatLng) => {
  try {
    const { lat, lng } = userLatLng;
    const response = await axios.post(serverLink + '/user/getgasstations', {
      latitude: lat,
      longitude: lng,
    });
    const { success, data } = response.data;
    if (!success) {
      return;
    }
    return data;
  } catch (error) {
    console.error('Network error:', error);
  }
};
export const getCrrLocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(userLatLng);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};
