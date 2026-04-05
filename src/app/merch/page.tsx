"use client";
import React, { useState } from 'react';
import Link from 'next/link'; // 1. Link-ийг импортлох
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Globe, Mail, ShoppingBag, Sun } from 'lucide-react';
import Navigation from "../components/Navigation";

// --- Interfaces ---
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
    { name: "Instagram", icon: <Globe size={20} />, url: "https://www.instagram.com/thetwoninety/" },
    { name: "SoundCloud", icon: <Music size={20} />, url: "https://soundcloud.com/two290ninety" },
  ];

  const products: Product[] = [
    { id: 1, name: "Нар Мину", category: "clothes", price: "90,000₮", image: "https://i.pinimg.com/736x/e5/b4/57/e5b45706562a6e13245ee26f94f92f59.jpg" },
    { id: 2, name: "Нар Мину", category: "clothes", price: "90,000₮", image: "https://i.pinimg.com/736x/3d/e6/84/3de6845e0f7f2f1bc53674d76ce30750.jpg" },
  ];

  const categories = ['All', 'clothes', 'Accessories', 'Jewelry', 'Art'];
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 font-sans selection:bg-[#FFC107] selection:text-black overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFC107]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFC107]/5 rounded-full blur-[120px]" />
      </div>

      <Navigation socialLinks={socialLinks} />

      <main className="max-w-[1440px] mx-auto px-6 pt-32">
        
        {/* --- HEADER SECTION --- */}
        <header className="mb-20 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block mb-6"
          >
            <Sun className="text-[#FFC107] animate-spin-slow" size={48} strokeWidth={1} />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-4"
          >
            290 <span className="text-[#FFC107]">MERCH</span> SHOP
          </motion.h1>
          
          <p className="text-[10px] uppercase tracking-[1em] text-gray-500 mb-12">Official Store</p>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-2 bg-[#111]/50 p-1 rounded-full border border-white/5 backdrop-blur-sm w-fit mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${
                  filter === cat 
                  ? "bg-[#FFC107] text-black font-bold" 
                  : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* --- PRODUCT GRID --- */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-32">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              /* 2. Link-ээр ороох: Барааны ID-г URL-д дамжуулна */
              <Link href={`/product/${product.id}`} key={product.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative cursor-pointer"
                >
                  {/* Square Image with Smooth Zoom */}
                  <div className="aspect-square overflow-hidden bg-[#111] rounded-sm border border-white/5 relative">
                    <motion.img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-out group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay: Sliding Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                      <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-[10px] uppercase tracking-widest text-[#FFC107] mb-1">{product.category}</p>
                        <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                        <div className="flex justify-between items-center border-t border-white/10 pt-4">
                          <span className="text-2xl font-mono italic font-black text-[#FFC107] tracking-tighter">
                            {product.price}
                          </span>
                          <div className="bg-white text-black p-3 rounded-full hover:bg-[#FFC107] transition-all active:scale-90">
                            <ShoppingBag size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Static label for mobile/idle state */}
                  <div className="mt-3 flex justify-between items-center group-hover:opacity-0 transition-opacity duration-300">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">{product.name}</span>
                    <span className="text-[10px] font-mono text-[#FFC107]">{product.price}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- FOOTER --- */}
        <footer className="py-20 border-t border-white/5 text-center">
          <div className="flex justify-center space-x-12 mb-10">
            {[Music, Globe, Mail].map((Icon, i) => (
              <motion.a 
                key={i} 
                href="#" 
                whileHover={{ scale: 1.2, color: "#FFC107" }} 
                className="text-gray-600 transition-colors"
              >
                <Icon size={22} strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
          <p className="text-[9px] uppercase tracking-[0.8em] text-gray-700">
            🌻 290 Legacy • Conceptualized for M.Tuguldur
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
      `}</style>
    </div>
  );
};

export default DirectSunflowerStore;