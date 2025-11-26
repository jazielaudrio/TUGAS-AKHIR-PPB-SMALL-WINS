import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ListBulletIcon, PlusCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid'; // Gunakan icon Solid agar lebih tegas

const BottomNav = () => {
  const navItems = [
    { path: '/', icon: <HomeIcon className="h-6 w-6" />, label: 'Home' },
    { path: '/categories', icon: <ListBulletIcon className="h-6 w-6" />, label: 'Filters' },
    { path: '/post', icon: <PlusCircleIcon className="h-6 w-6" />, label: 'Post' },
    { path: '/about', icon: <InformationCircleIcon className="h-6 w-6" />, label: 'About' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 pb-safe-area z-50">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full transition-all duration-200 group`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`
                  flex items-center justify-center w-12 h-8 rounded-full mb-1 transition-all duration-300
                  ${isActive ? 'bg-blue-100 text-primary' : 'text-gray-400 group-hover:text-gray-600'}
                `}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;