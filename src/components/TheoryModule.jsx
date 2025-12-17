import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Theory Module Component
const TheoryModule = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [flippedCards, setFlippedCards] = useState({});

    const sections = [
    { id: 0, title: 'Sistem dan Lingkungan', icon: '🔄' },
    { id: 1, title: 'Entalpi dan Perubahan Entalpi', icon: '⚡' },
    { id: 2, title: 'Reaksi Eksoterm dan Endoterm', icon: '🔥' },
    { id: 3, title: 'Persamaan Termokimia', icon: '📝' },
    { id: 4, title: 'Jenis Perubahan Entalpi Standar', icon: '📊' },
    { id: 5, title: 'Perhitungan Entalpi', icon: '🧮' },
    { id: 6, title: 'Hukum Hess', icon: '⚖️' },
    ];

    const toggleCard = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const progress = ((activeSection + 1) / sections.length) * 100;

    return (
    <div className="min-h-screen bg-[#0f0a1e] page-enter">
        {/* Progress Bar */}
        <div className="w-full h-1 md:h-1.5 xl:h-2 bg-[#1a1333]">
        <div 
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
        />
        </div>

        <div className="flex flex-col xl:flex-row">
        {/* Sidebar - Desktop */}
        <aside className="w-full xl:w-64 bg-[#1a1333] border-b xl:border-b-0 xl:border-r border-gray-800 xl:min-h-screen xl:sticky xl:top-0 hidden xl:block">
            <div className="p-4 xl:p-6">
            <h2 className="text-sm md:text-base xl:text-lg font-bold mb-3 md:mb-4 text-white">
                📚 Daftar Topik
            </h2>
            <nav className="space-y-1 xl:space-y-2">
                {sections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 xl:px-4 py-2 xl:py-3 rounded-lg transition-all text-[11px] md:text-xs xl:text-sm ${
                    activeSection === section.id
                        ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                        : 'text-gray-300 hover:bg-[#252040]'
                    }`}
                >
                    <span className="mr-2">{section.icon}</span>
                    <span>{section.title}</span>
                </button>
                ))}
            </nav>
            </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-[#1a1333]/95 backdrop-blur-md border-t border-gray-800 p-2 z-40 safe-area-bottom">
            <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {sections.map((section) => (
                <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-shrink-0 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm transition-all ${
                    activeSection === section.id
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                    : 'bg-[#252040] text-gray-300'
                }`}
                >
                {section.icon}
                </button>
            ))}
            </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-3 md:p-5 xl:p-8 pb-20 xl:pb-8">
            {/* Section 0: Sistem dan Lingkungan */}
            {activeSection === 0 && (
            <div className="max-w-4xl mx-auto animate-fade-up">
                <h1 className="gradient-title text-xl md:text-2xl xl:text-4xl font-extrabold mb-3 md:mb-4 xl:mb-6 tracking-tight">
                🔄 Sistem dan Lingkungan
                </h1>

                <div className="card-dark p-3 md:p-4 xl:p-6 mb-3 md:mb-4 xl:mb-6">
                <h3 className="text-base md:text-lg xl:text-xl font-bold mb-2 md:mb-3 xl:mb-4 text-orange-400">
                    Definisi
                </h3>
                <p className="text-xs md:text-sm xl:text-base text-gray-300 mb-3 md:mb-4">
                    <strong>Sistem</strong> adalah bagian dari alam semesta yang menjadi fokus studi. <strong>Lingkungan</strong> adalah segala sesuatu di luar sistem.
                </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 xl:gap-4 mb-4 md:mb-6">
                {[
                    { type: 'Sistem Terbuka', desc: 'Pertukaran materi dan energi', example: 'Air mendidih tanpa tutup', emoji: '🔓', color: 'bg-blue-500' },
                    { type: 'Sistem Tertutup', desc: 'Hanya pertukaran energi', example: 'Air dalam botol tertutup', emoji: '🔒', color: 'bg-green-500' },
                    { type: 'Sistem Terisolasi', desc: 'Tidak ada pertukaran', example: 'Termos sempurna', emoji: '🛡️', color: 'bg-purple-500' },
                ].map((sys, idx) => (
                    <div
                    key={idx}
                    className="card-dark p-3 md:p-4 xl:p-6 md:hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                    <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full ${sys.color} flex items-center justify-center text-2xl md:text-3xl`}>
                        {sys.emoji}
                    </div>
                    <h4 className="text-base md:text-lg font-bold mb-2 text-center text-white">
                        {sys.type}
                    </h4>
                    <p className="text-xs md:text-sm text-center mb-2 text-gray-400">
                        {sys.desc}
                    </p>
                    <p className="text-xs text-center italic text-gray-500">
                        Contoh: {sys.example}
                    </p>
                    </div>
                ))}
                </div>
            </div>
            )}

            {/* Section 1: Entalpi */}
            {activeSection === 1 && (
            <div className="max-w-4xl mx-auto animate-fade-up">
                <h1 className="gradient-title text-xl md:text-2xl xl:text-4xl font-extrabold mb-3 md:mb-4 xl:mb-6 tracking-tight">
                ⚡ Entalpi dan Perubahan Entalpi
                </h1>

                <div className="card-dark p-3 md:p-4 xl:p-6 mb-3 md:mb-4 xl:mb-6">
                <h3 className="text-base md:text-lg xl:text-xl font-bold mb-2 md:mb-3 xl:mb-4 text-orange-400">
                    Konsep Entalpi (H)
                </h3>
                <p className="text-xs md:text-sm xl:text-base text-gray-300 mb-3 md:mb-4">
                    Entalpi adalah kandungan kalor suatu zat pada tekanan tetap. Yang dapat diukur adalah <strong>perubahan entalpi (ΔH)</strong>.
                </p>
                <div className="bg-[#252040] p-3 md:p-4 rounded-lg">
                    <p className="text-center text-base md:text-lg xl:text-2xl font-mono mb-2 text-white">ΔH = H<sub>produk</sub> - H<sub>reaktan</sub></p>
                    <p className="text-center text-xs md:text-sm text-gray-400">
                    Satuan: kJ/mol
                    </p>
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-5 md:mb-6">
                {[
                    { front: 'ΔH < 0', back: 'Reaksi Eksoterm\nMembebaskan kalor', color: 'from-red-500 to-orange-500' },
                    { front: 'ΔH > 0', back: 'Reaksi Endoterm\nMenyerap kalor', color: 'from-blue-500 to-cyan-500' },
                ].map((card, idx) => (
                    <div
                    key={idx}
                    className="h-32 md:h-40 cursor-pointer"
                    style={{ perspective: '1000px' }}
                    onClick={() => toggleCard(`enth-${idx}`)}
                    >
                    <div 
                        className="relative w-full h-full transition-transform duration-500"
                        style={{ 
                        transformStyle: 'preserve-3d',
                        transform: flippedCards[`enth-${idx}`] ? 'rotateY(180deg)' : 'rotateY(0)'
                        }}
                    >
                        <div 
                        className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center`}
                        style={{ backfaceVisibility: 'hidden' }}
                        >
                        <p className="text-white text-2xl md:text-3xl font-bold">{card.front}</p>
                        </div>
                        <div 
                        className="absolute inset-0 card-dark flex items-center justify-center"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                        <p className="text-center font-semibold whitespace-pre-line text-white text-sm md:text-base">
                            {card.back}
                        </p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
                <p className="text-center text-xs md:text-sm text-gray-500">
                👆 Klik kartu untuk membalik
                </p>
            </div>
            )}

            {/* Section 2: Eksoterm dan Endoterm */}
            {activeSection === 2 && (
            <div className="max-w-4xl mx-auto animate-fade-up">
                <h1 className="gradient-title text-xl md:text-2xl xl:text-4xl font-extrabold mb-3 md:mb-4 xl:mb-6 tracking-tight">
                🔥 Reaksi Eksoterm dan Endoterm
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 xl:gap-6 mb-5 md:mb-6">
                <div className="card-dark p-3 md:p-4 xl:p-6 border-2 border-red-500/30">
                    <h3 className="text-base md:text-lg xl:text-xl font-bold mb-2 md:mb-3 xl:mb-4 text-red-500">🔥 Reaksi Eksoterm</h3>
                    <div className="relative h-32 md:h-40 xl:h-48 mb-3 md:mb-4">
                    <svg viewBox="0 0 200 150" className="w-full h-full">
                        <line x1="20" y1="50" x2="80" y2="50" stroke="#ef4444" strokeWidth="3" />
                        <text x="50" y="40" textAnchor="middle" fill="#fff" fontSize="12">Reaktan</text>
                        <path d="M 80 50 Q 110 20, 140 100" stroke="#ef4444" strokeWidth="2" fill="none" />
                        <line x1="140" y1="100" x2="180" y2="100" stroke="#ef4444" strokeWidth="3" />
                        <text x="160" y="120" textAnchor="middle" fill="#fff" fontSize="12">Produk</text>
                        <text x="100" y="80" fill="#ef4444" fontSize="14" fontWeight="bold">ΔH &lt; 0</text>
                    </svg>
                    </div>
                    <ul className="space-y-2 text-xs md:text-sm text-gray-300">
                    <li>• Melepaskan kalor ke lingkungan</li>
                    <li>• Suhu lingkungan naik</li>
                    <li>• Contoh: Pembakaran, Netralisasi</li>
                    </ul>
                </div>

                <div className="card-dark p-3 md:p-4 xl:p-6 border-2 border-blue-500/30">
                    <h3 className="text-base md:text-lg xl:text-xl font-bold mb-2 md:mb-3 xl:mb-4 text-blue-500">❄️ Reaksi Endoterm</h3>
                    <div className="relative h-32 md:h-40 xl:h-48 mb-3 md:mb-4">
                    <svg viewBox="0 0 200 150" className="w-full h-full">
                        <line x1="20" y1="100" x2="80" y2="100" stroke="#3b82f6" strokeWidth="3" />
                        <text x="50" y="120" textAnchor="middle" fill="#fff" fontSize="12">Reaktan</text>
                        <path d="M 80 100 Q 110 130, 140 50" stroke="#3b82f6" strokeWidth="2" fill="none" />
                        <line x1="140" y1="50" x2="180" y2="50" stroke="#3b82f6" strokeWidth="3" />
                        <text x="160" y="40" textAnchor="middle" fill="#fff" fontSize="12">Produk</text>
                        <text x="100" y="80" fill="#3b82f6" fontSize="14" fontWeight="bold">ΔH &gt; 0</text>
                    </svg>
                    </div>
                    <ul className="space-y-2 text-xs md:text-sm text-gray-300">
                    <li>• Menyerap kalor dari lingkungan</li>
                    <li>• Suhu lingkungan turun</li>
                    <li>• Contoh: Fotosintesis, Pelarutan NH₄NO₃</li>
                    </ul>
                </div>
                </div>
            </div>
            )}

            {/* Section 3: Persamaan Termokimia */}
            {activeSection === 3 && (
            <div className="max-w-4xl mx-auto animate-fade-up">
                <h1 className="gradient-title text-xl md:text-2xl xl:text-4xl font-extrabold mb-3 md:mb-4 xl:mb-6 tracking-tight">
                📝 Persamaan Termokimia
                </h1>

                <div className="card-dark p-3 md:p-4 xl:p-6 mb-3 md:mb-4 xl:mb-6">
                <h3 className="text-base md:text-lg xl:text-xl font-bold mb-2 md:mb-3 xl:mb-4 text-orange-400">
                    Aturan Penulisan
                </h3>
                <ol className="space-y-2 md:space-y-3 text-xs md:text-sm xl:text-base text-gray-300">
                    <li><strong>1.</strong> Tulis wujud zat: (s), (l), (g), (aq)</li>
                    <li><strong>2.</strong> Nilai ΔH ditulis di sebelah kanan dengan satuan</li>
                    <li><strong>3.</strong> Koefisien dapat berupa pecahan</li>
                    <li><strong>4.</strong> Jika persamaan dibalik, tanda ΔH berubah</li>
                    <li><strong>5.</strong> Jika koefisien dikalikan n, ΔH juga dikalikan n</li>
                </ol>
                </div>

                <div className="card-dark p-3 md:p-4 xl:p-6">
                <h3 className="text-base md:text-lg xl:text-xl font-bold mb-2 md:mb-3 xl:mb-4 text-orange-400">
                    Contoh
                </h3>
                <div className="bg-[#252040] p-3 md:p-4 rounded-lg mb-3 md:mb-4">
                    <p className="font-mono text-xs md:text-sm xl:text-lg mb-2 text-white overflow-x-auto">
                    CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)  ΔH = -890 kJ
                    </p>
                    <p className="text-xs md:text-sm text-green-400">
                    ✅ Eksoterm - Melepaskan 890 kJ energi
                    </p>
                </div>
                <div className="bg-[#252040] p-3 md:p-4 rounded-lg">
                    <p className="font-mono text-xs md:text-sm xl:text-lg mb-2 text-white overflow-x-auto">
                    N₂(g) + O₂(g) → 2NO(g)  ΔH = +180 kJ
                    </p>
                    <p className="text-xs md:text-sm text-blue-400">
                    ✅ Endoterm - Memerlukan 180 kJ energi
                    </p>
                </div>
                </div>
            </div>
            )}

            {/* Section 4: Jenis ΔH Standar */}
            {activeSection === 4 && (
            <div className="max-w-4xl mx-auto animate-fade-up">
                <h1 className="gradient-title text-xl md:text-2xl xl:text-4xl font-extrabold mb-3 md:mb-4 xl:mb-6 tracking-tight">
                📊 Jenis Perubahan Entalpi Standar
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {[
                    { symbol: 'ΔH°f', name: 'Entalpi Pembentukan', desc: 'Pembentukan 1 mol senyawa dari unsur-unsurnya' },
                    { symbol: 'ΔH°c', name: 'Entalpi Pembakaran', desc: 'Pembakaran 1 mol zat dengan O₂' },
                    { symbol: 'ΔH°d', name: 'Entalpi Penguraian', desc: 'Penguraian 1 mol senyawa' },
                    { symbol: 'ΔH°n', name: 'Entalpi Netralisasi', desc: 'Pembentukan 1 mol H₂O dari asam-basa' },
                    { symbol: 'ΔH°sol', name: 'Entalpi Pelarutan', desc: 'Melarutkan 1 mol zat' },
                    { symbol: 'ΔH°vap', name: 'Entalpi Penguapan', desc: 'Menguapkan 1 mol zat cair' },
                ].map((item, idx) => (
                    <div
                    key={idx}
                    className="card-dark p-3 md:p-4 xl:p-6"
                    >
                    <div className="flex items-start gap-3">
                        <span className="text-lg md:text-xl xl:text-2xl font-bold text-orange-500">{item.symbol}</span>
                        <div>
                        <h4 className="font-bold mb-1 text-white text-sm md:text-base">
                            {item.name}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-400">
                            {item.desc}
                        </p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            )}

            {/* Section 5: Perhitungan */}
            {activeSection === 5 && (
            <div className="max-w-4xl mx-auto animate-fade-up">
                <h1 className="gradient-title text-xl md:text-2xl xl:text-4xl font-extrabold mb-3 md:mb-4 xl:mb-6 tracking-tight">
                🧮 Perhitungan Entalpi
                </h1>

                <div className="card-dark p-3 md:p-4 xl:p-6 mb-3 md:mb-4 xl:mb-6">
                <h3 className="text-base md:text-lg xl:text-xl font-bold mb-2 md:mb-3 xl:mb-4 text-orange-400">
                    Metode 1: Dari ΔH°f
                </h3>
                <div className="bg-[#252040] p-3 md:p-4 rounded-lg mb-3 md:mb-4">
                    <p className="text-center text-sm md:text-base xl:text-xl font-mono text-white overflow-x-auto">
                    ΔH°reaksi = Σ ΔH°f (produk) - Σ ΔH°f (reaktan)
                    </p>
                </div>
                </div>

                <div className="card-dark p-3 md:p-4 xl:p-6">
                <h3 className="text-base md:text-lg xl:text-xl font-bold mb-2 md:mb-3 xl:mb-4 text-orange-400">
                    Metode 2: Dari Energi Ikatan
                </h3>
                <div className="bg-[#252040] p-3 md:p-4 rounded-lg">
                    <p className="text-center text-sm md:text-base xl:text-xl font-mono text-white overflow-x-auto">
                    ΔH = Σ (Ikatan putus) - Σ (Ikatan terbentuk)
                    </p>
                </div>
                </div>
            </div>
            )}

            {/* Section 6: Hukum Hess */}
            {activeSection === 6 && (
            <div className="max-w-4xl mx-auto animate-fade-up">
                <h1 className="gradient-title text-xl md:text-2xl xl:text-4xl font-extrabold mb-3 md:mb-4 xl:mb-6 tracking-tight">
                ⚖️ Hukum Hess
                </h1>

                <div className="card-dark p-3 md:p-4 xl:p-6 mb-3 md:mb-4 xl:mb-6">
                <p className="text-xs md:text-sm xl:text-lg italic mb-3 md:mb-4 text-gray-300">
                    "Perubahan entalpi reaksi tidak bergantung pada jalannya reaksi, tetapi hanya pada keadaan awal dan akhir."
                </p>
                <p className="text-right text-gray-400 text-[11px] md:text-xs xl:text-base">
                    - Germain Henri Hess (1840)
                </p>
                </div>

                <div className="card-dark p-3 md:p-4 xl:p-6 mb-3 md:mb-4 xl:mb-6">
                <h3 className="text-base md:text-lg xl:text-xl font-bold mb-2 md:mb-3 xl:mb-4 text-orange-400">
                    Contoh Perhitungan
                </h3>
                <div className="bg-[#252040] p-3 md:p-4 rounded-lg space-y-2 overflow-x-auto">
                    <p className="font-mono text-xs md:text-sm text-white">1) C(s) + ½O₂(g) → CO(g)    ΔH₁ = -110.5 kJ</p>
                    <p className="font-mono text-xs md:text-sm text-white">2) CO(g) + ½O₂(g) → CO₂(g)  ΔH₂ = -283.0 kJ</p>
                    <hr className="my-2 border-gray-600" />
                    <p className="font-mono text-xs md:text-sm font-bold text-green-500">
                    C(s) + O₂(g) → CO₂(g)    ΔH = -393.5 kJ ✓
                    </p>
                </div>
                </div>
            </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-5 md:mt-6 xl:mt-8 max-w-4xl mx-auto">
            <button
                onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                disabled={activeSection === 0}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base ${
                activeSection === 0
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-[#252040] text-white hover:bg-[#2a2550]'
                }`}
            >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden md:inline">Sebelumnya</span><span className="md:hidden">Prev</span>
            </button>
            <button
                onClick={() => setActiveSection(Math.min(6, activeSection + 1))}
                disabled={activeSection === 6}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base ${
                activeSection === 6
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:shadow-lg'
                }`}
            >
                <span className="hidden md:inline">Selanjutnya</span><span className="md:hidden">Next</span> <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            </div>
        </main>
        </div>
    </div>
    );
};

export default TheoryModule;
