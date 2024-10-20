export default async function uploadFile(file, numEpochs, basePublisherUrl) {
  const response = await fetch(`${basePublisherUrl}/v1/store?epochs=${numEpochs}`, {
    method: "PUT",
    body: file,
  });
  if (response.status === 200) {
    const info = await response.json();
    return info.newlyCreated ? info.newlyCreated.blobObject.blobId : info.alreadyCertified.blobId;
  } else {
    throw new Error("Failed to upload file.");
  }
}
