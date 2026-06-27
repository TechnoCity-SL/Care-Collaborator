import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'secondary-light';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: ReactNode;
  href?: string;
  isExternal?: boolean;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-btn-blue text-white font-body font-medium hover:opacity-90 focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2',
  secondary:
    'border border-white text-white font-body font-medium hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
  'secondary-light':
    'border-2 border-blue text-blue font-body font-medium hover:bg-blue hover:text-white focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm:  'px-5 py-2.5 text-[14px]',
  md:  'px-5 py-2.5 text-[14px]',
  lg:  'px-5 py-3.5 text-[16px]',
};

const base =
  'inline-flex items-center justify-center rounded-[18px] transition-all duration-150 focus-visible:outline-none';

export function Button({
  label,
  href,
  isExternal = false,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {label}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {label}
    </button>
  );
}
