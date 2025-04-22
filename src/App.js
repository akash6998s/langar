import "./App.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About";
import ContactUsForm from "./pages/subComponents/ContactUsForm";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Check if the current route is "/loginpage" or "/dashboard"
  const isLoginOrDashboardPage = location.pathname === "/loginpage" || location.pathname === "/dashboard";

  return (
    <>
      {/* Render Navbar only if it's not the Login or Dashboard page */}
      {!isLoginOrDashboardPage && <Navbar />} 

      <Routes>
        {/* Define Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactusform" element={<ContactUsForm />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* Render Footer only if it's not the Login or Dashboard page */}
      {!isLoginOrDashboardPage && <Footer />} 
    </>
  );
}

export default App;
