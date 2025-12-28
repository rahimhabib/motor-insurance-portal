/**
 * Quotation Calculation Logic
 * This is a simplified dummy rate logic for demonstration purposes.
 * In production, this would be replaced with actual underwriting rules.
 */

export interface QuotationInput {
  sumInsured: number;
  coverageType: 'Comprehensive' | '3T' | '2T';
  personalAccident?: {
    selected: boolean;
    sumInsured?: number;
    age?: number;
    gender?: string;
  };
  tracker?: {
    selected: boolean;
  };
  modelYear: number;
}

export interface QuotationResult {
  basePremium: number;
  personalAccidentPremium: number;
  trackerPremium: number;
  totalPremium: number;
  deductible: number;
  coverageType: string;
}

/**
 * Calculate base premium based on sum insured and coverage type
 */
function calculateBasePremium(sumInsured: number, coverageType: string, modelYear: number): number {
  // Base rate per 1000 of sum insured (dummy rates)
  const currentYear = new Date().getFullYear();
  const vehicleAge = currentYear - modelYear;
  
  // Age factor (older vehicles have slightly higher rates)
  const ageFactor = vehicleAge > 10 ? 1.15 : vehicleAge > 5 ? 1.08 : 1.0;
  
  // Coverage type rates (per 1000 of sum insured)
  const rates: Record<string, number> = {
    'Comprehensive': 25, // 2.5% of sum insured
    '3T': 18, // 1.8% of sum insured
    '2T': 12, // 1.2% of sum insured
  };
  
  const baseRate = rates[coverageType] || 25;
  const premium = (sumInsured / 1000) * baseRate * ageFactor;
  
  return Math.round(premium);
}

/**
 * Calculate deductible based on sum insured and coverage type
 */
function calculateDeductible(sumInsured: number, coverageType: string): number {
  // Deductible is typically 1-2% of sum insured for comprehensive
  // Higher for third-party only
  const percentages: Record<string, number> = {
    'Comprehensive': 0.015, // 1.5%
    '3T': 0.02, // 2%
    '2T': 0.025, // 2.5%
  };
  
  const percentage = percentages[coverageType] || 0.015;
  return Math.round(sumInsured * percentage);
}

/**
 * Calculate Personal Accident premium
 */
function calculatePersonalAccidentPremium(
  sumInsured: number,
  age?: number,
  gender?: string
): number {
  if (!sumInsured || !age) return 0;
  
  // Base rate: 0.1% of sum insured
  let rate = 0.001;
  
  // Age factor
  if (age > 60) rate *= 1.5;
  else if (age > 50) rate *= 1.3;
  else if (age < 25) rate *= 1.2;
  
  // Gender factor (dummy - adjust based on actual actuarial data)
  if (gender === 'Male') rate *= 1.1;
  
  return Math.round(sumInsured * rate);
}

/**
 * Calculate Tracker premium (fixed pricing)
 */
function calculateTrackerPremium(): number {
  // Fixed annual premium for tracker
  return 5000;
}

/**
 * Main quotation calculation function
 */
export function calculateQuotation(input: QuotationInput): QuotationResult {
  const basePremium = calculateBasePremium(
    input.sumInsured,
    input.coverageType,
    input.modelYear
  );
  
  const deductible = calculateDeductible(input.sumInsured, input.coverageType);
  
  let personalAccidentPremium = 0;
  if (input.personalAccident?.selected && input.personalAccident.sumInsured) {
    personalAccidentPremium = calculatePersonalAccidentPremium(
      input.personalAccident.sumInsured,
      input.personalAccident.age,
      input.personalAccident.gender
    );
  }
  
  let trackerPremium = 0;
  if (input.tracker?.selected) {
    trackerPremium = calculateTrackerPremium();
  }
  
  const totalPremium = basePremium + personalAccidentPremium + trackerPremium;
  
  return {
    basePremium,
    personalAccidentPremium,
    trackerPremium,
    totalPremium,
    deductible,
    coverageType: input.coverageType,
  };
}

