import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import BlockchainBackground from "./components/BlockchainBackground";
import { DarkModeProvider } from "./components/DarkModeContext";
import StudentPage from "./components/StudentPage";
import VerifyPage from "./components/VerifyPage";
import { ToastProvider } from "./hooks/useToast";

export default function App() {
  return (
    <DarkModeProvider>
      <ToastProvider>
        <div className="relative min-h-screen">
          <BlockchainBackground />
          <div className="relative z-10">
            <Router>
              <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/student" element={<StudentPage />} />
                <Route path="/verify" element={<VerifyPage />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </Router>
          </div>
        </div>
      </ToastProvider>
    </DarkModeProvider>
  );
}
