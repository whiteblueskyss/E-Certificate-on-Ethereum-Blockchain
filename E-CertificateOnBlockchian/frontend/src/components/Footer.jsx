export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-gray-900 dark:via-gray-950 dark:to-black text-white py-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Card */}
        <div className="mt-1 mb-5 bg-gradient-to-r from-white/10 to-white/5 dark:from-gray-800/50 dark:to-gray-700/30 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-gray-600/30">
          <div className="text-center">
            <p className="text-white text-lg font-semibold mb-2">
              🌟 Revolutionary Blockchain-Based Academic Certificate Issuence
              and Verification System.
            </p>
            <p className="text-blue-200 dark:text-gray-300 text-sm leading-relaxed">
              Ensuring authenticity, preventing fraud, and providing
              tamper-proof verification through cutting-edge unique NFT
              technology and smart contract innovation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-xl">⚡</span>
                <span className="text-white font-medium">
                  Instant Verification
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-xl">🔒</span>
                <span className="text-white font-medium">
                  Tamper-Proof Security
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-xl">🌐</span>
                <span className="text-white font-medium">
                  Global Accessibility
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* University Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="text-4xl">🏛️</div>
              <div>
                <h3 className="text-xl font-bold text-white">SUST</h3>
                <p className="text-gray-300 dark:text-gray-400 text-sm">
                  E-Certificate System
                </p>
              </div>
            </div>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed">
              {/* Shahjalal University of Science and Technology's blockchain-based
              certificate management system ensures secure, verifiable, and
              tamper-proof academic credentials. */}
              This system utilizes blockchain technology to ensure the
              authenticity and integrity of academic certificates by providing
              permanent verification and preventing fraud.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <div className="space-y-2">
              <a
                href="/admin"
                className="block text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors duration-200 text-sm"
              >
                🔐 Admin Portal
              </a>
              <a
                href="/student"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                🎓 Student Portal
              </a>
              <a
                href="/verify"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                ✅ Verify Certificate
              </a>
            </div>
          </div>

          {/* Contact & Technology */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-white mb-4">
              Technology
            </h4>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-center md:justify-end gap-2">
                <span className="text-2xl">⚡</span>
                <span className="text-gray-300 text-sm">
                  Blockchain Powered
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <span className="text-2xl">🛡️</span>
                <span className="text-gray-300 text-sm">NFT Certificates</span>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <span className="text-2xl">🔒</span>
                <span className="text-gray-300 text-sm">Tamper Proof</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-blue-900/20 to-purple-1000/20 rounded-lg p-4 border border-gray-700">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-300 text-xs">
              © 2025{" "}
              <span className="font-italic text-white">
                Shahjalal University of Science and Technology
              </span>
            </p>
            <p className="text-gray-400 text-xs mt-1">All rights reserved.</p>
          </div>

          {/* Social Links / Additional Info */}
          <div className="flex items-center gap-4 ">
            <div className="text-center">
              <p className="text-gray-400 text-xs">Powered by</p>
              <div className="flex items-center gap-2">
                <span className="text-lg">🦊</span>
                <span className="text-gray-300 text-sm font-medium">
                  MetaMask
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs">Built on</p>
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <span className="text-gray-300 text-sm font-medium">
                  Ethereum
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
