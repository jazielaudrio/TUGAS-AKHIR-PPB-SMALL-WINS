import React, { useEffect, useState, useRef } from 'react'; // 1. Tambah useRef
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, format, isSameDay, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { SparklesIcon, CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/solid';

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
  const [filterDate, setFilterDate] = useState('');
  
  // 2. Buat referensi ke input tanggal
  const dateInputRef = useRef(null);

  useEffect(() => {
    const fetchWins = async () => {
      const q = query(collection(db, 'wins'), orderBy('timestamp', 'desc'), limit(50));
      const querySnapshot = await getDocs(q);
      setWins(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchWins();
  }, []);

  const displayedWins = wins.filter((win) => {
    if (!filterDate) return true;
    if (!win.timestamp) return false;
    return isSameDay(win.timestamp.toDate(), parseISO(filterDate));
  });

  // 3. Fungsi "Cerdas" untuk membuka Date Picker
  const handleOpenPicker = () => {
    try {
      // Cara Modern: showPicker() (Support Chrome, Android, iOS 16+)
      if (dateInputRef.current && dateInputRef.current.showPicker) {
        dateInputRef.current.showPicker();
      } else {
        // Fallback untuk browser lama (fokus ke input)
        dateInputRef.current.focus();
        dateInputRef.current.click();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hello, Champ! 👋</h1>
          <p className="text-gray-500 text-sm">Rayakan hal kecil hari ini.</p>
        </div>
        
        {/* --- UI FILTER TANGGAL (SMART VERSION) --- */}
        <div className="flex items-center gap-2">
          
          {/* 1. Input Date Tersembunyi (Invisible tapi ada di DOM) */}
          <input 
            ref={dateInputRef} // Sambungkan ke Ref
            type="date" 
            className="absolute w-0 h-0 opacity-0 overflow-hidden" // Sembunyikan total
            onChange={(e) => setFilterDate(e.target.value)}
            value={filterDate}
          />

          {/* 2. Tombol Visual (Trigger) */}
          {/* Kita pakai button onClick untuk memanggil fungsi openPicker */}
          <button 
            onClick={handleOpenPicker}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-2xl shadow-sm border transition-all duration-200
              active:scale-95 touch-manipulation hover:bg-gray-50
              ${filterDate ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-100 text-gray-600'}
            `}
          >
            <CalendarDaysIcon className={`h-5 w-5 ${filterDate ? 'text-blue-500' : 'text-gray-400'}`} />
            <span className="text-sm font-bold whitespace-nowrap">
              {filterDate 
                ? format(parseISO(filterDate), 'dd MMM', { locale: id }) 
                : 'Semua'
              }
            </span>
          </button>

          {/* 3. Tombol Reset (Hanya muncul jika ada filter) */}
          {filterDate && (
            <button 
              onClick={() => setFilterDate('')}
              className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>
        {/* ------------------------------------------- */}
      </div>

      <Link to="/play" className="block mb-8 relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-5 shadow-lg text-white group transform transition-all hover:scale-[1.02] active:scale-95">
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

      {loading ? (
        <div className="flex justify-center pt-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <h2 className="text-lg font-bold text-gray-800">
              {filterDate ? 'Hasil Filter' : 'Terbaru'}
            </h2>
            <span className="text-xs text-gray-400 font-medium">
              {displayedWins.length} win{displayedWins.length !== 1 ? 's' : ''}
            </span>
          </div>

          {displayedWins.length === 0 ? (
            <div className="text-center py-10 opacity-60">
              <p className="text-4xl mb-2">📅</p>
              <p className="text-gray-500 text-sm">Tidak ada win di tanggal ini.</p>
              <button onClick={() => setFilterDate('')} className="mt-2 text-primary text-xs font-bold underline cursor-pointer">
                Lihat Semua
              </button>
            </div>
          ) : (
            displayedWins.map((win) => (
              <Link 
                to={`/win/${win.id}`} 
                key={win.id} 
                className="group block bg-white p-5 rounded-3xl shadow-soft hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryStyle(win.category)}`}>
                    {win.category}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {win.timestamp ? formatDistanceToNow(win.timestamp.toDate(), { addSuffix: true, locale: id }) : 'Baru saja'}
                  </span>
                </div>
                <p className="text-gray-800 text-lg font-medium leading-relaxed line-clamp-3 group-hover:text-primary transition-colors">
                  "{win.message}"
                </p>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;