
import { type FormData, type InheritanceResult, type HeirShare, type Fraction, HeirKey, Analysis } from '../types';
import { add, subtract, fractionToString, createFraction, simplify, fractionsSum, lessThan, multiply, divide } from '../utils/fraction';

// Color palette for the pie chart
const HEIR_COLORS: Record<HeirKey, string> = {
    'wife': '#14b8a6', // teal-500
    'husband': '#0d9488', // teal-600
    'father': '#0f766e', // teal-700
    'mother': '#115e59', // teal-800
    'son': '#0c4a6e', // sky-900
    'daughter': '#0ea5e9', // sky-500
    'brother': '#64748b', // slate-500
    'sister': '#94a3b8'  // slate-400
};

type FixedFractionEntry = { heir: HeirKey; fraction: Fraction; count: number };

export const calculateInheritance = (data: FormData): InheritanceResult => {
    const { estate, deceasedGender, hasSpouse, hasFather, hasMother, sons, daughters, brothers, sisters } = data;

    let shares: HeirShare[] = [];
    if (estate <= 0) {
        return { shares: [], unallocatedAmount: 0, totalDistributed: 0, analysis: { key: 'analysis_positive_estate' } };
    }

    const hasChildren = sons > 0 || daughters > 0;
    const numSiblings = brothers + sisters;
    const isKalalah = !hasChildren && !hasFather;

    let fixedFractions: FixedFractionEntry[] = [];
    
    // 1. Calculate fixed shares (Fard)
    if (hasSpouse) {
        if (deceasedGender === 'male') {
            fixedFractions.push({ heir: 'wife', fraction: hasChildren ? createFraction(1, 8) : createFraction(1, 4), count: 1 });
        } else {
            fixedFractions.push({ heir: 'husband', fraction: hasChildren ? createFraction(1, 4) : createFraction(1, 2), count: 1 });
        }
    }

    if (hasMother) {
        // Umariyyatayn / Gharraawayn case: Mother gets 1/3 of remainder after spouse
        if (hasSpouse && !hasChildren && hasFather && hasMother) {
            const spouseShare = (deceasedGender === 'female') ? createFraction(1,2) : createFraction(1,4);
            const remaining = subtract(createFraction(1,1), spouseShare);
            fixedFractions.push({ heir: 'mother', fraction: multiply(remaining, createFraction(1,3)), count: 1 });
        } else if (hasChildren || numSiblings >= 2) {
             fixedFractions.push({ heir: 'mother', fraction: createFraction(1, 6), count: 1 });
        } else {
             fixedFractions.push({ heir: 'mother', fraction: createFraction(1, 3), count: 1 });
        }
    }
    
    if (hasFather && hasChildren) {
         fixedFractions.push({ heir: 'father', fraction: createFraction(1, 6), count: 1 });
    }
    
    if (sons === 0 && daughters > 0) {
        if (daughters === 1) {
            fixedFractions.push({ heir: 'daughter', fraction: createFraction(1, 2), count: daughters });
        } else {
            fixedFractions.push({ heir: 'daughter', fraction: createFraction(2, 3), count: daughters });
        }
    }
    
    // Kalalah case for Full Sisters (no descendants, no father, no brothers)
    // They are fard-heirs only if they are not made residuary by brothers or with daughters.
    if (isKalalah && brothers === 0 && sisters > 0 && daughters === 0) {
        if (sisters === 1) {
            fixedFractions.push({ heir: 'sister', fraction: createFraction(1, 2), count: sisters });
        } else {
            fixedFractions.push({ heir: 'sister', fraction: createFraction(2, 3), count: sisters });
        }
    }

    let totalFixedFraction = fractionsSum(fixedFractions.map(f => f.fraction));
    let analysis: Analysis | null = null;
    
    // Awwal (Abatement): if shares exceed 1
    if (lessThan(createFraction(1,1), totalFixedFraction)) {
        analysis = { key: 'analysis_awwal', params: { totalFraction: fractionToString(totalFixedFraction) } };
        const adjustmentFactor = totalFixedFraction;
        fixedFractions = fixedFractions.map(f => ({
            ...f,
            fraction: divide(f.fraction, adjustmentFactor)
        }));
        totalFixedFraction = createFraction(1, 1);
    }

    let remainingFraction = subtract(createFraction(1, 1), totalFixedFraction);

    // 2. Distribute residuary (Asabah)
    let residuaryHeirs: { heir: HeirKey; parts: number, count: number }[] = [];
    if (sons > 0) {
        residuaryHeirs.push({ heir: 'son', parts: sons * 2, count: sons });
        // Add daughters to list if they aren't already fixed-share heirs
        if (!fixedFractions.some(f => f.heir === 'daughter')) {
             residuaryHeirs.push({ heir: 'daughter', parts: daughters, count: daughters });
        }
    } else if (hasFather && !hasChildren) {
         residuaryHeirs.push({ heir: 'father', parts: 1, count: 1 });
    } else if (isKalalah && brothers > 0) {
        // Full brothers (with sisters) are residuary
        residuaryHeirs.push({ heir: 'brother', parts: brothers * 2, count: brothers });
        if (sisters > 0) {
            residuaryHeirs.push({ heir: 'sister', parts: sisters, count: sisters });
        }
    } else if (isKalalah && daughters > 0 && brothers === 0 && sisters > 0) {
        // 'asaba ma'a al-ghayr: sisters become residuary with daughters
        residuaryHeirs.push({ heir: 'sister', parts: sisters, count: sisters });
    }
    
    if (residuaryHeirs.length > 0 && remainingFraction.num > 0) {
        const totalParts = residuaryHeirs.reduce((sum, h) => sum + h.parts, 0);
        residuaryHeirs.forEach(h => {
            const residuaryShare = { num: remainingFraction.num * h.parts, den: remainingFraction.den * totalParts };
            const existing = fixedFractions.find(f => f.heir === h.heir);
            if (existing) {
                existing.fraction = add(existing.fraction, residuaryShare);
            } else {
                fixedFractions.push({ heir: h.heir, fraction: residuaryShare, count: h.count });
            }
        });
        remainingFraction = createFraction(0,1);
    }

    // 3. Radd (Return) - if surplus exists and no residuary heirs
    const unallocatedInitially = remainingFraction.num > 0;
    if (unallocatedInitially && residuaryHeirs.length === 0) {
         analysis = { key: 'analysis_radd' };
         const raddHeirs = fixedFractions.filter(f => f.heir !== 'husband' && f.heir !== 'wife');
         if (raddHeirs.length > 0) {
            const totalRaddFraction = fractionsSum(raddHeirs.map(f => f.fraction));
            if (totalRaddFraction.num > 0) {
                raddHeirs.forEach(h => {
                    const proportionalIncrease = divide(h.fraction, totalRaddFraction);
                    const raddAmount = multiply(remainingFraction, proportionalIncrease);
                    h.fraction = add(h.fraction, raddAmount);
                });
                remainingFraction = createFraction(0,1);
            }
         }
    }


    // Final calculation
    shares = fixedFractions.map(({ heir, fraction, count }) => {
        const simplified = simplify(fraction);
        const shareAmount = (estate * simplified.num) / simplified.den;
        return {
            heir,
            count,
            shareFraction: fractionToString(simplified),
            shareAmount,
            sharePerIndividual: count > 0 ? shareAmount / count : 0,
            color: HEIR_COLORS[heir] || '#CBD5E0'
        };
    });

    // Recalculate totals after all adjustments to avoid floating point errors
    const totalDistributed = shares.reduce((sum, s) => sum + s.shareAmount, 0);
    const unallocatedAmount = estate - totalDistributed;


    return {
        shares: shares.filter(s => s.shareAmount > 1e-6), // Filter out negligible amounts
        unallocatedAmount: Math.abs(unallocatedAmount) > 1e-6 ? unallocatedAmount : 0, // Clean up floating point dust
        totalDistributed,
        analysis
    };
};
