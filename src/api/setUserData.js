import serverLink from '../serverLink';

import axios from 'axios';
export const setUserData = async (user, setUser, navigate) => {
  if (!user) {
    if (localStorage.getItem('fuelgotoken')) {
      const token = JSON.parse(localStorage.getItem('fuelgotoken'));

      try {
        const response = await axios.get(
          serverLink + '/user/getuserdata',

          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { success } = response.data;

        if (success === true) {
          setUser(response.data.data);
          return;
        } else {
          navigate('/accounts/login');
        }
      } catch (error) {
        navigate('/accounts/login');
        console.error('Network error:', error);
      }
    } else {
      navigate('/accounts/login');
    }
  } else {
    return;
  }
};
