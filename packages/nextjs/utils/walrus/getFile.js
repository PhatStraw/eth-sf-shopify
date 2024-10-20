export function getBlobUrl(blobId) {
  const baseAggregatorUrl = "https://aggregator.walrus-testnet.walrus.space";
  return `${baseAggregatorUrl}/v1/${blobId}`;
}
export function getSuiUrl(suiRef) {
  const suiBaseUrl = "https://suiscan.xyz/testnet/object";
  return `${suiBaseUrl}/${suiRef}`;
}
