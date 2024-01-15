import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/public/styles/globals.css';

const popins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300'] });

const keyword = ['web-app', 'pwa', 'note-app'];

const description = "'Personalized PWA note-app',";
const title = "Emerald's Diary: A personalized PWA note-app";

export const metadata: Metadata = {
  title: `Emerald's diary`,
  description: description,
  icons: { apple: '/apple-touch-icon.png', icon: '' },
  viewport: { width: 'device-width', initialScale: 1 },
  keywords: keyword,
  openGraph: {
    type: 'website',
    url: '/',
    title: title,
    description: description,
    siteName: 'web-note-app',
    locale: 'en_UK',
  },
  twitter: {
    site: '/',
    title: title,
    creator: '@VickyJay',
    card: 'summary_large_image',
    description: description,
  },
  authors: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={popins.className}>{children}</body>
    </html>
  );
}
