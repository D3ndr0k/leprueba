import "./App.css";
import { Route, Routes } from "react-router-dom";
import ApplyWholesaler from "./pages/ApplyWholesaler.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />{" "}
        <Route path="/apply" element={<ApplyWholesaler />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
