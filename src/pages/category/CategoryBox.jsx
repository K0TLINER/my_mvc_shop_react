import { useEffect, useState } from "react";
import { getCategoryByParentId } from "../../apis/api/category";
import { Breadcrumb, Button, Modal } from "react-bootstrap";

const CategoryBox = ({ show, handleClose }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const selectCategoryHandler = (e) => {
    const categoryId = e.target.dataset.categoryId;
    setSelectedCategories([...selectedCategories, categoryId]);
  };
  useEffect(() => {
    (async () =>
      getCategoryByParentId(
        selectedCategories.length <= 0
          ? null
          : selectedCategories[selectedCategories.length - 1]
      ).then((res) => {
        setCategories(res);
      }))();
  }, [selectedCategories]);
  return (
    <Modal show={show} onHide={handleClose} scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => setSelectedCategories([])}>
              카테고리
            </Breadcrumb.Item>
          </Breadcrumb>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {categories.map((category) => (
          <Button
            variant="primary"
            size="lg"
            block
            style={{ marginBottom: "0.5rem" }}
            data-category-id={category.categoryId}
            onClick={selectCategoryHandler}
          >
            {category.categoryName}
          </Button>
        ))}
        {/* <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={handleClose}>
          {selectedCategories[selectedCategories.length - 1]}선택
        </Button>
      </Modal.Footer>
    </Modal>
    // <Container>
    //   {categories.map((category) => (
    //     <p>{category.categoryId}</p>
    //   ))}
    // </Container>
  );
};

export default CategoryBox;
