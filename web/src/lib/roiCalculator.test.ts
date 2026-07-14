import {
  calculateRoi,
  DEFAULT_INPUTS,
  PACKAGE_TIERS,
  UPLIFT_OPTIONS,
  PRICE_OPTIONS,
  formatCurrency,
  formatMultiple,
} from './roiCalculator';

describe('calculateRoi', () => {
  it('produces internally consistent results for the default inputs', () => {
    const result = calculateRoi(DEFAULT_INPUTS);

    expect(result.perPackageMonthlyUplift).toBeCloseTo(29.76, 2);
    expect(result.careCollaboratorCostPerPackage).toBeCloseTo(5, 2);
    expect(result.perPackageMonthlyProfit).toBeCloseTo(24.76, 2);
    expect(result.monthlyProfit).toBeCloseTo(24.76 * DEFAULT_INPUTS.packageCount, 2);
    expect(result.annualisedUplift).toBeCloseTo(result.monthlyProfit * 12, 2);
    expect(result.paybackMultiple).toBeCloseTo(
      result.perPackageMonthlyUplift / result.careCollaboratorCostPerPackage,
      5
    );
  });

  it('returns all zeros for zero packages', () => {
    const result = calculateRoi({ ...DEFAULT_INPUTS, packageCount: 0 });

    expect(result.monthlyProfit).toBe(0);
    expect(result.annualisedUplift).toBe(0);
    expect(result.serviceDeliveryCostBefore).toBe(0);
  });

  it('increases monthly profit when a higher uplift option is selected', () => {
    const conservative = calculateRoi({ ...DEFAULT_INPUTS, upliftOptionId: UPLIFT_OPTIONS[0].id });
    const ambitious = calculateRoi({ ...DEFAULT_INPUTS, upliftOptionId: UPLIFT_OPTIONS[2].id });

    expect(ambitious.monthlyProfit).toBeGreaterThan(conservative.monthlyProfit);
    expect(ambitious.perPackageMonthlyUplift).toBeGreaterThan(conservative.perPackageMonthlyUplift);
  });

  it('increases monthly profit for a higher-value package tier', () => {
    const level1 = calculateRoi({ ...DEFAULT_INPUTS, packageLevelId: PACKAGE_TIERS[0].id });
    const level4 = calculateRoi({ ...DEFAULT_INPUTS, packageLevelId: PACKAGE_TIERS[3].id });

    expect(level4.monthlyProfit).toBeGreaterThan(level1.monthlyProfit);
  });

  it('reduces per-package profit and payback multiple as the subscription price increases', () => {
    const cheap = calculateRoi({ ...DEFAULT_INPUTS, priceOptionId: PRICE_OPTIONS[0].id });
    const expensive = calculateRoi({ ...DEFAULT_INPUTS, priceOptionId: PRICE_OPTIONS[2].id });

    expect(expensive.perPackageMonthlyProfit).toBeLessThan(cheap.perPackageMonthlyProfit);
    expect(expensive.paybackMultiple).toBeLessThan(cheap.paybackMultiple);
  });

  it('scales monthly profit linearly with package count', () => {
    const base = calculateRoi({ ...DEFAULT_INPUTS, packageCount: 100 });
    const doubled = calculateRoi({ ...DEFAULT_INPUTS, packageCount: 200 });

    expect(doubled.monthlyProfit).toBeCloseTo(base.monthlyProfit * 2, 5);
  });

  it('clamps out-of-range utilisation to the 0–100 bounds', () => {
    const belowZero = calculateRoi({ ...DEFAULT_INPUTS, currentUtilisation: -20 });
    const atZero = calculateRoi({ ...DEFAULT_INPUTS, currentUtilisation: 0 });
    expect(belowZero.serviceDeliveryCostBefore).toBe(atZero.serviceDeliveryCostBefore);

    const aboveHundred = calculateRoi({ ...DEFAULT_INPUTS, currentUtilisation: 150 });
    const atHundred = calculateRoi({ ...DEFAULT_INPUTS, currentUtilisation: 100 });
    expect(aboveHundred.serviceDeliveryCostBefore).toBe(atHundred.serviceDeliveryCostBefore);
  });

  it('clamps a negative package count to zero', () => {
    const negative = calculateRoi({ ...DEFAULT_INPUTS, packageCount: -50 });
    const zero = calculateRoi({ ...DEFAULT_INPUTS, packageCount: 0 });
    expect(negative).toEqual(zero);
  });

  it('falls back to the first option for an unknown package tier id', () => {
    const result = calculateRoi({ ...DEFAULT_INPUTS, packageLevelId: 'not-a-real-tier' });
    const fallback = calculateRoi({ ...DEFAULT_INPUTS, packageLevelId: PACKAGE_TIERS[0].id });

    expect(result).toEqual(fallback);
  });

  it('falls back to the first option for an unknown uplift option id', () => {
    const result = calculateRoi({ ...DEFAULT_INPUTS, upliftOptionId: 'not-a-real-option' });
    const fallback = calculateRoi({ ...DEFAULT_INPUTS, upliftOptionId: UPLIFT_OPTIONS[0].id });

    expect(result).toEqual(fallback);
  });

  it('falls back to the first option for an unknown price option id', () => {
    const result = calculateRoi({ ...DEFAULT_INPUTS, priceOptionId: 'not-a-real-price' });
    const fallback = calculateRoi({ ...DEFAULT_INPUTS, priceOptionId: PRICE_OPTIONS[0].id });

    expect(result).toEqual(fallback);
  });
});

describe('formatCurrency', () => {
  it('formats whole-dollar AUD amounts', () => {
    expect(formatCurrency(25296)).toBe('$25,296');
  });

  it('formats amounts with the requested fraction digits', () => {
    expect(formatCurrency(267.958, 2)).toBe('$267.96');
  });
});

describe('formatMultiple', () => {
  it('formats a multiple to one decimal place with an x suffix', () => {
    expect(formatMultiple(17.9)).toBe('17.9x');
    expect(formatMultiple(6)).toBe('6.0x');
  });
});
