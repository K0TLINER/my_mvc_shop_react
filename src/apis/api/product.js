import { defaultInstance } from "../utils/instance";

const ADMIN_PRODUCT_URI = "/admin/product";

export const getProduct = async (productId) => {
  try {
    const { data } = await defaultInstance.get(
      `${ADMIN_PRODUCT_URI}/get/${productId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductList = async (param) => {
  try {
    const { data } = await defaultInstance.get(`${ADMIN_PRODUCT_URI}/getList`, {
      params: param,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
