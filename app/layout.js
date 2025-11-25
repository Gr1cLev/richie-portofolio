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
    <html lang="id" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-light-bg text-gray-800 dark:bg-gray-900 dark:text-gray-100 font-sans leading-relaxed transition-colors duration-300">
        {children}
        <ChatBotWrapper />
      </body>
    </html>
  );
}

