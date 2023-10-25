import { useContext, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { login } from "../../apis/api/member";
import { loginService } from "../../apis/services/member";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

export const LoginForm = () => {
  const { setIsLogin } = useContext(AuthContext);
  const navigator = useNavigate();
  const location = useLocation();
  const [error, setError] = useState();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  };
  const loginHandler = (e) => {
    e.preventDefault();
    (async () => {
      await login(input["email"], input["password"])
        .then(loginService)
        .then((_) => {
          setIsLogin(true);
          navigator(`${location.pathname}`);
        })
        .catch((err) => {
          console.log(err);
          setIsLogin(false);
          setError("이메일 또는 비밀번호가 일치하지 않습니다.");
        });
    })();
  };
  return (
    <Container>
      {error && <Alert variant={"danger"}>{error}</Alert>}
      <Form className="text-left">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={input["email"]}
            onChange={inputChangeHandler}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={input["password"]}
            onChange={inputChangeHandler}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={loginHandler}>
          Login
        </Button>
      </Form>
    </Container>
  );
};
