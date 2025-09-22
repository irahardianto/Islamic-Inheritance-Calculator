
import { type Fraction } from '../types';

export const createFraction = (num: number, den: number = 1): Fraction => ({ num, den });

const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
};

export const simplify = (f: Fraction): Fraction => {
    if (f.num === 0) return { num: 0, den: 1 };
    const commonDivisor = gcd(f.num, f.den);
    return {
        num: f.num / commonDivisor,
        den: f.den / commonDivisor,
    };
};

export const add = (f1: Fraction, f2: Fraction): Fraction => {
    const num = f1.num * f2.den + f2.num * f1.den;
    const den = f1.den * f2.den;
    return simplify({ num, den });
};

export const subtract = (f1: Fraction, f2: Fraction): Fraction => {
    const num = f1.num * f2.den - f2.num * f1.den;
    const den = f1.den * f2.den;
    return simplify({ num, den });
};

export const multiply = (f1: Fraction, f2: Fraction): Fraction => {
    return simplify({ num: f1.num * f2.num, den: f1.den * f2.den });
};

export const divide = (f1: Fraction, f2: Fraction): Fraction => {
    if (f2.num === 0) throw new Error("Cannot divide by zero fraction.");
    return simplify({ num: f1.num * f2.den, den: f1.den * f2.num });
};

export const fractionToString = (f: Fraction): string => {
    const simplified = simplify(f);
    if (simplified.num === 0) return "0";
    if (simplified.den === 1) return `${simplified.num}`;
    return `${simplified.num}/${simplified.den}`;
};

export const fractionsSum = (fractions: Fraction[]): Fraction => {
    return fractions.reduce((acc, f) => add(acc, f), createFraction(0, 1));
};

export const lessThan = (f1: Fraction, f2: Fraction): boolean => {
    return f1.num * f2.den < f2.num * f1.den;
}