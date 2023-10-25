import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Badge, Overlay, Toast, Tooltip } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext, SocketContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { CHAT_EVENT } from "../apis/utils/socket";

function Header() {
  const { socket } = useContext(SocketContext);
  const { isLogin, profile } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const [toastShow, setToastShow] = useState(false);
  const target = useRef(null);
  const navigator = useNavigate();
  useEffect(() => {
    if (isLogin && Object.keys(profile).length !== 0) {
      socket.current.emit(CHAT_EVENT.GET_ALERT_COUNT, {
        nickname: profile.nickname,
      });
    }
  }, [isLogin, profile]);
  if (isLogin) {
    socket.current.on(CHAT_EVENT.RECEIVED_ALERT, () => {
      socket.current.emit(CHAT_EVENT.GET_ALERT_COUNT, {
        nickname: profile.nickname,
      });
    });
    socket.current.on(CHAT_EVENT.SEND_ALERT_COUNT, ({ count }) => {
      // console.log("--tlqkf");
      // console.log(data);
      setAlertCount(count);
      setToastShow(true);
      setTimeout(() => {
        setToastShow(false);
      }, 2000);
    });
  }
  return (
    <Navbar bg="light" data-bs-theme="light" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigator("/");
          }}
        >
          Spring MVC Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="#pricing">문의 관리</Nav.Link> */}
            <Nav.Link
              href=""
              onClick={(e) => {
                e.preventDefault();
                navigator("/product/list");
              }}
            >
              상품 조회
            </Nav.Link>
            {isLogin && (
              <Nav.Link
                href="#2"
                onClick={(e) => {
                  e.preventDefault();
                  navigator("/order/list");
                }}
              >
                주문 조회
              </Nav.Link>
            )}
            {isLogin && (
              <NavDropdown title="고객센터" id="collapsible-nav-dropdown">
                <NavDropdown.Item
                  href=""
                  onClick={() => {
                    navigator("/chat/list");
                  }}
                >
                  1:1문의
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            {isLogin ? (
              <Nav.Link
                href="/"
                onClick={() => localStorage.setItem("token", "")}
              >
                로그아웃
              </Nav.Link>
            ) : (
              <>
                <Nav.Link
                  href="#3"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator("/login");
                  }}
                >
                  로그인
                </Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  회원가입
                </Nav.Link>
              </>
            )}
            {/* <Nav.Link href="/login">로그인</Nav.Link> */}
          </Nav>
          {isLogin && (
            <>
              <Badge
                ref={target}
                pill
                bg="info"
                style={{ cursor: "pointer" }}
                onClick={() => setShow(!show)}
              >
                <FontAwesomeIcon icon={faBell} />
                &nbsp;&nbsp;{alertCount}
              </Badge>
              {toastShow && (
                <Toast
                  style={{
                    position: "absolute",
                    right: 100,
                    top: 20,
                    opacity: 0.5,
                  }}
                >
                  <Toast.Header closeButton={false}>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded mr-2"
                      alt=""
                    />
                    <strong className="mr-auto">알림</strong>
                    {/* <small>11 mins ago</small> */}
                  </Toast.Header>
                  <Toast.Body>새로운 메세지가 있습니다.</Toast.Body>
                </Toast>
              )}
              <Overlay target={target.current} show={show} placement="bottom">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    <Link to="/alert/list" style={{ color: "white" }}>
                      알림보기
                    </Link>

                    <br />
                    <Link to="" style={{ color: "white" }}>
                      마이페이지
                    </Link>
                  </Tooltip>
                )}
              </Overlay>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
