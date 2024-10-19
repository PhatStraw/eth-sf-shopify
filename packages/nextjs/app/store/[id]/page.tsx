"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProductList from "~~/components/ProductList";
import { useStore } from "~~/context/StoreContext";

const StorePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useStore();
  console.log(currentUser, id);

  if (!currentUser || !currentUser.store || currentUser.store.id !== id) {
    return <div>Store not found or you dont have access to this store.</div>;
  }

  return (
    <div className="bg-blue-100">
      <h1 className="text-center pt-6 text-3xl font-bold mb-6">Welcome to {currentUser.store.name}</h1>
      <ProductList />
    </div>
  );
};

export default StorePage;
