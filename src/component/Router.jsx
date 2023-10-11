import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import ProductList from "../pages/product/ProductList";
import { ProductDetail } from "../pages/product/ProductDetail";

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Index />} />
      <Route path="/product/list" element={<ProductList />} />
      <Route path="/product/detail/:productId" element={<ProductDetail />} />
    </Routes>
  );
};

export default Router;
