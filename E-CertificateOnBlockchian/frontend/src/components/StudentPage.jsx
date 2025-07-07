import QRCode from "qrcode";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { getContract, getProvider } from "../utils/blockchain";
import {
  generateCertificatePDF,
  generateCertificatePDFBlob,
} from "../utils/pdfGenerator";
import Footer from "./Footer";
import Header from "./Header";

// Student page component
export default function StudentPage() {
  const [account, setAccount] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [status, setStatus] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const qrRef = useRef();

  // Set page title
  usePageTitle("SUST E-Certificate-Student");

  useEffect(() => {
    async function fetchCertificate() {
      if (!account) return;
      setStatus("Fetching certificate...");
      try {
        const provider = await getProvider();
        const contract = await getContract(provider);
        const cert = await contract.getCertificate(account);
        // Map array result to object with named fields
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
          student: cert[9],
          token: cert[10],
        };
        setCertificate(certObj);
        setStatus("");
      } catch (err) {
        setCertificate(null);
        setStatus(
          "No certificate found or error: " + (err.reason || err.message)
        );
      }
    }
    fetchCertificate();
  }, [account]);

  async function connectWallet() {
    try {
      const provider = await getProvider();
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
    } catch (err) {
      setStatus("Wallet connection failed");
    }
  }

  const verifyUrl = certificate
    ? `${window.location.origin}/verify?token=${certificate.token}`
    : "";

  async function handleDownloadPDF() {
    // Generate QR code PNG data URL using qrcode package
    let qrDataUrl = "";
    try {
      qrDataUrl = await QRCode.toDataURL(verifyUrl, { width: 128 });
    } catch (e) {
      // fallback: no QR
    }
    generateCertificatePDF({
      ...certificate,
      address: account,
      qrDataUrl,
    });
  }

  async function handlePreviewPDF() {
    // Generate QR code PNG data URL using qrcode package
    let qrDataUrl = "";
    try {
      qrDataUrl = await QRCode.toDataURL(verifyUrl, { width: 128 });
    } catch (e) {
      // fallback: no QR
    }
    const blob = generateCertificatePDFBlob({
      ...certificate,
      address: account,
      qrDataUrl,
    });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  }

  return (
    <>
      {/* Header - Always visible */}
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              🎓 Student Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Access your blockchain-verified academic certificate
            </p>
          </div>

          {/* Inspiring Content Section */}
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* University Pride Section */}
            {/* <div className="bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-700 shadow-lg">
              <div className="text-center">
                <div className="text-4xl mb-3">🏛️</div>
                <h3 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300 mb-3">
                  SUST Excellence
                </h3>
                <p className="text-indigo-700 dark:text-indigo-400 text-sm leading-relaxed">
                  Shahjalal University of Science and Technology leads
                  Bangladesh in technological innovation. Our blockchain-based
                  certificate system represents our commitment to transparency,
                  security, and academic integrity.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
                  <span>🌟</span>
                  <span className="font-semibold">
                    Pioneering Digital Education
                  </span>
                </div>
              </div>
            </div> */}

            {/* Blockchain Innovation Section */}
            {/* <div className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-700 shadow-lg">
              <div className="text-center">
                <div className="text-4xl mb-3">⛓️</div>
                <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-3">
                  Ethereum Powered
                </h3>
                <p className="text-emerald-700 dark:text-emerald-400 text-sm leading-relaxed">
                  Built on Ethereum blockchain using smart contracts and NFT
                  technology. Your certificate is immutable, globally
                  verifiable, and protected against fraud with cryptographic
                  security.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                  <span>🔐</span>
                  <span className="font-semibold">
                    Cryptographically Secured
                  </span>
                </div>
              </div>
            </div> */}
          </div>

          {/* User Guide Section */}
          <div className="mb-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-700 shadow-xl">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                How Your Digital Certificate Works
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Understanding the future of academic credentials
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700">
                <div className="text-3xl mb-4">🦊</div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                  1. Connect Wallet
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Use MetaMask to securely connect your Ethereum wallet. This
                  establishes your digital identity on the blockchain network.
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700">
                <div className="text-3xl mb-4">🔍</div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                  2. View Certificate
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Your certificate data is retrieved directly from the Ethereum
                  blockchain, ensuring authenticity and preventing any
                  possibility of tampering.
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700">
                <div className="text-3xl mb-4">📤</div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                  3. Share & Verify
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Download your PDF certificate or share the QR code for instant
                  verification by employers, institutions, or any third party
                  worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8 border dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Connect Your Wallet
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect your MetaMask wallet to view your certificate
                </p>
              </div>
              <button
                onClick={connectWallet}
                disabled={!!account}
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  account
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-700 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {account ? (
                  <span className="flex items-center gap-2">
                    ✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    🦊 Connect MetaMask
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Status Message */}
          {status && (
            <div
              className={`rounded-lg p-4 mb-6 text-center font-semibold ${
                status.includes("Fetching")
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700"
                  : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700"
              }`}
            >
              {status.includes("Fetching") && (
                <span className="animate-spin">⏳</span>
              )}{" "}
              {status}
            </div>
          )}

          {/* Certificate Display */}
          {certificate && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Certificate Details */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border dark:border-gray-700">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 text-white p-6">
                    <h3 className="text-3xl font-bold text-center">
                      🏆 Your Certificate
                    </h3>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                          <span className="block font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                            Serial No
                          </span>
                          <span className="text-gray-800 dark:text-gray-200 font-mono text-lg">
                            {certificate.serialNo}
                          </span>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                          <span className="block font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                            Student Name
                          </span>
                          <span className="text-gray-800 dark:text-gray-200 font-bold text-xl">
                            {certificate.name}
                          </span>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                          <span className="block font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                            Registration Number
                          </span>
                          <span className="text-gray-800 dark:text-gray-200 font-mono text-lg">
                            {certificate.registrationNumber}
                          </span>
                        </div>

                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
                          <span className="block font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                            School
                          </span>
                          <span className="text-gray-800 dark:text-gray-200 text-lg">
                            {certificate.schoolName}
                          </span>
                        </div>

                        <div className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 p-4 rounded-lg border border-teal-200 dark:border-teal-700">
                          <span className="block font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                            Department
                          </span>
                          <span className="text-gray-800 dark:text-gray-200 text-lg">
                            {certificate.department}
                          </span>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
                          <span className="block font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                            Examination Year
                          </span>
                          <span className="text-gray-800 dark:text-gray-200 text-lg">
                            {certificate.examinationYear}
                          </span>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border-2 border-green-300 dark:border-green-700">
                          <span className="block font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                            Letter Grade
                          </span>
                          <span className="text-green-800 dark:text-green-300 font-bold text-3xl">
                            {certificate.letterGrade}
                          </span>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                          <span className="block font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                            CGPA
                          </span>
                          <span className="text-blue-800 dark:text-blue-300 font-bold text-3xl">
                            {certificate.cgpa}
                          </span>
                        </div>

                        <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <span className="block font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                            Issue Date
                          </span>
                          <span className="text-gray-800 dark:text-gray-200 text-lg">
                            {certificate.issueDate}
                          </span>
                        </div>

                        <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-violet-200 dark:border-violet-700">
                          <span className="block font-semibold text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
                            Token
                          </span>
                          <span className="text-violet-800 dark:text-violet-300 font-mono text-sm break-all">
                            {certificate.token}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code and Actions */}
              <div className="space-y-6">
                {/* QR Code */}
                <div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 text-center border dark:border-gray-700"
                  ref={qrRef}
                >
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 text-white p-4 rounded-lg mb-6">
                    <h4 className="text-xl font-bold">📱 Verify Certificate</h4>
                    <p className="text-sm opacity-90">
                      Scan to verify authenticity
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg inline-block">
                    <QRCodeSVG value={verifyUrl} size={150} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
                    Share this QR code for instant verification
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border dark:border-gray-700">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                    📄 Certificate Actions
                  </h4>
                  <div className="space-y-4">
                    <button
                      onClick={handleDownloadPDF}
                      className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span className="flex items-center justify-center gap-2">
                        📥 Download PDF Certificate
                      </span>
                    </button>

                    <button
                      onClick={handlePreviewPDF}
                      className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span className="flex items-center justify-center gap-2">
                        👁️ Preview Certificate
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PDF Preview */}
          {pdfUrl && (
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border dark:border-gray-700">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white p-6">
                <h3 className="text-2xl font-bold text-center">
                  📋 Certificate Preview
                </h3>
              </div>
              <div className="p-6">
                <iframe
                  src={pdfUrl}
                  title="Certificate Preview"
                  className="w-full h-screen border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>
            </div>
          )}
          {/* Benefits Highlight */}
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
          {/* Inspirational Quote Section */}
          <div className="mt-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 rounded-2xl p-8 text-white shadow-2xl">
            <div className="text-center">
              <div className="text-5xl mb-4">💫</div>
              <blockquote className="text-2xl font-bold italic mb-4">
                "Education is the passport to the future, and blockchain is the
                stamp that validates its authenticity forever."
              </blockquote>
              <div className="text-lg text-indigo-200 dark:text-indigo-300 mb-6">
                — Register, SUST
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
                <p className="text-sm text-indigo-100">
                  Your certificate represents not just academic achievement, but
                  participation in the future of credentialing technology.
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
