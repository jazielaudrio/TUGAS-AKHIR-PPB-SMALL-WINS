import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WinDetail from './pages/WinDetail';
import PostWin from './pages/PostWin';
import About from './pages/About';
import StressRelief from './pages/StressRelief'; // <--- 1. Import Halaman Game

// Placeholder Kategori
const CategoriesPlaceholder = () => (
  <div className="text-center mt-10 px-4">
    <h2 className="text-xl font-bold text-gray-800">Kategori</h2>
    <p className="text-gray-500">Fitur filter kategori akan segera hadir.</p>
  </div>
);

function App() {
  return (
    <Routes>
      {/* GROUP 1: Halaman yang memakai Layout (Header & Bottom Nav) */}
      <Route path="/" element={<Layout />}>
        
        {/* Halaman Utama */}
        <Route index element={<Home />} />
        
        {/* Halaman Detail */}
        <Route path="win/:id" element={<WinDetail />} />
        
        {/* Halaman Kategori */}
        <Route path="categories" element={<CategoriesPlaceholder />} />
        
        {/* Halaman Posting */}
        <Route path="post" element={<PostWin />} />
        
        {/* Halaman About */}
        <Route path="about" element={<About />} />
        
      </Route>

      {/* GROUP 2: Halaman Fullscreen (Tanpa Layout/Navigasi) */}
      {/* Ini agar game terasa lebih immersive */}
      <Route path="/play" element={<StressRelief />} />

    </Routes>
  );
}

export default App;