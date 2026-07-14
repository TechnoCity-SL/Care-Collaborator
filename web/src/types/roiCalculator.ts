// ─── ROI Calculator — client-side config/state types ──────────────────────────
// Not Strapi DTOs: this data is hardcoded app config (see src/lib/roiCalculator.ts),
// kept separate from pages.ts which holds only CMS-sourced shapes.

export interface RoiPackageTier {
  id: string;
  label: string;
  monthlyPrice: number;
}

export interface RoiUpliftOption {
  id: string;
  label: string;
  percentagePoints: number;
}

export interface RoiPriceOption {
  id: string;
  label: string;
  quarterlyPrice: number;
}

export interface RoiCalculatorInputs {
  packageCount: number;
  packageLevelId: string;
  currentUtilisation: number;
  upliftOptionId: string;
  priceOptionId: string;
}

export interface RoiCalculatorResult {
  monthlyProfit: number;
  perPackageMonthlyUplift: number;
  perPackageMonthlyProfit: number;
  paybackMultiple: number;
  annualisedUplift: number;
  serviceDeliveryCostBefore: number;
  serviceDeliveryCostAfter: number;
  careCollaboratorCostPerPackage: number;
}
