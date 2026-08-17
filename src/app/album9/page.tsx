"use client";
import { useState } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Disc, Star, Sun,
  Calendar, Clock, ChevronDown, ChevronUp, Users
} from 'lucide-react';
import Navigation from "../components/Navigation";
import { FADE_IN_UP } from "../../constants/motion";

const ALBUM_INFO = {
  name: "290",
  subName: "290",
  releaseDate: "2026.03.28",
  duration: "27 минут",
  producers: ["FRUITYBAACHKA", "TONY", "QUAD", "TUUG18"],
  features: ["TUUG18", "BEKATRINA", "DVRELZ", "BPXC"],
  tracks: [
    { id: "01", title: "INTRO", duration: "1:45" },
    { id: "02", title: "GUDAMJ", duration: "3:12" },
    { id: "03", title: "40K50K220K", duration: "2:58" },
    { id: "04", title: "BEMR", feature: "DVRELZ", duration: "3:30" },
    { id: "05", title: "WERK", feature: "BEKATRINA", duration: "2:45" },
    { id: "06", title: "BACHT ONNA YACHT", feature: "TUUG18", duration: "3:05" },
    { id: "07", title: "HNDITGHV", feature: "BPXC", duration: "2:50" },
    { id: "08", title: "THOUGHTS/TSETSEG", feature: "BPXC", duration: "3:15" },
    { id: "09", title: "HOVORHON", duration: "3:40" },
  ],
};

const ALBUM_COVER =
  "https://res.cloudinary.com/do7jyitxi/image/upload/q_auto/f_auto/v1780750529/ab67616d00001e023fe84720a9f90e925d130d9d_xs2fs1.jpg";

