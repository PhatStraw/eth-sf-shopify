import React from "react";
import { useStore } from "../context/StoreContext";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="border rounded-lg p-4 shadow-md">
          {/* <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" /> */}
          {/* @ts-ignore */}
          {product.image && product.image?.info && displayUpload(product.image.info, product.image.media_type)}

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
