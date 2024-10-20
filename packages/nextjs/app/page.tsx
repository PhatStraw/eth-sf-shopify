"use client";

import { useEffect } from "react";
// import { Kdam_Thmor_Pro } from "next/font/google";
import Link from "next/link";
// import { DynamicContextProvider, UserProfile, useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import type { NextPage } from "next";
import { alfa } from "~~/app/fonts";
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
        <div className="py-20">
          <h1 className={`text-6xl font-bold mb-8 text-blue-800 ${alfa.className}`}>Welcome to ETHical Shops</h1>
          <p className="text-2xl mb-6 text-gray-700">
            The decentralized marketplace for ethical and sustainable businesses
          </p>
          <Link
            href="/admin"
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors shadow-lg text-lg mb-12"
          >
            Create Your Shop
          </Link>
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-blue-600">Why ETHical Shops?</h2>
            <div className="grid grid-cols-2 gap-6">
              <Cards text="Decentralized and transparent marketplace" />
              <Cards text="Support for ethical and sustainable businesses" />
              <Cards text="Secure transactions using blockchain technology" />
              <Cards text="Global reach for local artisans and producers" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
