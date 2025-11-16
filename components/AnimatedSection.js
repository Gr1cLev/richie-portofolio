'use client';

import { useEffect, useRef, useState } from 'react';

export default function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`animated-section ${visible ? 'is-visible' : ''} ${className}`}
      data-animation={animation}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}
