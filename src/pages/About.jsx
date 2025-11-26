import React from 'react';

const About = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
      <h2 className="text-2xl font-bold text-primary mb-4">Tentang Aplikasi</h2>
      <p className="text-gray-600 mb-4">
        Anonymous Small Wins Board adalah tempat aman untuk merayakan pencapaian-pencapaian kecil dalam hidup sehari-hari tanpa perlu mengungkapkan identitas.
      </p>
      <p className="text-gray-600">
        Dibuat untuk memenuhi tugas akhir. Aplikasi ini menggunakan React, Tailwind CSS, dan Firebase.
      </p>
      <div className="mt-8 text-sm text-gray-400">
        Versi 1.0.0
      </div>
    </div>
  );
};

export default About;