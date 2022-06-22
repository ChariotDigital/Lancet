const { ethers, upgrades } = require("hardhat");

async function main() {
  const PROXY = "0x2B0fa3bbD37fb8aEFDA3d46E5c03Aa69337345C7";
  const LancetV2 = await ethers.getContractFactory("LancetV2");
  console.log("Preparing upgrade...");
  const lancetV2Address = await upgrades.prepareUpgrade(PROXY, LancetV2);
  console.log("LancetV2 at:", lancetV2Address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
