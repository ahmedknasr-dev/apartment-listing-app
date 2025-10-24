import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/bootstrap-custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Apartment Listing App',
  description: 'Modern apartment listing application built with Next.js and NestJS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
