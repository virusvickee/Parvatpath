import type { Metadata } from 'next';
import { Syne, Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { AuthProvider } from '@/context/AuthContext';
import Script from 'next/script';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Parvatpath | Premium Himalayan Trekking & Adventure Tourism India',
  description: 'Explore the Himalayas with Parvatpath. Book premium, safe, and certified treks, Char Dham Yatras, and group tours in Uttarakhand, Kashmir, Himachal & Nepal.',
  keywords: 'trekking in Uttarakhand, Valley of Flowers, Kedarkantha, Char Dham Yatra, adventure tourism India, Himalayas',
  openGraph: {
    title: 'Parvatpath | Premium Himalayan Trekking',
    description: 'Explore the Himalayas with Parvatpath. Book premium, safe, and certified treks, Char Dham Yatras, and group tours.',
    url: 'https://parvatpath.com',
    siteName: 'Parvatpath',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-bg-primary text-text-primary antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </AuthProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
