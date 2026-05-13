import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'تَعليم الحُروف العَرَبيّة لِلأَطفال',
  description: 'تطبيق تفاعلي لتعليم الأطفال الحروف العربية',
};

export const viewport: Viewport = {
  width: 1280,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
