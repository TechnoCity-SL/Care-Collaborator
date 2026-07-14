import type {
  RoiCalculatorInputs,
  RoiCalculatorResult,
  RoiPackageTier,
  RoiPriceOption,
  RoiUpliftOption,
} from '@/types/roiCalculator';

// Indicative Support at Home (SAH) package pricing tiers.
export const PACKAGE_TIERS: RoiPackageTier[] = [
  { id: 'sah-1', label: 'SAH Level 1 – $992 / month', monthlyPrice: 992 },
  { id: 'sah-2', label: 'SAH Level 2 – $1,846 / month', monthlyPrice: 1846 },
  { id: 'sah-3', label: 'SAH Level 3 – $2,984 / month', monthlyPrice: 2984 },
  { id: 'sah-4', label: 'SAH Level 4 – $4,526 / month', monthlyPrice: 4526 },
];

export const UPLIFT_OPTIONS: RoiUpliftOption[] = [
  { id: 'conservative', label: '+3 percentage points (conservative)', percentagePoints: 3 },
  { id: 'moderate', label: '+6 percentage points (moderate)', percentagePoints: 6 },
  { id: 'ambitious', label: '+10 percentage points (ambitious)', percentagePoints: 10 },
];

export const PRICE_OPTIONS: RoiPriceOption[] = [
  { id: 'price-15', label: '$15', quarterlyPrice: 15 },
  { id: 'price-25', label: '$25', quarterlyPrice: 25 },
  { id: 'price-40', label: '$40', quarterlyPrice: 40 },
];

export const DEFAULT_INPUTS: RoiCalculatorInputs = {
  packageCount: 500,
  packageLevelId: 'sah-1',
  currentUtilisation: 55,
  upliftOptionId: 'conservative',
  priceOptionId: 'price-15',
};

/**
 * Illustrative ROI formula — Figma specifies only static example numbers, not a
 * business formula. This reacts sensibly to every input and is intentionally
 * simple to swap out once a real formula is supplied.
 */
export function calculateRoi(inputs: RoiCalculatorInputs): RoiCalculatorResult {
  const packageTier = PACKAGE_TIERS.find((tier) => tier.id === inputs.packageLevelId) ?? PACKAGE_TIERS[0];
  const upliftOption = UPLIFT_OPTIONS.find((option) => option.id === inputs.upliftOptionId) ?? UPLIFT_OPTIONS[0];
  const priceOption = PRICE_OPTIONS.find((option) => option.id === inputs.priceOptionId) ?? PRICE_OPTIONS[0];

  const packageCount = Math.max(0, inputs.packageCount);
  const utilisationDecimal = Math.min(100, Math.max(0, inputs.currentUtilisation)) / 100;
  const upliftDecimal = upliftOption.percentagePoints / 100;
  const careCollaboratorCostPerPackage = priceOption.quarterlyPrice / 3;

  const perPackageMonthlyUplift = packageTier.monthlyPrice * upliftDecimal;
  const perPackageMonthlyProfit = perPackageMonthlyUplift - careCollaboratorCostPerPackage;
  const monthlyProfit = perPackageMonthlyProfit * packageCount;

  return {
    monthlyProfit,
    perPackageMonthlyUplift,
    perPackageMonthlyProfit,
    paybackMultiple: perPackageMonthlyUplift / careCollaboratorCostPerPackage,
    annualisedUplift: monthlyProfit * 12,
    serviceDeliveryCostBefore: packageTier.monthlyPrice * utilisationDecimal * packageCount,
    serviceDeliveryCostAfter: packageTier.monthlyPrice * (utilisationDecimal + upliftDecimal) * packageCount,
    careCollaboratorCostPerPackage,
  };
}

export function formatCurrency(value: number, fractionDigits = 0): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function formatMultiple(value: number): string {
  return `${value.toFixed(1)}x`;
}
