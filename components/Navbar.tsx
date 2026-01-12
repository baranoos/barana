"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import HamburgerMenu from './HamburgerMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navLinksVisible, setNavLinksVisible] = useState(true);
  const rawPathname = usePathname();
  const pathname = rawPathname ?? ''; // default to empty string if null

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/#projects", label: "Projects" },
    { href: "/#about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      // If we're not on the home page, navigate to the hash on home.
      if (pathname !== '/' && !pathname.startsWith('/#')) {
        window.location.href = href;
        return;
      }

      const elementId = href.replace('/#', '');
      const element = document.getElementById(elementId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // If element not found for any reason, fallback to hard navigation
        window.location.href = href;
      }
    }
  };

  return (
    <nav className={`sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-4 md:px-6 pt-2 pb-1 transition-all duration-200 ${
      pathname === '/contact' || pathname.startsWith('/contact') 
        ? 'bg-white/90 backdrop-blur-sm'
        : scrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      {/* Logo */}
      <div 
        className="text-lg sm:text-xl md:text-2xl lg:text-[32px] text-black hover:opacity-70 transition-opacity duration-200 cursor-pointer"
        style={{ 
          fontFamily: 'Inter, sans-serif', 
          letterSpacing: '-0.06em', 
          fontWeight: 700
        }}
        onClick={() => window.location.href = '/'}
      >
        BARANA
      </div>

      {/* Desktop Navigation links */}
      <div className="hidden md:flex gap-4 lg:gap-8 items-center overflow-hidden">
        <div 
          className={`flex gap-4 lg:gap-8 transition-all duration-300 ease-in-out ${
            navLinksVisible 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0'
          }`}
          style={{
            transform: navLinksVisible ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative text-base sm:text-lg md:text-xl lg:text-[32px] text-black hover:opacity-70 transition-all duration-200 whitespace-nowrap"
              style={{
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.06em',
                fontWeight: 700,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={() => setNavLinksVisible(!navLinksVisible)}
          className="ml-2 hover:opacity-70 transition-opacity duration-200 focus:outline-none flex-shrink-0"
          aria-label="Toggle navigation"
        >
          {navLinksVisible ? (
            // Double lines (=)
            <div className="relative w-8 h-6 flex flex-col justify-center">
              <div className="absolute w-8 h-1 bg-black transform transition-all duration-300 origin-center top-1"></div>
              <div className="absolute w-8 h-1 bg-black transform transition-all duration-300 origin-center bottom-1"></div>
            </div>
          ) : (
            // X symbol
            <div className="relative w-6 h-6">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-black transform -translate-y-1/2 rotate-45 transition-all duration-300"></div>
              <div className="absolute top-1/2 left-0 w-full h-1 bg-black transform -translate-y-1/2 -rotate-45 transition-all duration-300"></div>
            </div>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <HamburgerMenu 
          navItems={navItems}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>

      <style jsx>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}