import { useState } from "react";

export default function Sidebar({
  currentPage,
  onPageChange,
  isAdmin,
  isCurrentMinter,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: "issue",
      label: "Issue Certificate",
      icon: "📜",
      description: "Create new certificates",
      available: true,
    },
    {
      id: "burn",
      label: "Burn Certificate",
      icon: "🔥",
      description: "Remove certificates",
      available: true,
    },
    {
      id: "minter",
      label: "Minter Management",
      icon: "👑",
      description: "Manage minter permissions",
      available: isAdmin,
    },
  ];

  const availableItems = menuItems.filter((item) => item.available);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200"
      >
        <span className="text-xl">{isCollapsed ? "☰" : "✕"}</span>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 ${
          isCollapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0"
        } lg:relative lg:transform-none`}
      >
        {/* Sidebar Header with gap and rounded corners */}
        <div className="p-4">
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {isAdmin ? "🔑 Admin Panel" : "👨‍💼 Minter Panel"}
                </h2>
                <p className="text-indigo-100 dark:text-indigo-200 text-sm mt-1">
                  {isAdmin ? "Full Access" : "Certificate Management"}
                </p>
              </div>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="lg:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                <span className="text-white">✕</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 pb-6">
          <div className="space-y-3">
            {availableItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setIsCollapsed(true); // Close mobile menu after selection
                }}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                  currentPage === item.id
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold">{item.label}</div>
                    <div
                      className={`text-sm ${
                        currentPage === item.id
                          ? "text-indigo-100"
                          : "text-gray-500"
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-lg">
            <div className="text-center">
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                  isAdmin
                    ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700"
                    : isCurrentMinter
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                }`}
              >
                {isAdmin
                  ? "👑 Admin Access"
                  : isCurrentMinter
                  ? "👨‍💼 Minter Access"
                  : "❌ No Access"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}
