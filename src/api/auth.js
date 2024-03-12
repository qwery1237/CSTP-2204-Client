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
  } catch (e) {
    throw new Error(e);
  }
};

export const otpValidation = async (email, otp) => {
  try {
    const response = await axios.post(serverLink + '/auth/otpvalidation', {
      email,
      otp,
    });
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const otpResend = async (email) => {
  try {
    const response = await axios.post(serverLink + '/auth/otpresend', {
      email,
    });
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const createAccount = async (email) => {
  const name = email.split('@')[0];
  const profileImg = '/profileDefault.jpg';

  try {
    const response = await axios.post(serverLink + '/auth/adduserdata', {
      email,
      name,
      profileImg,
    });
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};
export const emailLogin = async (email, password) => {
  try {
    const response = await axios.post(serverLink + '/auth/emaillogin', {
      email,
      password,
    });
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserData = async (token, setUser) => {
  try {
    const response = await axios.get(serverLink + '/user/getuserdata', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const userData = response.data.data;
    setUser(userData);
    return userData;
  } catch (e) {
    throw new Error(e);
  }
};
