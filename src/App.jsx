import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProjectsPage from "./components/ProjectsPage";
// import HomePage from "./components/HomePage";
// import HomePageFinal from "./components/HomePageFinal";
import About from "./components/About";
import HomeSection from "./components/HomeSection";
import SkillsPage from "./components/SkillsPage";
import ContactPage from "./components/ContactPage";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeSection/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/skills" element={<SkillsPage/>} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
