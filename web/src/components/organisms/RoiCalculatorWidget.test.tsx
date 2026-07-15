import { render, screen, fireEvent } from '@testing-library/react';
import { RoiCalculatorWidget } from './RoiCalculatorWidget';
import { calculateRoi, DEFAULT_INPUTS, formatCurrency, PACKAGE_TIERS } from '@/lib/roiCalculator';

describe('RoiCalculatorWidget', () => {
  it('renders both panels with the default result', () => {
    render(<RoiCalculatorWidget />);

    expect(screen.getByText('Tell us about your provider.')).toBeInTheDocument();
    expect(screen.getByText('If you switched on Care Collaborator…')).toBeInTheDocument();

    const defaultResult = calculateRoi(DEFAULT_INPUTS);
    expect(screen.getByText(formatCurrency(defaultResult.monthlyProfit))).toBeInTheDocument();
  });

  it('updates the result when the package level changes', () => {
    render(<RoiCalculatorWidget />);

    const select = screen.getByLabelText('Package level') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: PACKAGE_TIERS[3].id } });

    const expected = calculateRoi({ ...DEFAULT_INPUTS, packageLevelId: PACKAGE_TIERS[3].id });
    expect(screen.getByText(formatCurrency(expected.monthlyProfit))).toBeInTheDocument();
  });

  it('updates the displayed value when the package count slider changes', () => {
    render(<RoiCalculatorWidget />);

    const slider = screen.getByLabelText('Total number of packages') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: '1000' } });

    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  it('renders a single demo booking link in the result panel', () => {
    render(<RoiCalculatorWidget />);

    const demoLinks = screen.getAllByRole('link', { name: 'Book a 30-minute demo' });
    expect(demoLinks).toHaveLength(1);
    expect(demoLinks[0]).toHaveAttribute('href', '/contact');
  });
});
