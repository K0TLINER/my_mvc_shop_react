import { useEffect, useState } from "react";
import { getCategoryByParentId } from "../../apis/api/category";
import { Breadcrumb, Button, Modal } from "react-bootstrap";

const CategoryBox = ({ show, handleClose, handleSelectCategoryId }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const selectCategoryHandler = (e) => {
    const categoryId = e.target.dataset.categoryId;
    const categoryName = e.target.dataset.categoryName;
    setSelectedCategories([
      ...selectedCategories,
      { categoryId, categoryName },
    ]);
  };

  useEffect(() => {
    (async () =>
      getCategoryByParentId(
        selectedCategories.length <= 0
          ? null
          : selectedCategories[selectedCategories.length - 1].categoryId
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
            {selectedCategories.map((selectedCategory, index) => (
              <Breadcrumb.Item
                key={index}
                active={selectedCategories.length - 1 === index}
                onClick={() => {
                  if (selectedCategories.length - 1 !== index) {
                    setSelectedCategories(
                      selectedCategories.slice(
                        0,
                        selectedCategories.indexOf(selectedCategory.categoryId)
                      )
                    );
                  }
                }}
              >
                {selectedCategory.categoryName}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {categories.length <= 0 ? (
          <h3>하위 카테고리가 없습니다.</h3>
        ) : (
          categories.map((category) => (
            <Button
              key={category.categoryId}
              variant="primary"
              size="lg"
              block
              style={{ marginBottom: "0.5rem" }}
              data-category-id={category.categoryId}
              data-category-name={category.categoryName}
              onClick={selectCategoryHandler}
            >
              {category.categoryName}
            </Button>
          ))
        )}
        {/* <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSelectCategoryId(
              selectedCategories.length > 0
                ? selectedCategories[selectedCategories.length - 1].categoryId
                : null
            );
            handleClose();
          }}
        >
          {selectedCategories.length > 0 &&
            '"' +
              selectedCategories[selectedCategories.length - 1].categoryName +
              '" '}
          선택
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
