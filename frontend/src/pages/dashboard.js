import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { fetchProductsRequest } from "@/redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import AddProductModal from "@/components/forms/addProduct";

// Dynamically import ProductCard, disable SSR
const ProductCard = dynamic(() => import("@/components/productCard"), {
  ssr: false,
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginToken, setLoginToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.user.productData);

  // Handle new product added
  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      dispatch(fetchProductsRequest());
    } catch (err) {
    } finally {
    }
  };

  const handleSearch = async () => {
    try {
      dispatch(fetchProductsRequest({ search: searchTerm }));
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // This runs only in the browser
    const token = localStorage.getItem("token");
    setLoginToken(token);

    if (token) {
      // you can dispatch an action here if needed
    } else {
      // router.push("/auth/login");
    }
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Kitchen<span className="text-[#fca311]">365</span> Store
          </h1>
          <p className="text-gray-600">DESIGN. SELL. GROW</p>
        </div>

        {/* Cart Summary */}

        {loginToken && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#fca311] text-white px-4 py-2 rounded-lg hover:bg-[#e5940f] transition-colors cursor-pointer"
              >
                Add Product
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                fetchProducts(); // fetch all products again
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="bg-[#fca311] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Search
        </button>
      </div>

      {/* Products Grid */}
      {productData && productData?.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products available
            </h3>
            <p className="text-gray-500 mb-4">
              Start shopping by browsing our amazing products.
            </p>
            <Link
              href="#"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productData &&
            productData?.data.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                fetchProducts={fetchProducts}
              />
            ))}
        </div>
      )}

      {/* Stats Section */}
      {productData?.length > 0 && (
        <div className="mt-12 bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {productData?.data.length}
              </div>
              <div className="text-gray-500">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                $
                {productData.data
                  .reduce(
                    (sum, product) => sum + parseFloat(product.price || 0),
                    0
                  )
                  .toFixed(2)}
              </div>
              <div className="text-gray-500">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                $
                {productData.data.length > 0
                  ? (
                      productData.data.reduce(
                        (sum, product) => sum + parseFloat(product.price || 0),
                        0
                      ) / productData.data.length
                    ).toFixed(2)
                  : "0.00"}
              </div>
              <div className="text-gray-500">Average Price</div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onProductAdded={handleProductAdded}
          setIsModalOpen={setIsModalOpen}
          fetchProducts={fetchProducts}
        />
      )}
    </div>
  );
}
