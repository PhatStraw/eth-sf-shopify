"use client";

import React from "react";
import Link from "next/link";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export const Header = () => {
  return (
    <div className="sticky top-0 navbar bg-black shadow-md px-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="lg:hidden">
          {/* <label tabIndex={0} className="btn btn-ghost" onClick={() => setIsDrawerOpen(prev => !prev)}>
            <Bars3Icon className="h-6 w-6" />
          </label> */}
        </div>
        <Link href="/" className="flex items-center gap-2">
          {/* <Image alt="Shop Logo" className="cursor-pointer" width={40} height={40} src="/logo.svg" /> */}
          <span className="font-bold text-xl">Shopify Clone</span>
        </Link>
      </div>
      <div className="navbar-end">
        <DynamicWidget />
      </div>
    </div>
  );
};
