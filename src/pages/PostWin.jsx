import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const categories = [
  { name: 'Pekerjaan', color: 'bg-blue-500' },
  { name: 'Belajar', color: 'bg-emerald-500' },
  { name: 'Kesehatan', color: 'bg-rose-500' },
  { name: 'Pribadi', color: 'bg-violet-500' },
];

const PostWin = () => {
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'wins'), {
        message,
        category: selectedCategory.name,
        timestamp: serverTimestamp(),
      });
      navigate('/');
    } catch (error) {
      alert("Error: " + error.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto pt-6 px-4 h-screen bg-white">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Win Baru</h2>
      
      <form onSubmit={handleSubmit} className="relative h-full">
        {/* Input Area yang Luas */}
        <div className="mb-6">
          <textarea
            className="w-full text-xl text-gray-700 placeholder-gray-300 border-none focus:ring-0 resize-none h-40 p-0 leading-relaxed"
            placeholder="Ceritakan kemenangan kecilmu..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoFocus
          ></textarea>
        </div>

        {/* Pilihan Kategori (Chip Style) */}
        <div className="mb-8">
          <p className="text-sm text-gray-400 font-medium mb-3 uppercase tracking-wide">Kategori</p>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 border ${
                  selectedCategory.name === cat.name
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg transform scale-105'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Action Button (FAB) untuk Submit */}
        <div className="fixed bottom-24 right-6">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl shadow-xl hover:bg-blue-600 hover:shadow-2xl transition-all duration-300 disabled:opacity-70 disabled:scale-95"
          >
            {submitting ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <PaperAirplaneIcon className="h-7 w-7 transform -rotate-45 translate-x-1 -translate-y-1" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostWin;