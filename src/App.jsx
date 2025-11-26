import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WinDetail from './pages/WinDetail';
import PostWin from './pages/PostWin';
import About from './pages/About';

// Jika kamu belum membuat file Categories, kita pakai placeholder dulu agar tidak error
const CategoriesPlaceholder = () => (
  <div className="text-center mt-10">
    <h2 className="text-xl font-bold">Kategori</h2>
    <p>Fitur filter kategori akan muncul di sini.</p>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Route Induk menggunakan Layout (Header & Bottom Nav) */}
      <Route path="/" element={<Layout />}>
        
        {/* Halaman Utama (List Kemenangan) */}
        <Route index element={<Home />} />
        
        {/* Halaman Detail Kemenangan (Dynamic Route dengan ID) */}
        <Route path="win/:id" element={<WinDetail />} />
        
        {/* Halaman Kategori */}
        <Route path="categories" element={<CategoriesPlaceholder />} />
        
        {/* Halaman Posting Kemenangan */}
        <Route path="post" element={<PostWin />} />
        
        {/* Halaman About */}
        <Route path="about" element={<About />} />
        
      </Route>
    </Routes>
  );
}

export default App;