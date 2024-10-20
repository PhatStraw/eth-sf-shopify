"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "../../context/StoreContext";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import AddProduct from "~~/components/AddProduct";
import CreateStore from "~~/components/CreateStore";
import ProductManagement from "~~/components/ProductManagement";

// Icon components
const Store = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const Package = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const Loader = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin"
  >
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);

const AdminPage: React.FC = () => {
  const { currentUser } = useStore();
  const { user, primaryWallet } = useDynamicContext();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  useEffect(() => {
    if (currentUser?.store) {
      // setCurrentStore(currentUser.store);
    }
  }, [currentUser]);

  if (!user && !primaryWallet) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <Loader />
          <p className="text-xl font-semibold text-gray-800 mt-4">Please log in to access the admin page.</p>
        </div>
      </div>
    );
  }

  if (!currentUser?.store) {
    return <CreateStore />;
  }

  const handleProductAdded = () => {
    setIsAddProductOpen(false);
  };

  const storeUrl = `${window.location.origin}/store/${currentUser.store.id}`;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Store Admin Dashboard</h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 bg-blue-500 text-white">
            <h2 className="text-xl font-semibold flex items-center">
              <Store />
              <span className="ml-2">Store Information</span>
            </h2>
          </div>
          <div className="p-6">
            <p className="mb-2 text-gray-700">
              <strong>Store Name:</strong> {currentUser.store.name}
            </p>
            <p className="mb-4 text-gray-700">
              <strong>Store URL:</strong>{" "}
              <a href={storeUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {storeUrl}
              </a>
            </p>
            <Link
              href={`/store/${currentUser.store.id}`}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150 ease-in-out"
            >
              Go to Store
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-green-500 text-white">
              <h2 className="text-xl font-semibold flex items-center">
                <Package />
                <span className="ml-2">Add New Product</span>
              </h2>
            </div>
            <div className="p-6">
              <button
                onClick={() => setIsAddProductOpen(!isAddProductOpen)}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-150 ease-in-out flex items-center justify-center"
              >
                {isAddProductOpen ? (
                  <>
                    Close
                    <ChevronUp />
                  </>
                ) : (
                  <>
                    Add New Product
                    <ChevronDown />
                  </>
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isAddProductOpen ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <AddProduct onProductAdded={handleProductAdded} />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-purple-500 text-white">
              <h2 className="text-xl font-semibold flex items-center">
                <Package />
                <span className="ml-2">Manage Products</span>
              </h2>
            </div>
            <div className="p-6">
              <ProductManagement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
