"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Music, Globe, Mail, Play, ExternalLink, Clock } from 'lucide-react';
import Navigation from "../components/Navigation";

// --- Interfaces & Types ---
interface Track {
  id: number;
  title: string;
  duration: string;
}

interface ArtistData {
  name: string;
  subName: string;
  full_name: string;
  lifespan: string;
  albumTitle: string;
  albumReleaseDate: string;
  skills: string[];
  tracks: Track[];
}

const ArtistPortfolio: React.FC = () => {
  const socialLinks = [
    { name: "Instagram", icon: <Globe size={20} />, url: "https://www.instagram.com/thetwoninety/" },
    { name: "SoundCloud", icon: <Music size={20} />, url: "https://soundcloud.com/two290ninety" },
  ];

  const artistData: ArtistData = {
    name: "290",
    subName: "(M. Tuguldur)",
    full_name: "Мөнхбаатарын Төгөлдөр",
    lifespan: "2000.03.28 — 2025.12.04",
    albumTitle: "Selected Works",
    albumReleaseDate: "2024",
    skills: ["Songwriting", "Producing", "Drawing", "Mix & Mastering"],
    tracks: [
      { id: 1, title: "Intro", duration: "1:45" },
      { id: 2, title: "Legacy", duration: "3:12" },
      { id: 3, title: "Midnight City", duration: "2:58" },
      { id: 4, title: "After Hours", duration: "3:30" },
      { id: 5, title: "Outro", duration: "2:15" },
    ],
  };

  const artistImages = [
    "https://i.pinimg.com/736x/d9/45/f8/d945f8ca49de63f3807024d4b2082d5e.jpg",
    "https://i.pinimg.com/736x/86/9e/6a/869e6ad17e22e5932420ffc057a2de88.jpg",
    "https://i.pinimg.com/736x/44/d5/2b/44d52bf27966502dd4c8741a43b2c297.jpg",
    "https://i.pinimg.com/736x/18/d0/de/18d0de2df91e5df61267b0468c6c984d.jpg"
  ];

  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 font-sans selection:bg-[#FFC107] selection:text-black overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFC107]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFC107]/5 rounded-full blur-[120px]" />
      </div>

      <Navigation socialLinks={socialLinks} />

      <main className="max-w-6xl mx-auto px-6 py-20">
        
        {/* --- Hero Section --- */}
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-8xl md:text-[12rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFC107] to-[#8A6D00] z-10"
          >
            {artistData.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xl md:text-2xl text-gray-500 font-light tracking-[0.3em] uppercase mt-4">
            {artistData.subName}
          </motion.p>
        </section>

        {/* --- Album Detail Section --- */}
        <section className="grid lg:grid-cols-2 gap-16 mb-48 items-start">
          
          {/* Left: Album Cover & Spotify */}
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-8">
            <div className="relative group aspect-square max-w-[500px] mx-auto lg:mx-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FFC107] to-[#8A6D00] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img 
                src={artistImages[2]} // Цомгийн ковер болгон ашиглав
                alt="Album Cover" 
                className="relative rounded-lg object-cover w-full h-full shadow-2xl"
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                <p className="text-[#FFC107] text-xs font-mono uppercase tracking-widest mb-1">Latest Release</p>
                <h3 className="text-2xl font-bold text-white">{artistData.albumTitle}</h3>
              </div>
            </div>

            {/* Spotify Embed Player */}
            <div className="w-full rounded-xl overflow-hidden bg-[#121212] border border-white/5 shadow-2xl">
              <iframe 
                src="https://open.spotify.com/embed/artist/06i7j2kM4C7P7Z8N2J2k" // Жишээ ID: Бодит ID-аар солино уу
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-view" 
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          {/* Right: Tracklist & Info */}
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="flex flex-col h-full">
            <h2 className="text-4xl font-bold mb-2 text-white">Tracklist</h2>
            <p className="text-gray-500 font-mono text-sm mb-8 uppercase tracking-widest">© {artistData.albumReleaseDate} Yasha Records</p>
            
            <div className="space-y-1">
              {artistData.tracks.map((track) => (
                <div 
                  key={track.id} 
                  className="group flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-all border-b border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 font-mono text-sm group-hover:text-[#FFC107]">{track.id.toString().padStart(2, '0')}</span>
                    <Play size={14} className="text-[#FFC107] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-gray-300 group-hover:text-white font-medium">{track.title}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <Clock size={14} className="text-gray-600" />
                    <span className="text-gray-500 font-mono text-sm">{track.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 border border-[#FFC107]/20 rounded-2xl bg-[#FFC107]/5 backdrop-blur-sm">
              <h4 className="text-[#FFC107] font-bold uppercase tracking-widest text-xs mb-4">Artist Note</h4>
              <p className="text-gray-400 italic leading-relaxed">
                "{artistData.full_name} нь өөрийн хөгжмийн найруулгадаа амьдралын үнэ цэнэ, цаг хугацааны мөн чанарыг шингээхийг зорьдог байв."
              </p>
            </div>
          </motion.div>
        </section>

        {/* Biography Section */}
        <motion.section 
          variants={fadeInUp} 
          initial="initial" 
          whileInView="whileInView" 
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="bg-[#0F0F0F] border border-white/5 p-12 rounded-3xl relative overflow-hidden">
             <div className="relative z-10 grid md:grid-cols-3 gap-12 items-center">
                <div className="md:col-span-2">
                   <h2 className="text-xs uppercase tracking-[0.5em] text-[#FFC107] font-bold mb-6">The Legacy</h2>
                   <p className="text-2xl text-gray-300 leading-snug font-light mb-8">
                     Мөнхбаатарын Төгөлдөр: Хөгжимчин, Продюсер, Уран бүтээлч. 
                     Түүний үлдээсэн хөгжмийн ертөнцөөр аялаарай.
                   </p>
                   <div className="flex gap-2 flex-wrap">
                    {artistData.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-gray-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                   <a 
                    href="https://open.spotify.com/artist/06i7j2kM4C7P7Z8N2J2k" 
                    target="_blank"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFC107] text-black font-bold rounded-full hover:scale-105 transition-transform"
                   >
                     LISTEN ON SPOTIFY <ExternalLink size={18} />
                   </a>
                </div>
             </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="pt-24 border-t border-white/5 text-center">
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-700">
            {artistData.name} Legacy • {artistData.lifespan}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default ArtistPortfolio;