import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const StressRelief = () => {
  const navigate = useNavigate();
  
  // Kita buat 48 gelembung (grid 6x8)
  const [bubbles, setBubbles] = useState(Array(48).fill(false));
  const [score, setScore] = useState(0);

  // Fungsi saat gelembung dipencet
  const popBubble = (index) => {
    if (bubbles[index]) return; // Kalau sudah pecah, abaikan

    const newBubbles = [...bubbles];
    newBubbles[index] = true; // Tandai pecah
    setBubbles(newBubbles);
    setScore(prev => prev + 1);

    // Fitur PWA: Haptic Feedback (Getar di HP)
    if (navigator.vibrate) {
      navigator.vibrate(50); // Getar 50ms
    }
  };

  const resetGame = () => {
    setBubbles(Array(48).fill(false));
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm text-gray-600">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Stress Relief</h1>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Score Card */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-400 uppercase font-bold">Popped</p>
          <p className="text-2xl font-bold text-primary">{score} / 48</p>
        </div>
        <button 
          onClick={resetGame}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition"
        >
          <ArrowPathIcon className="h-4 w-4" /> Reset
        </button>
      </div>

      {/* Grid Bubble Wrap */}
      <div className="grid grid-cols-6 gap-3 mx-auto max-w-sm">
        {bubbles.map((isPopped, index) => (
          <button
            key={index}
            onClick={() => popBubble(index)}
            className={`
              aspect-square rounded-full shadow-inner transition-all duration-200 transform
              ${isPopped 
                ? 'bg-blue-200 scale-90 ring-0' // Style saat pecah
                : 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg hover:scale-105 active:scale-95' // Style gelembung utuh
              }
            `}
          >
            {/* Efek kilauan pada gelembung */}
            {!isPopped && (
              <div className="w-1/3 h-1/3 bg-white opacity-40 rounded-full ml-1 mt-1"></div>
            )}
          </button>
        ))}
      </div>

      <p className="text-center text-gray-400 text-sm mt-8 animate-pulse">
        Tap bubbles to pop!
      </p>
    </div>
  );
};

export default StressRelief;