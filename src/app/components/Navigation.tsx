import React from 'react';
import { Sun, ChevronDown } from 'lucide-react';

const categories = [
  "tuguldur",
  "documentary",
  "290",
  "album0",
  "merch",
  "album9"
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
  return (
    <nav className="fixed top-0 w-full z-[100] flex justify-between p-6 backdrop-blur-md bg-black/40 border-b border-white/5">
      
      {/* Лого болон Dropdown хэсэг */}
      <div className="relative group cursor-pointer">
        {/* Үндсэн харагдах хэсэг */}
        <div className="flex items-center gap-2">
          <Sun size={22} className="text-amber-500 animate-spin-slow group-hover:text-amber-400 transition-colors" />
          <span className="text-white font-bold tracking-tighter text-2xl">290</span>
          <ChevronDown size={16} className="text-zinc-500 group-hover:rotate-180 transition-transform duration-300" />
        </div>

        {/* Dropdown Menu - Хулгана очиход гарч ирнэ */}
        <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl">
            {categories.map((cat, index) => (
              <a
                key={index}
                href={`/${cat}`}
                className="block px-4 py-3 text-sm text-zinc-400 hover:text-amber-500 hover:bg-white/5 rounded-lg transition-colors"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Сошиал линкүүд */}
      <div className="flex gap-6">
        {socialLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.url} 
            target="_blank" 
            rel="noreferrer"
            className="text-zinc-500 hover:text-amber-500 transition-all duration-500 hover:scale-110"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;