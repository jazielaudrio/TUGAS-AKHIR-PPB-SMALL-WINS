import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout = () => {
  return (
    <div className="min-h-screen pb-20"> {/* Padding bottom agar konten tidak tertutup nav */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center text-primary">Small Wins Board</h1>
      </header>
      <main className="p-4 max-w-md mx-auto">
        <Outlet /> {/* Tempat halaman dirender */}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;