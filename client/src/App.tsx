import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavComponent from "./components/Nav/NavComponent";
import LandingPage from "./pages/LandingPage";
import Articles from "./pages/Articles";
import { ProtectedRoute } from "./components/routes/ProtectedRoutes";
import ArticlesPlan from "./pages/ArticlesPlan";

function App() {
  return (
    <Router>
      <NavComponent />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles />} />
        </Route>
        <Route path="/article-plans" element={<ProtectedRoute />}>
          <Route path="/article-plans" element={<ArticlesPlan />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
