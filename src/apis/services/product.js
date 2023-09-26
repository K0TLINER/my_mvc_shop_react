import { DESCRIPTION_TEXT_MAX_SIZE } from "../../constants/constant";

export const getProduct1 = (product) => {
  const { productId, productName } = product;
  return {
    productId: productId,
    productName: productName,
  };
};

export const getProductThumbnailList = (products) => {
  return products.map((product) => {
    const {
      productId,
      productName,
      productDescription,
      price,
      category,
      registrationDate,
    } = product;
    return {
      productId: productId,
      productName: productName,
      productDescription:
        productDescription.length > DESCRIPTION_TEXT_MAX_SIZE
          ? productDescription.slice(0, DESCRIPTION_TEXT_MAX_SIZE) + "..."
          : productDescription,
      price: Number(price).toLocaleString("ko-KR") + "원",
      categoryName: "분류: " + category.categoryName,
      registrationDate: formatDateTime(registrationDate),
    };
  });
};

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const year = String(date.getFullYear()).padStart(4, "0"); // 년도를 네 자리 숫자로
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 두 자리 숫자로
  const day = String(date.getDate()).padStart(2, "0"); // 일을 두 자리 숫자로
  const hours = String(date.getHours()).padStart(2, "0"); // 시를 두 자리 숫자로
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분을 두 자리 숫자로
  const seconds = String(date.getSeconds()).padStart(2, "0"); // 초를 두 자리 숫자로

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};
