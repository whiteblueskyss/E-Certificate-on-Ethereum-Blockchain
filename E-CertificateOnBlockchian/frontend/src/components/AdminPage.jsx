import { useState } from "react";
import { useAutoSave } from "../hooks/useAutoSave";
import { usePageTitle } from "../hooks/usePageTitle";
import { useToast } from "../hooks/useToast";
import { generateToken, getContract, getProvider } from "../utils/blockchain";
import BlockchainLoader from "./BlockchainLoader";

const SCHOOL_OPTIONS = [
  "Agriculture and Mineral Sciences",
  "Applied Sciences and Technology",
  "Life Sciences",
  "Management and Business Administration",
  "Physical Sciences",
  "Social Sciences",
];

function getCurrentDate() {
  return new Date().toISOString().slice(0, 10);
}

function calculateGrade(cgpa) {
  const n = parseFloat(cgpa);
  if (n >= 4.0) return "A+";
  if (n >= 3.75) return "A";
  if (n >= 3.5) return "A-";
  if (n >= 3.25) return "B+";
  if (n >= 3.0) return "B";
  if (n >= 2.75) return "B-";
  if (n >= 2.5) return "C+";
  if (n >= 2.25) return "C";
  if (n >= 2.0) return "C-";
  return "D";
}

function isValidEthereumAddress(address) {
  // Check if it's a valid Ethereum address format (starts with 0x and is 42 characters long)
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address);
}

