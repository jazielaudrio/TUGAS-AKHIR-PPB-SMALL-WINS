import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, BookOpenIcon, HeartIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const categories = [
  { 
    id: 'Pekerjaan', 
    name: 'Pekerjaan', 
    desc: 'Karir & Profesional', 
    icon: <BriefcaseIcon className="w-8 h-8 text-blue-600" />, 
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    textColor: 'text-blue-800'
  },
  { 
    id: 'Belajar', 
    name: 'Belajar', 
    desc: 'Akademik & Skill', 
    icon: <BookOpenIcon className="w-8 h-8 text-emerald-600" />, 
    color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
    textColor: 'text-emerald-800'
  },
  { 
    id: 'Kesehatan', 
    name: 'Kesehatan', 
    desc: 'Fisik & Mental', 
    icon: <HeartIcon className="w-8 h-8 text-rose-600" />, 
    color: 'bg-rose-50 hover:bg-rose-100 border-rose-200',
    textColor: 'text-rose-800'
  },
  { 
    id: 'Pribadi', 
    name: 'Pribadi', 
    desc: 'Hobi & Diri Sendiri', 
    icon: <UserIcon className="w-8 h-8 text-violet-600" />, 
    color: 'bg-violet-50 hover:bg-violet-100 border-violet-200',
    textColor: 'text-violet-800'
  },
];

const Categories = () => {
  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Eksplorasi Kategori</h1>
      <p className="text-gray-500 mb-8">Temukan inspirasi kemenangan dari berbagai bidang.</p>

      <div className="grid gap-4">
        {categories.map((cat) => (
          <Link 
            to={`/categories/${cat.id}`} 
            key={cat.id}
            className={`group flex items-center p-5 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md ${cat.color}`}
          >
            <div className="bg-white p-3 rounded-xl shadow-sm mr-5 group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>
            <div className="flex-1">
              <h3 className={`font-bold text-lg ${cat.textColor}`}>{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.desc}</p>
            </div>
            <ArrowRightIcon className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 ${cat.textColor}`} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;