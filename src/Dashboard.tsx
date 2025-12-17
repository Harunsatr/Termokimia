import { BookOpen, Star, Trophy, Sparkles, Beaker } from "lucide-react";
import MissionCard from "./components/MissionCard";

type Props = {
  onNavigate: (page: string) => void;
  stats: { stars: number; xp: number; completed: number };
};

// ThermoLead Mascot SVG Component
const ThermoLeadMascot = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    {/* Flask body */}
    <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-2xl">
      <defs>
        <linearGradient id="flaskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      
      {/* Glow effect */}
      <ellipse cx="60" cy="130" rx="35" ry="8" fill="rgba(168, 85, 247, 0.3)" className="animate-pulse-soft" />
      
      {/* Flask neck */}
      <rect x="45" y="5" width="30" height="25" rx="3" fill="url(#flaskGradient)" />
      <rect x="40" y="25" width="40" height="8" rx="2" fill="url(#flaskGradient)" />
      
      {/* Flask body */}
      <path d="M40 33 L25 85 Q20 100 30 110 L90 110 Q100 100 95 85 L80 33 Z" fill="url(#flaskGradient)" />
      
      {/* Liquid */}
      <path d="M30 75 Q25 90 35 100 L85 100 Q95 90 90 75 Q75 80 60 72 Q45 80 30 75 Z" fill="url(#liquidGradient)" opacity="0.9">
        <animate attributeName="d" 
          values="M30 75 Q25 90 35 100 L85 100 Q95 90 90 75 Q75 80 60 72 Q45 80 30 75 Z;
                  M30 78 Q25 90 35 100 L85 100 Q95 90 90 78 Q75 75 60 80 Q45 75 30 78 Z;
                  M30 75 Q25 90 35 100 L85 100 Q95 90 90 75 Q75 80 60 72 Q45 80 30 75 Z"
          dur="3s" repeatCount="indefinite" />
      </path>
      
      {/* Bubbles */}
      <circle cx="45" cy="85" r="4" fill="url(#bubbleGradient)" opacity="0.8">
        <animate attributeName="cy" values="85;60;85" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="90" r="3" fill="url(#bubbleGradient)" opacity="0.7">
        <animate attributeName="cy" values="90;55;90" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="75" cy="82" r="5" fill="url(#bubbleGradient)" opacity="0.9">
        <animate attributeName="cy" values="82;50;82" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0;0.9" dur="1.8s" repeatCount="indefinite" />
      </circle>
      
      {/* Face - Eyes */}
      <ellipse cx="45" cy="55" rx="6" ry="7" fill="white" />
      <ellipse cx="75" cy="55" rx="6" ry="7" fill="white" />
      <circle cx="47" cy="56" r="3" fill="#1e1b4b" />
      <circle cx="77" cy="56" r="3" fill="#1e1b4b" />
      <circle cx="48" cy="55" r="1" fill="white" />
      <circle cx="78" cy="55" r="1" fill="white" />
      
      {/* Smile */}
      <path d="M50 65 Q60 75 70 65" stroke="#1e1b4b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      
      {/* Sparkle effects */}
      <g className="animate-pulse-soft">
        <polygon points="20,20 22,25 27,25 23,28 25,33 20,30 15,33 17,28 13,25 18,25" fill="#fbbf24" />
        <polygon points="95,15 96,18 99,18 97,20 98,23 95,21 92,23 93,20 91,18 94,18" fill="#fbbf24" transform="scale(0.7)" />
      </g>
      
      {/* Lab coat collar hint */}
      <path d="M25 110 Q30 115 35 110" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M85 110 Q90 115 95 110" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
    </svg>
  </div>
);

