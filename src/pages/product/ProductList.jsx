import { useEffect, useState } from "react";
// import { API_URL, formatDateTime } from "../../component/common/Base/Constants";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import TextTruncate from "../../component/TextTruncate";
import { getProductList } from "../../apis/api/product";
import { getProductThumbnailList } from "../../apis/services/product";
import CategoryBox from "../category/CategoryBox";

const Product = ({ product }) => {
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
        <Button variant="primary" size="sm">
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

const SearchBox = ({ selectedOption, handleRadioChange, setSearchKeyword }) => {
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };
  return (
    <>
      <CategoryBox show={show} handleClose={handleClose} />
      <Form
        bg={"info"}
        style={{
          width: "18rem",
          border: "1px solid #black",
          position: "fixed",
          top: "50%",
          left: "2rem",
          transform: "translateY(-50%)",
        }}
      >
        <Form.Group controlId="searchQuery">
          <Form.Label>상품 이름 키워드</Form.Label>
          <Form.Control
            type="text"
            placeholder="키워드 입력"
            value={keyword}
            onChange={handleKeywordChange}
          />
        </Form.Group>
        <Button variant="info" onClick={handleShow}>
          카테고리 선택
        </Button>
        <div className="mb-3">
          <Form.Check
            inline
            type="radio"
            label="최신순"
            name="radioOptions"
            id="1"
            value="1"
            checked={selectedOption === "1"}
            onChange={handleRadioChange}
          />
          <Form.Check
            inline
            type="radio"
            label="오래된순"
            name="radioOptions"
            id="2"
            value="2"
            checked={selectedOption === "2"}
            onChange={handleRadioChange}
          />
        </div>
        <div className="mb-3">
          <Form.Check
            inline
            type="radio"
            label="가격 높은순"
            name="radioOptions"
            id="3"
            value="3"
            checked={selectedOption === "3"}
            onChange={handleRadioChange}
          />
          <Form.Check
            inline
            type="radio"
            label="가격 낮은순"
            name="radioOptions"
            id="4"
            value="4"
            checked={selectedOption === "4"}
            onChange={handleRadioChange}
          />
        </div>
        <div className="mb-3">
          <Form.Check
            inline
            type="radio"
            label="이름 오름차순"
            name="radioOptions"
            id="5"
            value="5"
            checked={selectedOption === "5"}
            onChange={handleRadioChange}
          />
          <Form.Check
            inline
            type="radio"
            label="이름 내림차순"
            name="radioOptions"
            id="6"
            value="6"
            checked={selectedOption === "6"}
            onChange={handleRadioChange}
          />
        </div>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setSearchKeyword(keyword);
          }}
        >
          검색
        </Button>
      </Form>
    </>
  );
};

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState("1");
  const [products, setProducts] = useState([]);
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value); // 라디오 버튼 클릭 시 상태 변경
  };

  useEffect(() => {
    setIsLoading(true);
    let sortData = ["1", "2"].includes(selectedOption)
      ? "registrationDate"
      : ["3", "4"].includes(selectedOption)
      ? "price"
      : "productName";
    let sortType = ["1", "3", "5"].includes(selectedOption) ? "desc" : "asc";
    let sortParam = {
      sortData: sortData,
      sortType: sortType,
    };
    let keywordParam = {};
    if (searchKeyword != null && searchKeyword.trim() !== "") {
      keywordParam = {
        keyword: searchKeyword,
      };
    }
    let params = {
      ...sortParam,
      ...keywordParam,
    };

    (async () =>
      await getProductList(params)
        .then(getProductThumbnailList)
        .then((res) => {
          setProducts(res);
          setIsLoading(false);
        }))();
  }, [selectedOption, searchKeyword]);

  return (
    <>
      <SearchBox
        selectedOption={selectedOption}
        handleRadioChange={handleRadioChange}
        setSearchKeyword={setSearchKeyword}
      />
      <CategoryBox />
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
          <Row>
            {products.length <= 0 ? (
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                no data
              </p>
            ) : (
              products.map((product, idx) => (
                <Col
                  key={idx}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  style={{ marginTop: "1.5rem" }}
                >
                  <Product product={product} />
                </Col>
              ))
            )}
          </Row>
        )}
      </Container>
    </>
  );
};

export default ProductList;
