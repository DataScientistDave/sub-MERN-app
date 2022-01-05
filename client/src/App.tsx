import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavComponent from "./components/Nav/NavComponent";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <NavComponent />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
