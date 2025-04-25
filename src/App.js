import "./App.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About";
import ContactUsForm from "./pages/subComponents/ContactUsForm";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SuperAdmin from "./pages/Dashboard/SuperAdmin";
import SuperAdminLogin from "./pages/Dashboard/SuperAdminLogin";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Check if the current route is "/loginpage", "/dashboard", or "/superadmin"
  const noFooterHeader = 
    location.pathname === "/loginpage" || 
    location.pathname === "/dashboard" || 
    location.pathname === "/superadmin" ||
    location.pathname === "/superadminlogin";

  return (
    <>
      {/* Render Navbar only if it's not the Login, Dashboard, or SuperAdmin page */}
      {!noFooterHeader && <Navbar />} 

      <Routes>
        {/* Define Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactusform" element={<ContactUsForm />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/superadmin" element={<SuperAdmin />} />
        <Route path="/superadminlogin" element={<SuperAdminLogin />} />
      </Routes>

      {/* Render Footer only if it's not the Login, Dashboard, or SuperAdmin page */}
      {!noFooterHeader && <Footer />} 
    </>
  );
}

export default App;
