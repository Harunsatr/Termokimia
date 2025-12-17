/**
 * thermochemistryData.js
 * Data termokimia standar
 * Sumber: 
 * - Raymond Chang, Chemistry 13th Edition
 * - Atkins, Physical Chemistry 11th Edition
 * - NIST Chemistry WebBook
 * - CRC Handbook of Chemistry and Physics
 */

// ========== ΔH°f STANDAR (kJ/mol) pada 25°C, 1 atm ==========
export const ENTHALPY_FORMATION = [
  // Gas
  { formula: 'H2O(g)', name: 'Uap air', Hf: -241.8, state: 'gas' },
  { formula: 'CO2(g)', name: 'Karbon dioksida', Hf: -393.5, state: 'gas' },
  { formula: 'CO(g)', name: 'Karbon monoksida', Hf: -110.5, state: 'gas' },
  { formula: 'NH3(g)', name: 'Amonia', Hf: -46.1, state: 'gas' },
  { formula: 'NO(g)', name: 'Nitrogen monoksida', Hf: 90.3, state: 'gas' },
  { formula: 'NO2(g)', name: 'Nitrogen dioksida', Hf: 33.2, state: 'gas' },
  { formula: 'SO2(g)', name: 'Sulfur dioksida', Hf: -296.8, state: 'gas' },
  { formula: 'SO3(g)', name: 'Sulfur trioksida', Hf: -395.7, state: 'gas' },
  { formula: 'H2S(g)', name: 'Hidrogen sulfida', Hf: -20.6, state: 'gas' },
  { formula: 'HCl(g)', name: 'Hidrogen klorida', Hf: -92.3, state: 'gas' },
  { formula: 'HBr(g)', name: 'Hidrogen bromida', Hf: -36.4, state: 'gas' },
  { formula: 'HI(g)', name: 'Hidrogen iodida', Hf: 26.5, state: 'gas' },
  { formula: 'CH4(g)', name: 'Metana', Hf: -74.8, state: 'gas' },
  { formula: 'C2H6(g)', name: 'Etana', Hf: -84.7, state: 'gas' },
  { formula: 'C3H8(g)', name: 'Propana', Hf: -103.8, state: 'gas' },
  { formula: 'C2H4(g)', name: 'Etena', Hf: 52.3, state: 'gas' },
  { formula: 'C2H2(g)', name: 'Etuna (asetilena)', Hf: 226.7, state: 'gas' },
  
  // Liquid
  { formula: 'H2O(l)', name: 'Air', Hf: -285.8, state: 'liquid' },
  { formula: 'CH3OH(l)', name: 'Metanol', Hf: -238.7, state: 'liquid' },
  { formula: 'C2H5OH(l)', name: 'Etanol', Hf: -277.7, state: 'liquid' },
  { formula: 'C6H6(l)', name: 'Benzena', Hf: 49.0, state: 'liquid' },
  { formula: 'CCl4(l)', name: 'Karbon tetraklorida', Hf: -135.4, state: 'liquid' },
  { formula: 'CHCl3(l)', name: 'Kloroform', Hf: -134.5, state: 'liquid' },
  
  // Aqueous
  { formula: 'HCl(aq)', name: 'Asam klorida', Hf: -167.2, state: 'aqueous' },
  { formula: 'HNO3(aq)', name: 'Asam nitrat', Hf: -207.4, state: 'aqueous' },
  { formula: 'H2SO4(aq)', name: 'Asam sulfat', Hf: -909.3, state: 'aqueous' },
  { formula: 'NaOH(aq)', name: 'Natrium hidroksida', Hf: -470.1, state: 'aqueous' },
  
  // Solid
  { formula: 'CaCO3(s)', name: 'Kalsium karbonat', Hf: -1206.9, state: 'solid' },
  { formula: 'CaO(s)', name: 'Kalsium oksida', Hf: -635.1, state: 'solid' },
  { formula: 'Fe2O3(s)', name: 'Besi(III) oksida', Hf: -824.2, state: 'solid' },
  { formula: 'Al2O3(s)', name: 'Aluminium oksida', Hf: -1675.7, state: 'solid' },
  { formula: 'NaCl(s)', name: 'Natrium klorida', Hf: -411.2, state: 'solid' },
  { formula: 'MgO(s)', name: 'Magnesium oksida', Hf: -601.7, state: 'solid' }
];

