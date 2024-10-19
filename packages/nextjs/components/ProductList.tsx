import React from "react";
import Image from "next/image";
import { useStore } from "../context/StoreContext";
import image from "../public/Me.jpeg";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const ProductList: React.FC = () => {
  const { products, addToCart } = useStore();

  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map(product => (
        <div key={product.id} className="border flex flex-col rounded-lg shadow-md bg-white">
          <Image src={image} alt={product.name} className="w-full h-48 object-cover mb-2 rounded" />
          <div className="p-4 flex flex-col flex-grow justify-between">
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 mb-4 italic text-sm">{product.description}</p>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <div className="flex flex-col text-black items-start h-content p-2 rounded">
                <h4 className="mb-0 text-gray-500">Price:</h4>
                <p className="text-2xl font-bold text-black mt-1">${product.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="group relative inline-flex items-center justify-center px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 overflow-hidden font-bold text-white transition-all duration-300 ease-out bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 text-xs sm:text-sm md:text-base"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-700 group-hover:translate-x-0 ease">
                  <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Add to Cart
                </span>
                <span className="relative invisible">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
