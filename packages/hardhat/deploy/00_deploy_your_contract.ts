import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys the Shopify contract using the deployer account
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployShopify: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Shopify", {
    from: deployer,
    // Contract constructor arguments
    args: [],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const shopifyContract = await hre.ethers.getContract<Contract>("Shopify", deployer);
  console.log("👋 Shopify contract deployed at:", shopifyContract.address);
};

export default deployShopify;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags Shopify
deployShopify.tags = ["Shopify"];
