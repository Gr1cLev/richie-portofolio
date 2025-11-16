import AnimatedSection from './AnimatedSection';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-light-bg dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-4xl">
        <AnimatedSection animation="fade-up" className="text-center">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Contact Me</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-12"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-12">
            I am open to internship opportunities and project collaborations. Feel free to reach out to me.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" style={{ transitionDelay: '200ms' }}>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="mailto:richiegiansanto@gmail.com"
              className="group flex items-center space-x-3 bg-light-card dark:bg-gray-800 p-4 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow hover:shadow-xl"
          >
            <svg
              className="w-6 h-6 text-orange-600 dark:text-orange-400 transition-colors group-hover:text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-gray-800 dark:text-gray-200 transition-colors group-hover:text-orange-700 dark:group-hover:text-orange-300">
              richiegiansanto@gmail.com
            </span>
          </a>

          <a
            href="https://wa.me/6281385770691"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-3 bg-light-card dark:bg-gray-800 p-4 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow hover:shadow-xl"
          >
            <svg className="w-6 h-6 text-orange-600 dark:text-orange-400 transition-colors group-hover:text-orange-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.77.46 3.45 1.28 4.96L2 22l5.24-1.38c1.47.76 3.09 1.17 4.8 1.17h.01c5.45 0 9.9-4.45 9.9-9.9s-4.45-9.9-9.9-9.9zM17.2 15.6c-.19-.1-.44-.21-.64-.32-.2-.11-.35-.17-.5-.17-.16 0-.31.06-.46.34-.15.28-.57.68-.7.81-.13.13-.25.15-.46.1s-.82-.3-1.56-.9c-.58-.47-1.04-1.04-1.2-1.22-.17-.18-.04-.28.07-.39.09-.09.2-.23.3-.32.1-.09.15-.17.21-.28.06-.11.03-.21-.03-.28-.06-.07-.5-.61-.68-.81-.18-.21-.36-.17-.5-.17-.13 0-.28.03-.41.03-.13 0-.34.06-.51.34-.17.28-.68.65-.68 1.59 0 .94.7 1.85.8 1.98.1.13 1.39 2.13 3.36 2.96.47.2.83.31 1.12.4.47.13.88.12 1.21.07.38-.06.82-.33.93-.64.11-.31.11-.57.08-.64-.03-.07-.15-.12-.34-.22z"></path>
            </svg>
            <span className="text-gray-800 dark:text-gray-200 transition-colors group-hover:text-orange-700 dark:group-hover:text-orange-300">
              WhatsApp
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/richie-giansanto/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-3 bg-light-card dark:bg-gray-800 p-4 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow hover:shadow-xl"
          >
            <svg className="w-6 h-6 text-orange-600 dark:text-orange-400 transition-colors group-hover:text-orange-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span className="text-gray-800 dark:text-gray-200 transition-colors group-hover:text-orange-700 dark:group-hover:text-orange-300">
              LinkedIn
            </span>
          </a>

          <a
            href="https://www.instagram.com/richie.gian_/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-3 bg-light-card dark:bg-gray-800 p-4 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow hover:shadow-xl"
          >
            <svg className="w-6 h-6 text-orange-600 dark:text-orange-400 transition-colors group-hover:text-orange-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.227-1.669 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.669-4.771 4.919-4.919 1.266.058 1.646.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.356.2-6.784 2.63-6.98 6.98-.058 1.281-.072 1.689-.072 4.948s.014 3.667.072 4.947c.2 4.356 2.624 6.784 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.356-.2 6.784-2.624 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.356-2.624-6.784-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838a6 6 0 100 12 6 6 0 000-12zm0 9.802a3.802 3.802 0 110-7.604 3.802 3.802 0 010 7.604zm4.068-7.802a1.45 1.45 0 110 2.9 1.45 1.45 0 010-2.9z"></path>
            </svg>
            <span className="text-gray-800 dark:text-gray-200 transition-colors group-hover:text-orange-700 dark:group-hover:text-orange-300">
              Instagram
            </span>
          </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
