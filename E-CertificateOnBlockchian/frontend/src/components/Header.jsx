import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* University Logo and Name */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src="/SUST.png"
                alt="SUST Logo"
                className="h-16 w-16 rounded-full border-2 border-white/30 shadow-lg bg-white/10 p-1"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Shahjalal University of Science and Technology
              </h1>
              <p className="text-blue-200 dark:text-gray-300 text-sm md:text-base font-medium">
                Leading Innovation in Education & Technology
              </p>
            </div>
          </div>

          {/* Dark Mode Toggle and Project Badge */}
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 px-6 py-3 rounded-2xl shadow-lg border border-emerald-400/30">
                <div className="text-center">
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <span className="text-2xl">🛡️</span>
                    <span>E-Certificate</span>
                  </div>
                  <p className="text-emerald-100 text-xs mt-1">
                    Blockchain Verified Credentials
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 dark:from-emerald-600 dark:via-blue-600 dark:to-purple-600"></div>
    </header>
  );
}
