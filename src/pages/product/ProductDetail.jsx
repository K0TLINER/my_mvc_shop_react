import { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../apis/api/product";
import { getProductDetail } from "../../apis/services/product";
import { AuthContext } from "../../App";

export const ProductDetail = () => {
  const { productId } = useParams();
  const navigator = useNavigate();
  const { isLogin } = useContext(AuthContext);
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await getProduct(productId)
        .then(getProductDetail)
        .then((res) => {
          setProduct(res);
          setIsLoading(false);
        });
    })();
  }, [productId]);
  return (
    <Container>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner animation="border" />
        </div>
      ) : (
        <Card className="text-left">
          <Card.Header as="h5">{product.name}</Card.Header>
          <Card.Body>
            <Card.Title>{product.description}</Card.Title>
            <Card.Text>제조일자: {product.manufactureDate}</Card.Text>
            <Card.Text className="text-primary">
              가격: {product.price}
            </Card.Text>
            <Card.Text>재고수량: {product.stock}</Card.Text>
            <Card.Text>카테고리: {product.categoryName}</Card.Text>
            <Card.Text>등록날짜: {product.registrationDate}</Card.Text>
            <Button
              variant="primary"
              disabled={!isLogin}
              onClick={() => navigator(`/order/add/${productId}`)}
            >
              구매하기
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};
