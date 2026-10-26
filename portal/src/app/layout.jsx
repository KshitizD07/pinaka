import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Pinaka: A Home for Ambitious Ideas, Promising Projects, and Emerging Ventures',
  description:
    'Pinaka is a curated project ecosystem that discovers, showcases, and connects ambitious ideas, prototypes, research, and emerging ventures with collaboration pathways through SkillSphere.',
  keywords: [
    'Pinaka',
    'Curated Ecosystem',
    'Ambitious Ideas',
    'Prototypes',
    'SkillSphere',
    'Builder Collective',
    'Intelli-Light',
    'Sentinel',
    'Opendoor',
  ],
  openGraph: {
    title: 'Pinaka: A Home for Ambitious Ideas & Promising Projects',
    description: 'Discover ideas. Connect talent. Build what matters.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen text-pinaka-stone font-sans antialiased overflow-x-hidden">
        <div className="flex min-h-screen flex-col overflow-x-hidden">
          <Navbar />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
