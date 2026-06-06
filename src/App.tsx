import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Products from "./containers/Products";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="products/category/:categoryId" element={<Products />} />
          <Route path="products/add" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
