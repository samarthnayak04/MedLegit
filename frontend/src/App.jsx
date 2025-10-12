import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import FraudDetection from "./pages/FraudDetection";
import DiagnosticAnalysis from "./pages/DiagnosticAnalysis";
import LegalAnalysis from "./pages/LegalAnalysis";

import Home from "./pages/LandingPage";
import Signup from "./pages/Signup";
import toast, { Toaster } from "react-hot-toast";

import About from "./pages/Aboutus";
import Services from "./pages/services";
import Contact from "./pages/contact";
import Signin from "./pages/Signin";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        {/*landing page */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Public pages */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          {/* Protected pages */}
          <Route element={<PrivateRoute />}>
            <Route path="fraud" element={<FraudDetection />} />
            <Route path="diagnostic" element={<DiagnosticAnalysis />} />
            <Route path="legal" element={<LegalAnalysis />} />
          </Route>
          {/* Default fallback */}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
