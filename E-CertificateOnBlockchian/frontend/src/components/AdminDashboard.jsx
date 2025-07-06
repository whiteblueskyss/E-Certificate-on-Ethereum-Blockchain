import { useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";
import { getOwner, getProvider, isMinter } from "../utils/blockchain";
import AdminPage from "./AdminPage";
import BlockchainLoader from "./BlockchainLoader";
import BurnCertificatePage from "./BurnCertificatePage";
import Footer from "./Footer";
import Header from "./Header";
import MinterManagementPage from "./MinterManagementPage";
import Sidebar from "./Sidebar";

export default function AdminDashboard() {
  const [account, setAccount] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCurrentMinter, setIsCurrentMinter] = useState(false);
  const [currentPage, setCurrentPage] = useState("issue");
  const [status, setStatus] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const toast = useToast();

  useEffect(() => {
    async function checkAccess() {
      if (!account) return;
      try {
        const provider = await getProvider();
        const owner = await getOwner(provider);
        setIsAdmin(account.toLowerCase() === owner.toLowerCase());
        if (account.toLowerCase() !== owner.toLowerCase()) {
          const minter = await isMinter(account, provider);
          setIsCurrentMinter(minter);
        } else {
          setIsCurrentMinter(false);
        }
      } catch (err) {
        setIsAdmin(false);
        setIsCurrentMinter(false);
      }
    }
    checkAccess();
  }, [account]);

  async function connectWallet() {
    setIsConnecting(true);
    try {
      const provider = await getProvider();
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
      const owner = await getOwner(provider);
      setIsAdmin(addr.toLowerCase() === owner.toLowerCase());
      toast.success("Wallet connected successfully");
    } catch (err) {
      setStatus("Wallet connection failed");
      toast.error("Wallet connection failed");
    } finally {
      setIsConnecting(false);
    }
  }

  function renderCurrentPage() {
    switch (currentPage) {
      case "issue":
        return (
          <AdminPage
            account={account}
            connectWallet={connectWallet}
            isAdmin={isAdmin}
            isCurrentMinter={isCurrentMinter}
          />
        );
      case "burn":
        return <BurnCertificatePage />;
      case "minter":
        return <MinterManagementPage />;
      default:
        return (
          <AdminPage
            account={account}
            connectWallet={connectWallet}
            isAdmin={isAdmin}
            isCurrentMinter={isCurrentMinter}
          />
        );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
      {/* Header - Always visible */}
      <Header />

      <div className="flex-1">
        {/* Show beautiful connect wallet screen if not connected */}
        {!account ? (
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-7xl w-full">
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Left Column - Welcome & Connect */}
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border dark:border-gray-700">
                    {/* Header with Gradient */}
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-700 dark:via-purple-700 dark:to-blue-700 p-8 text-center">
                      <div className="text-5xl mb-3">🔐</div>
                      <h1 className="text-2xl font-bold text-white mb-2">
                        Admin Portal
                      </h1>
                      <p className="text-indigo-100 dark:text-indigo-200 text-sm">
                        Secure blockchain certificate management
                      </p>
                    </div>

                    {/* Connect Content */}
                    <div className="p-6">
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                          Connect Your Wallet
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          Connect MetaMask to access the certificate management
                          system.
                        </p>
                      </div>

                      {/* MetaMask Connect Button */}
                      <button
                        onClick={connectWallet}
                        className="group relative w-full px-6 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 hover:from-orange-600 hover:via-orange-700 hover:to-yellow-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <div className="flex items-center justify-center gap-3">
                          {isConnecting ? (
                            <BlockchainLoader size={24} />
                          ) : (
                            <div className="text-2xl group-hover:animate-bounce">
                              🦊
                            </div>
                          )}
                          <div className="text-left">
                            <div className="text-lg">
                              {isConnecting
                                ? "Connecting..."
                                : "Connect MetaMask"}
                            </div>
                            <div className="text-orange-100 text-xs font-normal">
                              Secure wallet connection
                            </div>
                          </div>
                        </div>

                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-yellow-400 opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-300"></div>
                      </button>

                      {/* Status Message */}
                      {status && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center mt-4">
                          <div className="text-red-600 font-semibold text-sm">
                            {status}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Middle Column - Features */}
                <div className="lg:col-span-1">
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                        System Features
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Powerful tools for certificate management
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-700">
                      <div className="text-center">
                        <div className="text-3xl mb-3">🛡️</div>
                        <h4 className="font-bold text-green-800 dark:text-green-400 mb-2">
                          Secure Access
                        </h4>
                        <p className="text-green-600 dark:text-green-300 text-sm">
                          Blockchain-verified authentication with role-based
                          permissions
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-blue-200 dark:border-blue-700">
                      <div className="text-center">
                        <div className="text-3xl mb-3">📜</div>
                        <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-2">
                          Certificate Management
                        </h4>
                        <p className="text-blue-600 dark:text-blue-300 text-sm">
                          Issue, verify, and manage NFT-based academic
                          certificates
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-purple-200 dark:border-purple-700">
                      <div className="text-center">
                        <div className="text-3xl mb-3">👑</div>
                        <h4 className="font-bold text-purple-800 dark:text-purple-400 mb-2">
                          Role-Based Access
                        </h4>
                        <p className="text-purple-600 dark:text-purple-300 text-sm">
                          Admin and minter roles with appropriate system
                          privileges
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Access Types & Info */}
                <div className="lg:col-span-1">
                  <div className="space-y-6">
                    {/* Access Types */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                        Access Levels
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-200 dark:border-gray-700">
                          <div className="text-center">
                            <div className="text-4xl mb-3">🔑</div>
                            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                              Admin Access
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Full system control: certificate issuance,
                              burning, and minter management
                            </p>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-200 dark:border-gray-700">
                          <div className="text-center">
                            <div className="text-4xl mb-3">👨‍💼</div>
                            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                              Minter Access
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Certificate issuance and burning for authorized
                              staff members
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Important Info */}
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-5 border border-gray-200 dark:border-gray-600">
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                        <span>ℹ️</span>
                        Requirements
                      </h4>
                      <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>MetaMask browser extension required</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>Admin or minter wallet permissions needed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>All operations are blockchain-recorded</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Show main dashboard if connected */
          <div className="flex">
            {/* Sidebar - Only show if user has access */}
            {(isAdmin || isCurrentMinter) && (
              <Sidebar
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                isAdmin={isAdmin}
                isCurrentMinter={isCurrentMinter}
              />
            )}

            {/* Main Content */}
            <div className="flex-1 lg:ml-0">
              {/* Access Denied - Show if connected but no access */}
              {!isAdmin && !isCurrentMinter && (
                <div className="p-8">
                  <div className="max-w-2xl mx-auto">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-8">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🚫</div>
                        <h3 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-4">
                          Access Denied
                        </h3>
                        <p className="text-red-600 dark:text-red-400 mb-4">
                          This wallet does not have permission to access admin
                          functions.
                        </p>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-red-200 dark:border-red-600">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Connected Wallet:</strong>
                            <br />
                            <span className="font-mono">{account}</span>
                          </p>
                        </div>
                        <p className="text-red-600 dark:text-red-400 text-sm mt-4">
                          Contact an administrator to get minter access.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Page Content - Only show if user has access */}
              {(isAdmin || isCurrentMinter) && renderCurrentPage()}
            </div>
          </div>
        )}
      </div>

      {/* Footer - Always visible */}
      <Footer />
    </div>
  );
}
