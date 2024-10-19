import React, { useState } from "react";
import { useStore } from "~~/context/StoreContext";

const CreateStore: React.FC = () => {
  const [storeName, setStoreName] = useState("");
  const { createStore } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (storeName.trim()) {
      createStore(storeName.trim());
      setStoreName("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Your Store</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="storeName" className="block mb-1">
            Store Name
          </label>
          <input
            type="text"
            id="storeName"
            value={storeName}
            onChange={e => setStoreName(e.target.value)}
            className="w-full px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Create Store
        </button>
      </form>
    </div>
  );
};

export default CreateStore;
