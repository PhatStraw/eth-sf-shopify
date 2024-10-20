import { injected } from "@wagmi/connectors";
import { createConfig, http } from "@wagmi/core";
import { flowTestnet } from "@wagmi/core/chains";
import { Chain } from "viem";
import { mainnet } from "viem/chains";
import scaffoldConfig from "~~/scaffold.config";

const { targetNetworks } = scaffoldConfig;

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
export const enabledChains = targetNetworks.find((network: Chain) => network.id === 1)
  ? targetNetworks
  : ([...targetNetworks, mainnet] as const);

export const wagmiConfig = createConfig({
  chains: [flowTestnet],
  connectors: [injected()],
  transports: {
    [flowTestnet.id]: http(),
  },
});
