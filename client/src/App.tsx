import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavComponent from "./components/Nav/NavComponent";
import LandingPage from "./pages/LandingPage";
import Articles from "./pages/Articles";
import { ProtectedRoute } from "./components/routes/ProtectedRoutes";

function App() {
  return (
    <Router>
      <NavComponent />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
