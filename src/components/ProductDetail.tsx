import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { ProductMutation } from "../types";
import { CATEGORIES } from "../constants";
import axiosApi from "../api/axiosApi";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductMutation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosApi.get<ProductMutation | null>(
          `/products/${id}.json`,
        );

        if (response.data) {
          setProduct(response.data);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="text-center py-12 font-medium text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (!product) return null;
  const currentCategory = CATEGORIES.find((cat) => cat.id === product.type);

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center relative">
          {product.picture ? (
            <img
              src={product.picture}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              No Image Available
            </span>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 uppercase tracking-wider">
              {currentCategory ? currentCategory.title : product.type}
            </span>

            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {product.title}
            </h1>

            <div className="text-2xl font-black text-gray-900">
              {product.price}{" "}
              <span className="text-sm font-medium text-gray-500">KGS</span>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description ||
                  "No description provided for this product."}
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100">
            <Link
              to="/"
              className="inline-flex h-10 px-5 items-center justify-center rounded-lg border border-gray-300 text-gray-700 text-sm font-medium shadow-xs hover:bg-gray-50 transition-all gap-2"
            >
              &larr; Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
