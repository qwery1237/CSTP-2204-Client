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
    console.log(response);
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

export const creatAccount = async (email) => {
  const name = email.split('@')[0];

  try {
    const response = await axios.post(serverLink + '/auth/adduserdata', {
      email,
      name,
    });
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};
