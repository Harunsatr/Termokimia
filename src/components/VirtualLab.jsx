import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Download, AlertTriangle, Beaker, Thermometer, Timer, BookOpen } from 'lucide-react';

const VirtualLab = () => {
  const [experiment, setExperiment] = useState('neutralization');
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [temperature, setTemperature] = useState(25);
  const [initialTemp, setInitialTemp] = useState(25);
  const [mass1, setMass1] = useState(50);
  const [mass2, setMass2] = useState(50);
  const [selectedChem1, setSelectedChem1] = useState(null);
  const [selectedChem2, setSelectedChem2] = useState(null);
  const [mixing, setMixing] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [trials, setTrials] = useState([]);

  const experiments = {
    neutralization: {
      name: "Netralisasi Asam-Basa",
      chem1: { name: "HCl 1M", color: "#ef4444" },
      chem2: { name: "NaOH 1M", color: "#3b82f6" },
      finalColor: "#22c55e",
      deltaT: 6.5,
      deltaH: -57.1,
      type: "eksoterm"
    },
    endothermic: {
      name: "Pelarutan NH₄NO₃",
      chem1: { name: "NH₄NO₃", color: "#e5e7eb" },
      chem2: { name: "Air", color: "#3b82f6" },
      finalColor: "#93c5fd",
      deltaT: -5.2,
      deltaH: 25.7,
      type: "endoterm"
    },
    exothermic: {
      name: "Pelarutan CaCl₂",
      chem1: { name: "CaCl₂", color: "#e5e7eb" },
      chem2: { name: "Air", color: "#3b82f6" },
      finalColor: "#bfdbfe",
      deltaT: 8.3,
      deltaH: -82.8,
      type: "eksoterm"
    },
    combustion: {
      name: "Pembakaran Etanol",
      chem1: { name: "C₂H₅OH", color: "#fbbf24" },
      chem2: { name: "Air", color: "#3b82f6" },
      finalColor: "#60a5fa",
      deltaT: 12.5,
      deltaH: -1367,
      type: "eksoterm"
    }
  };

  const currentExp = experiments[experiment];

  useEffect(() => {
    let interval;
    if (isRunning && time < 60) {
      interval = setInterval(() => {
        setTime(t => {
          const newTime = t + 0.1;
          const progress = newTime / 60;
          const newTemp = initialTemp + (currentExp.deltaT * Math.min(progress * 2, 1));
          setTemperature(newTemp);
          setTempData(prev => [...prev, { time: newTime, temp: newTemp }]);
          
          if (Math.random() > 0.7 && currentExp.type === "eksoterm") {
            addBubble();
          }
          
          if (newTime >= 60) {
            setIsRunning(false);
            return 60;
          }
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, initialTemp, currentExp]);

  const addBubble = () => {
    const newBubble = {
      id: Date.now() + Math.random(),
      x: 200 + Math.random() * 100,
      y: 400,
      size: Math.random() * 10 + 5
    };
    setBubbles(prev => [...prev, newBubble]);
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
    }, 2000);
  };

  const startExperiment = () => {
    if (!selectedChem1 || !selectedChem2) {
      alert("Pilih kedua bahan kimia terlebih dahulu!");
      return;
    }
    setIsRunning(true);
    setMixing(true);
    setTime(0);
    setTemperature(initialTemp);
    setTempData([{ time: 0, temp: initialTemp }]);
    setBubbles([]);
  };

  const resetExperiment = () => {
    setIsRunning(false);
    setTime(0);
    setTemperature(initialTemp);
    setMixing(false);
    setBubbles([]);
    setTempData([]);
    setSelectedChem1(null);
    setSelectedChem2(null);
  };

  const saveTrial = () => {
    const q = (mass1 + mass2) * 4.18 * Math.abs(currentExp.deltaT);
    const trial = {
      id: Date.now(),
      experiment: currentExp.name,
      mass1,
      mass2,
      initialTemp,
      finalTemp: temperature,
      deltaT: currentExp.deltaT,
      q: q.toFixed(2),
      time: new Date().toLocaleTimeString()
    };
    setTrials(prev => [...prev, trial]);
  };

  const exportReport = () => {
    const q = (mass1 + mass2) * 4.18 * Math.abs(currentExp.deltaT);
    const report = `
=== LAPORAN PRAKTIKUM KALORIMETRI ===
Eksperimen: ${currentExp.name}
Waktu: ${new Date().toLocaleString()}

BAHAN:
- ${currentExp.chem1.name}: ${mass1}g
- ${currentExp.chem2.name}: ${mass2}g

DATA PENGAMATAN:
- Suhu Awal: ${initialTemp}°C
- Suhu Akhir: ${temperature.toFixed(2)}°C
- ΔT: ${currentExp.deltaT}°C
- Massa Total: ${mass1 + mass2}g

PERHITUNGAN:
q = m × c × ΔT
q = ${mass1 + mass2} × 4.18 × ${Math.abs(currentExp.deltaT)}
q = ${q.toFixed(2)} J

ΔH = ${currentExp.deltaH} kJ/mol

KESIMPULAN:
Reaksi ini bersifat ${currentExp.type}.
    `.trim();
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-kalorimetri-${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen p-2 md:p-4 xl:p-6 bg-[#0f0a1e] text-white transition-colors page-enter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 md:mb-4 xl:mb-6 gap-2">
          <div>
            <h1 className="text-xl md:text-2xl xl:text-4xl font-extrabold gradient-title tracking-tight">
              Virtual Calorimetry Lab
            </h1>
            <p className="text-[10px] md:text-xs xl:text-sm text-gray-400 mt-1">Eksperimen Termokimia Interaktif</p>
          </div>
        </div>

        {/* Safety Warning */}
        <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-xl p-2 md:p-3 xl:p-4 mb-3 md:mb-4 xl:mb-6 animate-fade-in">
          <div className="flex items-center gap-2 md:gap-3">
            <AlertTriangle className="text-yellow-400 w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6 flex-shrink-0 animate-pulse-soft" />
            <div>
              <p className="font-bold text-xs md:text-sm xl:text-base">Catatan Keselamatan Lab:</p>
              <p className="text-[10px] md:text-xs xl:text-sm text-gray-300">Ini adalah simulasi virtual. Di lab nyata, selalu gunakan APD dan ikuti prosedur keselamatan!</p>
            </div>
          </div>
        </div>

        {/* Experiment Selection */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-1.5 md:gap-2 xl:gap-3 mb-3 md:mb-4 xl:mb-6">
          {Object.entries(experiments).map(([key, exp]) => (
            <button
              key={key}
              onClick={() => {
                setExperiment(key);
                resetExperiment();
              }}
              className={`p-2 md:p-3 xl:p-4 rounded-xl font-bold text-[10px] md:text-xs xl:text-base transition-all ${
                experiment === key
                  ? 'bg-gradient-to-r from-pink-500 to-orange-500 scale-[1.02]'
                  : 'card-dark opacity-70 hover:opacity-100'
              }`}
            >
              {exp.name}
            </button>
          ))}
        </div>

        <div key={experiment} className="grid grid-cols-1 xl:grid-cols-3 gap-3 md:gap-4 xl:gap-6 animate-fade-up">
          {/* Lab Setup */}
          <div className="xl:col-span-2 space-y-3 md:space-y-4 xl:space-y-6">
            {/* Calorimeter Visualization */}
            <div className="card-dark p-3 md:p-4 xl:p-6 relative overflow-hidden animate-scale-in">
              <h2 className="text-base md:text-lg xl:text-2xl font-bold mb-3 md:mb-4 text-white">Setup Kalorimeter</h2>
              
              {/* SVG Calorimeter */}
              <svg viewBox="0 0 500 600" className="w-full h-64 md:h-80 xl:h-96">
                <defs>
                  <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={mixing ? currentExp.finalColor : selectedChem1 ? currentExp.chem1.color : '#374151'} />
                    <stop offset="100%" stopColor={mixing ? currentExp.finalColor : selectedChem1 ? currentExp.chem1.color : '#1f2937'} />
                  </linearGradient>
                  <filter id="glassEffect">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                    <feOffset dx="2" dy="2" result="offsetblur"/>
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.2"/>
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Calorimeter Container */}
                <rect x="150" y="250" width="200" height="300" rx="10" fill="#374151" stroke="#6b7280" strokeWidth="3" filter="url(#glassEffect)" />
                
                {/* Liquid */}
                <rect x="160" y={550 - (mixing ? 280 : selectedChem1 ? 140 : 0)} width="180" height={mixing ? 280 : selectedChem1 ? 140 : 0} fill="url(#liquidGradient)" opacity="0.8">
                  {mixing && <animate attributeName="y" values={`${550 - 280};${545 - 280};${550 - 280}`} dur="2s" repeatCount="indefinite" />}
                </rect>

                {/* Bubbles */}
                {bubbles.map(bubble => (
                  <circle
                    key={bubble.id}
                    cx={bubble.x}
                    cy={bubble.y}
                    r={bubble.size}
                    fill="white"
                    opacity="0.6"
                  >
                    <animate attributeName="cy" from={bubble.y} to="250" dur="2s" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" />
                  </circle>
                ))}

                {/* Stirrer */}
                <line x1="250" y1="200" x2="250" y2="500" stroke="#9ca3af" strokeWidth="4" />
                <rect x="220" y="450" width="60" height="10" fill="#9ca3af" rx="2">
                  {mixing && <animateTransform attributeName="transform" type="rotate" from="0 250 455" to="360 250 455" dur="2s" repeatCount="indefinite" />}
                </rect>

                {/* Lid */}
                <rect x="130" y="230" width="240" height="30" rx="5" fill="#4b5563" stroke="#6b7280" strokeWidth="2" />
                
                {/* Thermometer */}
                <rect x="380" y="280" width="30" height="200" rx="15" fill="#f3f4f6" stroke="#6b7280" strokeWidth="2" />
                <rect x="385" y="470" width="20" height="10" rx="5" fill="#ef4444" />
                <rect x="390" y={475 - (temperature - 20) * 3} width="10" height={(temperature - 20) * 3} fill="#ef4444" />
                <text x="420" y="380" fontSize="16" fontWeight="bold" fill="#fff">
                  {temperature.toFixed(1)}°C
                </text>

                {/* Labels */}
                <text x="250" y="220" textAnchor="middle" fontSize="14" fill="#9ca3af">Pengaduk</text>
                <text x="250" y="580" textAnchor="middle" fontSize="14" fill="#9ca3af">Kalorimeter</text>
              </svg>

              {/* Drag Drop Area */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div
                  onClick={() => setSelectedChem1(currentExp.chem1)}
                  className={`p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                    selectedChem1 ? 'border-green-500 bg-green-900/30' : 'border-gray-600 hover:border-blue-500'
                  }`}
                >
                  <Beaker className="mx-auto mb-2" size={32} style={{ color: currentExp.chem1.color }} />
                  <p className="text-center font-bold">{currentExp.chem1.name}</p>
                  {selectedChem1 && <p className="text-center text-green-400 text-sm mt-1">✓ Ditambahkan</p>}
                </div>
                <div
                  onClick={() => setSelectedChem2(currentExp.chem2)}
                  className={`p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                    selectedChem2 ? 'border-green-500 bg-green-900/30' : 'border-gray-600 hover:border-blue-500'
                  }`}
                >
                  <Beaker className="mx-auto mb-2" size={32} style={{ color: currentExp.chem2.color }} />
                  <p className="text-center font-bold">{currentExp.chem2.name}</p>
                  {selectedChem2 && <p className="text-center text-green-400 text-sm mt-1">✓ Ditambahkan</p>}
                </div>
              </div>
            </div>

            {/* Temperature Graph */}
            {tempData.length > 0 && (
              <div className={`card-dark rounded-2xl p-6 shadow-2xl animate-fade-in`}>
                <h3 className="text-xl font-bold mb-4">Grafik Suhu vs Waktu</h3>
                <svg viewBox="0 0 600 300" className="w-full">
                  <line x1="50" y1="250" x2="550" y2="250" stroke="#6b7280" strokeWidth="2" />
                  <line x1="50" y1="50" x2="50" y2="250" stroke="#6b7280" strokeWidth="2" />
                  
                  {tempData.map((point, idx) => {
                    if (idx === 0) return null;
                    const prevPoint = tempData[idx - 1];
                    const x1 = 50 + (prevPoint.time / 60) * 500;
                    const y1 = 250 - ((prevPoint.temp - 15) * 10);
                    const x2 = 50 + (point.time / 60) * 500;
                    const y2 = 250 - ((point.temp - 15) * 10);
                    return (
                      <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3b82f6" strokeWidth="2" />
                    );
                  })}
                  
                  <text x="300" y="280" textAnchor="middle" fontSize="14" fill="#9ca3af">Waktu (detik)</text>
                  <text x="20" y="150" fontSize="14" fill="#9ca3af" transform="rotate(-90 20 150)">Suhu (°C)</text>
                </svg>
              </div>
            )}
          </div>

          {/* Control Panel */}
          <div className="space-y-4">
            {/* Timer & Temp */}
            <div className={`card-dark rounded-xl p-4 shadow-lg animate-fade-up`} style={{ animationDelay: '40ms' }}>
              <div className="flex items-center gap-2 mb-3">
                <Timer className="text-blue-400" />
                <span className="font-bold">Status Eksperimen</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Waktu:</span>
                  <span className="font-mono font-bold">{time.toFixed(1)}s</span>
                </div>
                <div className="flex justify-between">
                  <span>Suhu:</span>
                  <span className="font-mono font-bold">{temperature.toFixed(1)}°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-bold ${isRunning ? 'text-green-400 animate-pulse-soft' : 'text-gray-400'}`}>
                    {isRunning ? '🔄 Running' : '⏸️ Stopped'}
                  </span>
                </div>
              </div>
            </div>

            {/* Input Parameters */}
            <div className={`card-dark rounded-xl p-4 shadow-lg animate-fade-up`} style={{ animationDelay: '70ms' }}>
              <h3 className="font-bold mb-3">Parameter Input</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm opacity-70">Massa {currentExp.chem1.name} (g)</label>
                  <input
                    type="number"
                    value={mass1}
                    onChange={(e) => setMass1(parseFloat(e.target.value))}
                    disabled={isRunning}
                    className="w-full mt-1 px-3 py-2 bg-gray-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm opacity-70">Massa {currentExp.chem2.name} (g)</label>
                  <input
                    type="number"
                    value={mass2}
                    onChange={(e) => setMass2(parseFloat(e.target.value))}
                    disabled={isRunning}
                    className="w-full mt-1 px-3 py-2 bg-gray-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm opacity-70">Suhu Awal (°C)</label>
                  <input
                    type="number"
                    value={initialTemp}
                    onChange={(e) => setInitialTemp(parseFloat(e.target.value))}
                    disabled={isRunning}
                    className="w-full mt-1 px-3 py-2 bg-gray-700 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className={`card-dark rounded-xl p-4 shadow-lg space-y-2 animate-fade-up`} style={{ animationDelay: '100ms' }}>
              <button
                onClick={startExperiment}
                disabled={isRunning}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${
                  isRunning ? 'bg-gray-700' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                }`}
              >
                <Play size={20} /> {isRunning ? 'Running...' : 'Start Experiment'}
              </button>
              <button
                onClick={resetExperiment}
                className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} /> Reset
              </button>
            </div>

            {/* Calculations */}
            {time > 0 && (
              <div className={`card-dark rounded-xl p-4 shadow-lg animate-fade-up`}>
                <h3 className="font-bold mb-3">Perhitungan</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-blue-900/30 p-3 rounded">
                    <p className="opacity-70 mb-1">Kalor yang diserap/dilepas:</p>
                    <p className="font-mono font-bold">q = m × c × ΔT</p>
                    <p className="font-mono">q = {mass1 + mass2} × 4.18 × {Math.abs(currentExp.deltaT).toFixed(1)}</p>
                    <p className="font-mono text-lg text-blue-400">q = {((mass1 + mass2) * 4.18 * Math.abs(currentExp.deltaT)).toFixed(2)} J</p>
                  </div>
                  <div className="bg-purple-900/30 p-3 rounded">
                    <p className="opacity-70 mb-1">Perubahan entalpi:</p>
                    <p className="font-mono text-lg text-purple-400">ΔH = {currentExp.deltaH} kJ/mol</p>
                  </div>
                  <div className={`${currentExp.type === 'eksoterm' ? 'bg-red-900/30' : 'bg-blue-900/30'} p-3 rounded`}>
                    <p className="font-bold">Kesimpulan: Reaksi {currentExp.type}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={saveTrial} className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-bold">
                    Save Trial
                  </button>
                  <button onClick={exportReport} className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-bold flex items-center justify-center gap-1">
                    <Download size={16} /> Export
                  </button>
                </div>
              </div>
            )}

            {/* Lab Notebook */}
            {trials.length > 0 && (
              <div className={`card-dark rounded-xl p-4 shadow-lg`}>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="text-yellow-400" />
                  <h3 className="font-bold">Lab Notebook</h3>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {trials.map((trial) => (
                    <div key={trial.id} className="bg-gray-700/50 p-2 rounded text-xs">
                      <p className="font-bold">{trial.experiment}</p>
                      <p>ΔT: {trial.deltaT}°C | q: {trial.q}J</p>
                      <p className="opacity-50">{trial.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualLab;
