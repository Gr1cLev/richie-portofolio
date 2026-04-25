import './globals.css';
import { Inter } from 'next/font/google';
import ChatBotWrapper from '../components/ChatBotWrapper';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Richie Giansanto - Full-Stack Developer & ML Engineer',
  description: 'Portfolio Richie Giansanto - Full-Stack Developer & Machine Learning Engineer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`scroll-smooth ${inter.variable}`}>
      <body className="min-h-screen font-sans leading-relaxed antialiased">
        {/* Aurora orbs — fixed behind all content */}
        <div className="aurora-orbs" aria-hidden="true" />
        <div className="aurora-orb-3" aria-hidden="true" />
        <div className="aurora-orb-4" aria-hidden="true" />
        {/* Content layer */}
        <div className="relative z-10">
          {children}
        </div>
        <ChatBotWrapper />
      </body>
    </html>
  );
}
