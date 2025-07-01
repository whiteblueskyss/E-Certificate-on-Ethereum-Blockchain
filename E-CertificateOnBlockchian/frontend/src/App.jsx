import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminPage from "./components/AdminPage";
import StudentPage from "./components/StudentPage";
import VerifyPage from "./components/VerifyPage";

export default function App() {
  return (
    <Router>
      <div style={{ padding: 30 }}>
        <h1>Blockchain Certificate System</h1>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
