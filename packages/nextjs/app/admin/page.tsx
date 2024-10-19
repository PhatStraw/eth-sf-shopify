"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "../../context/StoreContext";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import AddProduct from "~~/components/AddProduct";
import CreateStore from "~~/components/CreateStore";
import ProductManagement from "~~/components/ProductManagement";

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
    return <div>Please log in to access the admin page.</div>;
  }
  console.log(currentUser);

  if (!currentUser?.store) {
    return <CreateStore />;
  }

  const handleProductAdded = () => {
    setIsAddProductOpen(false); // Close the add product section
  };

  const storeUrl = `${window.location.origin}/store/${currentUser.store.id}`;

  return (
    <div className="max-w-4xl mx-auto pt-6">
      <h1 className="text-3xl font-bold mb-6">Store Admin Dashboard</h1>
      <div className=" shadow-md rounded-lg p-6 mb-6 bg-blue-300">
        <h2 className="text-2xl font-semibold mb-4">Store Information</h2>
        <p className="mb-2">
          <strong>Store Name:</strong> {currentUser.store.name}
        </p>
        <p className="mb-4">
          <strong>Store URL:</strong>{" "}
          <a href={storeUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            {storeUrl}
          </a>
        </p>
        <Link
          href={`/store/${currentUser.store.id}`}
          className="bg-blue-500 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Go to Store
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="shadow-md rounded-lg p-6 bg-blue-300">
          <button
            onClick={() => setIsAddProductOpen(!isAddProductOpen)}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {isAddProductOpen ? "Close" : "Add New Product"}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isAddProductOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <h2 className="text-2xl font-semibold my-4">Add New Product</h2>
            <AddProduct onProductAdded={handleProductAdded} />
          </div>
        </div>
        <div className=" shadow-md rounded-lg p-6 bg-blue-300">
          <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
          <ProductManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
