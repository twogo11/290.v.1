"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Sun, ChevronDown, Menu, X } from 'lucide-react';

const categories = [
  "290",
  "digital-archive",
  "album0",
  "album9",
  "merch"
];

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
}

interface NavigationProps {
  socialLinks: SocialLink[];
}

const Navigation: React.FC<NavigationProps> = ({ socialLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] flex justify-between p-4 md:p-6 backdrop-blur-md bg-black/40 border-b border-white/5">
      
      {/* Лого болон Dropdown хэсэг */}
      <div className="relative">
        {/* Үндсэн харагдах хэсэг */}
        <div 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
        >
          <Sun size={22} className="text-amber-500 animate-spin-slow transition-colors" />
          <span className="text-white font-bold tracking-tighter text-2xl">290</span>
          <ChevronDown size={16} className={`text-zinc-500 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Dropdown Menu - Works on hover AND touch click */}
        <div 
          onClick={() => setIsMenuOpen(false)}
          className={`absolute top-full left-0 mt-2 w-56 transition-all duration-300 z-50
            ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}
            md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-y-0
          `}
        >
          <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl">
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={`/${cat}`}
                onClick={(e) => e.stopPropagation()}
                className="block px-4 py-4 text-sm text-zinc-400 hover:text-amber-500 hover:bg-white/5 rounded-lg transition-colors active:bg-amber-500/10"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-zinc-400 p-2 active:text-amber-500"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Сошиал линкүүд */}
      <div className={`
        fixed inset-0 top-16 left-0 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10
        md:relative md:bg-transparent md:flex-row md:gap-6 md:backdrop-blur-none
        transition-all duration-300
        ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:opacity-100 md:visible'}
      `}>
        {socialLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.url} 
            target="_blank" 
            rel="noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-zinc-500 hover:text-amber-500 transition-all duration-500 p-3 active:scale-95"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;