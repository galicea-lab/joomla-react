import { Inter, Playfair_Display } from 'next/font/google'

import "@/styles/globals.css";
//import '../App.css';
//import '../index.css';

import type { AppProps } from "next/app";

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-playfair-display',
})

export default function App({ Component, pageProps }: AppProps) {
 return (
  // Fonty wg konfiguracji Tailwind: sans = Inter, serif = Playfair Display
     <div className={`${inter.variable} ${playfairDisplay.variable}`}>
       <Component {...pageProps} />
     </div>
  )
}
