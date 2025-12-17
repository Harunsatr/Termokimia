import { useState } from "react";
import { Home, Star, Trophy, Beaker } from "lucide-react";
import "./App.css";

// Import components
import TheoryModule from './components/TheoryModule';
import EnthalpySimulation from './components/EnthalpySimulation';
import HessLawSimulation from './components/HessLaw';
import VirtualLab from './components/VirtualLab';
import AssessmentModule from './components/AssessmentModule';

import Dashboard from "./Dashboard";

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [stats] = useState(() => {
    const savedStats = localStorage.getItem("thermoStats");
    if (!savedStats) return { stars: 0, xp: 0, completed: 0 };
    try {
      return JSON.parse(savedStats);
    } catch {
      return { stars: 0, xp: 0, completed: 0 };
    }
  });

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-shell min-h-screen text-white">
      {currentPage !== "landing" && (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f0a1e]/80 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-8 py-3 flex justify-between items-center">
            <button
              onClick={() => navigate("landing")}
              className="flex items-center gap-2.5 text-white hover:text-purple-200 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Beaker className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Home className="w-4 h-4 text-gray-400" />
                <span className="logo-title font-extrabold tracking-tight text-lg">Petualangan Termokimia</span>
              </div>
              <span className="sm:hidden logo-title font-extrabold tracking-tight">ThermoLead</span>
            </button>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-bold text-sm">{stats.stars}</span>
              </div>
              <div className="w-px h-4 bg-white/15" />
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-orange-400" />
                <span className="text-white font-bold text-sm">{stats.xp}</span>
                <span className="text-[10px] text-gray-400">XP</span>
              </div>
            </div>
          </div>
        </header>
      )}

      {currentPage === "landing" ? (
        <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-8 py-8">
          <Dashboard onNavigate={navigate} stats={stats} />
        </div>
      ) : (
        <div className="w-full">
          {currentPage === "theory" && <TheoryModule />}
          {currentPage === "enthalpy" && <EnthalpySimulation />}
          {currentPage === "hess" && <HessLawSimulation />}
          {currentPage === "lab" && <VirtualLab />}
          {currentPage === "assessment" && <AssessmentModule />}
        </div>
      )}
    </div>
  );
}

export default App;
