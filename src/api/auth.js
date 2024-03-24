import serverLink from '../serverLink';
import axios from 'axios';

export const emailSignUp = async (email, password, isAgreedToTerms) => {
  try {
    const response = await axios.post(serverLink + '/auth/emailsignup', {
      email,
      password,
      isAgreedToTerms,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const otpValidation = async (email, otp) => {
  try {
    const response = await axios.post(serverLink + '/auth/otpvalidation', {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const otpResend = async (email) => {
  try {
    const response = await axios.post(serverLink + '/auth/otpresend', {
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// export const addAccountInitialData = async (email) => {
//   const name = email.split('@')[0];
//   const profileImg = '/profileDefault.jpg';

//   try {
//     const response = await axios.post(serverLink + '/auth/adduserdata', {
//       email,
//       name,
//       profileImg,
//     });
//     return response.data;
//   } catch (e) {
//     throw new Error(e);
//   }
// };
export const emailLogin = async (email, password) => {
  try {
    const response = await axios.post(serverLink + '/auth/emaillogin', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const googleLogin = async (token) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const loginWithGoogleAccount = async (name, email, picture) => {
  let invite = '';
  if (localStorage.getItem('inviteToken')) {
    invite = JSON.parse(localStorage.getItem('inviteToken'));
  }
  try {
    const response = await axios.post(serverLink + '/auth/oauth', {
      email: email,
      name: name,
      picture: picture,
      invite: invite,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const sendchangePasswordEmail = async (email) => {
  try {
    const response = await axios.post(serverLink + '/auth/forgetpassword', {
      email,
      baseUrl: import.meta.env.VITE_DEPLOYED_LINK,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const changePassword = async (id, password, confirmPassword) => {
  try {
    const response = await axios.post(serverLink + '/auth/changepassword', {
      id,
      password,
      confirmPassword,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
