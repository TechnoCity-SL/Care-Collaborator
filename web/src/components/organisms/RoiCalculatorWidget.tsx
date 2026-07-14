import { useMemo, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Heading } from '@/components/atoms/Heading';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import { Select } from '@/components/atoms/Select';
import { Slider } from '@/components/atoms/Slider';
import { FormField } from '@/components/molecules/FormField';
import { RoiResultStat } from '@/components/molecules/RoiResultStat';
import {
  PACKAGE_TIERS,
  UPLIFT_OPTIONS,
  PRICE_OPTIONS,
  DEFAULT_INPUTS,
  calculateRoi,
  formatCurrency,
  formatMultiple,
} from '@/lib/roiCalculator';
import type { RoiCalculatorInputs } from '@/types/roiCalculator';

export function RoiCalculatorWidget() {
  const [inputs, setInputs] = useState<RoiCalculatorInputs>(DEFAULT_INPUTS);
  const result = useMemo(() => calculateRoi(inputs), [inputs]);

  return (
    <div className="grid overflow-hidden rounded-[20px] border border-border bg-white lg:grid-cols-2">
      <div className="flex flex-col gap-10 p-8 sm:p-10">
        <div className="flex flex-col gap-4">
          <SectionLabel label="Your inputs" size="sm" />
          <Heading
            as="h3"
            text="Tell us about your provider."
            className="font-heading text-2xl font-semibold text-text-card"
          />
        </div>

        <FormField
          id="package-count"
          label="Total number of packages"
          helperText="How many recipients are on the books"
          valueLabel={inputs.packageCount.toLocaleString('en-AU')}
        >
          <Slider
            id="package-count"
            min={0}
            max={2000}
            step={10}
            value={inputs.packageCount}
            onChange={(value) => setInputs((prev) => ({ ...prev, packageCount: value }))}
          />
        </FormField>

        <FormField
          id="package-level"
          label="Package level"
          helperText="Sets the monthly value used below"
          footnote="*Indicative levels 1–4 — confirm against your current published rates."
        >
          <Select
            id="package-level"
            value={inputs.packageLevelId}
            options={PACKAGE_TIERS}
            onChange={(id) => setInputs((prev) => ({ ...prev, packageLevelId: id }))}
          />
        </FormField>

        <FormField
          id="current-utilisation"
          label="Current utilisation"
          helperText="% of monthly package value currently being spent on services"
          valueLabel={`${inputs.currentUtilisation}%`}
        >
          <Slider
            id="current-utilisation"
            min={0}
            max={100}
            step={1}
            value={inputs.currentUtilisation}
            onChange={(value) => setInputs((prev) => ({ ...prev, currentUtilisation: value }))}
          />
        </FormField>

        <FormField id="uplift-option" label="Utilisation uplift with Care Collaborator">
          <Select
            id="uplift-option"
            value={inputs.upliftOptionId}
            options={UPLIFT_OPTIONS}
            onChange={(id) => setInputs((prev) => ({ ...prev, upliftOptionId: id }))}
          />
        </FormField>

        <FormField id="price-option" label="Care Collaborator quarterly price (per package)">
          <Select
            id="price-option"
            value={inputs.priceOptionId}
            options={PRICE_OPTIONS}
            onChange={(id) => setInputs((prev) => ({ ...prev, priceOptionId: id }))}
          />
        </FormField>

        <Button
          label="Book a 30-minute demo"
          href="/contact"
          variant="primary"
          size="lg"
          className="w-full justify-center"
        />
      </div>

      <div className="flex flex-col gap-8 bg-btn-blue p-8 text-white sm:p-10">
        <div className="flex flex-col gap-4">
          <SectionLabel label="Your result" theme="dark" size="sm" />
          <Heading
            as="h3"
            text="If you switched on Care Collaborator…"
            className="font-heading text-2xl font-semibold text-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-body text-[14px] text-white/80">
            Additional monthly profit across your portfolio
          </p>
          <p className="font-heading text-[40px] font-bold leading-none text-white">
            {formatCurrency(result.monthlyProfit)}
          </p>
          <p className="font-body text-[14px] text-white/80">
            After Care Collaborator&rsquo;s quarterly subscription cost
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <RoiResultStat
            label="Per-package monthly uplift"
            value={formatCurrency(result.perPackageMonthlyUplift, 2)}
          />
          <RoiResultStat
            label="Per-package monthly profit"
            value={formatCurrency(result.perPackageMonthlyProfit, 2)}
          />
          <RoiResultStat
            label="Payback multiple"
            value={formatMultiple(result.paybackMultiple)}
            accentColor="#00FFB7"
          />
          <RoiResultStat
            label="Indicative annualised uplift"
            value={formatCurrency(result.annualisedUplift)}
          />
        </div>

        <ul className="flex flex-col gap-1 font-body text-[12px] text-white/70">
          <li>Service delivery — new: {formatCurrency(result.serviceDeliveryCostBefore)} / avg</li>
          <li>
            Service delivery — with Care Collaborator: {formatCurrency(result.serviceDeliveryCostAfter)} / avg
          </li>
          <li>
            Care Collaborator cost per package: {formatCurrency(result.careCollaboratorCostPerPackage, 2)} / month
          </li>
        </ul>

        <Button
          label="Book a 30-minute demo"
          href="/contact"
          variant="secondary"
          size="lg"
          className="w-full justify-center"
        />
      </div>
    </div>
  );
}
