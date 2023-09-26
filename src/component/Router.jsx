import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import ProductList from "../pages/product/ProductList";

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Index />} />
      <Route path="/product/list" element={<ProductList />} />
    </Routes>
  );
};

export default Router;
