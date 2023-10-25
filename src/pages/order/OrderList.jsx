import { Container } from "react-bootstrap";
import { Order } from "../../component/order/Order";
import { useEffect, useState } from "react";
import { getOrderList } from "../../apis/api/order";
import { getOrderListService } from "../../apis/services/order";

export const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    (async () => {
      await getOrderList()
        .then(getOrderListService)
        .then((res) => {
          console.log(res);
          setOrderList(res);
        })
        .catch((err) => console.log(err));
    })();
  }, [flag]);
  return (
    <Container>
      <h2>주문 조회</h2>
      {orderList.map((order, idx) => {
        return <Order key={idx} order={order} flag={flag} setFlag={setFlag} />;
      })}
    </Container>
  );
};
