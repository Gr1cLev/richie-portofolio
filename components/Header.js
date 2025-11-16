'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', next);
    }
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="bg-light-bg/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 w-full shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#home"
          className="text-2xl font-bold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
        >
          Richie Giansanto
        </a>
        <div className="flex items-center">
          <div className="hidden md:flex space-x-6">
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              About Me
            </a>
            <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              Skills
            </a>
            <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              Contact
            </a>
          </div>

          <a
            href="/CV-RichieGiansanto.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block ml-6 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-105"
          >
            View My CV
          </a>

          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 focus:outline-none transition-colors border border-gray-300 dark:border-gray-600 rounded-md hover:border-orange-400 dark:hover:border-orange-500"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden ml-4 text-gray-600 dark:text-gray-300 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 bg-light-bg/95 dark:bg-gray-900/95">
          <a
            href="#about"
            onClick={closeMobile}
            className="block text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            About Me
          </a>
          <a
            href="#skills"
            onClick={closeMobile}
            className="block text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={closeMobile}
            className="block text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={closeMobile}
            className="block text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            Contact
          </a>
          <a
            href="/CV-RichieGiansanto.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
            className="block w-full text-center mt-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            View My CV
          </a>
        </div>
      )}
    </header>
  );
}
