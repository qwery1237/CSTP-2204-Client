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

export const addAccountInitialData = async (email) => {
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
    const email = response.data.email;
    return email;
  } catch (error) {
    throw new Error(error);
  }
};
export const loginWithGoogleAccount = async (googleAccount) => {
  try {
    const response = await axios.post(serverLink + '/auth/oauth', {
      email: googleAccount,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const sendchangePasswordEmail = async (email) => {
  try {
    const response = await axios.post(serverLink + '/auth/forgetpassword', {
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
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
