import { useState } from "react";
import { useToast } from "../hooks/useToast";
import { getContract, getProvider } from "../utils/blockchain";
import BlockchainLoader from "./BlockchainLoader";

export default function BurnCertificatePage() {
  const [burnToken, setBurnToken] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handleBurnCertificate(e) {
    e.preventDefault();

    if (!burnToken.trim()) {
      toast.warning("Please enter a certificate token");
      return;
    }

    setStatus("Burning certificate...");
    setIsLoading(true);

    try {
      toast.info("Processing certificate burn...");
      const provider = await getProvider();
      const signer = await provider.getSigner();
      const contract = await getContract(signer);

      const tx = await contract.burnCertificate(burnToken);
      toast.info("Transaction submitted, waiting for confirmation...");
      await tx.wait();

      setStatus("Certificate burned successfully!");
      toast.success("Certificate burned successfully!");
      setBurnToken("");
    } catch (err) {
      const errorMsg =
        err.reason || err.message || "Failed to burn certificate";
      setStatus("Error burning certificate: " + errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🔥 Burn Certificate
          </h1>
          <p className="text-gray-600 text-lg">
            Permanently remove a certificate from the blockchain
          </p>
        </div>

        {/* Burn Certificate Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6">
            <h3 className="text-2xl font-bold text-center">
              🗑️ Certificate Removal
            </h3>
          </div>

          <form
            onSubmit={handleBurnCertificate}
            className="p-8 space-y-6 dark:bg-gray-800"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Certificate Token to Burn *
              </label>
              <input
                name="burnToken"
                placeholder="Enter certificate token (e.g., abc123xyz)"
                value={burnToken}
                onChange={(e) => setBurnToken(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-red-500 focus:outline-none transition-colors font-mono disabled:opacity-50"
              />
            </div>

            {/* Warning Message */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <div className="flex items-start">
                <div className="text-red-500 dark:text-red-400 text-2xl mr-3">
                  ⚠️
                </div>
                <div>
                  <h4 className="text-red-800 dark:text-red-300 font-semibold mb-2">
                    Warning: Irreversible Action
                  </h4>
                  <ul className="text-red-700 dark:text-red-400 text-sm space-y-1">
                    <li>• This action cannot be undone</li>
                    <li>
                      • The certificate will be permanently removed from the
                      blockchain
                    </li>
                    <li>• The student will lose access to their certificate</li>
                    <li>
                      • The registration number will become available for reuse
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <BlockchainLoader size={20} />
                    Burning...
                  </>
                ) : (
                  <>🔥 Burn Certificate</>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Status Message */}
        {status && (
          <div
            className={`mt-6 rounded-lg p-4 text-center font-semibold ${
              status.includes("successfully")
                ? "bg-green-100 text-green-800 border border-green-300"
                : status.includes("Burning")
                ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {status.includes("Burning") && (
              <span className="animate-spin">⏳</span>
            )}{" "}
            {status}
          </div>
        )}

        {/* Information Card */}
        <div className="mt-8 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
          <h4 className="text-lg font-bold text-orange-800 mb-4">
            ℹ️ When to Burn Certificates
          </h4>
          <ul className="text-sm text-orange-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>Certificate was issued incorrectly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>Student data contains errors that cannot be corrected</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>Certificate was issued to wrong student</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>Administrative request for certificate removal</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Blockchain Loader */}
      {isLoading && <BlockchainLoader />}
    </div>
  );
}
