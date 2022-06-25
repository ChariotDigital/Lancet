const { expect } = require("chai");
const { constants } = require("ethers");
const { ethers, waffle } = require("hardhat");
const { int } = require("hardhat/internal/core/params/argumentTypes");
const { BigNumber } = require("@ethersproject/bignumber");

describe("Lancet", function () {
  let deployer, user1, user2;
  let lancet;
  let provider;

  before(async function () {
    [deployer, user1, user2] = await hre.ethers.getSigners();
    provider = ethers.provider;
  });

  beforeEach(async function () {
    const Lancet = await hre.ethers.getContractFactory("Lancet");
    lancet = await Lancet.deploy();
    await lancet.deployed();
    await lancet.initialize(2);
  });

  describe("Fee", function () {
    it("should be able to set a fee", async function () {
      await lancet.setPlatformFee(10);
      expect(await lancet.s_platformFee()).to.eq(10);
    });
    it("should send correct amount on job complete minus fee", async function () {
      await lancet.setPlatformFee(10);
      await lancet.createJob(user1.address, deployer.address, 1000000000000000000n, {
        value: hre.ethers.BigNumber.from("1000000000000000000"),
      });
      await lancet.releaseFunds(1);
      const jobAmount = hre.ethers.BigNumber.from((1000000000000000000 * 0.1).toString());

      expect(await provider.getBalance(lancet.address)).to.eq(jobAmount);
    });
  });
  it("should only withdraw allowed amount to owner", async function () {
    await lancet.setPlatformFee(10);
    await lancet.createJob(user1.address, deployer.address, 1000000000000000000n, {
      value: hre.ethers.BigNumber.from("1000000000000000000"),
    });
    await lancet.releaseFunds(1);
    const balanceAfterWithdraw = hre.ethers.BigNumber.from((1000000000000000000 * 0.1).toString());
    await lancet.withdraw(deployer.address);
    expect(await provider.getBalance(lancet.address)).to.eq(0);
  });
  it("", async function () {});
});
