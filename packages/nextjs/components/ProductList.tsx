// @ts-nocheck
import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  product: any; // Replace 'any' with a more specific type if available
  onSubmit: (formData: any) => void; // Replace 'any' with a more specific type if available
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, product, onSubmit }) => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Shipping Information for {product?.name}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// /**
//  * Display the result of uploading the file to Walrus.
//  */
function displayUpload(storage_info: any, media_type: any) {
  // Extract the displayed fields from either of the two successful responses:
  // - newlyCreated for blobs that have been uploaded for the first time,
  //   or whose duration has been extended.
  // - alreadyCertified for blobs that have already been uploaded and certified.

  const SUI_NETWORK = "testnet";
  const SUI_VIEW_TX_URL = `https://suiscan.xyz/${SUI_NETWORK}/tx`;
  const SUI_VIEW_OBJECT_URL = `https://suiscan.xyz/${SUI_NETWORK}/object`;
  let info;

  if ("alreadyCertified" in storage_info) {
    info = {
      status: "Already certified",
      blobId: storage_info.alreadyCertified.blobId,
      endEpoch: storage_info.alreadyCertified.endEpoch,
      suiRefType: "Previous Sui Certified Event",
      suiRef: storage_info.alreadyCertified.event.txDigest,
      suiBaseUrl: SUI_VIEW_TX_URL,
    };
  } else if ("newlyCreated" in storage_info) {
    info = {
      status: "Newly created",
      blobId: storage_info.newlyCreated.blobObject.blobId,
      endEpoch: storage_info.newlyCreated.blobObject.storage.endEpoch,
      suiRefType: "Associated Sui Object",
      suiRef: storage_info.newlyCreated.blobObject.id,
      suiBaseUrl: SUI_VIEW_OBJECT_URL,
    };
  } else {
    throw Error("Unhandled successful response!");
  }

  // The URL used to download and view the blob.
  const blobUrl = `https://aggregator-devnet.walrus.space/v1/${info.blobId}`;

  const isImage = media_type.startsWith("image");
  // Create the HTML entry in the page for the uploaded blob.
  //
  // For the associated icon, we use the `<object/>` HTML element, as it allows specifying
  // the media type. The walrus aggregator returns blobs as `application/octect-stream`,
  // so it's necessary to specify the content type to the browser in the `object` element.
  return (
    <object
      type={`${isImage ? media_type : ""}`}
      data={`${isImage ? blobUrl : ""}`}
      className="col-4 ps-0 w-24 h-24"
    ></object>
  );
}

// Define an interface for form data
interface FormData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

// Define a type for the image object
interface ProductImage {
  info: any; // Replace 'any' with a more specific type if available
  media_type: string;
}

// Update the Product type to include the image
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: ProductImage | string; // Allow for both object and string types
}

const ProductList: React.FC = () => {
  const { products, addToCart } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (formData: FormData) => {
    console.log("Form submitted with data:", formData);
    if (selectedProduct) {
      // Check if selectedProduct is not null
      addToCart(selectedProduct);
    }
    // Here you would typically send the form data to your backend
  };

  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map(product => (
        <div key={product.id} className="border flex flex-col rounded-lg shadow-md bg-white">
          {typeof product.image === "object" &&
            product.image?.info &&
            displayUpload(product.image.info, product.image.media_type)}
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
                onClick={() => handleAddToCart(product)}
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
      <Modal isOpen={isModalOpen} closeModal={closeModal} product={selectedProduct} onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductList;

// const ProductList: React.FC = () => {
//   const { products, addToCart } = useStore();

//   return (
//     <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
//       {products.map(product => (
//         <div key={product.id} className="border flex flex-col rounded-lg shadow-md bg-white">
//           {/* <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" /> */}
//           {/* @ts-ignore */}
//           {product.image && product.image?.info && displayUpload(product.image.info, product.image.media_type)}
//           <div className="p-4 flex flex-col flex-grow justify-between">
//             <div>
//               <h3 className="text-lg font-semibold">{product.name}</h3>
//               <p className="text-gray-600 mb-4 italic text-sm">{product.description}</p>
//             </div>
//             <div className="flex justify-between items-center mt-auto">
//               <div className="flex flex-col text-black items-start h-content p-2 rounded">
//                 <h4 className="mb-0 text-gray-500">Price:</h4>
//                 <p className="text-2xl font-bold text-black mt-1">${product.price.toFixed(2)}</p>
//               </div>
//               <button
//                 onClick={() => addToCart(product)}
//                 className="group relative inline-flex items-center justify-center px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 overflow-hidden font-bold text-white transition-all duration-300 ease-out bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 text-xs sm:text-sm md:text-base"
//               >
//                 <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-700 group-hover:translate-x-0 ease">
//                   <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
//                 </span>
//                 <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
//                   Add to Cart
//                 </span>
//                 <span className="relative invisible">Add to Cart</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;
