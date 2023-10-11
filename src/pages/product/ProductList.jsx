import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Modal, Row } from "react-bootstrap";

import { getProductList } from "../../apis/api/product";
import { getProductThumbnailList } from "../../apis/services/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../component/product/Product";
import { SearchBox } from "../../component/product/SearchBox";
import { Loading } from "../../component/Loading";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState("1");
  const [products, setProducts] = useState([]);
  const [searchCategoryId, setSearchCategoryId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleSelectCategoryId = (categoryId) => {
    setSearchCategoryId(categoryId);
  };
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
    let categoryParam = {};
    if ((searchCategoryId != null && searchCategoryId.trim()) !== "") {
      categoryParam = {
        categoryId: searchCategoryId,
      };
    }
    let params = {
      ...sortParam,
      ...keywordParam,
      ...categoryParam,
    };

    (async () =>
      await getProductList(params)
        .then(getProductThumbnailList)
        .then((res) => {
          setProducts(res);
          setIsLoading(false);
        }))();
  }, [selectedOption, searchKeyword, searchCategoryId]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <Row>
          {products === null || products.length <= 0 ? (
            <Alert variant={"danger"} centered>
              No data
            </Alert>
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
      <Button
        variant="primary"
        onClick={handleModalOpen}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: "1000",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faCog} style={{ marginRight: "8px" }} />
        정렬
      </Button>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>상세 검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchBox
            selectedOption={selectedOption}
            handleRadioChange={handleRadioChange}
            setSearchKeyword={setSearchKeyword}
            searchCategoryId={searchCategoryId}
            handleSelectCategoryId={handleSelectCategoryId}
            handleModalClose={handleModalClose}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductList;
