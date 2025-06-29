// Script to deploy CertificateNFT contract

const { ethers } = require("hardhat");

async function main() {
  const CertificateNFT = await ethers.getContractFactory("CertificateNFT");
  const certificateNFT = await CertificateNFT.deploy();
  await certificateNFT.deployed();
  console.log("CertificateNFT deployed to:", certificateNFT.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
