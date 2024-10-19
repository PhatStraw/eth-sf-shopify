"use client";

import { useEffect } from "react";
import Link from "next/link";
// import { DynamicContextProvider, UserProfile, useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import type { NextPage } from "next";
import { useStore } from "~~/context/StoreContext";

// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
const Home: NextPage = () => {
  const { user } = useDynamicContext();
  const { login } = useStore();
  useEffect(() => {
    if (user) {
      login("kev@gmail.com", "1235464");
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Shopify Clone</h1>
      {!user && <p className="mb-4">Please log in to create your store and start selling!</p>}
      {user && (
        <Link href="/admin" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Create Your Store
        </Link>
      )}
      {/* {user && (
        <Link
          href={`/store/${user?.address}`}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Visit Your Store
        </Link>
      )} */}
    </div>
  );
};

export default Home;
