import serverLink from "../serverLink";
import axios from 'axios'
export async function setGasStationData(gasStation,setGasStation, latitude, longitude){
   if(!gasStation){
        if (localStorage.getItem('fuelgotoken')) {
          const token = JSON.parse(localStorage.getItem('fuelgotoken'));

          try {
            const response = await axios.post(
              serverLink + '/user/getgasstations',
              {
                latitude: latitude,
                longitude: longitude,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              }
            );
            const { success, data } = response.data;
      
            if (success === true) {
              console.log(data);
              setGasStation(data);
            } else {
             
            }
          
          } catch (error) {
     
            console.error('Network error:', error);
          }
        } else {
        
        }
      }
      
}