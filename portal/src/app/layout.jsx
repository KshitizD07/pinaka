import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Pinaka: Product Studio & Builder Collective',
  description:
    'Pinaka is an independent product studio and builder collective engineering production-grade software across enterprise systems, deeptech, and applied software.',
  keywords: [
    'Pinaka',
    'Pinaka Studios',
    'Product Studio',
    'Builder Collective',
    'Opendoor',
    'SkillSphere',
    'Intelli-Light',
  ],
  openGraph: {
    title: 'Pinaka: Product Studio & Builder Collective',
    description: 'Precision in Engineering. Sovereign in Execution.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen text-pinaka-stone font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
