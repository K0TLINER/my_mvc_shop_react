import { Link } from "react-router-dom";

export const getOrderListService = (orderList) => {
  return orderList.map((order) => {
    return {
      id: order.orderId,
      productName: order.product.productName,
      productPrice:
        Number(order.product.price * order.quantity).toLocaleString("ko-KR") +
        "원",
      orderStatus:
        order.orderStatus === "BEFORE_SHIPMENT"
          ? "배송 준비중"
          : order.orderStatus === "IN_TRANSIT"
          ? "배송중"
          : "배송완료",
      isDeleted: order.deleted,
    };
  });
};
