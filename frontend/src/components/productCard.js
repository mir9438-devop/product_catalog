import { deleteProductsRequest } from "@/redux/features/productSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ProductCard({ product, fetchProducts }) {
  const [loginToken, setLoginToken] = useState("");
  const dispatch = useDispatch();

  const onDeleteSuccess = () => {
    fetchProducts();
  };

  const handleDelete = () => {
    dispatch(
      deleteProductsRequest({ id: product.id, callBack: onDeleteSuccess })
    );
  };

  useEffect(() => {
    // This runs only in the browser
    const token = localStorage.getItem("token");
    setLoginToken(token);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      {/* Product Image */}
      <img
        src="/images/product.jpg"
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        {/* Product Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">
            {product.name}
          </h3>
          <span className="text-2xl font-bold text-[#242220] whitespace-nowrap">
            ₹{parseFloat(product.price).toFixed(2)}
          </span>
        </div>

        {/* Product Description */}
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {product.description}
          </p>
        )}

        {/* Actions */}

        {loginToken && (
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm border border-red-200 cursor-pointer"
            >
              <svg
                className="w-4 h-4 inline-block mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
