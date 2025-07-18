import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import { DarkModeProvider } from "./components/DarkModeContext";
import StudentPage from "./components/StudentPage";
import VerifyPage from "./components/VerifyPage";
import { ToastProvider } from "./hooks/useToast";

export default function App() {
  return (
    <DarkModeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
          <Router>
            <Routes>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/student" element={<StudentPage />} />
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </Router>
        </div>
      </ToastProvider>
    </DarkModeProvider>
  );
}
