import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  doc, 
  getDoc, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { 
  ArrowLeftIcon, 
  PaperAirplaneIcon, 
  ChatBubbleLeftRightIcon,
  UserCircleIcon
} from '@heroicons/react/24/solid';
import { formatDistanceToNow } from 'date-fns';
import { id as indoLocale } from 'date-fns/locale';

const WinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State untuk Data Utama
  const [win, setWin] = useState(null);
  const [loading, setLoading] = useState(true);

  // State untuk Komentar
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSending, setIsSending] = useState(false);

  // 1. Fetch Data Win (Sekali saja)
  useEffect(() => {
    const fetchWin = async () => {
      try {
        const docRef = doc(db, 'wins', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWin(docSnap.data());
        }
      } catch (error) {
        console.error("Err:", error);
      }
      setLoading(false);
    };
    fetchWin();
  }, [id]);

  // 2. Fetch Komentar secara REAL-TIME (Live Update)
  useEffect(() => {
    // Kita subscribe ke sub-collection 'comments' di dalam dokumen win ini
    const commentsRef = collection(db, 'wins', id, 'comments');
    const q = query(commentsRef, orderBy('timestamp', 'asc')); // Urutkan dari yang terlama

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(commentsData);
    });

    return () => unsubscribe(); // Bersihkan listener saat keluar halaman
  }, [id]);

  // Fungsi Kirim Komentar
  const handleSendComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSending(true);
    try {
      // Masukkan ke sub-collection
      await addDoc(collection(db, 'wins', id, 'comments'), {
        text: newComment,
        timestamp: serverTimestamp(),
        // Kita kasih avatar random biar berwarna
        avatarColor: ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500'][Math.floor(Math.random() * 5)]
      });
      setNewComment(""); // Kosongkan input
    } catch (error) {
      alert("Gagal kirim komentar");
    }
    setIsSending(false);
  };

  if (loading) return <div className="text-center mt-20">Memuat...</div>;
  if (!win) return <div className="text-center mt-20">Data tidak ditemukan 😔</div>;

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen bg-white">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-700">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      </div>

      {/* --- KONTEN UTAMA (Win Card) --- */}
      <div className={`p-8 rounded-3xl shadow-lg border border-gray-100 bg-white relative overflow-hidden mb-8`}>
        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50`}></div>
        
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-gray-100 text-gray-500 mb-4">
          {win.category}
        </span>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-6">
          "{win.message}"
        </h1>
        
        <div className="flex items-center pt-6 border-t border-gray-100">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xs font-bold text-white mr-3">
            ?
          </div>
          <div className="text-sm">
            <p className="font-semibold text-gray-900">Anonymous</p>
            <p className="text-gray-400">
                {win.timestamp ? formatDistanceToNow(win.timestamp.toDate(), { addSuffix: true, locale: indoLocale }) : 'Baru saja'}
            </p>
          </div>
        </div>
      </div>

      {/* --- BAGIAN KOMENTAR --- */}
      <div className="mb-24"> {/* Tambah margin bottom agar konten paling bawah tidak tertutup input */}
        <h3 className="flex items-center text-lg font-bold text-gray-800 mb-4">
          <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 text-primary"/>
          Komentar ({comments.length})
        </h3>

        {/* List Komentar */}
        <div className="space-y-4 mb-6">
            {comments.length === 0 && (
                <p className="text-gray-400 text-sm italic text-center py-4 bg-gray-50 rounded-xl">
                    Belum ada komentar. Jadilah yang pertama!
                </p>
            )}
            
            {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                    {/* Avatar Random */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full ${comment.avatarColor || 'bg-gray-400'} flex items-center justify-center text-white text-xs`}>
                        <UserCircleIcon className="w-6 h-6 text-white/80"/>
                    </div>
                    {/* Bubble Chat */}
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2 max-w-[85%]">
                        <p className="text-gray-800 text-sm">{comment.text}</p>
                        <p className="text-[10px] text-gray-400 mt-1 text-right">
                            {comment.timestamp ? formatDistanceToNow(comment.timestamp.toDate(), { locale: indoLocale }) : '...'}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* --- INPUT KOMENTAR (Sticky di Bawah) --- */}
      {/* PERBAIKAN: z-[60] agar di atas Bottom Nav (yang biasanya z-50) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-safe-area z-[60]">
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSendComment} className="flex items-center gap-2">
                <input 
                    type="text" 
                    placeholder="Tulis dukungan..." 
                    className="flex-1 bg-gray-100 border-none rounded-full px-4 py-3 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button 
                    type="submit" 
                    disabled={isSending || !newComment.trim()}
                    className="p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark disabled:opacity-50 disabled:scale-95 transition-all"
                >
                    <PaperAirplaneIcon className="w-5 h-5" />
                </button>
            </form>
        </div>
      </div>

    </div>
  );
};

export default WinDetail;