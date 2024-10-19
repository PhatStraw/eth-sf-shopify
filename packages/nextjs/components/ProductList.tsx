import React from "react";
import { useStore } from "../context/StoreContext";

const ProductList: React.FC = () => {
  const { products, addToCart } = useStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="border rounded-lg p-4 shadow-md">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
