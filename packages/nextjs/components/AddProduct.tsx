import React, { useState } from "react";
import { useStore } from "~~/context/StoreContext";

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const { addProduct } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product.name && product.price) {
      addProduct({
        ...product,
        price: parseFloat(product.price),
        id: "32132",
      });
      setProduct({ name: "", description: "", price: "", image: "" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label htmlFor="price" className="block mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
