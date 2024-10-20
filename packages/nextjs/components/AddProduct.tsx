import React, { useState } from "react";
import { useStore } from "~~/context/StoreContext";

async function uploadFile(file: File, numEpochs: number, basePublisherUrl: string) {
  return await fetch(`${basePublisherUrl}/v1/store?epochs=${numEpochs}`, {
    method: "PUT",
    body: file,
  }).then((response: any) => {
    if (response.status === 200) {
      // Parse successful responses as JSON, and return it along with the
      // mime type from the the file input element.
      return response.json().then((info: any) => {
        console.log(info);
        return { info: info, media_type: file.type };
      });
    } else {
      throw new Error("Something went wrong when storing the blob!");
    }
  });
}

const Product: any = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: {},
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
        image: product.image as string,
      });
      setProduct({ name: "", description: "", price: "", image: {} });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    await uploadFile(file as File, 1, "https://publisher-devnet.walrus.space")
      .then(storageInfo => {
        console.log(storageInfo);
        setProduct(prev => ({ ...prev, image: { info: storageInfo.info, media_type: storageInfo.media_type } }));
      })
      .catch(error => {
        console.error(error);
        alert(
          "An error occurred while uploading. Check the browser console and ensure that  the aggregator and publisher URLs are correct.",
        );
      });
    
    return false;
  };
        
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

  return (
    <div className="max-w-md mx-auto mt-8">
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
            className="w-full px-3 py-2 border rounded bg-white text-black"
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
            className="w-full px-3 py-2 border rounded bg-white text-black"
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
            className="w-full px-3 py-2 border rounded bg-white text-black"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          {/* @ts-ignore */}
          {product.image && product.image.info && displayUpload(product.image.info, product.image.media_type)}
          <label htmlFor="image" className="block mb-1">
            Select Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="w-full px-3 py-2 border rounded bg-white text-black"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Product;
