import React, { useState, useEffect } from 'react';
import { Flame, BookOpen, Activity, FlaskConical, ClipboardCheck, BookMarked, Sun, Moon } from 'lucide-react';

// Particle Animation Component
const Particle = ({ delay, duration, startX, startY }) => {
  return (
    <div
      className="absolute w-2 h-2 rounded-full opacity-60"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        background: 'radial-gradient(circle, #f97316, #ef4444)',
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
};

// LandingPage Component
const LandingPage = ({ onNavigate, isDark }) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
  }));

  const modules = [
    {
      id: 'theory',
      title: 'Modul Teori',
      description: 'Pelajari konsep dasar termokimia dari sistem hingga Hukum Hess',
      icon: BookOpen,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'enthalpy',
      title: 'Simulasi Entalpi',
      description: 'Visualisasi reaksi eksoterm dan endoterm secara interaktif',
      icon: Activity,
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 'hess',
      title: 'Simulasi Hukum Hess',
      description: 'Praktikkan perhitungan entalpi dengan Hukum Hess',
      icon: Flame,
      color: 'from-orange-600 to-red-600',
    },
    {
      id: 'lab',
      title: 'Lab Virtual',
      description: 'Eksperimen kalorimetri virtual dengan berbagai reaksi',
      icon: FlaskConical,
      color: 'from-red-600 to-orange-500',
    },
    {
      id: 'assessment',
      title: 'Assessment',
      description: 'Uji pemahaman dengan berbagai tipe soal interaktif',
      icon: ClipboardCheck,
      color: 'from-pink-500 to-red-500',
    },
    {
      id: 'reference',
      title: 'Referensi',
      description: 'Sumber belajar dan data termokimia lengkap',
      icon: BookMarked,
      color: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-orange-900/20 via-red-900/20 to-pink-900/20' : 'from-orange-200 via-red-200 to-pink-200'}`}>
          {particles.map((p) => (
            <Particle key={p.id} delay={p.delay} duration={p.duration} startX={p.startX} startY={p.startY} />
          ))}
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-block mb-6">
              <Flame className={`w-20 h-20 ${isDark ? 'text-orange-400' : 'text-orange-600'} animate-pulse`} />
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Termokimia
            </h1>
            <p className={`text-xl md:text-2xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Jelajahi Dunia Energi dalam Reaksi Kimia
            </p>
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold shadow-lg">
              Platform Pembelajaran Interaktif
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Pilih Modul Pembelajaran
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => onNavigate(module.id)}
                className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="p-8">
                  <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${module.color} mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {module.title}
                  </h3>
                  
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {module.description}
                  </p>
                  
                  <div className={`mt-4 inline-flex items-center text-sm font-semibold bg-gradient-to-r ${module.color} bg-clip-text text-transparent`}>
                    Mulai Belajar →
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t py-8 mt-16`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 Thermochemistry Learning Platform
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(10px, -20px) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translate(-10px, -40px) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translate(15px, -30px) scale(1.1);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

// Placeholder Components
const TheoryModule = ({ isDark }) => (
  <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-8`}>
    <h1 className="text-4xl font-bold mb-4">Modul Teori</h1>
    <p>Konten modul teori akan ditambahkan di sini...</p>
  </div>
);

const EnthalpySimulation = ({ isDark }) => (
  <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-8`}>
    <h1 className="text-4xl font-bold mb-4">Simulasi Entalpi</h1>
    <p>Konten simulasi entalpi akan ditambahkan di sini...</p>
  </div>
);

const HessLawSimulation = ({ isDark }) => (
  <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-8`}>
    <h1 className="text-4xl font-bold mb-4">Simulasi Hukum Hess</h1>
    <p>Konten simulasi Hukum Hess akan ditambahkan di sini...</p>
  </div>
);

const VirtualLab = ({ isDark }) => (
  <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-8`}>
    <h1 className="text-4xl font-bold mb-4">Lab Virtual</h1>
    <p>Konten lab virtual akan ditambahkan di sini...</p>
  </div>
);

const Assessment = ({ isDark }) => (
  <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-8`}>
    <h1 className="text-4xl font-bold mb-4">Assessment</h1>
    <p>Konten assessment akan ditambahkan di sini...</p>
  </div>
);

const Reference = ({ isDark }) => (
  <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-8`}>
    <h1 className="text-4xl font-bold mb-4">Referensi</h1>
    <p>Konten referensi akan ditambahkan di sini...</p>
  </div>
);

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      {currentPage !== 'landing' && (
        <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 transition-colors duration-300`}>
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={() => navigate('landing')}
              className={`flex items-center gap-2 text-xl font-bold ${isDark ? 'text-white hover:text-orange-400' : 'text-gray-900 hover:text-orange-600'} transition-colors`}
            >
              <Flame className="w-6 h-6" />
              Termokimia
            </button>
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>
      )}

      {/* Theme Toggle on Landing */}
      {currentPage === 'landing' && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full shadow-lg ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'} transition-all`}
          >
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      )}

      {/* Page Routing */}
      {currentPage === 'landing' && <LandingPage onNavigate={navigate} isDark={isDark} />}
      {currentPage === 'theory' && <TheoryModule isDark={isDark} />}
      {currentPage === 'enthalpy' && <EnthalpySimulation isDark={isDark} />}
      {currentPage === 'hess' && <HessLawSimulation isDark={isDark} />}
      {currentPage === 'lab' && <VirtualLab isDark={isDark} />}
      {currentPage === 'assessment' && <Assessment isDark={isDark} />}
      {currentPage === 'reference' && <Reference isDark={isDark} />}
    </div>
  );
}

export default App;