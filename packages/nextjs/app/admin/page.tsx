"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "../../context/StoreContext";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import AddProduct from "~~/components/AddProduct";
import CreateStore from "~~/components/CreateStore";
import ProductManagement from "~~/components/ProductManagement";

const AdminPage: React.FC = () => {
  const { currentUser } = useStore();
  const { user, primaryWallet } = useDynamicContext();

  if (!user && !primaryWallet) {
    return <div>Please log in to access the admin page.</div>;
  }
  console.log(currentUser);

  if (!currentUser?.store) {
    return <CreateStore />;
  }

  const storeUrl = `${window.location.origin}/store/${currentUser.store.id}`;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Store Admin Dashboard</h1>
      <div className=" shadow-md rounded-lg p-6 mb-6">
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
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Copy Store URL
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
          <AddProduct />
        </div>
        <div className=" shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
          <ProductManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
