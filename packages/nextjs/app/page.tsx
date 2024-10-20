"use client";

import { useEffect } from "react";
// import { Kdam_Thmor_Pro } from "next/font/google";
import Link from "next/link";
// import { DynamicContextProvider, UserProfile, useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import type { NextPage } from "next";
import Cards from "~~/components/ui/Cards";
import { useStore } from "~~/context/StoreContext";

// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
const HomePage: NextPage = () => {
  const { user } = useDynamicContext();
  const { login } = useStore();

  useEffect(() => {
    if (user) {
      login("kev@gmail.com", "1235464");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-8 text-blue-800">Welcome to ETHical Shops</h1>
        <p className="text-xl mb-12 text-gray-700">
          The decentralized marketplace for ethical and sustainable businesses
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">For Shop Owners</h2>
            <p className="mb-4">Create and manage your ethical shop with ease using blockchain technology</p>
            <Link
              href="/admin"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Create Your Shop
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">For Shoppers</h2>
            <p className="mb-4">Discover and support ethical businesses from around the world</p>
            <Link
              href="/browse-shops"
              className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Browse Shops
            </Link>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Why ETHical Shops?</h2>
          <div className="flex flex-row gap-4">
            <Cards text="Decentralized and transparent marketplace" />
            <Cards text="Support for ethical and sustainable businesses" />
            <Cards text="Secure transactions using blockchain technology" />
            <Cards text="Global reach for local artisans and producers" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
