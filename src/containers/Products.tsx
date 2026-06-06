import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { Product, ApiProductsList } from "../types";
import axiosApi from "../api/axiosApi";
import { CATEGORIES, PRODUCT_IMAGE_PLACEHOLDER } from "../constants";
import { toast } from "react-toastify";

const Products = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const url = categoryId
        ? `/products.json?orderBy="type"&equalTo="${categoryId}"`
        : "/products.json";

      const response = await axiosApi.get<ApiProductsList | null>(url);

      if (response.data) {
        const productsArray = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data![key],
        }));
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to sync products from server");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const currentCategory = CATEGORIES.find((cat) => cat.id === categoryId);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await axiosApi.delete(`/products/${id}.json`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Could not delete product from server");
    }
  };

  const handleEditNavigate = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/products/${id}/edit`);
  };

  if (loading) {
    return (
      <div className="text-center py-12 font-medium text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {categoryId
            ? `Category: ${currentCategory ? currentCategory.title : categoryId}`
            : "All Products"}
        </h1>
        <span className="text-sm font-medium text-gray-500">
          Found {products.length}{" "}
          {products.length === 1 ? "product" : "products"}
        </span>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-500 font-medium">
            No products found in this category.
          </p>
          <Link
            to="/products/add"
            className="mt-3 inline-flex text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Add first product &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-xs bg-white flex flex-col group hover:shadow-md hover:border-emerald-500/30 transition-all cursor-pointer"
            >
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <img
                  src={
                    product.picture.trim() !== ""
                      ? product.picture
                      : PRODUCT_IMAGE_PLACEHOLDER
                  }
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-3 right-3 bg-gray-900/90 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  {product.price} KGS
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                    {product.title}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100 text-center text-xs font-semibold">
                  <button
                    type="button"
                    onClick={(e) => handleEditNavigate(e, product.id)}
                    className="py-2 rounded-md bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, product.id)}
                    className="py-2 rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
