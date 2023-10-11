import { useState } from "react";
import CategoryBox from "../../pages/category/CategoryBox";
import { Button, Form } from "react-bootstrap";

export const SearchBox = ({
  selectedOption,
  handleRadioChange,
  setSearchKeyword,
  handleSelectCategoryId,
  handleModalClose,
}) => {
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };
  return (
    <>
      <CategoryBox
        show={show}
        handleClose={handleClose}
        handleSelectCategoryId={handleSelectCategoryId}
      />

      <Form
        bg={"info"}
        // style={{
        //   width: "18rem",
        //   border: "1px solid #black",
        //   position: "fixed",
        //   top: "50%",
        //   left: "2rem",
        //   transform: "translateY(-50%)",
        // }}
      >
        <Button variant="info" onClick={handleShow}>
          카테고리 선택
        </Button>
        <Form.Group controlId="searchQuery">
          {/* <Form.Label>상품 이름 키워드</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="키워드 입력"
            value={keyword}
            onChange={handleKeywordChange}
          />
        </Form.Group>

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
            handleModalClose();
          }}
        >
          검색
        </Button>
      </Form>
    </>
  );
};