// ========== ENERGI IKATAN RATA-RATA (kJ/mol) ==========
export const BOND_ENERGIES = [
  { bond: 'H-H', energy: 436, description: 'Ikatan hidrogen-hidrogen' },
  { bond: 'C-H', energy: 413, description: 'Ikatan karbon-hidrogen' },
  { bond: 'C-C', energy: 348, description: 'Ikatan tunggal karbon-karbon' },
  { bond: 'C=C', energy: 614, description: 'Ikatan rangkap dua karbon' },
  { bond: 'C≡C', energy: 839, description: 'Ikatan rangkap tiga karbon' },
  { bond: 'C-O', energy: 358, description: 'Ikatan karbon-oksigen' },
  { bond: 'C=O', energy: 799, description: 'Ikatan rangkap karbon-oksigen (keton)' },
  { bond: 'C=O', energy: 745, description: 'Ikatan rangkap C=O (CO2)', note: 'dalam CO2' },
  { bond: 'O-H', energy: 463, description: 'Ikatan oksigen-hidrogen' },
  { bond: 'O=O', energy: 495, description: 'Ikatan oksigen-oksigen' },
  { bond: 'N-H', energy: 391, description: 'Ikatan nitrogen-hidrogen' },
  { bond: 'N≡N', energy: 941, description: 'Ikatan rangkap tiga nitrogen' },
  { bond: 'Cl-Cl', energy: 243, description: 'Ikatan klorin-klorin' },
  { bond: 'Br-Br', energy: 193, description: 'Ikatan bromin-bromin' },
  { bond: 'I-I', energy: 151, description: 'Ikatan iodin-iodin' },
  { bond: 'H-Cl', energy: 431, description: 'Ikatan hidrogen-klorin' },
  { bond: 'H-Br', energy: 366, description: 'Ikatan hidrogen-bromin' },
  { bond: 'H-I', energy: 298, description: 'Ikatan hidrogen-iodin' },
  { bond: 'S-H', energy: 339, description: 'Ikatan sulfur-hidrogen' },
  { bond: 'S=O', energy: 523, description: 'Ikatan rangkap sulfur-oksigen' }
];

// ========== KALOR JENIS (J/g°C) ==========
export const SPECIFIC_HEATS = [
  { substance: 'Air (H2O)', c: 4.18, state: 'liquid', common: true },
  { substance: 'Es (H2O)', c: 2.09, state: 'solid', common: true },
  { substance: 'Uap air (H2O)', c: 2.01, state: 'gas', common: false },
  { substance: 'Aluminium (Al)', c: 0.897, state: 'solid', common: true },
  { substance: 'Tembaga (Cu)', c: 0.385, state: 'solid', common: true },
  { substance: 'Besi (Fe)', c: 0.449, state: 'solid', common: true },
  { substance: 'Emas (Au)', c: 0.129, state: 'solid', common: false },
  { substance: 'Perak (Ag)', c: 0.235, state: 'solid', common: false },
  { substance: 'Timbal (Pb)', c: 0.128, state: 'solid', common: false },
  { substance: 'Kaca', c: 0.84, state: 'solid', common: true },
  { substance: 'Beton', c: 0.88, state: 'solid', common: false },
  { substance: 'Kayu', c: 1.76, state: 'solid', common: false },
  { substance: 'Etanol (C2H5OH)', c: 2.44, state: 'liquid', common: true },
  { substance: 'Minyak zaitun', c: 2.0, state: 'liquid', common: false },
  { substance: 'Udara', c: 1.01, state: 'gas', common: true }
];

// ========== KALOR BAKAR STANDAR ΔH°c (kJ/mol) ==========
export const COMBUSTION_ENTHALPIES = [
  { formula: 'CH4', name: 'Metana', Hc: -890.3, application: 'Gas alam' },
  { formula: 'C2H6', name: 'Etana', Hc: -1560, application: 'LPG' },
  { formula: 'C3H8', name: 'Propana', Hc: -2220, application: 'LPG, pemanas' },
  { formula: 'C4H10', name: 'Butana', Hc: -2878, application: 'Korek gas' },
  { formula: 'C8H18', name: 'Oktana', Hc: -5471, application: 'Bensin' },
  { formula: 'C2H5OH', name: 'Etanol', Hc: -1367, application: 'Biofuel' },
  { formula: 'C6H12O6', name: 'Glukosa', Hc: -2808, application: 'Metabolisme' },
  { formula: 'H2', name: 'Hidrogen', Hc: -286, application: 'Fuel cell' },
  { formula: 'C(grafit)', name: 'Karbon', Hc: -393.5, application: 'Batu bara' },
  { formula: 'S(s)', name: 'Sulfur', Hc: -297, application: 'Industri' }
];

