import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const WinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [win, setWin] = useState(null);

  useEffect(() => {
    const fetchWin = async () => {
      const docRef = doc(db, 'wins', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setWin(docSnap.data());
      }
    };
    fetchWin();
  }, [id]);

  if (!win) return <div className="text-center mt-10">Memuat detail...</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-gray-600">
        <ArrowLeftIcon className="h-5 w-5 mr-1"/> Kembali
      </button>
      <div className={`bg-white p-6 rounded-2xl shadow-lg border-t-4 border-${win.color}-500`}>
         <h1 className="text-2xl font-bold text-gray-800 mb-4">Detail Kemenangan</h1>
         <p className="text-xl italic text-gray-700 mb-6">"{win.message}"</p>
         <div className="mt-4">
            <span className="font-semibold">Kategori:</span> {win.category}
         </div>
         {/* Tambahkan detail lain di sini jika ada */}
      </div>
    </div>
  );
};

export default WinDetail;