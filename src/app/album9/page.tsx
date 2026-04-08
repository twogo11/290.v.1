"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Music, Globe, Play, Disc, Users, Star, Sun, 
  Calendar, Clock 
} from 'lucide-react';
import Navigation from "../components/Navigation";

const ArtistPortfolio: React.FC = () => {
  const socialLinks = [
    { name: "Instagram", icon: <Globe size={20} />, url: "https://www.instagram.com/thetwoninety/" },
    { name: "SoundCloud", icon: <Music size={20} />, url: "https://soundcloud.com/two290ninety" },
  ];

  const artistData = {
    name: "290",
    subName: "290",
  
    releaseDate: "2023.09.09",
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

  const albumCover = "https://i.pinimg.com/736x/d7/53/bf/d753bfcbcadc71badf4580ccf534a27d.jpg";

  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#FFC107] selection:text-black overflow-x-hidden">
      
      {/* --- Sunflower Aesthetic Background --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[100%] lg:w-[70%] h-[70%] bg-[#FFC107]/10 rounded-full blur-[100px] lg:blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] lg:w-[50%] h-[50%] bg-[#FFB300]/5 rounded-full blur-[80px] lg:blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30L35 45L30 60L25 45L30 30Z' fill='%23FFC107'/%3E%3C/svg%3E")` }} />
      </div>

      <Navigation socialLinks={socialLinks} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 lg:pt-32 pb-20">
        
        {/* --- HERO SECTION --- */}
        <section className="relative h-[60vh] lg:h-[75vh] flex flex-col items-center justify-center mb-16 lg:mb-24">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute opacity-20 scale-75 lg:scale-100"
          >
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ rotate: `${i * 30}deg` }} className="absolute w-[1px] lg:w-[2px] h-[400px] lg:h-[600px] bg-gradient-to-t from-transparent via-[#FFC107] to-transparent -translate-y-1/2" />
            ))}
          </motion.div>

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="relative"
            >
              <h1 className="absolute inset-0 text-[8rem] sm:text-[12rem] md:text-[25rem] font-black tracking-tighter leading-none text-[#FFC107] blur-2xl lg:blur-3xl opacity-20 select-none">
                290
              </h1>
              <h1 className="text-[8rem] sm:text-[12rem] md:text-[25rem] font-black tracking-tighter leading-none relative">
                <span className="text-white/10">2</span>
                <span className="text-[#FFC107] drop-shadow-[0_0_30px_rgba(255,193,7,0.4)]">9</span>
                <span className="text-white/10">0</span>
              </h1>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col items-center gap-2">
              <p className="text-xs sm:text-sm md:text-xl font-bold tracking-[0.8em] lg:tracking-[1.5em] text-[#FFC107] uppercase lg:ml-[1.5em]">
                {artistData.subName}
              </p>
              <div className="flex items-center gap-2 lg:gap-4 mt-4 lg:mt-6">
                <Sun className="text-[#FFC107] animate-pulse" size={16} />
                                <span className="h-[1px] w-12 md:w-20 bg-white/20" />
                                <span className="text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.5em] text-gray-500 uppercase">album 9</span>
                                <span className="h-[1px] w-12 md:w-20 bg-white/20" />
                                <Sun className="text-[#FFC107] animate-pulse" size={16} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- ALBUM COVER & TRACKLIST --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24 lg:mb-40">
           
           {/* Left: Album Cover */}
           <motion.div 
            variants={fadeInUp} 
            initial="initial" 
            whileInView="whileInView" 
            className="lg:col-span-5 lg:sticky lg:top-32 group"
          >
              <div className="absolute -inset-4 lg:-inset-6 bg-[#FFC107]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <img src={albumCover} alt="Album 9" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10">
                   <p className="text-[#FFC107] font-mono text-[10px] lg:text-xs tracking-[0.4em] mb-2 lg:mb-4">GOLDEN COLLECTION</p>
                   <h2 className="text-5xl lg:text-8xl font-black italic tracking-tighter uppercase"></h2>
                   <div className="flex gap-4 lg:gap-8 mt-4 lg:mt-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400"><Calendar size={14} className="text-[#FFC107]"/> {artistData.releaseDate}</div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400"><Clock size={14} className="text-[#FFC107]"/> {artistData.duration}</div>
                   </div>
                </div>
              </div>
           </motion.div>

           {/* Right: Tracklist */}
           <motion.div 
            variants={fadeInUp} 
            initial="initial" 
            whileInView="whileInView" 
            className="lg:col-span-7 space-y-4"
          >
              <div className="flex items-center gap-4 mb-6 lg:mb-10 border-b border-white/10 pb-6">
                <Disc className="text-[#FFC107] animate-spin-slow" size={24} />
                <h3 className="text-xl lg:text-2xl font-bold tracking-widest uppercase italic">Tracklist</h3>
              </div>

              <div className="space-y-1">
                {artistData.tracks.map((track) => (
                  <motion.div 
                    key={track.id}
                    whileHover={{ x: 10 }}
                    className="group flex items-center justify-between p-4 lg:p-5 rounded-xl lg:rounded-2xl hover:bg-[#FFC107]/5 border-b border-white/5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4 lg:gap-6">
                      <span className="font-mono text-[10px] lg:text-xs text-gray-600 group-hover:text-[#FFC107] transition-colors">
                        {track.id}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 lg:gap-3">
                          <h4 className="text-sm lg:text-lg font-bold uppercase tracking-tight group-hover:text-white text-gray-300">
                            {track.title}
                          </h4>
                          {track.feature && <Star size={10} className="fill-[#FFC107] text-[#FFC107] opacity-40" />}
                        </div>
                        {track.feature && (
                          <p className="text-[8px] lg:text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                            ft. {track.feature}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 lg:gap-5">
                      <span className="text-[10px] lg:text-[11px] font-mono text-gray-600">{track.duration}</span>
                      <Play size={14} className="text-[#FFC107] opacity-0 lg:group-hover:opacity-100 transition-all transform lg:translate-x-2 lg:group-hover:translate-x-0" />
                    </div>
                  </motion.div>
                ))}
              </div>
           </motion.div>
        </section>

        {/* --- INFO CARDS --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24 lg:mb-40">
           <motion.div 
            variants={fadeInUp} initial="initial" whileInView="whileInView"
            className="p-8 lg:p-12 rounded-[2rem] lg:rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group"
          >
              <Users className="text-[#FFC107] mb-6 lg:mb-8" size={28} />
              <h3 className="text-[10px] lg:text-xs font-black tracking-[0.4em] uppercase text-[#FFC107] mb-6 lg:mb-8">FEATURED BY:</h3>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {artistData.features.map(f => (
                  <span key={f} className="px-4 py-2 lg:px-5 lg:py-2.5 bg-white/5 rounded-full text-[10px] lg:text-xs font-bold border border-white/10 hover:bg-[#FFC107] hover:text-black transition-all">
                    {f}
                  </span>
                ))}
              </div>
           </motion.div>

           <motion.div 
            variants={fadeInUp} initial="initial" whileInView="whileInView"
            className="p-8 lg:p-12 rounded-[2rem] lg:rounded-[2.5rem] bg-[#FFC107]/5 border border-[#FFC107]/20 backdrop-blur-xl relative overflow-hidden group"
          >
              <Star className="text-[#FFC107] mb-6 lg:mb-8" size={28} />
              <h3 className="text-[10px] lg:text-xs font-black tracking-[0.4em] uppercase text-[#FFC107] mb-6 lg:mb-8">PRODUCED BY:</h3>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {artistData.producers.map(p => (
                  <span key={p} className="px-4 py-2 lg:px-5 lg:py-2.5 bg-black/40 rounded-full text-[10px] lg:text-xs font-bold border border-[#FFC107]/20 hover:bg-[#FFC107] hover:text-black transition-all">
                    {p}
                  </span>
                ))}
              </div>
           </motion.div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="text-center py-12 lg:py-20 relative border-t border-white/5">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h2 className="text-4xl lg:text-6xl font-black italic tracking-tighter text-white opacity-20 mb-4">
              {artistData.name}
            </h2>
            <p className="text-[8px] lg:text-[10px] font-bold tracking-[0.8em] lg:tracking-[1.2em] text-gray-600 uppercase">
              TWOGO • 290 
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
          animation: spin-slow 20s linear infinite;
        }
        ::selection {
          background: #FFC107;
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default ArtistPortfolio;