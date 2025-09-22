
export type Language = 'en' | 'id';
export type Currency = 'USD' | 'IDR';

export type Gender = 'male' | 'female';

export interface FormData {
  estate: number;
  deceasedGender: Gender;
  hasSpouse: boolean;
  hasFather: boolean;
  hasMother: boolean;
  sons: number;
  daughters: number;
  brothers: number;
  sisters: number;
}

export type HeirKey = 'wife' | 'husband' | 'father' | 'mother' | 'son' | 'daughter' | 'brother' | 'sister';

export interface HeirShare {
  heir: HeirKey;
  count: number;
  shareFraction: string;
  shareAmount: number; // total for this group
  sharePerIndividual: number;
  color: string;
}

export interface Analysis {
    key: string;
    params?: Record<string, string | number>;
}

export interface InheritanceResult {
  shares: HeirShare[];
  unallocatedAmount: number;
  totalDistributed: number;
  analysis: Analysis | null;
}

export interface Fraction {
  num: number;
  den: number;
}
