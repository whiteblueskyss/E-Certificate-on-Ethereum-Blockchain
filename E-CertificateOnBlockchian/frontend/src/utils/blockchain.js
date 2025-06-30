import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

// Replace with your deployed contract address
export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// ABI copied from artifacts/contracts/CertificateNFT.sol/CertificateNFT.json
export const CONTRACT_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "student",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      { indexed: false, internalType: "string", name: "token", type: "string" },
    ],
    name: "CertificateIssued",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "student", type: "address" }],
    name: "getCertificate",
    outputs: [
      {
        components: [
          { internalType: "string", name: "serialNo", type: "string" },
          {
            internalType: "string",
            name: "registrationNumber",
            type: "string",
          },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "schoolName", type: "string" },
          { internalType: "string", name: "department", type: "string" },
          { internalType: "string", name: "examinationYear", type: "string" },
          { internalType: "string", name: "letterGrade", type: "string" },
          { internalType: "string", name: "cgpa", type: "string" },
          { internalType: "string", name: "issueDate", type: "string" },
          { internalType: "address", name: "student", type: "address" },
          { internalType: "string", name: "token", type: "string" },
        ],
        internalType: "struct CertificateNFT.Certificate",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "token", type: "string" }],
    name: "getCertificateByToken",
    outputs: [
      {
        components: [
          { internalType: "string", name: "serialNo", type: "string" },
          {
            internalType: "string",
            name: "registrationNumber",
            type: "string",
          },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "schoolName", type: "string" },
          { internalType: "string", name: "department", type: "string" },
          { internalType: "string", name: "examinationYear", type: "string" },
          { internalType: "string", name: "letterGrade", type: "string" },
          { internalType: "string", name: "cgpa", type: "string" },
          { internalType: "string", name: "issueDate", type: "string" },
          { internalType: "address", name: "student", type: "address" },
          { internalType: "string", name: "token", type: "string" },
        ],
        internalType: "struct CertificateNFT.Certificate",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "student", type: "address" },
      { internalType: "string", name: "registrationNumber", type: "string" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "schoolName", type: "string" },
      { internalType: "string", name: "department", type: "string" },
      { internalType: "string", name: "examinationYear", type: "string" },
      { internalType: "string", name: "letterGrade", type: "string" },
      { internalType: "string", name: "cgpa", type: "string" },
      { internalType: "string", name: "issueDate", type: "string" },
      { internalType: "string", name: "token", type: "string" },
    ],
    name: "issueCertificate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nextSerialNo",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextTokenId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "registrationNumberUsed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];

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
