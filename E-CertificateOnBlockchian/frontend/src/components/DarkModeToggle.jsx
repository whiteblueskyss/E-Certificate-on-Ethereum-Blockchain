import { useDarkMode } from "./DarkModeContext";

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative w-16 h-8 rounded-full p-1 transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25"
          : "bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/25"
      } hover:scale-105 transform`}
      aria-label="Toggle dark mode"
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        <span className="text-sm">{isDark ? "🌙" : "☀️"}</span>
      </div>

      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <span
          className={`text-xs transition-opacity duration-300 ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
        >
          ☀️
        </span>
        <span
          className={`text-xs transition-opacity duration-300 ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
        >
          🌙
        </span>
      </div>
    </button>
  );
}
