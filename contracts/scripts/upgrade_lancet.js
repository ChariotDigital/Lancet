const { ethers, upgrades } = require("hardhat");

const PROXY = "0x2B0fa3bbD37fb8aEFDA3d46E5c03Aa69337345C7";

async function main() {
  const LancetV2 = await ethers.getContractFactory("LancetV2");
  let lancetV2 = await upgrades.upgradeProxy(PROXY, LancetV2);

  console.log("Upgrade complete!", lancetV2.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
