import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteOrder } from "../../apis/api/order";

export const Order = ({ order, flag, setFlag }) => {
  const navigator = useNavigate();
  return (
    <Card>
      <Card.Header>주문번호: {order.id}</Card.Header>
      <Card.Body>
        <Card.Title>{order.productName}</Card.Title>
        <Card.Text>{order.productPrice}</Card.Text>
        <Card.Text>
          {order.isDeleted ? (
            <span className="text-danger">주문 취소</span>
          ) : (
            order.orderStatus
          )}
        </Card.Text>
        <Card.Text>
          {!order.isDeleted &&
            (order.orderStatus === "배송 준비중" ? (
              <Link
                onClick={() => {
                  (async () => {
                    deleteOrder(order.id)
                      .then((_) => {
                        setFlag(!flag);
                        // navigator("/order/list")
                      })
                      .catch((err) => console.log(err));
                  })();
                }}
              >
                {"(주문취소)"}
              </Link>
            ) : (
              <Link>{"(환불요청)"}</Link>
            ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
