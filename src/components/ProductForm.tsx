import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { ProductMutation } from "../types";
import { CATEGORIES } from "../constants";
import axiosApi from "../api/axiosApi";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<ProductMutation>({
    title: "",
    type: "",
    description: "",
    picture: "",
    price: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await axiosApi.get<ProductMutation | null>(
          `/products/${id}.json`,
        );

        if (response.data) {
          setForm(response.data);
        } else {
          toast.error("Product not found!");
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        toast.error("Error loading product data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    } else {
      setForm({
        title: "",
        type: "",
        description: "",
        picture: "",
        price: 0,
      });
    }
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.warning("Title field is required!");
      return;
    }

    if (!form.type) {
      toast.warning("Please select a product category type!");
      return;
    }

    if (form.price <= 0) {
      toast.warning("Price must be greater than 0 KGS!");
      return;
    }

    try {
      setIsSubmitting(true);

      if (id) {
        await axiosApi.put(`/products/${id}.json`, form);
        toast.success("Product updated successfully!");
        navigate(`/products/category/${form.type}`);
      } else {
        await axiosApi.post("/products.json", form);
        toast.success("New product added successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to submit product:", error);
      toast.error("Something went wrong while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4 font-medium text-gray-500">
        Loading product data...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
        {id ? "Edit product" : "Add new product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Type <span className="text-rose-500">*</span>
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm shadow-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden transition-all"
          >
            <option value="" disabled>
              Select type
            </option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Enter product title..."
            className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm shadow-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter product description (optional)..."
            className="w-full p-3 rounded-lg border border-gray-300 text-sm shadow-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden transition-all resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Picture</label>
          <input
            type="url"
            name="picture"
            value={form.picture}
            onChange={handleChange}
            placeholder="Enter image URL (optional)..."
            className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm shadow-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Price (KGS) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            min="1"
            value={form.price || ""}
            onChange={handleChange}
            required
            placeholder="Enter product price..."
            className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm shadow-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-10 px-5 rounded-lg bg-emerald-600 text-white text-sm font-medium shadow-xs hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? "Saving..." : id ? "Save changes" : "Add product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={isSubmitting}
            className="h-10 px-5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium shadow-xs hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
