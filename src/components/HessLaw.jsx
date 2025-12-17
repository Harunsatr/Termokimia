import React, { useState } from 'react';
import { Plus, Minus, X, RotateCcw, Check, Lightbulb } from 'lucide-react';

const HessLawSimulation = () => {
  const [mode, setMode] = useState('guided');
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const examples = {
    guided: {
      title: "Pembentukan CO₂ melalui CO",
      target: "C(s) + O₂(g) → CO₂(g)",
      targetDH: -393.5,
      reactions: [
        { id: 1, equation: "C(s) + ½O₂(g) → CO(g)", dH: -110.5, coef: 1, flipped: false },
        { id: 2, equation: "CO(g) + ½O₂(g) → CO₂(g)", dH: -283.0, coef: 1, flipped: false }
      ],
      hint: "Jumlahkan kedua reaksi. Perhatikan CO akan tereliminasi.",
      explanation: "Menurut Hukum Hess, ΔH total = ΔH₁ + ΔH₂ = -110.5 + (-283.0) = -393.5 kJ/mol"
    },
    practice: {
      title: "Pembakaran Karbon",
      target: "C(s) + O₂(g) → CO₂(g)",
      targetDH: -393.5,
      reactions: [
        { id: 1, equation: "C(s) + ½O₂(g) → CO(g)", dH: -110.5, coef: 1, flipped: false },
        { id: 2, equation: "CO₂(g) → CO(g) + ½O₂(g)", dH: 283.0, coef: 1, flipped: false }
      ],
      hint: "Flip reaksi kedua agar CO₂ ada di sisi produk",
      explanation: "Flip reaksi 2: ΔH = -110.5 + (-283.0) = -393.5 kJ/mol"
    },
    challenge: {
      title: "Pembentukan NH₃ (Haber)",
      target: "½N₂(g) + 3/2H₂(g) → NH₃(g)",
      targetDH: -46.1,
      reactions: [
        { id: 1, equation: "N₂(g) + 3H₂(g) → 2NH₃(g)", dH: -92.2, coef: 1, flipped: false },
        { id: 2, equation: "H₂(g) + ½O₂(g) → H₂O(l)", dH: -285.8, coef: 1, flipped: false }
      ],
      hint: "Kalikan reaksi 1 dengan ½ untuk mendapatkan 1 mol NH₃",
      explanation: "Gunakan reaksi 1 saja, kalikan dengan ½: ΔH = -92.2 × ½ = -46.1 kJ/mol"
    }
  };

  const [currentExample, setCurrentExample] = useState(examples[mode]);
  const [reactions, setReactions] = useState([...currentExample.reactions]);

  const flipReaction = (id) => {
    setReactions(reactions.map(r => 
      r.id === id ? { ...r, dH: -r.dH, flipped: !r.flipped } : r
    ));
  };

  const multiplyReaction = (id, factor) => {
    setReactions(reactions.map(r => 
      r.id === id ? { ...r, dH: r.dH * factor, coef: r.coef * factor } : r
    ));
  };

  const calculateTotal = () => {
    return reactions.reduce((sum, r) => sum + r.dH, 0).toFixed(1);
  };

  const checkAnswer = () => {
    const total = parseFloat(calculateTotal());
    const target = currentExample.targetDH;
    if (Math.abs(total - target) < 0.5) {
      setFeedback('✅ Benar! ΔH = ' + total + ' kJ/mol');
    } else {
      setFeedback('❌ Belum tepat. Coba lagi atau lihat hint.');
    }
  };

  const resetSimulation = () => {
    setReactions([...currentExample.reactions]);
    setFeedback('');
    setShowHint(false);
    setShowExplanation(false);
    setUserAnswer('');
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setCurrentExample(examples[newMode]);
    setReactions([...examples[newMode].reactions]);
    setFeedback('');
    setShowHint(false);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen p-2 md:p-4 xl:p-6 bg-[#0f0a1e] text-white page-enter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 md:mb-4 xl:mb-6 gap-2">
          <h1 className="text-lg md:text-2xl xl:text-3xl font-bold gradient-title">Simulasi Hukum Hess</h1>
        </div>

        {/* Mode Selection */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 xl:gap-3 mb-3 md:mb-4 xl:mb-6">
          {['guided', 'practice', 'challenge'].map(m => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`px-3 md:px-4 xl:px-6 py-1.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm xl:text-base transition ${
                mode === m 
                  ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white' 
                  : 'card-dark hover:opacity-80'
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 md:gap-4 xl:gap-6">
          {/* Left Panel - Reactions */}
          <div className="xl:col-span-2 space-y-2 md:space-y-3 xl:space-y-4">
            {/* Target Reaction */}
            <div className="card-dark p-3 md:p-4 xl:p-6 border-2 border-green-500">
              <h2 className="font-bold text-sm md:text-base xl:text-lg mb-1.5 md:mb-2">{currentExample.title}</h2>
              <p className="text-base md:text-lg xl:text-xl mb-1.5 md:mb-2 text-white overflow-x-auto">{currentExample.target}</p>
              <p className="text-green-400 text-xs md:text-sm xl:text-base">ΔH° = ? (Target: {currentExample.targetDH} kJ/mol)</p>
            </div>

            {/* Reactions List */}
            <div className="space-y-2 md:space-y-3">
              {reactions.map((reaction, idx) => (
                <div key={reaction.id} className="card-dark p-2.5 md:p-3 xl:p-4">
                  <div className="flex flex-col md:flex-row items-start justify-between mb-2 md:mb-3 gap-1.5 md:gap-2">
                    <div className="flex-1">
                      <p className="font-mono text-[10px] md:text-xs xl:text-sm text-gray-400">Reaksi {idx + 1}</p>
                      <p className="text-sm md:text-base xl:text-lg text-white overflow-x-auto">{reaction.equation}</p>
                      <p className={`text-sm md:text-base xl:text-lg font-bold ${reaction.dH < 0 ? 'text-blue-400' : 'text-red-400'}`}>
                        ΔH = {reaction.dH > 0 ? '+' : ''}{reaction.dH.toFixed(1)} kJ/mol
                        {reaction.coef !== 1 && ` (×${reaction.coef})`}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    <button
                      onClick={() => flipReaction(reaction.id)}
                      className="px-2 md:px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-[10px] md:text-xs xl:text-sm"
                      title="Balik reaksi"
                    >
                      <RotateCcw size={12} className="inline md:mr-1" /> <span className="hidden md:inline">Flip</span>
                    </button>
                    <button
                      onClick={() => multiplyReaction(reaction.id, 2)}
                      className="px-2 md:px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-[10px] md:text-xs xl:text-sm"
                    >
                      ×2
                    </button>
                    <button
                      onClick={() => multiplyReaction(reaction.id, 0.5)}
                      className="px-2 md:px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-[10px] md:text-xs xl:text-sm"
                    >
                      ×½
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculation Result */}
            <div className="card-dark p-3 md:p-4 xl:p-6 animate-scale-in">
              <h3 className="font-bold text-base md:text-lg xl:text-xl mb-2 md:mb-3 xl:mb-4 text-white">Perhitungan Total</h3>
              <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                {reactions.map((r, idx) => (
                  <div key={r.id} className="flex justify-between items-center text-xs md:text-sm xl:text-base">
                    <span className="text-gray-300">Reaksi {idx + 1}:</span>
                    <span className="font-mono text-white">{r.dH > 0 ? '+' : ''}{r.dH.toFixed(1)} kJ/mol</span>
                  </div>
                ))}
                <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between font-bold text-base md:text-lg xl:text-xl">
                  <span className="text-white">Total ΔH:</span>
                  <span className={calculateTotal() < 0 ? 'text-blue-400' : 'text-red-400'}>
                    {calculateTotal()} kJ/mol
                  </span>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="mt-4">
                <div className="h-6 md:h-8 bg-[#252040] rounded-lg overflow-hidden flex">
                  {reactions.map((r, idx) => {
                    const total = Math.abs(reactions.reduce((sum, rx) => sum + rx.dH, 0));
                    const width = total > 0 ? (Math.abs(r.dH) / total * 100) : 0;
                    return (
                      <div
                        key={r.id}
                        className={`h-full ${r.dH < 0 ? 'bg-blue-500' : 'bg-red-500'}`}
                        style={{ width: `${width}%` }}
                        title={`${r.dH.toFixed(1)} kJ/mol`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2 md:gap-3 mt-4">
                <button
                  onClick={checkAnswer}
                  className="flex-1 py-2 md:py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base"
                >
                  <Check size={18} /> Check
                </button>
                <button
                  onClick={resetSimulation}
                  className="px-3 md:px-4 py-2 md:py-3 bg-[#252040] hover:bg-[#2a2550] rounded-lg"
                >
                  <RotateCcw size={18} />
                </button>
              </div>

              {feedback && (
                <div className={`mt-4 p-3 md:p-4 rounded-lg text-sm md:text-base animate-fade-in ${
                  feedback.includes('✅') ? 'bg-green-900/50 border border-green-500/30' : 'bg-red-900/50 border border-red-500/30'
                }`}>
                  {feedback}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Help */}
          <div className="space-y-3 md:space-y-4">
            <div className="card-dark p-3 md:p-4">
              <h3 className="font-bold mb-2 md:mb-3 text-white text-sm md:text-base">Hukum Hess</h3>
              <p className="text-xs md:text-sm mb-3 text-gray-300">
                Perubahan entalpi suatu reaksi tidak bergantung pada jalannya reaksi, 
                tetapi hanya bergantung pada keadaan awal dan akhir.
              </p>
              <div className="text-xs space-y-2 text-gray-400">
                <p><strong className="text-white">Tips:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Flip reaksi jika perlu membalik posisi reaktan/produk</li>
                  <li>Kalikan koefisien jika jumlah mol tidak sesuai</li>
                  <li>Jumlahkan semua ΔH untuk mendapat total</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowHint(!showHint)}
              className="w-full p-3 md:p-4 rounded-lg flex items-center gap-2 bg-yellow-900/50 hover:bg-yellow-900/70 border border-yellow-500/30 text-sm md:text-base"
            >
              <Lightbulb size={18} className="text-yellow-400" />
              <span className="font-semibold text-yellow-400">{showHint ? 'Sembunyikan' : 'Tampilkan'} Hint</span>
            </button>

            {showHint && (
              <div className="p-3 md:p-4 rounded-lg bg-yellow-900/30 border border-yellow-500/20 animate-fade-up">
                <p className="text-xs md:text-sm text-yellow-200">{currentExample.hint}</p>
              </div>
            )}

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full p-3 md:p-4 rounded-lg bg-blue-900/50 hover:bg-blue-900/70 border border-blue-500/30 text-sm md:text-base"
            >
              <span className="font-semibold text-blue-400">{showExplanation ? 'Sembunyikan' : 'Tampilkan'} Penjelasan</span>
            </button>

            {showExplanation && (
              <div className="p-3 md:p-4 rounded-lg bg-blue-900/30 border border-blue-500/20 animate-fade-up">
                <p className="text-xs md:text-sm text-blue-200">{currentExample.explanation}</p>
              </div>
            )}

            <div className="card-dark p-3 md:p-4">
              <h4 className="font-bold mb-2 text-white text-sm md:text-base">Mode Info</h4>
              <div className="text-xs md:text-sm space-y-1 md:space-y-2 text-gray-400">
                <p><strong className="text-green-400">Guided:</strong> Contoh dengan langkah jelas</p>
                <p><strong className="text-yellow-400">Practice:</strong> Latihan mandiri</p>
                <p><strong className="text-red-400">Challenge:</strong> Soal kompleks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HessLawSimulation;