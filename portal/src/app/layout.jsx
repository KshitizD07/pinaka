import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Pinaka Studios — Venture Studio & Builder Collective',
  description:
    'Named after the divine bow of Shiva, Pinaka is an independent product studio and builder collective engineering production systems in campus infrastructure, deeptech, and civic technology.',
  keywords: [
    'Pinaka',
    'Pinaka Studios',
    'Venture Studio',
    'Builder Collective',
    'Opendoor',
    'SkillSphere',
    'Intelli-Light',
    'Smart India Hackathon',
  ],
  openGraph: {
    title: 'Pinaka Studios — Venture Studio & Builder Collective',
    description: 'Precision in Engineering. Sovereign in Vision.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-pinaka-kailash text-pinaka-stone font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