function AlbumNinePage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#FFC107] selection:text-black overflow-x-hidden">
      
      {/* --- Sunflower Aesthetic Background --- */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[100%] md:w-[70%] h-[70%] bg-[#FFC107]/10 rounded-full blur-[100px] md:blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] md:w-[50%] h-[50%] bg-[#FFB300]/5 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50L60 0L50 50L40 0L50 50Z' fill='%23FFC107'/%3E%3C/svg%3E")` }} />
      </div>

      <Navigation />

      <main className="max-w-7xl mx-auto px-5 md:px-10 pt-20 md:pt-32 pb-20">
        
        {/* --- HERO SECTION WITH 290 EFFECT --- */}
        <section className="relative h-[45vh] md:h-[65vh] flex flex-col items-center justify-center mb-10 overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute opacity-20 pointer-events-none"
          >
            {[...Array(24)].map((_, i) => (
              <div key={i} style={{ transform: `rotate(${i * 15}deg)` }} className="absolute w-[1px] h-[400px] md:h-[700px] bg-gradient-to-t from-transparent via-[#FFC107] to-transparent -translate-y-1/2" />
            ))}
          </motion.div>

          <div className="relative z-10 text-center w-full">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="relative flex items-center justify-center"
            >
              {/* Back Blur 290 */}
              <h1 className="absolute inset-0 text-[8rem] sm:text-[14rem] md:text-[22rem] font-black tracking-[-0.05em] leading-none text-[#FFC107] blur-3xl opacity-20 select-none">
                290
              </h1>
              {/* Main 290 */}
              <h1 className="text-[8rem] sm:text-[14rem] md:text-[22rem] font-black tracking-[-0.05em] leading-none relative">
                <span className="text-white/10">2</span>
                <span className="text-[#FFC107] drop-shadow-[0_0_35px_rgba(255,193,7,0.6)]">9</span>
                <span className="text-white/10">0</span>
              </h1>
            </motion.div>

            <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="mt-[-0.5rem] md:mt-0 flex flex-col items-center">
              <p className="text-[10px] md:text-xl font-bold tracking-[1.2em] md:tracking-[1.5em] text-[#FFC107] uppercase ml-[1.2em]">
                {ALBUM_INFO.subName}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <Sun className="text-[#FFC107] animate-pulse" size={14} />
                <span className="h-[1px] w-12 bg-white/20" />
                <span className="text-[8px] md:text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase">album 9</span>
                <span className="h-[1px] w-12 bg-white/20" />
                <Sun className="text-[#FFC107] animate-pulse" size={14} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- ALBUM COVER & TRACKLIST --- */}
        <section className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-24 md:mb-40">
           
           {/* Left: Album Cover (Чиний ирүүлсэн загвар) */}
           <motion.div variants={FADE_IN_UP} initial="initial" whileInView="whileInView" className="relative group max-w-2xl mx-auto lg:mx-0">
              <div className="absolute -inset-4 bg-[#FFC107]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <Image
                  src={ALBUM_COVER}
                  alt="290 — Album 9 цомгийн нүүр"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8">
                   <p className="text-[#FFC107] text-[10px] font-bold tracking-[0.3em] uppercase mb-2"></p>
                   <div className="flex gap-4 md:gap-6 mt-4">
                      <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-[#FFC107]"><Calendar size={14}/> {ALBUM_INFO.releaseDate}</div>
                      <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-[#FFC107]"><Clock size={14}/> {ALBUM_INFO.duration}</div>
                   </div>
                </div>
              </div>
           </motion.div>

           {/* Right: Tracklist with See More */}
           <motion.div variants={FADE_IN_UP} initial="initial" whileInView="whileInView" className="w-full">
              <div className="flex items-center gap-4 mb-8 md:mb-12 border-b border-white/10 pb-6">
                <Disc className="text-[#FFC107] animate-spin-slow" size={20} />
                <h3 className="text-xl md:text-2xl font-black tracking-widest uppercase italic bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Tracklist</h3>
                <span className="hidden sm:block ml-auto text-4xl font-black text-white/5 uppercase">Vol. 9</span>
              </div>

              <div className="space-y-1">
                <AnimatePresence initial={false}>
                  {(isExpanded ? ALBUM_INFO.tracks : ALBUM_INFO.tracks.slice(0, 5)).map((track, idx) => (
                    <motion.div 
                      key={track.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group flex items-center justify-between py-4 border-b border-white/[0.03] transition-all cursor-default"
                    >
                      <div className="flex items-center gap-5">
                        <span className="font-mono text-[10px] text-gray-600 group-hover:text-[#FFC107] transition-colors">{track.id}</span>
                        <div>
                          <h4 className="text-sm md:text-base font-bold uppercase tracking-tight group-hover:text-white transition-colors">{track.title}</h4>
                          {track.feature && <p className="text-[9px] text-[#FFC107]/60 font-bold uppercase mt-0.5">ft. {track.feature}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-gray-500 group-hover:text-gray-300 transition-colors">{track.duration}</span>
                        <Star size={12} className="text-[#FFC107] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* See More Toggle */}
                {ALBUM_INFO.tracks.length > 5 && (
                  <motion.button
                    whileHover={{ y: -2 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full mt-8 py-4 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-[#FFC107] border border-white/5 rounded-2xl bg-white/[0.02] transition-all"
                  >
                    {isExpanded ? (
                      <>Show Less <ChevronUp size={16} /></>
                    ) : (
                      <>See More Tracks ({ALBUM_INFO.tracks.length - 5}) <ChevronDown size={16} /></>
                    )}
                  </motion.button>
                )}
              </div>
           </motion.div>
        </section>

        {/* --- INFO CARDS --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24 md:mb-40">
           <motion.div variants={FADE_IN_UP} initial="initial" whileInView="whileInView" className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm group">
              <Users className="text-[#FFC107] mb-6 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-[#FFC107] mb-8">Collaborators</h3>
              <div className="flex flex-wrap gap-2">
                {ALBUM_INFO.features.map(f => (
                  <span key={f} className="px-5 py-2.5 bg-white/5 rounded-xl text-[10px] font-bold border border-white/5 hover:bg-[#FFC107] hover:text-black transition-all cursor-default">
                    {f}
                  </span>
                ))}
              </div>
           </motion.div>

           <motion.div variants={FADE_IN_UP} initial="initial" whileInView="whileInView" className="p-10 rounded-[2.5rem] bg-[#FFC107]/[0.03] border border-[#FFC107]/10 backdrop-blur-sm group">
              <Star className="text-[#FFC107] mb-6 group-hover:rotate-45 transition-transform" size={28} />
              <h3 className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-[#FFC107] mb-8">Creative Team</h3>
              <div className="flex flex-wrap gap-2">
                {ALBUM_INFO.producers.map(p => (
                  <span key={p} className="px-5 py-2.5 bg-black/40 rounded-xl text-[10px] font-bold border border-[#FFC107]/20 hover:bg-[#FFC107] hover:text-black transition-all cursor-default">
                    {p}
                  </span>
                ))}
              </div>
           </motion.div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="text-center py-16 md:py-20 relative border-t border-white/5">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white opacity-5 mb-4">
              {ALBUM_INFO.name}
            </h2>
            <p className="text-[8px] md:text-[10px] font-bold tracking-[0.8em] md:tracking-[1.2em] text-gray-600 uppercase">
              TWOGO •  2026
            </p>
          </motion.div>
        </footer>

      </main>

    </div>
  );
}

export default AlbumNinePage;
