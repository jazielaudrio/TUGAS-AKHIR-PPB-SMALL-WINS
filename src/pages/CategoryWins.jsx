import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { formatDistanceToNow } from 'date-fns';
import { id as indoLocale } from 'date-fns/locale';

const CategoryWins = () => {
  const { categoryName } = useParams(); // Mengambil nama kategori dari URL
  const navigate = useNavigate();
  const [wins, setWins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinsByCategory = async () => {
      setLoading(true);
      try {
        // Kita ambil 50 data terbaru, lalu filter manual di sini agar tidak perlu setting Index di Console Firebase
        const q = query(collection(db, 'wins'), orderBy('timestamp', 'desc'), limit(50));
        const querySnapshot = await getDocs(q);
        
        const allWins = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Filter data sesuai kategori yang dipilih
        const filteredWins = allWins.filter(win => win.category === categoryName);
        
        setWins(filteredWins);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
      setLoading(false);
    };

    fetchWinsByCategory();
  }, [categoryName]);

  // Helper untuk warna (sama seperti di Home)
  const getCategoryTheme = () => {
    switch(categoryName) {
      case 'Pekerjaan': return 'text-blue-600 bg-blue-50';
      case 'Belajar': return 'text-emerald-600 bg-emerald-50';
      case 'Kesehatan': return 'text-rose-600 bg-rose-50';
      default: return 'text-violet-600 bg-violet-50';
    }
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center mb-8 sticky top-0 bg-white/90 backdrop-blur-sm py-2 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 mr-2">
          <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
        <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Kategori</p>
            <h1 className={`text-2xl font-bold ${getCategoryTheme().split(' ')[0]}`}>{categoryName}</h1>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center pt-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
        </div>
      ) : wins.length === 0 ? (
        <div className="text-center pt-20 px-6">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${getCategoryTheme()}`}>
            <span className="text-4xl">📭</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Belum ada data</h3>
          <p className="text-gray-500 mb-6">Jadilah yang pertama merayakan kemenangan di kategori ini!</p>
          <Link to="/post" className="inline-block px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
            Buat Posting
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {wins.map((win) => (
            <Link 
              to={`/win/${win.id}`} 
              key={win.id} 
              className="block p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <p className="text-gray-800 text-lg font-medium mb-3">"{win.message}"</p>
              <div className="flex items-center text-xs text-gray-400">
                <span>{win.timestamp ? formatDistanceToNow(win.timestamp.toDate(), { addSuffix: true, locale: indoLocale }) : 'Baru saja'}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryWins;