import { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import { DaumAddress } from "../../component/DaumAddress";
import { getDeliveryInfoList } from "../../apis/api/deliveryInfo";
import { getDeliveryInfoListService } from "../../apis/services/deliveryInfo";
import { AddressInfoList } from "../../component/addressInfo/AddressInfoList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../apis/api/product";
import { getProductDetail } from "../../apis/services/product";
import { addOrder } from "../../apis/api/order";
export const OrderForm = () => {
  const { productId } = useParams();
  const navigator = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [daumModalShow, setDaumModalShow] = useState(false);
  const [addressInfoList, setAddressInfoList] = useState([]);
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState({
    productId: productId,
    quantity: 0,
    deliveryAddress: "",
    deliveryAddressDetail: "",
    recipientName: "",
    recipientPhone: "",
  });
  const orderChangeHandler = (e) => {
    const { value, name } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };
  // const [address, setAddress] = useState();
  // const [zoneCode, setZoneCode] = useState();
  const handleShow = () => {
    setShow(!show);
  };
  const handleDaumModalShow = () => {
    setDaumModalShow(!daumModalShow);
  };

  useEffect(() => {
    (async () => {
      await getDeliveryInfoList()
        .then(getDeliveryInfoListService)
        .then((res) => {
          setAddressInfoList(res);
          console.log(res);
        })
        .catch((err) => console.log(err));
    })();
    (async () => {
      await getProduct(productId)
        .then(getProductDetail)
        .then((res) => setProduct(res))
        .catch((err) => console.log(err));
    })();
  }, [productId]);

  return (
    <Container>
      <Form className="text-left">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>상품 이름</Form.Label>
          <Form.Control
            type="text"
            placeholder={product && product.name}
            aria-label="Disabled product name"
            readOnly
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>상품 가격</Form.Label>
          <Form.Control
            type="text"
            placeholder={product && product.price}
            aria-label="Disabled input example"
            readOnly
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            구매 수량{product && ` (최대 ${product.stock})`}
          </Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={order.quantity}
            onChange={orderChangeHandler}
          />
        </Form.Group>
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
            value={order.deliveryAddress}
          />
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            name="deliveryAddressDetail"
            placeholder="상세 주소"
            value={order.deliveryAddressDetail}
            onChange={orderChangeHandler}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            placeholder="구매자 이름"
            name="recipientName"
            value={order.recipientName}
            onChange={orderChangeHandler}
          />
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            name="recipientPhone"
            placeholder="구매자 전화번호"
            value={order.recipientPhone}
            onChange={orderChangeHandler}
          />
        </InputGroup>
        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group> */}
      </Form>
      <Button variant="info" onClick={handleShow}>
        저장된 주소 가져오기
      </Button>
      <br />
      <br />
      <br />
      <Button
        variant="primary"
        onClick={() => {
          (async () => {
            await addOrder(order)
              .then((_) => {
                alert("주문 완료 이메일을 확인해주세요.");
                navigator("/order/list");
              })
              .catch((err) => console.log(err));
          })();
        }}
      >
        주문하기
      </Button>
      <Modal
        show={show}
        onHide={handleShow}
        scrollable
        style={{ height: "400px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>내가 저장한 주소</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addressInfoList &&
            addressInfoList.map((addressInfo, idx) => {
              return (
                <AddressInfoList
                  order={order}
                  handleShow={handleShow}
                  setOrder={setOrder}
                  key={idx}
                  addressInfo={addressInfo}
                />
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() =>
              navigator(`/deliveryInfo/add?next=${location.pathname}`)
            }
          >
            주소 추가하기
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={daumModalShow} onHide={handleDaumModalShow}>
        <Modal.Header closeButton>
          <Modal.Title>주소 검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumAddress
            show={daumModalShow}
            handleShow={setDaumModalShow}
            order={order}
            setOrder={setOrder}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};
