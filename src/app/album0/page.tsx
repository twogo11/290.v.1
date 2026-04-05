"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Disc, Clock, Info, Calendar, History, Video, Music } from "lucide-react";
import Navigation from "../components/Navigation";

interface TrackEntry {
  id: string;
  title: string;
  artist: string;
  duration: string;
  isPopular?: boolean;
}

const AlbumZeroPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tracklist' | 'story'>('tracklist');

  const albumInfo = {
    title: "0",
    artist: "290",
    releaseDate: "2023.03.20",
    totalTracks: 29,
    duration: "1 цаг 18 минут",
    coverUrl: "https://i.scdn.co/image/ab67616d00001e02bf9b21282ede6b0e262088d7",
    spotifyUrl: "https://open.spotify.com/album/1zBqxBBPrAIzXUkgDkB0Th?si=IkC9AkWLRmynXU-8I3K25w",
    // Нэмэлт мэдээллүүд
    meaning: "Нэрний утга нь гэвэл 29 дуутай 'О' гэдэг нэртэй цомог. Ер нь бол дууны тоо + цомгийн нэр = 290",
    coverStory: "Ковер зургийн түүх... Энэ зураг нь зөгийн бал , талх шиг харагдаж байгаа ч өөрөө цомгийн нэр буюу '0'-ийн тоо юм. 290 энэ зургийг iPhone утасныхаа камераар авсан. Зургийг сайн харвал подволоос авсан бөгөөд цаана нь мод харагдана.",
    process: "Цомгийг 290 анх дуу хийж эхэлсэн цагаасаа хойш цомог хийх тал дээр ажиллаад л яваад байсан. 2020 онд 'Титэмгүй Хаан' гэдэг цомог гаргах гэж байсан ч тэр үед гаргаагүй. 2023 онд харин тэр цомогт байсан дуунууд дээр шинэ дуунууд нэмэгдээд, нийт 29 дуутай '0' цомог гаргасан."
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

  return (
    <div className="min-h-screen bg-[#070707] text-white font-sans selection:bg-[#FFD700] selection:text-black">
      <Navigation socialLinks={[]} />

      {/* HEADER SECTION - SUNFLOWER DESIGN */}
      <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-end">
          {/* Cover Art with Golden Glow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group w-72 h-72 md:w-96 md:h-96 flex-shrink-0"
          >
            <div className="absolute -inset-1 bg-[#FFD700] rounded-sm blur opacity-25 group-hover:opacity-50 transition duration-700"></div>
            <img 
              src={albumInfo.coverUrl} 
              alt="Album 0" 
              className="relative w-full h-full object-cover border border-[#FFD700]/20 shadow-2xl" 
            />
          </motion.div>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-[#FFD700] text-xs font-black uppercase tracking-[0.4em] mb-4">Official Album</p>
              <h1 className="text-9xl md:text-[14rem] font-black leading-[0.8] mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] to-[#8B7500]">
                {albumInfo.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                <span className="flex items-center gap-2 text-[#FFD700]">
                  <Calendar size={14} /> {albumInfo.releaseDate}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} /> {albumInfo.duration}
                </span>
                <span className="flex items-center gap-2">
                  <Music size={14} /> {albumInfo.totalTracks} Songs
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INFO CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111111] p-6 border-t-2 border-[#FFD700] hover:bg-[#161616] transition-colors">
            <div className="flex items-center gap-3 mb-4 text-[#FFD700]">
              <Info size={18} />
              <h3 className="text-xs font-black uppercase tracking-widest">album name meaning</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{albumInfo.meaning}</p>
          </div>

          <div className="bg-[#111111] p-6 border-t-2 border-[#FFD700] hover:bg-[#161616] transition-colors">
            <div className="flex items-center gap-3 mb-4 text-[#FFD700]">
              <Video size={18} />
              <h3 className="text-xs font-black uppercase tracking-widest">album cover</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{albumInfo.coverStory}</p>
          </div>

          <div className="bg-[#111111] p-6 border-t-2 border-[#FFD700] hover:bg-[#161616] transition-colors">
            <div className="flex items-center gap-3 mb-4 text-[#FFD700]">
              <History size={18} />
              <h3 className="text-xs font-black uppercase tracking-widest">Timeline</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{albumInfo.process}</p>
          </div>
        </div>
      </section>

      {/* TABS & TRACKLIST */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex gap-12 mb-12 border-b border-white/5">
          <button 
            onClick={() => setActiveTab('tracklist')}
            className={`pb-4 text-xs font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'tracklist' ? "text-[#FFD700] border-b-2 border-[#FFD700]" : "text-gray-500 hover:text-white"}`}
          >
            Tracklist
          </button>
          <button 
            onClick={() => setActiveTab('story')}
            className={`pb-4 text-xs font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'story' ? "text-[#FFD700] border-b-2 border-[#FFD700]" : "text-gray-500 hover:text-white"}`}
          >
            Full Credits
          </button>
        </div>

        {activeTab === 'tracklist' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {allTracks.map((track) => (
              <motion.div 
                whileHover={{ x: 10 }}
                key={track.id} 
                className="flex items-center justify-between py-4 border-b border-white/5 group"
              >
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-mono text-[#FFD700] opacity-40 group-hover:opacity-100">{track.id}</span>
                  <div>
                    <h4 className={`text-sm font-bold tracking-tight ${track.isPopular ? 'text-[#FFD700]' : 'text-gray-200'}`}>
                      {track.title}
                    </h4>
                    <p className="text-[10px] text-gray-600 uppercase mt-0.5">{track.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-gray-500">{track.duration}</span>
                  {track.isPopular && <div className="w-1 h-1 rounded-full bg-[#FFD700]" />}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl space-y-12">
            <div className="prose prose-invert">
              <h2 className="text-3xl font-black text-[#FFD700] mb-6">290 RECORDS Archive</h2>
              <p className="text-gray-400 leading-8 italic">
                "Энэ цомог бол миний хувьд зүгээр нэг дуунуудын цуглуулга биш, харин сүүлийн 2 жилийн амьдралын минь тэмдэглэл. 
                Бид '0' цэгээс эхэлсэн, харин одоо энэ бүхэн таны чихэнд хүрч байна."
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5 font-mono text-[10px] uppercase tracking-widest text-gray-500">
              <div>
                <p className="text-[#FFD700] mb-2">Produced by</p>
                <p>290, Various Artists</p>
              </div>
              <div>
                <p className="text-[#FFD700] mb-2">Mixed & Mastered</p>
                <p>290 RECORDS Studio</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-[#050505] border-t border-[#FFD700]/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center opacity-40 hover:opacity-100 transition-opacity">
          <div className="text-[9px] uppercase tracking-[0.6em] font-mono">
            © 2023 290 RECORDS // SYSTEM ZERO
          </div>
          <a href={albumInfo.spotifyUrl} className="mt-6 md:mt-0 p-4 border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all">
            <Play fill="currentColor" size={16} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default AlbumZeroPage;