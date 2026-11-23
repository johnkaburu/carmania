// pages/_app.tsx
import '@/styles/globals.css';
import '../components/Layout/Layout.scss';
import '../components/HomePage/HomePage.scss';
import '@/styles/pages.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
