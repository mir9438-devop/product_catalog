import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addProductsRequest } from "@/redux/features/productSlice";

// Validation schema using Yup
const productSchema = yup.object({
  name: yup
    .string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must not exceed 100 characters"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .max(999999.99, "Price must be less than $1,000,000")
    .typeError("Price must be a valid number"),
  description: yup
    .string()
    .nullable()
    .notRequired()
    .min(10, "Description should be at least 10 characters if provided"),

  image: yup
    .string()
    .nullable()
    .notRequired()
    .url("Please enter a valid image URL"),
});

export default function AddProductModal({
  isOpen,
  onClose,
  onProductAdded,
  setIsModalOpen,
  fetchProducts,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      image: "",
    },
  });

  const onProductAdd = () => {
    setIsModalOpen(false);
    fetchProducts();
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    dispatch(
      addProductsRequest({
        data: data,
        callBack: onProductAdd,
      })
    );
    setIsSubmitting(false);
  };

  // Handle modal close
  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onClose();
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                errors.name
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-[#242220] focus:ring-blue-500 focus:border-blue-500"
              }bg-white text-black`}
              placeholder="Enter product name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price (USD) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="price"
                step="0.01"
                min="0"
                {...register("price")}
                className={`w-full pl-8 pr-4 py-3 border rounded-lg transition-colors ${
                  errors.price
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-[#242220] focus:ring-blue-500 focus:border-blue-500"
                }bg-white text-black`}
                placeholder="0.00"
                disabled={isSubmitting}
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Product Image URL */}
          {/* <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Image URL
            </label>
            <input
              type="url"
              id="image"
              {...register("image")}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                errors.image
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-[#242220] focus:ring-blue-500 focus:border-blue-500"
              }bg-white text-black`}
              placeholder="https://example.com/image.jpg"
              disabled={isSubmitting}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">
                {errors.image.message}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Optional: Provide a URL to display product image
            </p>
          </div> */}

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              {...register("description")}
              className={`w-full px-4 py-3 border rounded-lg transition-colors resize-none ${
                errors.description
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-[#242220] focus:ring-blue-500 focus:border-blue-500"
              }bg-white text-black`}
              placeholder="Enter product description (optional)"
              disabled={isSubmitting}
              maxLength={500}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Optional: Brief description of the product
            </p>
          </div>

          {/* Submit Error */}
          {errors.root && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errors.root.message}</p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 bg-gray-100 border-[#242220] text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#fca311] text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding Product...
                </span>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
