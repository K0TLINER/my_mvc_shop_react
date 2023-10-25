import { Route, Routes } from "react-router-dom";
import { AdminProduct } from "./admin/AdminProduct";

export const AdminRouter = () => {
  return (
    <Routes>
      <Route to="/admin" element={<AdminProduct />} />
    </Routes>
  );
};
