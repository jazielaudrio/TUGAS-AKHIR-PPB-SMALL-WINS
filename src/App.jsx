import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WinDetail from './pages/WinDetail';
import PostWin from './pages/PostWin';
import About from './pages/About';
import StressRelief from './pages/StressRelief';
// Import halaman baru
import Categories from './pages/Categories';
import CategoryWins from './pages/CategoryWins';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        <Route index element={<Home />} />
        <Route path="win/:id" element={<WinDetail />} />
        
        {/* --- UPDATE BAGIAN INI --- */}
        {/* Halaman Menu Kategori Utama */}
        <Route path="categories" element={<Categories />} />
        
        {/* Halaman Hasil Filter Kategori (Dynamic Route) */}
        <Route path="categories/:categoryName" element={<CategoryWins />} />
        {/* ------------------------- */}
        
        <Route path="post" element={<PostWin />} />
        <Route path="about" element={<About />} />
        
      </Route>

      <Route path="/play" element={<StressRelief />} />

    </Routes>
  );
}

export default App;