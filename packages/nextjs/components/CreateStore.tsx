import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useStore } from "~~/context/StoreContext";
import ABI from "~~/contracts/abi";

// LoadingOverlay component
function LoadingOverlay({ isLoading = false }: { isLoading?: boolean }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="text-center bg-white p-6 rounded-lg shadow-xl">
        <Loader className="h-10 w-10 animate-spin text-blue-600 mx-auto" />
        <p className="mt-4 text-lg font-medium text-gray-900">Creating your store...</p>
      </div>
    </div>
  );
}

// Input component
interface InputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

function Input({ id, label, value, onChange, type = "text", required = false }: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

interface TextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

function Textarea({ id, label, value, onChange, required = false }: TextareaProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
}

function Button({ type = "button", onClick, children }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
    >
      {children}
    </button>
  );
}

// Main CreateStore component
const CreateStore: React.FC = () => {
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { createStore } = useStore();
  const { writeContract, data: hash } = useWriteContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (storeName.trim()) {
      setLoading(true);
      await writeContract({
        abi: ABI,
        address: "0xDC320903007690649cd3be202374D58E2E14A4f8",
        functionName: "createStore",
        args: [storeName, storeDescription, ""],
      });
    }
  };

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      console.log("Transaction confirmed!");
      createStore(storeName.trim());
      setStoreName("");
      setStoreDescription("");
      setLoading(false);
    }
  }, [isConfirmed, createStore, storeName]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <LoadingOverlay isLoading={loading} />
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Store</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="storeName"
              label="Store Name"
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              required
            />
            <Textarea
              id="storeDescription"
              label="Store Description"
              value={storeDescription}
              onChange={e => setStoreDescription(e.target.value)}
              required
            />
            <Button
              onClick={() => {
                return 1;
              }}
              type="submit"
            >
              Create Store
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStore;
