import { Col, Container, Nav, Row } from "react-bootstrap";
import { AdminRouter } from "../AdminRouter";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AdminNav = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname.split("/")[2]); // 초기 활성 탭을 설정

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey); // 클릭한 탭을 활성화
  };
  return (
    <Container fluid>
      <Row>
        <Col sm={2} style={{ padding: "0" }}>
          <Nav
            variant="tabs"
            className="flex-column"
            activeKey={activeKey}
            onSelect={handleSelect}
          >
            <Nav.Item>
              <Nav.Link
                eventKey="member"
                onClick={() => navigator("/admin/member/list")}
              >
                Member
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="product"
                onClick={() => navigator("/admin/product/list")}
              >
                Product
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="order"
                onClick={() => navigator("/admin/order/list")}
              >
                Order
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="contact">Contact</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/"
                onClick={() => localStorage.setItem("token", "")}
              >
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <AdminRouter />
        </Col>
      </Row>
    </Container>
  );
};
