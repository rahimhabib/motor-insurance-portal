/**
 * Coverage Information for Tooltips
 * Defines what is covered and excluded for each coverage type
 */

export interface CoverageInfo {
  name: string;
  covered: string[];
  excluded: string[];
  description: string;
}

export const coverageInfo: Record<string, CoverageInfo> = {
  'Comprehensive': {
    name: 'Comprehensive Cover',
    description: 'Full protection for your vehicle and third-party liability',
    covered: [
      'Own damage to your vehicle (accidents, theft, fire, natural disasters)',
      'Third-party property damage',
      'Third-party bodily injury',
      'Total loss coverage',
      'Theft protection',
      'Natural calamities (flood, earthquake, etc.)',
    ],
    excluded: [
      'Wear and tear',
      'Mechanical breakdown',
      'Damage due to driving under influence',
      'Racing or speed contests',
      'Unauthorized driver',
      'War, nuclear risks',
    ],
  },
  '3T': {
    name: 'Third Party + Theft + Total Loss (3T)',
    description: 'Coverage for third-party liability, theft, and total loss',
    covered: [
      'Third-party property damage',
      'Third-party bodily injury',
      'Theft of vehicle',
      'Total loss (complete destruction)',
    ],
    excluded: [
      'Own damage repairs (partial damage)',
      'Wear and tear',
      'Mechanical breakdown',
      'Natural calamities (unless total loss)',
      'Unauthorized driver',
    ],
  },
  '2T': {
    name: 'Third Party + Theft (2T)',
    description: 'Basic coverage for third-party liability and theft',
    covered: [
      'Third-party property damage',
      'Third-party bodily injury',
      'Theft of vehicle',
    ],
    excluded: [
      'Own damage to your vehicle',
      'Total loss (unless theft)',
      'Natural calamities',
      'Fire damage',
      'Wear and tear',
    ],
  },
};

export const addOnInfo: Record<string, { name: string; description: string; benefits: string[] }> = {
  'Personal Accident': {
    name: 'Personal Accident Cover',
    description: 'Financial protection in case of accidental death or disability',
    benefits: [
      'Coverage for driver and passengers',
      'Death benefit up to sum insured',
      'Permanent total disability coverage',
      'Medical expenses reimbursement',
      '24/7 coverage anywhere in Pakistan',
    ],
  },
  'Tracker': {
    name: 'GPS Tracker',
    description: 'Vehicle tracking device for security and premium discounts',
    benefits: [
      'Real-time vehicle location tracking',
      'Theft recovery assistance',
      'Premium discount on insurance',
      'Mobile app access',
      '24/7 monitoring support',
    ],
  },
};


