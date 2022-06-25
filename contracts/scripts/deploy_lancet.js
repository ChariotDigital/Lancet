const { ethers, upgrades } = require("hardhat");

async function main() {
  const Lancet = await ethers.getContractFactory("Lancet");
  console.log("Deploying Lancet, ProxyAdmin, and then Proxy...");
  const proxy = await upgrades.deployProxy(Lancet, [2], {
    initializer: "initialize",
  });

  await proxy.deployed();

  console.log("Lancet deployed to:", proxy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
