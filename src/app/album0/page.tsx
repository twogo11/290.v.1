"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Music, Globe, Disc, Users, Star, Sun, 
  Calendar, Clock, ChevronDown, ChevronUp, History, Video
} from 'lucide-react';
import Navigation from "../components/Navigation";

interface TrackEntry {
  id: string;
  title: string;
  artist: string;
  duration: string;
  isPopular?: boolean;
}

const AlbumZeroPage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const albumInfo = {
    artist: "290",
    releaseDate: "2023.03.20",
    totalTracks: 29,
    duration: "1 цаг 18 минут",
    coverUrl: "https://i.scdn.co/image/ab67616d00001e02bf9b21282ede6b0e262088d7",
    meaning: "29 дуутай '0' цомог. Дууны тоо + цомгийн нэр = 290",
    coverStory: "Зураг нь зөгийн бал, талх шиг харагдаж байгаа ч өөрөө цомгийн нэр буюу '0'-ийн тоо юм.",
    process: "2020 онд 'Титэмгүй Хаан' нэртэй гарах байсан ч 2023 онд 29 дуутай цомог болж мэндэлсэн."
  };

  const allTracks: TrackEntry[] = [
    { id: "01", title: "Hodolguur", artist: "290", duration: "1:56" },
    { id: "02", title: "HMM", artist: "290, jutgur", duration: "1:50", isPopular: true },
    { id: "03", title: "Back in the Business", artist: "290, TUUG18", duration: "2:33" },
    { id: "04", title: "Random bars", artist: "290", duration: "2:04" },
    { id: "05", title: "Game", artist: "290", duration: "2:25" },
    { id: "06", title: "Guilgee amjilttai", artist: "290", duration: "2:20" },
    { id: "07", title: "Shigjiin batsaanuudiin suld duu", artist: "290", duration: "2:38", isPopular: true },
    { id: "08", title: "TESO", artist: "290", duration: "2:52" },
    { id: "09", title: "Bingo", artist: "290, TUUG18", duration: "2:52" },
    { id: "10", title: "Tumaranuma", artist: "290, @fruitybaachka", duration: "2:08" },
    { id: "11", title: "Rats in the bag", artist: "290, 113", duration: "2:33" },
    { id: "12", title: "Karate", artist: "290, Sash., Panchi", duration: "3:33" },
    { id: "13", title: "Road w/o u", artist: "290, Tokyo", duration: "2:53" },
    { id: "14", title: "Manan hot", artist: "290", duration: "1:58", isPopular: true },
    { id: "15", title: "Nohookspring", artist: "290", duration: "2:52" },
    { id: "16", title: "Agsam tavina", artist: "290", duration: "2:48" },
    { id: "17", title: "be my summer", artist: "290, chill with yavuuhulan", duration: "3:42", isPopular: true },
    { id: "18", title: "Gift", artist: "290", duration: "2:30" },
    { id: "19", title: "Chihriin baglaa", artist: "290", duration: "1:56" },
    { id: "20", title: "Valentine-ii margaash", artist: "290", duration: "2:16" },
    { id: "21", title: "Bi bayn bolood", artist: "290", duration: "2:35" },
    { id: "22", title: "Huuheldein kino", artist: "290", duration: "3:42" },
    { id: "23", title: "Imagine", artist: "290, @fruitybaachka", duration: "3:32" },
    { id: "24", title: "Goodnight city", artist: "290, Temulun", duration: "3:24" },
    { id: "25", title: "Zuud", artist: "290", duration: "3:11", isPopular: true },
    { id: "26", title: "Hungun", artist: "290, baatarfly, 168", duration: "3:33" },
    { id: "27", title: "Y u lie?", artist: "290", duration: "2:52" },
    { id: "28", title: "Zambaraagui teneg zuil", artist: "290", duration: "3:19" },
    { id: "29", title: "Ballad", artist: "290", duration: "2:19" },
  ];

  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#FFC107] selection:text-black overflow-x-hidden">
      
      {/* --- Sunflower Aesthetic Background --- */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[100%] md:w-[70%] h-[70%] bg-[#FFC107]/10 rounded-full blur-[100px] md:blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] md:w-[50%] h-[50%] bg-[#FFB300]/5 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50L60 0L50 50L40 0L50 50Z' fill='%23FFC107'/%3E%3C/svg%3E")` }} />
      </div>

      <Navigation socialLinks={[]} />

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
              <h1 className="absolute inset-0 text-[8rem] sm:text-[14rem] md:text-[20rem] lg:text-[25rem] font-black tracking-[-0.05em] leading-none text-[#FFC107] blur-3xl opacity-20 select-none">
                290
              </h1>
              {/* Main 290 */}
              <h1 className="text-[8rem] sm:text-[14rem] md:text-[20rem] lg:text-[25rem] font-black tracking-tighter leading-none relative">
                <span className="text-white/10">29</span>
                <span className="text-[#FFC107] drop-shadow-[0_0_35px_rgba(255,193,7,0.6)]">0</span>
              </h1>
            </motion.div>

            <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="mt-[-0.5rem] md:mt-0 flex flex-col items-center">
              <p className="text-[10px] md:text-xl font-bold tracking-[1.2em] md:tracking-[1.5em] text-[#FFC107] uppercase ml-[1.2em]">
                {albumInfo.artist}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <Sun className="text-[#FFC107] animate-pulse" size={14} />
                <span className="h-[1px] w-12 bg-white/20" />
                <span className="text-[8px] md:text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase">Album 0</span>
                <span className="h-[1px] w-12 bg-white/20" />
                <Sun className="text-[#FFC107] animate-pulse" size={14} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- ALBUM COVER & INFO --- */}
        <section className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-24 md:mb-40">
           
           {/* Left: Album Cover Design */}
           <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="relative group max-w-2xl mx-auto lg:mx-0">
              <div className="absolute -inset-4 bg-[#FFC107]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <img src={albumInfo.coverUrl} alt="Album 0" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8">
                   <div className="flex gap-4 md:gap-6 mt-4">
                      <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-[#FFC107]"><Calendar size={14}/> {albumInfo.releaseDate}</div>
                      <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-[#FFC107]"><Clock size={14}/> {albumInfo.duration}</div>
                   </div>
                </div>
              </div>
           </motion.div>

           {/* Right: Info Cards */}
           <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="space-y-8 md:space-y-12">
              <div>
                <h3 className="text-sm md:text-base font-black italic tracking-[0.02em] text-[#FFC107] mb-4">
  Нэрний утга
</h3>
                <p className="text-xl md:text-3xl font-light leading-relaxed text-gray-300 italic">"{albumInfo.meaning}"</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm group">
                  <Video className="text-[#FFC107] mb-6 group-hover:scale-110 transition-transform" size={24} />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Cover Story</h4>
                  <p className="text-xs leading-relaxed text-gray-400 font-medium">{albumInfo.coverStory}</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-[#FFC107]/[0.03] border border-[#FFC107]/10 backdrop-blur-sm group">
                  <History className="text-[#FFC107] mb-6 group-hover:rotate-12 transition-transform" size={24} />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">The Process</h4>
                  <p className="text-xs leading-relaxed text-gray-400 font-medium">{albumInfo.process}</p>
                </div>
              </div>
           </motion.div>
        </section>

        {/* --- TRACKLIST WITH SEE MORE --- */}
        <section className="mb-24 md:mb-40">
          <div className="flex items-end justify-between mb-8 md:mb-12 border-b border-white/10 pb-6 md:pb-8">
            <div className="flex items-center gap-4">
              <Disc className="text-[#FFC107] animate-spin-slow" size={24} />
              <div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">Tracklist</h3>
                <p className="text-[#FFC107] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mt-1">Total {albumInfo.totalTracks} songs</p>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-4xl md:text-5xl font-black text-white/5 uppercase select-none">Vol. 0</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20">
            <AnimatePresence initial={false}>
              {(isExpanded ? allTracks : allTracks.slice(0, 8)).map((track, idx) => (
                <motion.div 
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="group flex items-center justify-between py-4 border-b border-white/[0.03] transition-all cursor-default"
                >
                  <div className="flex items-center gap-5 min-w-0">
                    <span className="font-mono text-[10px] text-gray-600 group-hover:text-[#FFC107] transition-colors">{track.id}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm md:text-base font-bold uppercase tracking-tight group-hover:text-white text-gray-300 truncate">
                          {track.title}
                        </h4>
                        {track.isPopular && <Star size={10} className="fill-[#FFC107] text-[#FFC107] flex-shrink-0" />}
                      </div>
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest truncate">{track.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-[10px] font-mono text-gray-500 group-hover:text-gray-300 transition-colors">{track.duration}</span>
                    <Star size={12} className="text-[#FFC107] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* See More Toggle */}
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-12 py-5 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-[#FFC107] border border-white/5 rounded-2xl bg-white/[0.02] transition-all"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp size={16} /></>
            ) : (
              <>See More Tracks ({allTracks.length - 8}) <ChevronDown size={16} /></>
            )}
          </motion.button>
        </section>

        {/* --- FOOTER --- */}
        <footer className="text-center py-16 md:py-20 relative border-t border-white/5">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white opacity-5 mb-4">
              {albumInfo.artist}
            </h2>
            <p className="text-[8px] md:text-[10px] font-bold tracking-[1em] md:tracking-[1.2em] text-gray-600 uppercase">
              TWOGO • 2026
            </p>
          </motion.div>
        </footer>

      </main>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        html { scroll-behavior: smooth; }
        ::selection { background: #FFC107; color: #000; }
      `}</style>
    </div>
  );
};

export default AlbumZeroPage;