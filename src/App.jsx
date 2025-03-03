import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProjectsPage from "./components/ProjectsPage";
// import HomePage from "./components/HomePage";
// import HomePageFinal from "./components/HomePageFinal";
import About from "./components/About";
import HomeSection from "./components/HomeSection";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeSection/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
