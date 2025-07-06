import { useState } from "react";
import {
  addMinter,
  getProvider,
  isMinter,
  removeMinter,
} from "../utils/blockchain";

export default function MinterManagementPage() {
  const [minterAddress, setMinterAddress] = useState("");
  const [minterStatus, setMinterStatus] = useState("");
  const [checkAddress, setCheckAddress] = useState("");
  const [checkResult, setCheckResult] = useState("");

  async function handleAddMinter() {
    setMinterStatus("Adding minter...");
    try {
      const provider = await getProvider();
      const signer = await provider.getSigner();
      await addMinter(minterAddress, signer);
      setMinterStatus("Minter added successfully!");
      setMinterAddress("");
    } catch (err) {
      setMinterStatus("Failed to add minter: " + (err.reason || err.message));
    }
  }

  async function handleRemoveMinter() {
    setMinterStatus("Removing minter...");
    try {
      const provider = await getProvider();
      const signer = await provider.getSigner();
      await removeMinter(minterAddress, signer);
      setMinterStatus("Minter removed successfully!");
      setMinterAddress("");
    } catch (err) {
      setMinterStatus(
        "Failed to remove minter: " + (err.reason || err.message)
      );
    }
  }

  async function handleCheckMinter() {
    if (!checkAddress) {
      setCheckResult("Please enter a wallet address to check.");
      return;
    }

    setCheckResult("Checking...");
    try {
      const provider = await getProvider();
      const isMinterResult = await isMinter(checkAddress, provider);
      setCheckResult(
        isMinterResult
          ? "✅ This address is a minter"
          : "❌ This address is not a minter"
      );
    } catch (err) {
      setCheckResult(
        "Error checking minter status: " + (err.reason || err.message)
      );
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            👑 Minter Management
          </h1>
          <p className="text-gray-600 text-lg">
            Add or remove minter permissions for certificate issuance
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-red-100 text-red-800 border border-red-300">
              🔒 Admin Only Feature
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add/Remove Minter */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
              <h3 className="text-2xl font-bold text-center">
                🛠️ Manage Minters
              </h3>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minter Wallet Address *
                </label>
                <input
                  type="text"
                  placeholder="0x742d35Cc6634C0532925a3b8D6Ac6d4e2D2C9C5"
                  value={minterAddress}
                  onChange={(e) => setMinterAddress(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleAddMinter}
                  disabled={!minterAddress}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    ➕ Add Minter
                  </span>
                </button>

                <button
                  onClick={handleRemoveMinter}
                  disabled={!minterAddress}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    ➖ Remove Minter
                  </span>
                </button>
              </div>

              {minterStatus && (
                <div
                  className={`rounded-lg p-4 text-center font-semibold ${
                    minterStatus.includes("success")
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : minterStatus.includes("Adding") ||
                        minterStatus.includes("Removing")
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  {(minterStatus.includes("Adding") ||
                    minterStatus.includes("Removing")) && (
                    <span className="animate-spin">⏳</span>
                  )}{" "}
                  {minterStatus}
                </div>
              )}
            </div>
          </div>

          {/* Check Minter Status */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
              <h3 className="text-2xl font-bold text-center">
                🔍 Check Minter Status
              </h3>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Wallet Address to Check *
                </label>
                <input
                  type="text"
                  placeholder="0x742d35Cc6634C0532925a3b8D6Ac6d4e2D2C9C5"
                  value={checkAddress}
                  onChange={(e) => setCheckAddress(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors font-mono text-sm"
                />
              </div>

              <button
                onClick={handleCheckMinter}
                disabled={!checkAddress}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  🔎 Check Status
                </span>
              </button>

              {checkResult && (
                <div
                  className={`rounded-lg p-4 text-center font-semibold ${
                    checkResult.includes("✅")
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : checkResult.includes("❌")
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : checkResult.includes("Checking")
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                      : "bg-gray-100 text-gray-800 border border-gray-300"
                  }`}
                >
                  {checkResult.includes("Checking") && (
                    <span className="animate-spin">⏳</span>
                  )}{" "}
                  {checkResult}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Minter Privileges */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-800 mb-4">
              👨‍💼 Minter Privileges
            </h4>
            <ul className="space-y-2 text-sm text-green-700">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✅</span>
                Issue new certificates
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✅</span>
                Burn existing certificates
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">❌</span>
                Add/Remove other minters
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">❌</span>
                System administration
              </li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <h4 className="text-lg font-bold text-blue-800 mb-4">
              📋 Best Practices
            </h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Only grant minter access to trusted staff</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Regularly review minter permissions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Remove access when staff leaves</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Keep a record of all minter addresses</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
