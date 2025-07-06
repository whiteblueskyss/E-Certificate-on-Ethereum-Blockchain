export default function BlockchainLoader({
  message = "Processing transaction...",
  isVisible = false,
}) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
        <div className="text-center">
          {/* Animated Blockchain */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Main rotating ring */}
              <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin">
                <div className="absolute top-0 left-0 w-full h-full border-t-4 border-blue-600 rounded-full animate-pulse"></div>
              </div>

              {/* Inner Ethereum symbol */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600 animate-pulse">
                  Ξ
                </span>
              </div>

              {/* Orbiting dots */}
              <div className="absolute -inset-4">
                <div
                  className="relative w-full h-full animate-spin"
                  style={{ animationDuration: "3s" }}
                >
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-500 rounded-full transform -translate-x-1/2 animate-ping"></div>
                  <div
                    className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-500 rounded-full transform -translate-x-1/2 animate-ping"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute left-0 top-1/2 w-2 h-2 bg-yellow-500 rounded-full transform -translate-y-1/2 animate-ping"
                    style={{ animationDelay: "2s" }}
                  ></div>
                  <div
                    className="absolute right-0 top-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-y-1/2 animate-ping"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Blockchain Transaction
          </h3>
          <p className="text-gray-600 mb-4">{message}</p>

          {/* Transaction Steps */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-2">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Validating transaction
              </span>
              <span className="text-blue-600">⏳</span>
            </div>
            <div className="flex items-center justify-between bg-emerald-50 rounded-lg p-2">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Mining block
              </span>
              <span className="text-emerald-600">⛏️</span>
            </div>
            <div className="flex items-center justify-between bg-purple-50 rounded-lg p-2">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                Confirming on network
              </span>
              <span className="text-purple-600">🌐</span>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-200">
            <p className="text-xs text-gray-600">
              💡 <strong>Tip:</strong> This transaction is being processed on
              the Ethereum blockchain. Please wait for confirmation and do not
              close this window.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
