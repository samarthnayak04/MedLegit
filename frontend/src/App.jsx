import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import FraudDetection from "./pages/FraudDetection";
import DiagnosticAnalysis from "./pages/DiagnosticAnalysis";
import LegalAnalysis from "./pages/LegalAnalysis";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Home from "./pages/LandingPage";
import Signup from "./pages/Signup";
import SigninPage from "./pages/signin";
import About from "./pages/Aboutus";
import Services from "./pages/services";
import Contact from "./pages/contact";

function App() {
  return (
    <Routes>
      {/*landing page */}
      <Route path="/" element={<Home/>}></Route>
       <Route path="/signup" element={<Signup />} />
       <Route path="/signin" element={<SigninPage/>} />

   {/* Public pages */}
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
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
