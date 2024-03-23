import serverLink from '../serverLink';
import axios from 'axios';

const getItems = async (type, token) => {
  try {
    const response = await axios.get(serverLink + `/user/getall${type}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getLvItems = async (type, token) => {
  try {
    const { success, reason, message, data } = await getItems(type, token);
    if (!success) {
      throw new Error(reason || message);
    }

    const lvItems = data.filter((item) => !item.isPurchaseable);
    return lvItems;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getShopItems = async (type, token) => {
  try {
    const { success, message, reason, data } = await getItems(type, token);
    if (!success) {
      throw new Error(message || reason);
    }

    const purchaseableItems = data.filter((item) => item.isPurchaseable);
    return purchaseableItems;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getOwnedItems = async (type, ownedItemIds, token) => {
  try {
    const items = await getShopItems(type, token);
    const ownedItems = items.filter((item) =>
      !ownedItemIds ? false : ownedItemIds.includes(item._id)
    );
    return ownedItems;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const purchaseItem = async (type, itemInfo, token) => {
  try {
    const response = await axios.post(
      serverLink + `/user/purchase${type}`,
      itemInfo,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const { message } = response.data;
    return message;
  } catch (error) {
    throw new Error(error.message);
  }
};
