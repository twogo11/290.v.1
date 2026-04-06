"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Play, Disc, Clock, Info, Calendar, History, 
  Video, Music, Star, Sun, ExternalLink, Hash, ChevronRight
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
  const albumInfo = {
    title: "0",
    artist: "290",
    releaseDate: "2023.03.20",
    totalTracks: 29,
    duration: "1 цаг 18 минут",
    coverUrl: "https://i.scdn.co/image/ab67616d00001e02bf9b21282ede6b0e262088d7",
    meaning: "29 дуутай '0' гэдэг нэртэй цомог. Ер нь бол дууны тоо + цомгийн нэр = 290",
    coverStory: "Зураг нь зөгийн бал, талх шиг харагдаж байгаа ч өөрөө цомгийн нэр буюу '0'-ийн тоо юм. 290 энэ зургийг iPhone-оороо подволоос авсан.",
    process: "2020 онд 'Титэмгүй Хаан' нэртэй гарах байсан ч 2023 онд шинэ дуунууд нэмэгдэн нийт 29 дуутай '0' цомог болж мэндэлсэн."
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
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#FFC107]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFB300]/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30L35 45L30 60L25 45L30 30Z' fill='%23FFC107'/%3E%3C/svg%3E")` }} />
      </div>

      <Navigation socialLinks={[]} />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* --- HERO: THE 290 EFFECT --- */}
        <section className="relative h-[70vh] flex flex-col items-center justify-center mb-32">
          {/* Rotating Sunflower Ray Effect */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute opacity-20"
          >
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ rotate: `${i * 30}deg` }} className="absolute w-[2px] h-[600px] bg-gradient-to-t from-transparent via-[#FFC107] to-transparent -translate-y-1/2" />
            ))}
          </motion.div>

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="relative"
            >
              {/* Back Glow Effect */}
              <h1 className="absolute inset-0 text-[16rem] md:text-[25rem] font-black tracking-tighter leading-none text-[#FFC107] blur-3xl opacity-20 select-none">
                290
              </h1>
              {/* Main Text */}
              <h1 className="text-[16rem] md:text-[25rem] font-black tracking-tighter leading-none relative">
                <span className="text-white/10">29</span>
                <span className="text-[#FFC107] drop-shadow-[0_0_30px_rgba(255,193,7,0.3)]">0</span>
              </h1>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col items-center gap-2">
              <p className="text-sm md:text-xl font-bold tracking-[1.5em] text-[#FFC107] uppercase ml-[1.5em]">
                {albumInfo.artist}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <Sun className="text-[#FFC107] animate-pulse" size={20} />
                <span className="h-[1px] w-20 bg-white/20" />
                <span className="text-[10px] font-black tracking-[0.5em] text-gray-500 uppercase">Archive No. 000</span>
                <span className="h-[1px] w-20 bg-white/20" />
                <Sun className="text-[#FFC107] animate-pulse" size={20} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- ALBUM COVER & QUICK INFO --- */}
        <section className="grid lg:grid-cols-2 gap-20 items-center mb-40">
           <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="relative group">
              <div className="absolute -inset-6 bg-[#FFC107]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <img src={albumInfo.coverUrl} alt="Album 0" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                   <h2 className="text-8xl font-black italic tracking-tighter">"{albumInfo.title}"</h2>
                   <div className="flex gap-6 mt-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-[#FFC107]"><Calendar size={14}/> {albumInfo.releaseDate}</div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-[#FFC107]"><Clock size={14}/> {albumInfo.duration}</div>
                   </div>
                </div>
              </div>
           </motion.div>

           <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="space-y-12">
              <div>
                <h3 className="text-xs font-black tracking-[0.4em] text-[#FFC107] uppercase mb-4">The Meaning</h3>
                <p className="text-2xl font-light leading-relaxed text-gray-300 italic">"{albumInfo.meaning}"</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Video className="text-[#FFC107] mb-4" size={20} />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Cover Story</h4>
                  <p className="text-xs leading-relaxed text-gray-400">{albumInfo.coverStory}</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <History className="text-[#FFC107] mb-4" size={20} />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">The Process</h4>
                  <p className="text-xs leading-relaxed text-gray-400">{albumInfo.process}</p>
                </div>
              </div>
           </motion.div>
        </section>

        {/* --- TRACKLIST REDESIGN: 2 COLUMNS GRID --- */}
        <section className="mb-40">
          <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-8">
            <div>
              <h3 className="text-4xl font-black tracking-tighter uppercase italic">Tracklist</h3>
              <p className="text-[#FFC107] text-xs font-bold tracking-[0.3em] uppercase mt-2">290</p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-black text-white/10 uppercase">Vol. 0</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
            {allTracks.map((track) => (
              <motion.div 
                key={track.id}
                whileHover={{ x: 10 }}
                className="group flex items-center justify-between py-4 border-b border-white/5 hover:border-[#FFC107]/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[10px] text-gray-600 group-hover:text-[#FFC107] transition-colors">{track.id}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold uppercase tracking-tight group-hover:text-white text-gray-300">
                        {track.title}
                      </h4>
                      {track.isPopular && <Star size={10} className="fill-[#FFC107] text-[#FFC107]" />}
                    </div>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{track.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-mono">{track.duration}</span>
                  <Play size={12} className="text-[#FFC107]" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="text-center py-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#FFC107] to-transparent" />
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h2 className="text-7xl font-black italic tracking-tighter text-white opacity-20 mb-4 hover:opacity-100 transition-opacity duration-700">
              {albumInfo.artist}
            </h2>
            <p className="text-[10px] font-bold tracking-[1.2em] text-gray-600 uppercase ml-[1.2em]">
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
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AlbumZeroPage;