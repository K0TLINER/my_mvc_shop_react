import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Badge } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="light" data-bs-theme="light" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/">Spring MVC Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#pricing">문의 관리</Nav.Link> */}
            <NavDropdown title="상품 관리" id="collapsible-nav-dropdown">
              <Nav.Link href="/product/list">상품 조회</Nav.Link>

              <NavDropdown.Divider />
              <Nav.Link to="/category/list">카테고리</Nav.Link>
              {/* <NavDropdown.Item href="#action/3.1">카테고리</NavDropdown.Item> */}
            </NavDropdown>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">회원 관리</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">상품 관리</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">주문 관리</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
          <Badge pill bg="info">
            <FontAwesomeIcon icon={faBell} /> &nbsp;3
          </Badge>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
