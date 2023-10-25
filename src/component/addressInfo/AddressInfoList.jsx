import { Card, ListGroup } from "react-bootstrap";

export const AddressInfoList = ({
  addressInfo,
  order,
  setOrder,
  handleShow,
}) => {
  return (
    <Card>
      <Card.Header
        className="text-info"
        style={{ cursor: "pointer" }}
        onClick={() => {
          setOrder({
            ...order,
            recipientName: addressInfo.recipientName,
            recipientPhone: addressInfo.recipientPhone,
            deliveryAddress: addressInfo.deliveryAddress,
            deliveryAddressDetail: addressInfo.deliveryAddressDetail,
          });
          handleShow();
        }}
      >
        {addressInfo.recipientName}
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>{addressInfo.recipientPhone}</ListGroup.Item>
        <ListGroup.Item>{addressInfo.deliveryAddress}</ListGroup.Item>
        <ListGroup.Item>{addressInfo.deliveryAddressDetail}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
