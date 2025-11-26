import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
// Import icon tambahan untuk banner game
import { SparklesIcon } from '@heroicons/react/24/solid';

// Warna kategori yang lebih "Google Style" (Pastel)
const getCategoryStyle = (category) => {
  switch(category) {
    case 'Pekerjaan': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Belajar': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Kesehatan': return 'bg-rose-100 text-rose-700 border-rose-200';
    default: return 'bg-violet-100 text-violet-700 border-violet-200';
  }
};

const Home = () => {
  const [wins, setWins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWins = async () => {
      const q = query(collection(db, 'wins'), orderBy('timestamp', 'desc'), limit(20));
      const querySnapshot = await getDocs(q);
      setWins(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchWins();
  }, []);

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto">
      {/* Header dengan Avatar sederhana */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hello, Champ! 👋</h1>
          <p className="text-gray-500 text-sm">Rayakan hal kecil hari ini.</p>
        </div>
        <div className="h-10 w-10 bg-gradient-to-tr from-primary to-purple-500 rounded-full shadow-lg border-2 border-white"></div>
      </div>

      {/* --- BANNER GAME STRESS RELIEF --- */}
      {/* Tombol besar yang menarik perhatian untuk membuka game */}
      <Link to="/play" className="block mb-8 relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-5 shadow-lg text-white group transform transition-all hover:scale-[1.02] active:scale-95">
        {/* Hiasan background abstrak */}
        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">Butuh Istirahat?</h3>
            <p className="text-indigo-100 text-sm">Mainkan bubble wrap virtual sejenak.</p>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-inner">
            <SparklesIcon className="h-6 w-6 text-yellow-300 animate-pulse" />
          </div>
        </div>
      </Link>
      {/* --------------------------------- */}

      {loading ? (
        <div className="flex justify-center pt-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 px-1">Terbaru</h2>
          {wins.map((win) => (
            <Link 
              to={`/win/${win.id}`} 
              key={win.id} 
              className="group block bg-white p-5 rounded-3xl shadow-soft hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-gray-100"
            >
              {/* Badge Kategori */}
              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryStyle(win.category)}`}>
                  {win.category}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {win.timestamp ? formatDistanceToNow(win.timestamp.toDate(), { addSuffix: true, locale: id }) : 'Baru saja'}
                </span>
              </div>
              
              {/* Pesan Utama */}
              <p className="text-gray-800 text-lg font-medium leading-relaxed line-clamp-3 group-hover:text-primary transition-colors">
                "{win.message}"
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;