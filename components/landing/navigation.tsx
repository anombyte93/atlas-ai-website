'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-5 py-4 md:px-10 md:py-5 flex justify-between items-center transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <Link href="#" className="flex items-center gap-3 no-underline">
        <div className="relative w-10 h-10">
          <Image
            src="/logo-icon.png"
            alt="Atlas AI"
            fill
            className="object-contain"
            priority
          />
        </div>
        <span className={`text-lg font-semibold tracking-tight ${isScrolled ? 'text-[var(--charcoal)]' : 'text-white'}`}>
          Atlas AI
        </span>
      </Link>

      <div className="hidden md:flex gap-10 items-center">
        <Link href="#services" className={`text-sm no-underline opacity-90 hover:opacity-100 transition-opacity ${isScrolled ? 'text-[var(--charcoal)]' : 'text-white'}`}>
          Services
        </Link>
        <Link href="#governance" className={`text-sm no-underline opacity-90 hover:opacity-100 transition-opacity ${isScrolled ? 'text-[var(--charcoal)]' : 'text-white'}`}>
          Governance
        </Link>
        <Link href="#case-studies" className={`text-sm no-underline opacity-90 hover:opacity-100 transition-opacity ${isScrolled ? 'text-[var(--charcoal)]' : 'text-white'}`}>
          Case Studies
        </Link>
        <Link href="#process" className={`text-sm no-underline opacity-90 hover:opacity-100 transition-opacity ${isScrolled ? 'text-[var(--charcoal)]' : 'text-white'}`}>
          Process
        </Link>
        <Link href="#contact" className={`text-sm no-underline opacity-90 hover:opacity-100 transition-opacity ${isScrolled ? 'text-[var(--charcoal)]' : 'text-white'}`}>
          Contact
        </Link>
        <Link href="#contact" className="btn btn-primary !py-2.5 !px-6">
          Get Started
        </Link>
      </div>

      <button
        className="md:hidden p-2 bg-transparent border-none cursor-pointer"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <svg width="24" height="24" fill="none" stroke={isScrolled ? 'var(--charcoal)' : 'white'} strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      {/* Mobile Menu Dropdown with proper ARIA */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="absolute top-full left-0 right-0 bg-white p-4 shadow-lg flex flex-col gap-4 md:hidden"
        >
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="self-end p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg width="24" height="24" fill="none" stroke="var(--charcoal)" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <Link
            href="#services"
            className="text-[var(--charcoal)] p-4 hover:bg-gray-50 rounded-lg -ml-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="#governance"
            className="text-[var(--charcoal)] p-4 hover:bg-gray-50 rounded-lg -ml-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Governance
          </Link>
          <Link
            href="#case-studies"
            className="text-[var(--charcoal)] p-4 hover:bg-gray-50 rounded-lg -ml-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Case Studies
          </Link>
          <Link
            href="#process"
            className="text-[var(--charcoal)] p-4 hover:bg-gray-50 rounded-lg -ml-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Process
          </Link>
          <Link
            href="#contact"
            className="text-[var(--charcoal)] p-4 hover:bg-gray-50 rounded-lg -ml-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="#contact"
            className="btn btn-primary !py-3 !px-6 -ml-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
