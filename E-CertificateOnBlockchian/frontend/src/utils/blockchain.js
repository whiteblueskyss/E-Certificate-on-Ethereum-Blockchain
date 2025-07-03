import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contractInfo";

// Utility to generate a random 10-character alphanumeric token
export function generateToken() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function getProvider() {
  const provider = await detectEthereumProvider();
  if (!provider) throw new Error("MetaMask not found");
  await provider.request({ method: "eth_requestAccounts" });
  return new ethers.BrowserProvider(window.ethereum);
}

export async function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
}

export async function getOwner(signerOrProvider) {
  const contract = await getContract(signerOrProvider);
  return contract.owner();
}

export async function burnCertificate(token, signerOrProvider) {
  const contract = await getContract(signerOrProvider);
  const tx = await contract.burnCertificate(token);
  await tx.wait();
}

export async function addMinter(address, signerOrProvider) {
  const contract = await getContract(signerOrProvider);
  const tx = await contract.addMinter(address);
  await tx.wait();
}

export async function removeMinter(address, signerOrProvider) {
  const contract = await getContract(signerOrProvider);
  const tx = await contract.removeMinter(address);
  await tx.wait();
}

export async function isMinter(address, provider) {
  const contract = await getContract(provider);
  return contract.minters(address);
}

export async function isValidCertificate(token, provider) {
  const contract = await getContract(provider);
  return contract.isValidCertificate(token);
}
