import serverLink from '../serverLink';
import axios from 'axios';

export const getUserData = async (token) => {
  try {
    const response = await axios.get(serverLink + '/user/getuserdata', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const userData = response.data.data;

    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getFavStations = async (token, stations, lat, lng) => {
  try {
    const response = await axios.post(
      serverLink + '/user/getfavouritestations',
      {
        stations,
        lat,
        lng,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const commentLike = async (token, placeId, commentUserEmail) => {
  try {
    const response = await axios.post(
      serverLink + '/user/likecomment',
      {
        placeId: placeId,
        commentUserEmail: commentUserEmail,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const commentUnLike = async (token, placeId, commentUserEmail) => {
  try {
    const response = await axios.post(
      serverLink + '/user/unlikecomment',
      {
        placeId: placeId,
        commentUserEmail: commentUserEmail,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const addComment = async (
  token,
  placeId,
  rating,
  photosVideos,
  comment
) => {
  try {
    const response = await axios.post(
      serverLink + '/user/addcomment',
      {
        placeId: placeId,
        rating: rating,
        photosVideos: photosVideos,
        comment: comment,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const editComment = async (
  token,
  placeId,
  rating,
  photosVideos,
  comment
) => {
  try {
    const response = await axios.post(
      serverLink + '/user/editcomment',
      {
        placeId: placeId,
        rating: rating,
        photosVideos: photosVideos,
        comment: comment,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteComment = async (token, placeId) => {
  try {
    const response = await axios.post(
      serverLink + '/user/deletecomment',
      {
        placeId: placeId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const addToFavorite = async (token, stationId) => {
  try {
    const response = await axios.post(
      serverLink + '/user/addfavorite',
      {
        placeId: stationId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const updatePrice = async (
  token,
  stationId,
  lat,
  lng,
  diesel,
  midGrade,
  premium,
  regular
) => {
  try {
    const response = await axios.post(
      serverLink + '/user/updategasprices',
      {
        placeId: stationId,
        lat: lat,
        lng: lng,
        diesel: diesel,
        midGrade: midGrade,
        premium: premium,
        regular: regular,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteFromFavorite = async (token, stationId) => {
  try {
    const response = await axios.post(
      serverLink + '/user/deletefavourite',
      {
        placeId: stationId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const editUserInfo = async (userId, token, name, newProfileImg) => {
  try {
    const profileImg =
      typeof newProfileImg == 'string'
        ? newProfileImg
        : await uploadProfileImg(userId, newProfileImg);
    const response = await axios.post(
      serverLink + '/user/editnameandprofileimg',
      {
        name,
        profileImg,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const uploadProfileImg = async (userId, file) => {
  const data = new FormData();

  data.append('folder', userId);
  data.append('file', file);
  data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);

  try {
    const response = await axios.post(
      import.meta.env.VITE_CLOUDINARY_URL,
      data
    );
    return response.data.url;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getFriendInvitationLink = async (token) => {
  try {
    const response = await axios.post(
      serverLink + '/user/getfriendinvitationlink',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );

    const { success, reason, message, data } = response.data;
    if (!success) {
      throw new Error(message || reason);
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const changeUsingItem = async (type, token, link) => {
  try {
    const response = await axios.post(
      serverLink + `/user/change${type}`,
      {
        link,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const { success, message, data } = response.data;
    if (!success) throw new Error(message);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export function getLevel(points) {
  let level = 1;
  let pointsNeeded = 50;
  let pointsLeft = points;
  let bool = true;
  while (bool) {
    if (pointsLeft >= pointsNeeded) {
      pointsLeft -= pointsNeeded;
      pointsNeeded += 50;
      level += 1;
    } else {
      bool = false;
    }
  }
  return { level, pointsNeeded, pointsLeft };
}
