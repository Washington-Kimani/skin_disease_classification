import { Routes, Route } from "react-router-dom";

// pages
import Home from "../pages/Home";
import ImageClassifier from "../pages/ImageClassifier";

// components
import Navbar from "../components/Navbar";


function MainApp() {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<ImageClassifier />} />
      </Routes>
    </div>
  );
}

export default MainApp