// ========== CONTOH REAKSI ==========
export const EXAMPLE_REACTIONS = {
  exothermic: [
    {
      equation: 'CH4(g) + 2O2(g) → CO2(g) + 2H2O(l)',
      deltaH: -890.3,
      name: 'Pembakaran metana',
      application: 'Kompor gas, pemanas',
      description: 'Reaksi pembakaran sempurna metana menghasilkan kalor untuk memasak'
    },
    {
      equation: '2H2(g) + O2(g) → 2H2O(l)',
      deltaH: -571.6,
      name: 'Pembentukan air',
      application: 'Fuel cell, roket',
      description: 'Reaksi ini digunakan pada sel bahan bakar hidrogen'
    },
    {
      equation: 'C3H8(g) + 5O2(g) → 3CO2(g) + 4H2O(l)',
      deltaH: -2220,
      name: 'Pembakaran propana',
      application: 'LPG, pemanggang',
      description: 'Sumber energi untuk kompor gas LPG'
    },
    {
      equation: 'Fe2O3(s) + 3CO(g) → 2Fe(s) + 3CO2(g)',
      deltaH: -26.7,
      name: 'Reduksi besi(III) oksida',
      application: 'Produksi besi',
      description: 'Proses pembuatan besi di blast furnace'
    },
    {
      equation: 'CaO(s) + H2O(l) → Ca(OH)2(s)',
      deltaH: -65.2,
      name: 'Pemadaman kapur',
      application: 'Hand warmer, konstruksi',
      description: 'Digunakan dalam penghangat tangan kimia'
    }
  ],
  endothermic: [
    {
      equation: 'N2(g) + O2(g) → 2NO(g)',
      deltaH: 180.6,
      name: 'Pembentukan nitrogen monoksida',
      application: 'Petir, mesin pembakaran',
      description: 'Terjadi pada suhu tinggi di mesin kendaraan'
    },
    {
      equation: 'C(s) + H2O(g) → CO(g) + H2(g)',
      deltaH: 131.3,
      name: 'Gasifikasi karbon',
      application: 'Produksi gas sintesis',
      description: 'Proses industri pembuatan bahan bakar'
    },
    {
      equation: '6CO2(g) + 6H2O(l) → C6H12O6(s) + 6O2(g)',
      deltaH: 2808,
      name: 'Fotosintesis',
      application: 'Tumbuhan',
      description: 'Proses pembuatan glukosa oleh tumbuhan menggunakan cahaya matahari'
    },
    {
      equation: 'NH4NO3(s) → NH4+(aq) + NO3-(aq)',
      deltaH: 25.7,
      name: 'Pelarutan amonium nitrat',
      application: 'Kompres dingin instan',
      description: 'Digunakan dalam cold pack untuk cedera'
    },
    {
      equation: 'CaCO3(s) → CaO(s) + CO2(g)',
      deltaH: 178.3,
      name: 'Dekomposisi kalsium karbonat',
      application: 'Pembuatan kapur',
      description: 'Proses pembuatan kapur tohor di industri'
    }
  ]
};

// ========== KALOR LATEN ==========
export const LATENT_HEATS = [
  { substance: 'H2O', Hfus: 6.01, Hvap: 40.7, unit: 'kJ/mol', name: 'Air' },
  { substance: 'C2H5OH', Hfus: 4.9, Hvap: 38.6, unit: 'kJ/mol', name: 'Etanol' },
  { substance: 'NH3', Hfus: 5.66, Hvap: 23.3, unit: 'kJ/mol', name: 'Amonia' }
];

// ========== REFERENSI BUKU ==========
export const REFERENCES = [
  {
    title: 'Chemistry',
    author: 'Raymond Chang & Kenneth Goldsby',
    edition: '13th Edition',
    year: 2019,
    publisher: 'McGraw-Hill',
    isbn: '978-1259911156'
  },
  {
    title: 'Physical Chemistry',
    author: 'Peter Atkins & Julio de Paula',
    edition: '11th Edition',
    year: 2018,
    publisher: 'Oxford University Press',
    isbn: '978-0198769866'
  },
  {
    title: 'General Chemistry: Principles and Modern Applications',
    author: 'Petrucci, Herring, Madura, Bissonnette',
    edition: '11th Edition',
    year: 2017,
    publisher: 'Pearson',
    isbn: '978-0132931281'
  },
  {
    title: 'NIST Chemistry WebBook',
    author: 'NIST',
    url: 'https://webbook.nist.gov/chemistry/',
    description: 'Database termokimia online dari National Institute of Standards and Technology'
  }
];

// ========== HELPER FUNCTIONS ==========

/**
 * Cari data ΔH°f berdasarkan formula
 * @param {string} formula - Formula kimia (e.g., "H2O(l)")
 * @returns {object|null} Data ΔH°f atau null jika tidak ditemukan
 */
export function findEnthalpyFormation(formula) {
  return ENTHALPY_FORMATION.find(item => item.formula === formula) || null;
}

/**
 * Cari energi ikatan
 * @param {string} bondType - Jenis ikatan (e.g., "C-H")
 * @returns {number|null} Energi ikatan dalam kJ/mol atau null
 */
export function findBondEnergy(bondType) {
  const bond = BOND_ENERGIES.find(item => item.bond === bondType);
  return bond ? bond.energy : null;
}

/**
 * Cari kalor jenis zat
 * @param {string} substance - Nama zat
 * @returns {number|null} Kalor jenis dalam J/g°C atau null
 */
export function findSpecificHeat(substance) {
  const item = SPECIFIC_HEATS.find(s => 
    s.substance.toLowerCase().includes(substance.toLowerCase())
  );
  return item ? item.c : null;
}

// Export default
export default {
  ENTHALPY_FORMATION,
  BOND_ENERGIES,
  SPECIFIC_HEATS,
  COMBUSTION_ENTHALPIES,
  EXAMPLE_REACTIONS,
  LATENT_HEATS,
  REFERENCES,
  findEnthalpyFormation,
  findBondEnergy,
  findSpecificHeat
};