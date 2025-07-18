# Ethereum-Powered-E-Certificate-Issuance-and-Verification

## 📋 Project Overview

This is a sophisticated educational project that exemplifies cutting-edge blockchain technology implementation for revolutionary certificate management systems. The project demonstrates an innovative fusion of cryptographic security, decentralized architecture, and immutable ledger technology to create a tamper-proof, trustless certificate verification ecosystem.

**A decentralized certificate issuing and verification system using NFTs, MetaMask, and QR codes** - This project allows educational institutions to issue tamper-proof certificates on the Ethereum blockchain and enables instant verification through QR codes or token verification.

### 🎯 Project Purpose

This system serves three primary stakeholders:

- **🏛️ Educational Institutions**: Can securely issue digital certificates as NFTs with complete authenticity guarantees
- **🎓 Students**: Receive their academic certificates as unique NFT tokens with instant, verifiable ownership
- **🔍 Third-Party Verifiers**: Can instantly verify certificate authenticity through QR codes or token verification without relying on centralized authorities

This project represents a paradigm shift from traditional centralized certificate systems to a distributed, blockchain-native solution that ensures perpetual authenticity, eliminates counterfeiting, and provides unprecedented transparency in academic credential verification.

## ✨ Features

- 🎓 **NFT-based Certificates**: Each certificate is minted as an ERC721 token
- 🔐 **Role-based Access Control**: Admin, Minter, and Student roles
- 📱 **QR Code Verification**: Instant certificate verification with QR codes
- 💳 **MetaMask Integration**: Secure wallet connectivity
- 📄 **PDF Generation**: Download certificates as PDF with blockchain verification
- 🌙 **Dark Mode**: Modern UI with dark/light theme toggle
- 🔥 **Certificate Burning**: Ability to revoke certificates when needed

## 🛠 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Hardhat** (Ethereum development environment)
- **MetaMask** browser extension

## 🚀 Quick Setup

**One-sentence setup**: Clone the repository, install dependencies for both blockchain and frontend, deploy the smart contract locally, update the contract address in the frontend, and run both the blockchain network and React application with MetaMask connected to localhost:8545.

## 📋 Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/whiteblueskyss/Ethereum-Powered-E-Certificate-Issuance-and-Verification.git
cd Ethereum-Powered-E-Certificate-Issuance-and-Verification
```

### 2. Install Blockchain Dependencies

```bash
cd E-CertificateOnBlockchian
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Start Local Blockchain Network

```bash
# In the E-CertificateOnBlockchian directory
npx hardhat compile
npx hardhat node
```

> Keep this terminal running. It will show 20 accounts with private keys for testing.

### 5. Deploy Smart Contract

```bash
# In a new terminal, navigate to E-CertificateOnBlockchian directory
npx hardhat run scripts/deploy.js --network localhost
```

> Copy the deployed contract address from the output.

### 6. Update Contract Address

Edit `frontend/src/utils/contractInfo.js` and update the contract address:

```javascript
export const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
```

### 7. Configure MetaMask

1. Open MetaMask extension
2. Click "Add Network" and add:
   - **Network Name**: Hardhat Local
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 1337
   - **Currency Symbol**: ETH
3. Import test accounts using private keys from the Hardhat node terminal

### 8. Start Frontend Application

```bash
cd frontend
npm start
```

The application will open at `http://localhost:3000`  
Access admin/minter portal at `http://localhost:3000/admin`  
Access the student portal at `http://localhost:3000/student`  
Access the verification portal at `http://localhost:3000/verify`

## 🎯 Usage

### Admin Functions

- **Manage Minters**: Add or remove minter permissions
- **Issue Certificates**: Issue certificates for students
- **Burn Certificates**: Revoke certificates when needed

### Minter Functions

- **Issue Certificates**: Create new certificates for students
- **Burn Certificates**: Revoke certificates when needed

### Student Functions

- **View Certificate**: Access your issued certificate
- **Download PDF**: Get certificate as PDF with QR code
- **Verify Authenticity**: Use QR code for instant verification

### Verification Process

- Just scan the QR code or put the token in verification portal and hit 'Verify' to check the authenticity of the certificate.

## 🔧 Configuration

### Network Configuration

- **Chain ID**: 1337 (Hardhat local network)
- **RPC URL**: http://127.0.0.1:8545
- **Test Accounts**: 20 accounts with 10,000 ETH each

## 🚨 Common Issues & Solutions

### MetaMask Not Connecting

- Ensure you're on the correct network (Chain ID: 1337)
- Check that the RPC URL is http://127.0.0.1:8545
- Refresh the page after network changes

### Contract Not Found

- Verify the contract address in `contractInfo.js`
- Ensure the local blockchain is running
- Redeploy the contract if needed

### Transaction Failures

- Check you have sufficient ETH in your account
- Ensure you're using the correct account role (Admin/Minter/Student)
- Verify the contract is deployed and accessible

Each time you stop and restart the Hardhat node, you will need to redeploy the contract and update the address in the frontend. You also need to reimport the test accounts in MetaMask and RPC url. Though, you can see the same private keys and RPC to import the accounts again but it won't work. Because the hardhat node resets the state and every time create a new instance of the blockchain. So previous accounts and RPC will not persist.

## 👨‍💻 Author

This project was developed by **[@whiteblueskyss](https://github.com/whiteblueskyss)**.

---
