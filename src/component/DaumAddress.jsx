import DaumPostcode from "react-daum-postcode";

export const DaumAddress = ({ show, handleShow, order, setOrder }) => {
  const postCodeStyle = {
    width: "400px",
    height: "400px",
    display: show ? "block" : "none",
  }; // 스타일 정의 code
  const onCompletePost = (data) => {
    handleShow();
    setOrder({ ...order, deliveryAddress: data.address });
    // setAddress(data.address);
    // setZoneCode(data.zonecode);
    // setInputAddressValue(data.address);
    // setInputZipCodeValue(data.zonecode);
  }; // onCompletePost 함수
  return (
    <DaumPostcode
      style={postCodeStyle}
      onComplete={onCompletePost}
    ></DaumPostcode>
  );
};
