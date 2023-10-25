export const getDeliveryInfoListService = (data) => {
  return data.map((address, idx) => {
    const {
      deliveryAddress,
      deliveryAddressDetail,
      recipientName,
      recipientPhone,
    } = address;
    return {
      deliveryAddress: deliveryAddress,
      deliveryAddressDetail: deliveryAddressDetail,
      recipientName: recipientName + "님",
      recipientPhone: recipientPhone,
    };
  });
};
