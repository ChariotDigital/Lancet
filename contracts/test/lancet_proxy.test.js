const { expect } = require("chai");
const { constants } = require("ethers");
const { ethers, waffle, upgrades } = require("hardhat");
const { int } = require("hardhat/internal/core/params/argumentTypes");
const { BigNumber } = require("@ethersproject/bignumber");
const { network, deployments } = require("hardhat");

describe("Lancet (proxy)", function () {
  let deployer, user1, user2;
  let Lancet, lancet, lancetV2;
  beforeEach(async function () {
    Lancet = await ethers.getContractFactory("Lancet");
    lancet = await upgrades.deployProxy(Lancet, [2], {
      initializer: "initialize",
    });
  });
  it(`retrieve a value previously initialized`, async function () {
    expect(await lancet.runningJobs()).to.eq(0);
  });
  it("upgrades", async function () {
    const LancetV2 = await ethers.getContractFactory("LancetV2");
    lancetV2 = await upgrades.upgradeProxy(lancet.address, LancetV2);
    expect(await lancetV2.upgradeTestVal()).to.eq(false);
  });
});
