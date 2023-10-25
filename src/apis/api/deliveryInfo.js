import { defaultInstance } from "../utils/instance";

const DELIVERY_INFO_URI = "/deliveryInfo";

export const getDeliveryInfoList = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token === null) return null;
    const { data } = await defaultInstance.get(`${DELIVERY_INFO_URI}/getList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log("getDeliveryInfoList() Error : " + err);
  }
};

export const addDeliveryInfo = async (deliveryInfo) => {
  try {
    const token = localStorage.getItem("token");
    if (token === null) return null;
    await defaultInstance.post(
      `${DELIVERY_INFO_URI}/add`,
      JSON.stringify(deliveryInfo),
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
