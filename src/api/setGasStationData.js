import serverLink from '../serverLink';
import axios from 'axios';
export async function setGasStationData(
  gasStation,
  setGasStation,
  latitude,
  longitude
) {
  if (!gasStation) {
    try {
      const response = await axios.post(serverLink + '/user/getgasstations', {
        latitude: latitude,
        longitude: longitude,
      });
      const { success, data } = response.data;

      if (success === true) {
        setGasStation(data);
      } else {
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
}
