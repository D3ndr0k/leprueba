import React from "react";
import { Route, Routes } from "react-router-dom";
import ApplyWholesaler from "./pages/ApplyWholesaler.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import PublicRoutes from "./PublicRoutes.jsx";
import HomeUser from "./pages/HomeUser.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Thanks from "./pages/Thanks.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import ForgotPass from "./pages/ForgotPass.jsx";
import UpPass from "./pages/UpPass.jsx";
import CutBase from "./pages/CutBase.jsx";
import Piece from "./pages/Piece.jsx";
import Shape from "./pages/Shapes.jsx";
import Natural from "./pages/Natural.jsx";
import Specimen from "./pages/Specimen.jsx";
import BigPieces from "./pages/BigPieces.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomeUser />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cutbase" element={<CutBase />} />
          <Route path="/pieces" element={<Piece />} />
          <Route path="/specimen" element={<Specimen />} />
          <Route path="/natural" element={<Natural />} />
          <Route path="/bigpieces" element={<BigPieces />} />
          <Route path="/shapes" element={<Shape />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/resetpass/:id/:token" element={<UpPass />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/apply" element={<ApplyWholesaler />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
