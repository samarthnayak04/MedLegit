import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import FraudDetection from "./pages/FraudDetection";
import DiagnosticAnalysis from "./pages/DiagnosticAnalysis";
import LegalAnalysis from "./pages/LegalAnalysis";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="fraud" element={<FraudDetection />} />
        <Route path="diagnostic" element={<DiagnosticAnalysis />} />
        <Route path="legal" element={<LegalAnalysis />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
