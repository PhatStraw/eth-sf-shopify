import React from "react";
import { useStore } from "../context/StoreContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

/**
 * Display the result of uploading the file to Walrus.
 */
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

const ProductList: React.FC = () => {
  const { products, addToCart } = useStore();

  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map(product => (
        <div key={product.id} className="border flex flex-col rounded-lg shadow-md bg-white">
          {/* <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" /> */}
          {/* @ts-ignore */}
          {product.image && product.image?.info && displayUpload(product.image.info, product.image.media_type)}
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
