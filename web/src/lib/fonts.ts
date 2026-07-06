import { Inter, Poppins, Instrument_Sans, Skranji } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});
export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-instrument',
});
export const skranji = Skranji({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-skranji',
});

export const fontVariables = [
  inter.variable,
  poppins.variable,
  instrumentSans.variable,
  skranji.variable,
].join(' ');
