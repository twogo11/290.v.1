"use client";
import Image from "next/image";
import { motion, type Variants } from 'framer-motion';
import { Mail } from 'lucide-react';
import Navigation from "../components/Navigation";
import SocialIconLinks from "../components/SocialIconLinks";

interface ArtistData {
  name: string;
  subName: string;
  lifespan: string;
  skills: string[];
}

const ARTIST_DATA: ArtistData = {
  name: "290",
  subName: "(M. Tuguldur)",
  lifespan: "2000.03.28 — 2025.12.04",
  skills: ["Songwriting", "Producing", "Drawing", "Mix & Mastering"],
};

const ARTIST_IMAGES = [
  "https://i.pinimg.com/736x/d9/45/f8/d945f8ca49de63f3807024d4b2082d5e.jpg",
  "https://i.pinimg.com/736x/86/9e/6a/869e6ad17e22e5932420ffc057a2de88.jpg",
  "https://i.pinimg.com/736x/44/d5/2b/44d52bf27966502dd4c8741a43b2c297.jpg",
  "https://i.pinimg.com/736x/18/d0/de/18d0de2df91e5df61267b0468c6c984d.jpg",
];

const FADE_IN_UP: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

function ArtistPortfolio() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 font-sans selection:bg-[#FFC107] selection:text-black overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFC107]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFC107]/5 rounded-full blur-[120px]" />
      </div>

      <Navigation />

      <main className="max-w-6xl mx-auto px-6 py-20">
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center mb-32 text-center">
          
          {/* BACKGROUND FLOATING IMAGES */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            {ARTIST_IMAGES.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 0.25, 0.2], 
                  scale: 1,
                  y: [0, -20, 0],
                  rotate: [index % 2 === 0 ? -5 : 5, index % 2 === 0 ? 5 : -5]
                }}
                transition={{ 
                  duration: 5, 
                  delay: index * 0.4, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
                className="absolute hidden md:block"
                style={{
                  width: '280px',
                  height: '380px',
                  left: `${[5, 65, 15, 75][index]}%`,
                  top: `${[10, 15, 55, 50][index]}%`,
                  zIndex: 0
                }}
              >
                <Image
                  src={src}
                  alt={`290 архивын зураг ${index + 1}`}
                  fill
                  sizes="280px"
                  className="rounded-sm object-cover grayscale opacity-60 transition-all duration-700 hover:grayscale-0 hover:opacity-100"
                />
              </motion.div>
            ))}
          </div>

          {/* MAIN TITLE */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-8xl md:text-[15rem] font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFC107] to-[#8A6D00] relative z-10 drop-shadow-2xl"
          >
            {ARTIST_DATA.name}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 z-10"
          >
            <p className="text-xl md:text-2xl text-gray-400 font-light tracking-[0.3em] uppercase">
              {ARTIST_DATA.subName}
            </p>
            <div className="bg-[#FFC107]/10 px-6 py-2 rounded-full border border-[#FFC107]/20 backdrop-blur-md inline-block">
              <p className="text-xs font-mono text-[#FFC107] tracking-[0.2em]">{ARTIST_DATA.lifespan}</p>
            </div>
          </motion.div>
        </section>

        {/* Biography */}
        <motion.section 
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-20 mb-48 items-center"
        >
          <div className="space-y-8">
            <h2 className="text-xs uppercase tracking-[0.5em] text-[#FFC107] font-bold border-b border-[#FFC107]/30 pb-4 inline-block">
              The Journey
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed font-light italic">
              Мөнхбаатарын Төгөлдөр нь хөгжмийн ертөнцөд өөрийн гэсэн өвөрмөц өнгө төрхийг бүтээж, боловсрол болон урлагийг хослуулан алхсан нэгэн юм.
            </p>
            <div className="flex gap-3 flex-wrap">
              {ARTIST_DATA.skills.map((skill) => (
                <span key={skill} className="px-4 py-2 bg-[#1A1A1A] border border-white/5 rounded-md text-[10px] uppercase tracking-widest text-gray-400 hover:text-[#FFC107] transition-all">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative group p-[1px] bg-gradient-to-tr from-[#FFC107]/20 to-transparent rounded-2xl"
          >
            <div className="relative bg-[#0F0F0F] p-12 rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
              {/* Box доторх жижиг зураг - Background-д */}
              <Image
                src={ARTIST_IMAGES[0]}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                aria-hidden="true"
                className="object-cover opacity-[0.03] grayscale"
              />
              <span className="text-6xl text-[#FFC107]/20 font-serif absolute top-6 left-8">“</span>
              <blockquote className="text-2xl text-white font-serif leading-relaxed relative z-10">
                Би их сургуульдаа 6 жилийг өнгөрөөсөн, учир нь 2 жил сураад, 2 жил өөрийн карьераа хөөж, 2 жил сурч төгссөн.
              </blockquote>
            </div>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <footer className="pt-24 border-t border-white/5 text-center">
          <SocialIconLinks
            className="flex justify-center space-x-12 mb-16"
            linkClassName="text-gray-600 transition-all hover:scale-125 hover:text-[#FFC107]"
            iconSize={22}
            iconStrokeWidth={1.5}
            after={
              <span aria-hidden="true" className="text-gray-600">
                <Mail size={22} strokeWidth={1.5} />
              </span>
            }
          />
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-700">
            TWOGO • 2026
          </p>
        </footer>
      </main>
    </div>
  );
}

export default ArtistPortfolio;
