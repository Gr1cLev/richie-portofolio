import './globals.css';
import { Inter } from 'next/font/google';
import ChatBotWrapper from '../components/ChatBotWrapper';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Richie Giansanto — Full-Stack Developer & ML Engineer',
  description: 'Portfolio interaktif Richie Giansanto — Full-Stack Developer & Machine Learning Engineer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable}`}>
      <body className="overflow-hidden h-screen font-sans antialiased">
        {children}
        <ChatBotWrapper />
      </body>
    </html>
  );
}
