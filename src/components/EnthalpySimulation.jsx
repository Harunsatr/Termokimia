import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Download, Zap, Thermometer, Info } from 'lucide-react';

const EnthalpySimulation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [amount, setAmount] = useState(1);
  const [showInfo, setShowInfo] = useState(true);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const reactions = [
    {
      id: 1,
      name: 'Pembakaran Metana',
      equation: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)',
      type: 'eksoterm',
      deltaH: -890,
      reactants: ['CH₄', 'O₂', 'O₂'],
      products: ['CO₂', 'H₂O', 'H₂O'],
      color: '#ef4444'
    },
    {
      id: 2,
      name: 'Pembentukan Nitrogen Oksida',
      equation: 'N₂(g) + O₂(g) → 2NO(g)',
      type: 'endoterm',
      deltaH: 180,
      reactants: ['N₂', 'O₂'],
      products: ['NO', 'NO'],
      color: '#3b82f6'
    },
    {
      id: 3,
      name: 'Pembakaran Karbon',
      equation: 'C(s) + O₂(g) → CO₂(g)',
      type: 'eksoterm',
      deltaH: -393.5,
      reactants: ['C', 'O₂'],
      products: ['CO₂'],
      color: '#ef4444'
    },
    {
      id: 4,
      name: 'Fotosintesis (Sederhana)',
      equation: '6CO₂(g) + 6H₂O(l) → C₆H₁₂O₆(s) + 6O₂(g)',
      type: 'endoterm',
      deltaH: 2803,
      reactants: ['CO₂', 'H₂O'],
      products: ['C₆H₁₂O₆', 'O₂'],
      color: '#3b82f6'
    },
    {
      id: 5,
      name: 'Netralisasi Asam-Basa',
      equation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
      type: 'eksoterm',
      deltaH: -57.3,
      reactants: ['HCl', 'NaOH'],
      products: ['NaCl', 'H₂O'],
      color: '#ef4444'
    },
    {
      id: 6,
      name: 'Dekomposisi Kalsium Karbonat',
      equation: 'CaCO₃(s) → CaO(s) + CO₂(g)',
      type: 'endoterm',
      deltaH: 178,
      reactants: ['CaCO₃'],
      products: ['CaO', 'CO₂'],
      color: '#3b82f6'
    },
    {
      id: 7,
      name: 'Pembakaran Etanol',
      equation: 'C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(l)',
      type: 'eksoterm',
      deltaH: -1367,
      reactants: ['C₂H₅OH', 'O₂'],
      products: ['CO₂', 'H₂O'],
      color: '#ef4444'
    },
    {
      id: 8,
      name: 'Pencairan Es',
      equation: 'H₂O(s) → H₂O(l)',
      type: 'endoterm',
      deltaH: 6.01,
      reactants: ['H₂O(s)'],
      products: ['H₂O(l)'],
      color: '#3b82f6'
    }
  ];

  const [selectedReaction, setSelectedReaction] = useState(reactions[0]);

  // Particle system
  const particles = useRef([]);
  const energyWaves = useRef([]);

  useEffect(() => {
    initializeParticles();
  }, [selectedReaction, amount]);

  useEffect(() => {
    if (isPlaying) {
      animate();
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, speed, progress]);

  const initializeParticles = () => {
    particles.current = [];
    const reactantCount = Math.min(amount * 3, 15);
    
    for (let i = 0; i < reactantCount; i++) {
      particles.current.push({
        x: 50 + Math.random() * 100,
        y: 150 + Math.random() * 100,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 8,
        type: 'reactant',
        label: selectedReaction.reactants[i % selectedReaction.reactants.length]
      });
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = darkMode ? '#1f2937' : '#f3f4f6';
    ctx.fillRect(0, 0, width, height);

    // Update progress
    setProgress(prev => {
      const newProgress = prev + (0.5 * speed);
      if (newProgress >= 100) {
        setIsPlaying(false);
        return 100;
      }
      return newProgress;
    });

    // Draw reaction zones
    ctx.strokeStyle = darkMode ? '#4b5563' : '#d1d5db';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(30, 130, 180, 140); // Reactants zone
    ctx.strokeRect(490, 130, 180, 140); // Products zone
    ctx.setLineDash([]);

    // Labels
    ctx.fillStyle = darkMode ? '#e5e7eb' : '#374151';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Reaktan', 90, 120);
    ctx.fillText('Produk', 550, 120);

    // Update and draw particles
    particles.current.forEach((p, i) => {
      // Move particles based on progress
      if (progress > 20 && progress < 80) {
        const targetX = progress < 50 ? 350 : 550 + Math.random() * 100;
        const targetY = 200 + Math.random() * 80;
        p.x += (targetX - p.x) * 0.02 * speed;
        p.y += (targetY - p.y) * 0.02 * speed;
      } else if (progress >= 80) {
        p.type = 'product';
        p.label = selectedReaction.products[i % selectedReaction.products.length];
      } else {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 40 || p.x > 200) p.vx *= -1;
        if (p.y < 140 || p.y > 260) p.vy *= -1;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.type === 'reactant' 
        ? (darkMode ? '#60a5fa' : '#3b82f6')
        : (darkMode ? '#34d399' : '#10b981');
      ctx.fill();
      ctx.strokeStyle = darkMode ? '#1f2937' : '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.fillStyle = darkMode ? '#ffffff' : '#000000';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.label, p.x, p.y + 3);
    });

    // Draw energy waves
    if (progress > 40 && progress < 90) {
      energyWaves.current.push({
        x: 350,
        y: 200,
        radius: 0,
        alpha: 1
      });
    }

    energyWaves.current = energyWaves.current.filter(wave => {
      wave.radius += 2;
      wave.alpha -= 0.02;
      
      if (wave.alpha > 0) {
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = selectedReaction.type === 'eksoterm' 
          ? `rgba(239, 68, 68, ${wave.alpha})`
          : `rgba(59, 130, 246, ${wave.alpha})`;
        ctx.lineWidth = 3;
        ctx.stroke();
        return true;
      }
      return false;
    });

    // Draw activation energy curve
    drawActivationCurve(ctx, width, height);

    animationRef.current = requestAnimationFrame(animate);
  };

  const drawActivationCurve = (ctx, width, height) => {
    const startX = 50;
    const endX = 650;
    const baseY = 450;
    const reactantY = selectedReaction.type === 'eksoterm' ? 420 : 440;
    const productY = selectedReaction.type === 'eksoterm' ? 460 : 400;
    const peakY = 350;

    ctx.beginPath();
    ctx.moveTo(startX, reactantY);
    
    // Smooth curve using quadratic bezier
    ctx.quadraticCurveTo(250, peakY, 350, peakY);
    ctx.quadraticCurveTo(450, peakY, endX, productY);
    
    ctx.strokeStyle = selectedReaction.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw energy levels
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = darkMode ? '#6b7280' : '#9ca3af';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX - 20, reactantY);
    ctx.lineTo(startX + 100, reactantY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(endX - 100, productY);
    ctx.lineTo(endX + 20, productY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Labels
    ctx.fillStyle = darkMode ? '#e5e7eb' : '#374151';
    ctx.font = '12px sans-serif';
    ctx.fillText('Reaktan', startX + 30, reactantY - 10);
    ctx.fillText('Produk', endX - 50, productY - 10);
    ctx.fillText('Ea', 350, peakY - 10);

    // ΔH arrow
    const arrowX = endX + 40;
    ctx.beginPath();
    ctx.moveTo(arrowX, reactantY);
    ctx.lineTo(arrowX, productY);
    ctx.strokeStyle = selectedReaction.type === 'eksoterm' ? '#ef4444' : '#3b82f6';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Arrow head
    ctx.beginPath();
    if (selectedReaction.type === 'eksoterm') {
      ctx.moveTo(arrowX - 5, productY - 10);
      ctx.lineTo(arrowX, productY);
      ctx.lineTo(arrowX + 5, productY - 10);
    } else {
      ctx.moveTo(arrowX - 5, reactantY + 10);
      ctx.lineTo(arrowX, reactantY);
      ctx.lineTo(arrowX + 5, reactantY + 10);
    }
    ctx.stroke();

    ctx.fillText('ΔH', arrowX + 10, (reactantY + productY) / 2);
  };

  const handlePlay = () => {
    if (progress >= 100) {
      handleReset();
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    initializeParticles();
    energyWaves.current = [];
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `enthalpy_simulation_${selectedReaction.name}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const totalHeat = (selectedReaction.deltaH * amount).toFixed(1);
  const temperature = selectedReaction.type === 'eksoterm' 
    ? 25 + Math.abs(selectedReaction.deltaH) / 100
    : 25 - Math.abs(selectedReaction.deltaH) / 100;

  return (
    <div className="min-h-screen bg-[#0f0a1e] text-white page-enter">
      {/* Header */}
      <div className="bg-[#1a1333]/80 shadow-lg border-b border-gray-800 backdrop-blur">
        <div className="max-w-7xl mx-auto px-2 md:px-4 py-2 md:py-3 xl:py-4 flex justify-between items-center">
          <h1 className="text-sm md:text-lg xl:text-2xl font-extrabold flex items-center gap-1.5 md:gap-2">
            <Zap className="text-orange-500 w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6 animate-pulse-soft" />
            <span className="hidden md:inline gradient-title">Simulasi Entalpi Reaksi</span>
            <span className="md:hidden gradient-title">Simulasi Entalpi</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 md:px-4 py-3 md:py-4 xl:py-6 flex flex-col xl:flex-row gap-3 md:gap-4 xl:gap-6">
        {/* Main Canvas Area */}
        <div className="flex-1">
          <div className="card-dark p-2 md:p-4 xl:p-6 mb-3 md:mb-4 xl:mb-6">
            <canvas
              ref={canvasRef}
              width={700}
              height={500}
              className="w-full border rounded border-gray-700"
            />
          </div>

          {/* Controls */}
          <div className="card-dark p-3 md:p-4 xl:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 xl:gap-6 mb-3 md:mb-4 xl:mb-6">
              {/* Reaction Selection */}
              <div>
                <label className="block text-[10px] md:text-xs xl:text-sm font-semibold mb-1.5 md:mb-2 text-gray-300">Pilih Reaksi</label>
                <select
                  value={selectedReaction.id}
                  onChange={(e) => {
                    const reaction = reactions.find(r => r.id === parseInt(e.target.value));
                    setSelectedReaction(reaction);
                    handleReset();
                  }}
                  className="w-full p-2 md:p-2.5 xl:p-3 rounded bg-[#252040] border border-gray-700 text-white text-xs md:text-sm"
                >
                  {reactions.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.type})
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Control */}
              <div>
                <label className="block text-[10px] md:text-xs xl:text-sm font-semibold mb-1.5 md:mb-2 text-gray-300">
                  Jumlah Reaktan: {amount} mol
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={amount}
                  onChange={(e) => {
                    setAmount(parseInt(e.target.value));
                    handleReset();
                  }}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>

            {/* Speed Control */}
            <div className="mb-3 md:mb-4 xl:mb-6">
              <label className="block text-[10px] md:text-xs xl:text-sm font-semibold mb-1.5 md:mb-2 text-gray-300">
                Kecepatan Animasi: {speed}x
              </label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            {/* Playback Controls */}
            <div className="grid grid-cols-2 md:flex gap-1.5 md:gap-2 xl:gap-3">
              <button
                onClick={handlePlay}
                disabled={isPlaying}
                className={`flex items-center justify-center gap-1 md:gap-1.5 xl:gap-2 px-2 md:px-4 xl:px-6 py-2 md:py-2.5 xl:py-3 rounded-lg transition-colors text-xs md:text-sm xl:text-base ${
                  isPlaying
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
              >
                <Play size={14} className="md:w-4 md:h-4 xl:w-5 xl:h-5" />
                {progress >= 100 ? 'Ulang' : 'Play'}
              </button>
              <button
                onClick={() => setIsPlaying(false)}
                disabled={!isPlaying}
                className={`flex items-center justify-center gap-1 md:gap-1.5 xl:gap-2 px-2 md:px-4 xl:px-6 py-2 md:py-2.5 xl:py-3 rounded-lg transition-colors text-xs md:text-sm xl:text-base ${
                  !isPlaying
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-yellow-500 hover:bg-yellow-600'
                } text-white`}
              >
                <Pause size={14} className="md:w-4 md:h-4 xl:w-5 xl:h-5" />
                Pause
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-1 md:gap-1.5 xl:gap-2 px-2 md:px-4 xl:px-6 py-2 md:py-2.5 xl:py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors text-xs md:text-sm xl:text-base"
              >
                <RotateCcw size={14} className="md:w-4 md:h-4 xl:w-5 xl:h-5" />
                Reset
              </button>
              <button
                onClick={handleExport}
                className="flex items-center justify-center px-2 md:px-4 xl:px-6 py-2 md:py-2.5 xl:py-3 rounded-lg bg-[#252040] hover:bg-[#2a2550] transition-colors"
              >
                <Download size={14} className="md:w-4 md:h-4 xl:w-5 xl:h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 md:mt-4">
              <div className="h-1.5 md:h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] md:text-xs xl:text-sm text-center mt-1.5 md:mt-2 text-gray-400">{Math.round(progress)}% Selesai</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full xl:w-80">
          {/* Results Display */}
          <div key={selectedReaction.id} className="card-dark p-3 md:p-4 xl:p-6 mb-3 md:mb-4 xl:mb-6 animate-scale-in">
            <h3 className="font-bold text-sm md:text-base xl:text-lg mb-3 md:mb-4 flex items-center gap-1.5 md:gap-2 text-white">
              <Thermometer className="text-orange-500 w-4 h-4 md:w-4.5 md:h-4.5 xl:w-5 xl:h-5" />
              Hasil Simulasi
            </h3>
            
            <div className="space-y-2 md:space-y-3 xl:space-y-4">
              {/* Reaction Type */}
              <div className={`p-2 md:p-3 xl:p-4 rounded-lg ${
                selectedReaction.type === 'eksoterm' 
                  ? 'bg-red-900/30 border border-red-500/30'
                  : 'bg-blue-900/30 border border-blue-500/30'
              }`}>
                <p className="text-xs sm:text-sm font-semibold mb-1 text-gray-400">Tipe Reaksi</p>
                <p className="text-lg sm:text-xl font-bold capitalize text-white">{selectedReaction.type}</p>
              </div>

              {/* Equation */}
              <div>
                <p className="text-xs sm:text-sm font-semibold mb-2 text-gray-400">Persamaan Termokimia</p>
                <p className="text-xs sm:text-sm font-mono bg-[#252040] p-2 sm:p-3 rounded text-white overflow-x-auto">
                  {selectedReaction.equation}
                </p>
                <p className="text-xs sm:text-sm font-mono bg-[#252040] p-2 sm:p-3 rounded mt-2 text-white">
                  ΔH° = {selectedReaction.deltaH} kJ/mol
                </p>
              </div>

              {/* Energy Values */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-[#252040] p-2 sm:p-3 rounded-lg">
                  <p className="text-xs mb-1 text-gray-400">Total Kalor</p>
                  <p className="font-bold text-base sm:text-lg text-white">{totalHeat} kJ</p>
                </div>
                <div className="bg-[#252040] p-2 sm:p-3 rounded-lg">
                  <p className="text-xs mb-1 text-gray-400">Suhu Akhir</p>
                  <p className="font-bold text-base sm:text-lg text-white">{temperature.toFixed(1)}°C</p>
                </div>
              </div>

              {/* Visual Thermometer */}
              <div className="mt-3 sm:mt-4">
                <p className="text-xs sm:text-sm font-semibold mb-2 text-gray-400">Perubahan Suhu</p>
                <div className="relative h-24 sm:h-32 w-full bg-gray-700 rounded-lg overflow-hidden">
                  <div
                    className={`absolute bottom-0 w-full transition-all duration-1000 ${
                      selectedReaction.type === 'eksoterm' ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ height: `${Math.min((Math.abs(temperature - 25) / 50) * 100, 100)}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Thermometer size={32} className="text-white drop-shadow-lg sm:w-10 sm:h-10" />
                  </div>
                </div>
              </div>

              {/* Energy Bar Chart */}
              <div>
                <p className="text-xs sm:text-sm font-semibold mb-2 text-gray-400">Diagram Energi</p>
                <div className="flex items-end justify-around h-24 sm:h-32 bg-[#252040] rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 sm:w-16 bg-blue-500 rounded-t"
                      style={{ height: '60px' }}
                    />
                    <p className="text-xs mt-2 text-gray-400">Reaktan</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 sm:w-16 bg-green-500 rounded-t"
                      style={{
                        height: selectedReaction.type === 'eksoterm' ? '40px' : '80px'
                      }}
                    />
                    <p className="text-xs mt-2 text-gray-400">Produk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          {showInfo && (
            <div className="card-dark p-4 sm:p-6 border-l-4 border-purple-500 animate-fade-up">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold flex items-center gap-2 text-white text-sm sm:text-base">
                  <Info size={16} className="sm:w-5 sm:h-5" />
                  Konsep Penting
                </h3>
                <button onClick={() => setShowInfo(false)} className="text-xs sm:text-sm text-gray-400 hover:text-white">✕</button>
              </div>
              <div className="text-xs sm:text-sm space-y-2 text-gray-300">
                <p><strong className="text-red-400">Eksoterm:</strong> Melepas kalor (ΔH negatif), suhu naik.</p>
                <p><strong className="text-blue-400">Endoterm:</strong> Menyerap kalor (ΔH positif), suhu turun.</p>
                <p><strong className="text-yellow-400">Ea:</strong> Energi aktivasi untuk memulai reaksi.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnthalpySimulation;