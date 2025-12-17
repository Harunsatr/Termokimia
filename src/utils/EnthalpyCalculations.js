/**
 * enthalpyCalculations.js
 * Utilitas perhitungan termokimia
 * Referensi: Raymond Chang - Chemistry (13th Ed), Atkins - Physical Chemistry
 */

// ========== KONSTANTA ==========
export const CONSTANTS = {
  R_J: 8.314, // J/(mol·K)
  R_L_ATM: 0.0821, // L·atm/(mol·K)
  R_CAL: 1.987, // cal/(mol·K)
  AVOGADRO: 6.022e23,
  KJ_TO_KCAL: 0.239, // 1 kJ = 0.239 kcal
  KCAL_TO_KJ: 4.184, // 1 kcal = 4.184 kJ
  J_TO_CAL: 0.239, // 1 J = 0.239 cal
  CAL_TO_J: 4.184 // 1 cal = 4.184 J
};

// ========== KONVERSI SATUAN ==========

/**
 * Konversi energi antar satuan
 * @param {number} value - Nilai yang akan dikonversi
 * @param {string} from - Satuan awal ('kJ', 'kcal', 'J', 'cal')
 * @param {string} to - Satuan tujuan
 * @returns {number} Nilai setelah konversi
 */
export function convertEnergy(value, from, to) {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('Input harus berupa angka valid');
  }

  const conversions = {
    'kJ->kcal': v => v * CONSTANTS.KJ_TO_KCAL,
    'kcal->kJ': v => v * CONSTANTS.KCAL_TO_KJ,
    'J->cal': v => v * CONSTANTS.J_TO_CAL,
    'cal->J': v => v * CONSTANTS.CAL_TO_J,
    'kJ->J': v => v * 1000,
    'J->kJ': v => v / 1000,
    'kcal->cal': v => v * 1000,
    'cal->kcal': v => v / 1000
  };

  const key = `${from}->${to}`;
  if (from === to) return value;
  if (!conversions[key]) {
    throw new Error(`Konversi ${from} ke ${to} tidak didukung`);
  }

  return conversions[key](value);
}

// ========== PERHITUNGAN KALOR ==========

/**
 * Hitung kalor: q = m × c × ΔT
 * @param {number} mass - Massa (gram)
 * @param {number} specificHeat - Kalor jenis (J/g°C)
 * @param {number} tempChange - Perubahan suhu (°C)
 * @returns {object} { q_J, q_kJ, q_cal, q_kcal }
 */
export function calculateHeat(mass, specificHeat, tempChange) {
  if ([mass, specificHeat, tempChange].some(v => typeof v !== 'number' || isNaN(v))) {
    throw new Error('Semua input harus berupa angka valid');
  }

  const q_J = mass * specificHeat * tempChange;
  
  return {
    q_J: parseFloat(q_J.toFixed(2)),
    q_kJ: parseFloat((q_J / 1000).toFixed(2)),
    q_cal: parseFloat((q_J * CONSTANTS.J_TO_CAL).toFixed(2)),
    q_kcal: parseFloat((q_J * CONSTANTS.J_TO_CAL / 1000).toFixed(2))
  };
}

/**
 * Hitung suhu akhir pencampuran (asas Black)
 * @param {number} m1 - Massa zat 1 (gram)
 * @param {number} c1 - Kalor jenis zat 1 (J/g°C)
 * @param {number} T1 - Suhu awal zat 1 (°C)
 * @param {number} m2 - Massa zat 2 (gram)
 * @param {number} c2 - Kalor jenis zat 2 (J/g°C)
 * @param {number} T2 - Suhu awal zat 2 (°C)
 * @returns {number} Suhu akhir (°C)
 */
export function calculateFinalTemp(m1, c1, T1, m2, c2, T2) {
  const inputs = [m1, c1, T1, m2, c2, T2];
  if (inputs.some(v => typeof v !== 'number' || isNaN(v))) {
    throw new Error('Semua input harus berupa angka valid');
  }

  // m1·c1·(T1-Tf) = m2·c2·(Tf-T2)
  // m1·c1·T1 - m1·c1·Tf = m2·c2·Tf - m2·c2·T2
  // m1·c1·T1 + m2·c2·T2 = Tf(m1·c1 + m2·c2)
  
  const Tf = (m1 * c1 * T1 + m2 * c2 * T2) / (m1 * c1 + m2 * c2);
  return parseFloat(Tf.toFixed(2));
}

// ========== PERHITUNGAN ΔH ==========

/**
 * Hitung ΔH dari ΔH°f: ΔH = Σ(ΔH°f produk) - Σ(ΔH°f reaktan)
 * @param {Array} products - [{formula: 'CO2', coefficient: 2, Hf: -393.5}, ...]
 * @param {Array} reactants - [{formula: 'C2H6', coefficient: 1, Hf: -84.7}, ...]
 * @returns {object} { deltaH, unit: 'kJ', breakdown }
 */
export function calculateDeltaH_fromFormation(products, reactants) {
  if (!Array.isArray(products) || !Array.isArray(reactants)) {
    throw new Error('Products dan reactants harus berupa array');
  }

  const sumProducts = products.reduce((sum, p) => {
    if (!p.coefficient || !p.Hf) throw new Error('Data tidak lengkap');
    return sum + (p.coefficient * p.Hf);
  }, 0);

  const sumReactants = reactants.reduce((sum, r) => {
    if (!r.coefficient || !r.Hf) throw new Error('Data tidak lengkap');
    return sum + (r.coefficient * r.Hf);
  }, 0);

  const deltaH = sumProducts - sumReactants;

  return {
    deltaH: parseFloat(deltaH.toFixed(2)),
    unit: 'kJ',
    breakdown: {
      sumProducts: parseFloat(sumProducts.toFixed(2)),
      sumReactants: parseFloat(sumReactants.toFixed(2))
    },
    type: deltaH < 0 ? 'eksoterm' : 'endoterm'
  };
}

/**
 * Hitung ΔH dari energi ikatan
 * ΔH = Σ(energi ikatan putus) - Σ(energi ikatan terbentuk)
 * @param {Array} bondsBroken - [{type: 'C-H', count: 4, energy: 413}, ...]
 * @param {Array} bondsFormed - [{type: 'C=O', count: 2, energy: 799}, ...]
 * @returns {object} { deltaH, unit: 'kJ', breakdown }
 */
export function calculateDeltaH_fromBonds(bondsBroken, bondsFormed) {
  if (!Array.isArray(bondsBroken) || !Array.isArray(bondsFormed)) {
    throw new Error('Input harus berupa array');
  }

  const energyBroken = bondsBroken.reduce((sum, b) => {
    if (!b.count || !b.energy) throw new Error('Data ikatan tidak lengkap');
    return sum + (b.count * b.energy);
  }, 0);

  const energyFormed = bondsFormed.reduce((sum, b) => {
    if (!b.count || !b.energy) throw new Error('Data ikatan tidak lengkap');
    return sum + (b.count * b.energy);
  }, 0);

  const deltaH = energyBroken - energyFormed;

  return {
    deltaH: parseFloat(deltaH.toFixed(2)),
    unit: 'kJ',
    breakdown: {
      energyBroken: parseFloat(energyBroken.toFixed(2)),
      energyFormed: parseFloat(energyFormed.toFixed(2))
    },
    type: deltaH < 0 ? 'eksoterm' : 'endoterm'
  };
}

// ========== HUKUM HESS ==========

/**
 * Solver Hukum Hess sederhana
 * @param {Array} equations - [{deltaH: -394, coefficient: 1}, {deltaH: -283, coefficient: -1}, ...]
 * @returns {number} ΔH total
 */
export function hessLawSolver(equations) {
  if (!Array.isArray(equations)) {
    throw new Error('Input harus berupa array persamaan');
  }

  const totalDeltaH = equations.reduce((sum, eq) => {
    if (typeof eq.deltaH !== 'number' || typeof eq.coefficient !== 'number') {
      throw new Error('Format persamaan tidak valid');
    }
    return sum + (eq.deltaH * eq.coefficient);
  }, 0);

  return parseFloat(totalDeltaH.toFixed(2));
}

// ========== VALIDASI & BALANCE ==========

/**
 * Validasi persamaan termokimia
 * @param {string} equation - "CH4 + 2O2 -> CO2 + 2H2O"
 * @returns {object} { valid, message, parsed }
 */
export function validateThermochemicalEquation(equation) {
  if (typeof equation !== 'string' || !equation.trim()) {
    return { valid: false, message: 'Persamaan tidak valid' };
  }

  // Cek format dasar
  const hasArrow = equation.includes('->') || equation.includes('→');
  if (!hasArrow) {
    return { valid: false, message: 'Persamaan harus memiliki tanda panah (-> atau →)' };
  }

  const parts = equation.split(/->|→/);
  if (parts.length !== 2) {
    return { valid: false, message: 'Format persamaan salah' };
  }

  const [reactants, products] = parts.map(p => p.trim());
  
  if (!reactants || !products) {
    return { valid: false, message: 'Reaktan atau produk kosong' };
  }

  return {
    valid: true,
    message: 'Persamaan valid',
    parsed: { reactants, products }
  };
}

/**
 * Parse koefisien dan formula dari string
 * @param {string} compound - "2H2O" atau "H2O"
 * @returns {object} { coefficient, formula }
 */
export function parseCompound(compound) {
  const match = compound.trim().match(/^(\d*\.?\d+)?([A-Z][a-z]?\d*)+$/);
  if (!match) {
    throw new Error(`Format senyawa tidak valid: ${compound}`);
  }

  return {
    coefficient: parseFloat(match[1] || 1),
    formula: compound.replace(/^[\d.]+/, '')
  };
}

// ========== HELPER FUNCTIONS ==========

/**
 * Hitung mol dari massa dan Mr
 * @param {number} mass - Massa (gram)
 * @param {number} Mr - Massa molekul relatif
 * @returns {number} Jumlah mol
 */
export function calculateMol(mass, Mr) {
  if (typeof mass !== 'number' || typeof Mr !== 'number' || Mr === 0) {
    throw new Error('Input tidak valid');
  }
  return parseFloat((mass / Mr).toFixed(4));
}

/**
 * Hitung massa dari mol dan Mr
 * @param {number} mol - Jumlah mol
 * @param {number} Mr - Massa molekul relatif
 * @returns {number} Massa (gram)
 */
export function calculateMass(mol, Mr) {
  if (typeof mol !== 'number' || typeof Mr !== 'number') {
    throw new Error('Input tidak valid');
  }
  return parseFloat((mol * Mr).toFixed(2));
}

/**
 * Format hasil perhitungan untuk tampilan
 * @param {number} value - Nilai numerik
 * @param {string} unit - Satuan
 * @param {number} decimals - Jumlah desimal
 * @returns {string} String terformat
 */
export function formatResult(value, unit = '', decimals = 2) {
  if (typeof value !== 'number') return 'N/A';
  return `${value.toFixed(decimals)} ${unit}`.trim();
}

// Export default untuk kemudahan import
export default {
  CONSTANTS,
  convertEnergy,
  calculateHeat,
  calculateFinalTemp,
  calculateDeltaH_fromFormation,
  calculateDeltaH_fromBonds,
  hessLawSolver,
  validateThermochemicalEquation,
  parseCompound,
  calculateMol,
  calculateMass,
  formatResult
};