export default function AdminPage({
  account,
  connectWallet,
  isAdmin,
  isCurrentMinter,
}) {
  const [form, setForm] = useState({
    student: "",
    name: "",
    registrationNumber: "",
    schoolName: SCHOOL_OPTIONS[0],
    department: "",
    examinationYear: "",
    cgpa: "",
    issueDate: getCurrentDate(),
  });
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Set page title
  usePageTitle("SUST E-Certificate-Admin");

  const toast = useToast();

  // Auto-save form data
  const { lastSaved, isAutoSaving } = useAutoSave(
    form,
    "admin-certificate-form",
    2000
  );

  async function issueCertificate(e) {
    e.preventDefault();

    try {
      if (!account) {
        toast.warning("Please connect your wallet first");
        return;
      }

      if (!isAdmin && !isCurrentMinter) {
        toast.error("Only admin or authorized minters can issue certificates");
        return;
      }

      if (
        !form.student ||
        !form.name ||
        !form.registrationNumber ||
        !form.department ||
        !form.examinationYear ||
        !form.cgpa
      ) {
        toast.warning("Please fill in all required fields");
        return;
      }

      // Add wallet address validation
      if (!isValidEthereumAddress(form.student)) {
        toast.error(
          "Invalid Ethereum wallet address format. Address must start with 0x and be 42 characters long."
        );
        setStatus("Error: Invalid wallet address format");
        return;
      }

      setStatus("Issuing certificate...");
      toast.info("Processing certificate issuance...");

      const provider = await getProvider();
      const signer = await provider.getSigner();
      const contract = await getContract(signer);
      const letterGrade = calculateGrade(form.cgpa);
      const newToken = generateToken();
      setToken(newToken);

      // Check registration number uniqueness before sending transaction
      const regUsed = await contract.registrationNumberUsed(
        form.registrationNumber
      );
      if (regUsed) {
        setStatus("Error: Registration number already used");
        toast.error("Registration number already used");
        return;
      }

      setIsLoading(true);
      const tx = await contract.issueCertificate(
        form.student,
        form.registrationNumber,
        form.name,
        form.schoolName,
        form.department,
        form.examinationYear,
        letterGrade,
        form.cgpa,
        form.issueDate,
        newToken
      );

      toast.info("Transaction submitted, waiting for confirmation...");
      await tx.wait();

      setStatus("Certificate issued successfully! Token: " + newToken);
      toast.success("Certificate issued successfully!");

      // Clear form after successful issuance
      setForm({
        student: "",
        name: "",
        registrationNumber: "",
        schoolName: SCHOOL_OPTIONS[0],
        department: "",
        examinationYear: "",
        cgpa: "",
        issueDate: getCurrentDate(),
      });
    } catch (err) {
      setStatus("Error: " + (err.reason || err.message));
      toast.error(err.reason || err.message || "Failed to issue certificate");
    } finally {
      setIsLoading(false);
    }
  }

  // Remove the burn certificate and minter management functions since they're in separate pages

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section with University Pride */}
      <div className="text-center mb-8">
        {/* System Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border dark:border-gray-700">
            <div className="text-2xl mb-2">⛓️</div>
            <div className="font-bold text-gray-800 dark:text-gray-200">
              Blockchain
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              ✅ Connected
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border dark:border-gray-700">
            <div className="text-2xl mb-2">🔐</div>
            <div className="font-bold text-gray-800 dark:text-gray-200">
              Smart Contract
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              ✅ Active
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border dark:border-gray-700">
            <div className="text-2xl mb-2">👑</div>
            <div className="font-bold text-gray-800 dark:text-gray-200">
              Access Level
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">
              {isAdmin ? "🔑 Admin" : isCurrentMinter ? "👨‍💼 Minter" : "❌ None"}
            </div>
          </div>
        </div>
      </div>

      {/* Header - More compact */}
      <div className="text-center mb-4">
        {/* SUST Logo */}
        <div className="mb-4">
          <img
            src="/SUST.png"
            alt="SUST Logo"
            className="w-16 h-16 mx-auto object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          SUST E-Certificate-Admin
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          📜 Issue New Certificate
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create blockchain-verified academic certificates
        </p>
      </div>

      {/* Certificate Issuance Form - Compact */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">🎯 Certificate Details</h3>
            {/* Auto-save status */}
            <div className="text-sm opacity-90">
              {isAutoSaving ? (
                <span className="flex items-center gap-1">
                  <span className="animate-pulse">💾</span>
                  Saving...
                </span>
              ) : lastSaved ? (
                <span className="flex items-center gap-1">
                  <span>✅</span>
                  Auto-saved
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <span>💾</span>
                  Auto-save enabled
                </span>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={issueCertificate} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Student Wallet Address *
              </label>
              <input
                name="student"
                placeholder="0x742d35Cc6634C0532925a3b8D6Ac6d4e2D2C9C5"
                value={form.student}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors font-mono text-sm ${
                  form.student && !isValidEthereumAddress(form.student)
                    ? "border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-green-500"
                }`}
              />
              {form.student && !isValidEthereumAddress(form.student) && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  ❌ Invalid Ethereum address format. Must start with 0x and be
                  42 characters long.
                </p>
              )}
              {form.student && isValidEthereumAddress(form.student) && (
                <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                  ✅ Valid Ethereum address format
                </p>
              )}
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Registration Number *
              </label>
              <input
                name="registrationNumber"
                placeholder="2024001"
                value={form.registrationNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>

            {/* School */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                School *
              </label>
              <select
                name="schoolName"
                value={form.schoolName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-500 focus:outline-none transition-colors"
              >
                {SCHOOL_OPTIONS.map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Department *
              </label>
              <input
                name="department"
                placeholder="Computer Science"
                value={form.department}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Examination Year */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Examination Year *
              </label>
              <input
                name="examinationYear"
                placeholder="2024"
                value={form.examinationYear}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>

            {/* CGPA */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                CGPA (0.00 - 4.00) *
              </label>
              <input
                name="cgpa"
                placeholder="3.75"
                value={form.cgpa}
                onChange={handleChange}
                required
                type="number"
                step="0.01"
                min="0"
                max="4"
                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-500 focus:outline-none transition-colors"
              />
              {form.cgpa && (
                <p className="mt-1 text-sm text-gray-600">
                  Letter Grade:{" "}
                  <span className="font-semibold text-green-600">
                    {calculateGrade(form.cgpa)}
                  </span>
                </p>
              )}
            </div>

            {/* Issue Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Issue Date *
              </label>
              <input
                name="issueDate"
                value={form.issueDate}
                onChange={handleChange}
                type="date"
                required
                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <BlockchainLoader size={20} />
                  Issuing...
                </>
              ) : (
                "🎯 Issue Certificate"
              )}
            </span>
          </button>
        </form>
      </div>

      {/* Status Message - Compact */}
      {status && (
        <div
          className={`mt-4 rounded-lg p-4 text-center font-semibold ${
            status.includes("successfully")
              ? "bg-green-100 text-green-800 border border-green-300"
              : status.includes("Issuing")
              ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {status.includes("Issuing") && (
            <span className="animate-spin">⏳</span>
          )}{" "}
          {status}
        </div>
      )}

      {/* Success Info - More compact */}
      {status.includes("successfully") && token && (
        <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
          <h4 className="text-lg font-bold text-green-800 mb-3">
            ✅ Certificate Issued Successfully!
          </h4>
          <div className="space-y-2 text-sm text-green-700">
            <p>
              <strong>Certificate Token:</strong>{" "}
              <span className="font-mono bg-white px-2 py-1 rounded text-xs">
                {token}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Last Saved Info - Compact */}
      {lastSaved && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Last saved:{" "}
          <time dateTime={lastSaved.toISOString()}>
            {lastSaved.toLocaleString()}
          </time>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700 rounded-2xl p-8 text-white shadow-2xl mb-6">
        <div className="text-5xl mb-4">🏛️</div>
        <h1 className="text-4xl font-bold mb-4">
          SUST Certificate Administration
        </h1>
        <p className="text-xl text-blue-100 mb-4">
          Empowering academic integrity through blockchain technology
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
          <p className="text-sm">
            Issue tamper-proof, globally verifiable academic certificates on the
            Ethereum blockchain
          </p>
        </div>
      </div>
    </div>
  );
}
