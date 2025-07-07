import { useEffect, useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import {
  getContract,
  getProvider,
  isValidCertificate,
} from "../utils/blockchain";
import Footer from "./Footer";
import Header from "./Header";

function getTokenFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("token") || "";
}

export default function VerifyPage() {
  const [input, setInput] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [status, setStatus] = useState("");
  const tokenFromUrl = getTokenFromQuery();

  // Set page title
  usePageTitle("SUST E-Certificate-Verify");

  useEffect(() => {
    if (tokenFromUrl) {
      verifyToken(tokenFromUrl);
      setInput(tokenFromUrl);
    }
    // eslint-disable-next-line
  }, [tokenFromUrl]);

  async function verifyToken(token) {
    setStatus("Verifying...");
    setCertificate(null);
    if (!token) {
      setStatus("Please enter a certificate token.");
      return;
    }
    try {
      const provider = await getProvider();
      const contract = await getContract(provider);
      const cert = await contract.getCertificateByToken(token);
      const certObj = {
        serialNo: cert[0],
        registrationNumber: cert[1],
        name: cert[2],
        schoolName: cert[3],
        department: cert[4],
        examinationYear: cert[5],
        letterGrade: cert[6],
        cgpa: cert[7],
        issueDate: cert[8],
        token: cert[10],
      };
      // Check if valid (issued by minter or admin)
      const valid = await isValidCertificate(token, provider);
      setCertificate(certObj);
      setStatus(
        valid
          ? "Valid certificate issued by SUST."
          : "Invalid certificate: not issued by SUST."
      );
    } catch (err) {
      setCertificate(null);
      setStatus("Invalid certificate or not issued by SUST.");
    }
  }

  async function handleVerify() {
    verifyToken(input);
  }

  return (
    <>
      {/* Header - Always visible */}
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          {/* Verification Instructions */}
          <div className="mb-8 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-700 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                Verify Any SUST Certificate
              </h2>
              <p className="text-emerald-600 dark:text-emerald-500 text-lg">
                Enter the certificate token to instantly verify its authenticity
                on the Ethereum blockchain
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                <div className="text-center">
                  <div className="text-3xl mb-3">📱</div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Using QR Code
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Scan the QR code from any SUST certificate PDF or digital
                    display for instant verification without manual input.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                <div className="text-center">
                  <div className="text-3xl mb-3">🎫</div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Manual Token Entry
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Enter the unique certificate token (e.g., "abc123xyz") found
                    on the official certificate document to verify.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8 border dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter certificate token (e.g., abc123xyz)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                onClick={handleVerify}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors shadow-md"
              >
                🔎 Verify
              </button>
            </div>
          </div>

          {status && (
            <div
              className={`rounded-lg p-4 mb-6 text-center font-semibold ${
                status.includes("Valid")
                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-700"
                  : status.includes("Verifying")
                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700"
                  : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700"
              }`}
            >
              {status.includes("Verifying") && (
                <span className="animate-spin">⏳</span>
              )}{" "}
              {status}
            </div>
          )}

          {certificate && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white p-6">
                <h3 className="text-2xl font-bold text-center">
                  ✅ Valid Certificate
                </h3>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-semibold text-gray-600 dark:text-gray-400 w-24">
                        Serial No:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200 font-mono">
                        {certificate.serialNo}
                      </span>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-semibold text-gray-600 dark:text-gray-400 w-24">
                        Name:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                        {certificate.name}
                      </span>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-semibold text-gray-600 dark:text-gray-400 w-24">
                        Reg. No:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200 font-mono">
                        {certificate.registrationNumber}
                      </span>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-semibold text-gray-600 dark:text-gray-400 w-24">
                        School:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {certificate.schoolName}
                      </span>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-semibold text-gray-600 dark:text-gray-400 w-24">
                        Department:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {certificate.department}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-semibold text-gray-600 dark:text-gray-400 w-24">
                        Year:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {certificate.examinationYear}
                      </span>
                    </div>

                    <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                      <span className="font-semibold text-gray-600 dark:text-gray-400 w-24">
                        Grade:
                      </span>
                      <span className="text-green-800 dark:text-green-300 font-bold text-xl">
                        {certificate.letterGrade}
                      </span>
                    </div>

                    <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                      <span className="font-semibold text-gray-600 dark:text-gray-400 w-24">
                        CGPA:
                      </span>
                      <span className="text-blue-800 dark:text-blue-300 font-bold text-xl">
                        {certificate.cgpa}
                      </span>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-semibold text-gray-600 dark:text-gray-400 w-24">
                        Issued:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {certificate.issueDate}
                      </span>
                    </div>

                    <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                      <span className="font-semibold text-gray-600 dark:text-gray-400 w-24">
                        Token:
                      </span>
                      <span className="text-purple-800 dark:text-purple-300 font-mono text-sm break-all">
                        {certificate.token}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Information Section */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Information */}
            <div className="bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-700 shadow-lg">
              <div className="text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-3">
                  Security Features
                </h3>
                <div className="space-y-3 text-sm text-red-700 dark:text-red-400">
                  <div className="flex items-center gap-2">
                    <span>🔐</span>
                    <span>256-bit cryptographic hashing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⛓️</span>
                    <span>Ethereum blockchain immutability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🔏</span>
                    <span>Smart contract validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🌍</span>
                    <span>Decentralized verification network</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Innovation */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700 shadow-lg">
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-3">
                  Innovation Impact
                </h3>
                <div className="space-y-3 text-sm text-purple-700 dark:text-purple-400">
                  <div className="flex items-center gap-2">
                    <span>🚀</span>
                    <span>First blockchain certificates in Bangladesh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🎓</span>
                    <span>Setting new standards for academic integrity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💡</span>
                    <span>Pioneering Web3 education technology</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🌟</span>
                    <span>Eliminating certificate fraud forever</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 mb-8 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/10 dark:via-orange-900/10 dark:to-red-900/10 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-700 shadow-xl">
            <div className="text-center mb-6">
              {/* <div className="text-4xl mb-3">🌟</div> */}
              <h3 className="text-2xl font-bold text-orange-800 dark:text-orange-300 mb-2">
                Why Blockchain Certificates Matter
              </h3>
              <p className="text-orange-700 dark:text-orange-400">
                Revolutionary advantages of decentralized credential
                verification
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border dark:border-gray-700 text-center">
                <div className="text-2xl mb-2">🌍</div>
                <h5 className="font-bold text-gray-800 dark:text-gray-200 mb-1">
                  Global Acceptance
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Recognized worldwide without borders
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border dark:border-gray-700 text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h5 className="font-bold text-gray-800 dark:text-gray-200 mb-1">
                  Instant Verification
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Verify authenticity in seconds
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border dark:border-gray-700 text-center">
                <div className="text-2xl mb-2">🔒</div>
                <h5 className="font-bold text-gray-800 dark:text-gray-200 mb-1">
                  Fraud Proof
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Impossible to forge or duplicate
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border dark:border-gray-700 text-center">
                <div className="text-2xl mb-2">💎</div>
                <h5 className="font-bold text-gray-800 dark:text-gray-200 mb-1">
                  Permanent Record
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Stored forever on blockchain
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
