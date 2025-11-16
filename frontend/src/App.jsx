import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Layouts
import DashboardLayout from "./layout/DashboardLayout";

// Components
import PrivateRoute from "./components/PrivateRoute";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import FraudDetection from "./pages/FraudDetection";
import DiagnosticAnalysis from "./pages/DiagnosticAnalysis";
import LegalAnalysis from "./pages/LegalAnalysis";
import ActivityPage from "./pages/ActivityPage";

// Public Pages
import Home from "./pages/LandingPage";
import About from "./pages/Aboutus";

import Contact from "./pages/Contact.jsx";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import DetectionService from "./pages/services/DetectionService";
import Services from "./pages/Services/Services";
import LegalService from "./pages/services/LegalService";
import DiagnosticService from "./pages/services/DiagnosticService";

// Service Detail Pages

function App() {
  return (
    <>
      <Routes>
        {/* Landing & Auth */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Public Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* Service Detail Pages */}
        <Route
          path="/services/fraud-detection"
          element={<DetectionService />}
        />
        <Route
          path="/services/diagnostic-service"
          element={<DiagnosticService />}
        />
        <Route path="/services/legal-service" element={<LegalService />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="fraud" element={<FraudDetection />} />
            <Route path="diagnostic" element={<DiagnosticAnalysis />} />
            <Route path="legal" element={<LegalAnalysis />} />
            <Route path="activities" element={<ActivityPage />} />
          </Route>

          {/* Default fallback inside dashboard */}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Route>
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
