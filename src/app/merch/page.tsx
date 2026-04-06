"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Globe, ShoppingBag, Sun } from 'lucide-react';
import Navigation from "../components/Navigation";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

const DirectSunflowerStore: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const socialLinks = [
    { name: "Instagram", icon: <Globe size={18} />, url: "https://www.instagram.com/thetwoninety/" },
    { name: "SoundCloud", icon: <Music size={18} />, url: "https://soundcloud.com/two290ninety" },
  ];

  const products: Product[] = [
    { id: 1, name: "Нар Мину", category: "clothes", price: "90,000₮", image: "https://i.pinimg.com/736x/e5/b4/57/e5b45706562a6e13245ee26f94f92f59.jpg" },
    { id: 2, name: "Нар Мину", category: "clothes", price: "90,000₮", image: "https://i.pinimg.com/736x/3d/e6/84/3de6845e0f7f2f1bc53674d76ce30750.jpg" },
  ];

  const categories = ['All', 'clothes', 'Accessories', 'Jewelry', 'Art'];
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 font-sans selection:bg-[#FFC107] selection:text-black overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-10%] w-[70%] h-[40%] bg-[#FFC107]/5 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-10%] w-[70%] h-[40%] bg-[#FFC107]/5 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <Navigation socialLinks={socialLinks} />

      <main className="max-w-[1440px] mx-auto px-4 md:px-6 pt-24 md:pt-32">
        <header className="mb-12 md:mb-20 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block mb-4 md:mb-6"
          >
            <Sun className="text-[#FFC107] animate-spin-slow w-8 md:w-12 h-8 md:h-12" strokeWidth={1} />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-2"
          >
            290 <span className="text-[#FFC107]">MERCH</span> SHOP
          </motion.h1>
          
          <p className="text-[8px] md:text-[10px] uppercase tracking-[0.6em] md:tracking-[1em] text-gray-500 mb-8 md:mb-12">Official Store</p>

          <div className="w-full overflow-x-auto no-scrollbar pb-4 md:pb-0">
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 bg-[#111]/50 p-1 rounded-full border border-white/5 backdrop-blur-sm w-max mx-auto px-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 md:px-8 py-2 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest transition-all ${
                    filter === cat 
                    ? "bg-[#FFC107] text-black font-bold" 
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-24 md:mb-32">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative cursor-pointer"
                >
                  <div className="aspect-[3/4] md:aspect-square overflow-hidden bg-[#111] rounded-sm border border-white/5 relative">
                    <motion.img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover opacity-90 md:opacity-70 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105 md:group-hover:scale-110"
                    />
                    
                    {/* Hover/Always Visible Overlay */}
                    {/* Mobile дээр opacity-100 (шууд харагдана), Desktop (md) дээр opacity-0 (hover үед харагдана) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-3 md:p-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500">
                      <div className="transform translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-[7px] md:text-[10px] uppercase tracking-widest text-[#FFC107] mb-0.5 md:mb-1">{product.category}</p>
                        <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-3 truncate">{product.name}</h3>
                        
                        <div className="flex justify-between items-center border-t border-white/10 pt-2 md:pt-4">
                          <span className="text-xs md:text-2xl font-mono italic font-black text-[#FFC107] tracking-tighter">
                            {product.price}
                          </span>
                          <div className="bg-white text-black p-1.5 md:p-3 rounded-full hover:bg-[#FFC107] transition-colors">
                            <ShoppingBag size={14} className="md:w-5 md:h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </motion.div>

        <footer className="py-12 md:py-20 border-t border-white/5 text-center">
          <div className="flex justify-center space-x-8 md:space-x-12 mb-8 md:mb-10">
            {socialLinks.map((link, i) => (
              <motion.a 
                key={i} 
                href={link.url} 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} 
                className="text-gray-600 transition-colors hover:text-[#FFC107]"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
          <p className="text-[8px] md:text-[9px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-gray-700">
            TWOGO • 2026
          </p>
        </footer>
      </main>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default DirectSunflowerStore;