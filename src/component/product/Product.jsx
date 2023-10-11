import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TextTruncate from "../TextTruncate";

export const Product = ({ product }) => {
  const navigator = useNavigate();
  return (
    <Card style={{ border: "1px solid #ccc" }}>
      <div
        style={{
          height: "360px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card.Img
          variant="top"
          src="https://picsum.photos/640/360"
          style={{
            width: "960px",
            height: "540px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <Card.Body>
        <div style={{ textAlign: "left" }}>
          <Card.Title>{product.productName}</Card.Title>
          <Card.Text>
            <TextTruncate text={product.productDescription} maxLength={20} />
          </Card.Text>
          <Card.Text style={{ fontSize: "2.5rem" }}>{product.price}</Card.Text>
        </div>
        <br />
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigator(`/product/detail/${product.productId}`)}
        >
          상세 보기
        </Button>
        <div style={{ textAlign: "right" }}>
          <footer className="blockquote-footer">{product.categoryName}</footer>
          <footer className="blockquote-footer">
            {product.registrationDate}
          </footer>
        </div>
      </Card.Body>
    </Card>
  );
};
