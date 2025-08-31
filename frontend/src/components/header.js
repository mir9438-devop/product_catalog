import Link from "next/link";
import { useEffect, useState } from "react";
import AddProductModal from "./forms/addProduct";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Header() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  const clearLoginToken = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  useEffect(() => {
    // runs only in the browser
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  return (
    // <header className="bg-white shadow-sm border-b border-gray-200">
    <header className="fixed top-0 left-0 w-full z-50  bg-white shadow-md">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-3xl font-bold text-gray-900 hover:text-gray-600 transition-colors"
            >
              Kitchen<span className="text-[#fca311]">365</span>
            </Link>
          </div>

          {/* Navigation */}

          <nav className="hidden md:flex items-center space-x-8">
            {token ? (
              <button
                onClick={clearLoginToken}
                href="/auth/login"
                className="bg-[#fca311] text-white px-4 py-2 rounded-lg hover:bg-[#e5940f] transition-colors cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
            >
              Products
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}