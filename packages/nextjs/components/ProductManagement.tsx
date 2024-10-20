import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { Product } from "../type";

const ProductManagement: React.FC = () => {
  const { products, updateProduct } = useStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = (updatedProduct: Product) => {
    updateProduct(updatedProduct);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Price</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-b">
              <td className="p-2">{product.name}</td>
              <td className="p-2">${product.price.toFixed(2)}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-800 mr-2">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingProduct && <EditProductForm product={editingProduct} onSave={handleSave} onCancel={handleCancel} />}
    </div>
  );
};

interface EditProductFormProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onSave, onCancel }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: name === "price" ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Edit Product</h3>
      <div className="mb-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedProduct.name}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded bg-white text-black"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="description" className="block">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={editedProduct.description}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded bg-white text-black"
        ></textarea>
      </div>
      <div className="mb-2">
        <label htmlFor="price" className="block">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={editedProduct.price}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded bg-white text-black"
          required
          min="0"
          step="0.01"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="image" className="block">
          Image URL
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={editedProduct.image}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded bg-white text-black"
        />
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2">
          Cancel
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProductManagement;
