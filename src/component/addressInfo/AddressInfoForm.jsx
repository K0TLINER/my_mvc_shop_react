import { useState } from "react";
import { Button, Container, InputGroup, Modal, Form } from "react-bootstrap";
import { DaumAddress } from "../DaumAddress";
import { addDeliveryInfo } from "../../apis/api/deliveryInfo";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const AddressInfoForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const next = queryParams.get("next");
  const navigator = useNavigate();
  const [daumModalShow, setDaumModalShow] = useState(false);
  const handleDaumModalShow = () => {
    setDaumModalShow(!daumModalShow);
  };

  const [deliveryInfo, setDeliveryInfo] = useState({
    recipientName: "",
    recipientPhone: "",
    deliveryAddress: "",
    deliveryAddressDetail: "",
  });
  const deliveryInfoChangeHandler = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({
      ...deliveryInfo,
      [name]: value,
    });
  };
  return (
    <Container>
      <h2>주소 추가하기</h2>
      <Form className="text-left">
        <InputGroup className="mb-3">
          <Button
            variant="outline-secondary"
            id="button-addon1"
            onClick={handleDaumModalShow}
          >
            주소 검색
          </Button>
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            readOnly
            value={deliveryInfo.deliveryAddress}
          />
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            name="deliveryAddressDetail"
            placeholder="상세 주소"
            value={deliveryInfo.deliveryAddressDetail}
            onChange={deliveryInfoChangeHandler}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            placeholder="구매자 이름"
            name="recipientName"
            value={deliveryInfo.recipientName}
            onChange={deliveryInfoChangeHandler}
          />
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            name="recipientPhone"
            placeholder="구매자 전화번호"
            value={deliveryInfo.recipientPhone}
            onChange={deliveryInfoChangeHandler}
          />
        </InputGroup>
      </Form>
      <Button
        onClick={() => {
          (async () => {
            addDeliveryInfo(deliveryInfo)
              .then((_) => {
                alert("추가 성공");
                if (next !== null) navigator(`${next}`);
              })
              .catch((err) => console.log(err));
          })();
        }}
      >
        주소 추가
      </Button>
      <Modal show={daumModalShow} onHide={handleDaumModalShow}>
        <Modal.Header closeButton>
          <Modal.Title>주소 검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumAddress
            show={daumModalShow}
            handleShow={setDaumModalShow}
            order={deliveryInfo}
            setOrder={setDeliveryInfo}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};