export default function Dashboard({ onNavigate, stats }: Props) {
  return (
    <div className="page-enter py-3 md:py-6 xl:py-8">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        
        {/* Hero Section with Mascot */}
        <section className="hero-glow relative">
          <div className="card-dark p-4 md:p-6 xl:p-8 overflow-hidden">
            {/* Header with logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="logo-chip">
                <Beaker className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-white">ThermoLead</span>
                <span className="text-yellow-400">⭐</span>
                <span className="text-[10px] text-gray-400">Level 1 Scientist</span>
              </div>
            </div>
            
            {/* Main title */}
            <h1 className="logo-title text-3xl md:text-4xl xl:text-5xl font-black tracking-tight">
              Petualangan Termokimia
            </h1>
            <p className="logo-subtitle text-sm md:text-base mt-2">
              Bersama ThermoLead - Ahli Laboratorium Virtualmu
            </p>
            
            {/* Mascot + Speech bubble layout */}
            <div className="mt-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
              {/* Mascot */}
              <div className="animate-float shrink-0">
                <ThermoLeadMascot className="w-28 h-32 md:w-36 md:h-40 xl:w-44 xl:h-48" />
              </div>
              
              {/* Speech Bubble */}
              <div className="speech-bubble flex-1 p-4 md:p-5 animate-fade-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">👋</span>
                  <span className="speech-title text-sm md:text-base">ThermoLead berkata:</span>
                </div>
                <p className="speech-text text-sm md:text-base leading-relaxed">
                  Halo, Petualang Sains! 🔬 Aku ThermoLead, pemandu virtualmu dalam menjelajahi 
                  dunia termokimia yang menakjubkan! Mari kita mulai petualangan pengetahuan kita!
                </p>
              </div>
            </div>
            
            {/* Stats row */}
            <div className="mt-6 flex flex-wrap items-center gap-3 md:gap-4">
              <div className="stat-card px-4 py-2.5 flex items-center gap-2 animate-scale-in" style={{ animationDelay: '150ms' }}>
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-white">{stats.stars}</span>
                <span className="text-xs text-gray-400">Stars</span>
              </div>
              <div className="stat-card px-4 py-2.5 flex items-center gap-2 animate-scale-in" style={{ animationDelay: '200ms' }}>
                <Trophy className="w-5 h-5 text-orange-400" />
                <span className="font-bold text-white">{stats.xp}</span>
                <span className="text-xs text-gray-400">XP</span>
              </div>
              <div className="stat-card px-4 py-2.5 flex items-center gap-2 animate-scale-in" style={{ animationDelay: '250ms' }}>
                <BookOpen className="w-5 h-5 text-green-400" />
                <span className="font-bold text-white">{stats.completed}</span>
                <span className="text-xs text-gray-400">Selesai</span>
              </div>
              <div className="stat-card px-4 py-2.5 flex items-center gap-2 animate-scale-in" style={{ animationDelay: '300ms' }}>
                <span className="text-lg">🎮</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="animate-fade-up" style={{ animationDelay: "100ms" }}>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Pilih Misi Petualanganmu
          </h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <MissionCard
              title="Quest Teori"
              description="Jelajahi pengetahuan termokimia"
              icon="📖"
              level="Mudah"
              onClick={() => onNavigate("theory")}
            />
            <MissionCard
              title="Lab Simulasi"
              description="Eksperimen virtual interaktif"
              icon="⚗️"
              level="Sedang"
              onClick={() => onNavigate("enthalpy")}
            />
            <MissionCard
              title="Lab Virtual"
              description="Praktikum digital"
              icon="🔬"
              level="Sedang"
              onClick={() => onNavigate("lab")}
            />
            <MissionCard
              title="Boss Fight"
              description="Uji kemampuanmu!"
              icon="🏆"
              level="Sulit"
              onClick={() => onNavigate("assessment")}
            />
          </div>

          {/* Hess Law special button */}
          <button
            type="button"
            onClick={() => onNavigate("hess")}
            className="mt-4 w-full mission-card p-4 md:p-5 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl group-hover:animate-bounce-soft">⚖️</div>
              <div className="text-left">
                <div className="font-bold text-white group-hover:text-purple-300 transition-colors text-lg">
                  Hukum Hess
                </div>
                <div className="text-sm text-gray-400 mt-0.5">Perhitungan entalpi lanjutan</div>
              </div>
            </div>
            <div className="badge badge-hard">
              <span>⚡ Lanjutan</span>
            </div>
          </button>
        </section>

        {/* Features Section */}
        <section className="animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card-dark p-5 text-center group hover:border-purple-500/30 transition-colors">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                🎯
              </div>
              <div className="font-bold text-white">Pembelajaran Interaktif</div>
              <div className="text-sm text-gray-400 mt-1">Belajar sambil bermain dengan simulasi menarik</div>
            </div>
            <div className="card-dark p-5 text-center group hover:border-cyan-500/30 transition-colors">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                🧪
              </div>
              <div className="font-bold text-white">Eksperimen Virtual</div>
              <div className="text-sm text-gray-400 mt-1">Lakukan percobaan tanpa risiko</div>
            </div>
            <div className="card-dark p-5 text-center group hover:border-orange-500/30 transition-colors">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                📊
              </div>
              <div className="font-bold text-white">Tracking Progress</div>
              <div className="text-sm text-gray-400 mt-1">Pantau perkembangan belajarmu</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
