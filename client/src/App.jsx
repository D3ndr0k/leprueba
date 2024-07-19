import "./App.css";
import { Route, Routes } from "react-router-dom";
import ApplyWholesaler from "./pages/ApplyWholesaler.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import PublicRoutes from "./PublicRoutes.jsx";
import HomeUser from "./pages/HomeUser.jsx";
import AboutUs from "./pages/AboutUs.jsx";

function App() {
  const loading = useAuth();

  if (loading) {
    return (
      <div className="center">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<HomeUser />} />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/apply" element={<ApplyWholesaler />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
