import { defaultInstance } from "../utils/instance";

const ORDER_API_URI = "/order";

export const addOrder = async (order) => {
  try {
    const token = localStorage.getItem("token");
    if (token === null) return null;
    await defaultInstance.post(`${ORDER_API_URI}/add`, JSON.stringify(order), {
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOrderList = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token === null) return null;
    const { data } = await defaultInstance.get(`${ORDER_API_URI}/getList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const token = localStorage.getItem("token");
    if (token === null) return null;
    await defaultInstance.delete(`${ORDER_API_URI}/delete/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
