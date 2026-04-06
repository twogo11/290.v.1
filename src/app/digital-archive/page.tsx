"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Music, Globe, Mail, ExternalLink, Calendar } from "lucide-react";
import Navigation from "../components/Navigation";

// --- Interfaces ---
interface VideoEntry {
  title: string;
  type: string;
  url: string;
  thumbnail?: string;
  description: string;
}

const DocumentaryPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<number>(0);

  const artistData = {
    name: "290",
    subName: "(M. Tuguldur)",
    full_name: "Мөнхбаатарын Төгөлдөр",
    
  };

  const archiveVideos: VideoEntry[] = [
    {
      title: "Асуулт Хариулт",
      type: "Central TV Interview",
      url: "https://youtu.be/5znbJ-uUKQc",
      description: "Уран бүтээлч 290-ийн үзэл бодол, дотоод ертөнцийн тухай гүнзгий ярилцлага.",
    },
    {
      title: "290 | UTV PODCAST",
      type: "U brand",
      url: "https://youtu.be/xBNx1kU25AQ?si=6-uzyUZJknQpO-4v",
      description: "Heey, та бүхний хамгийн их асуусан хүсэн хүлээсэн дугаараа хүлээн авна уу 💚 Хөөрхөн хөтлөгч Анхилуун маань артист 290 найзтайгаа нээлттэй яриа өрнүүллээ тухлан сууж сонсоорой ✨",
    },
    {
      title: "Анхны Подкаст 290 | Zolo Show",
      type: "Zolo",
      url: "https://youtu.be/g9vAg05KNTk",
      description: "Хөгжмийн замналын эхлэл ба Yasha багийн тухай хуваалцсан түүх.",
    },
    {
      title: "БӨӨЕЭНХИЙ ЯРИА",
      type: "KAIZENEO",
      url: "https://youtu.be/0oGeVwbpmSQ?si=8WUqNpIPg11X4Aap",
      description: "Уран бүтээлч 290-ийн үзэл бодол, дотоод ертөнцийн тухай гүнзгий ярилцлага.",
    },
    {
      title: " ХАМГИЙН 2 | ХЭДЭН ХУТГА АСУУЛТ | 290",
      type: "VolumePlusTV",
      url: "https://youtu.be/a7KQYw1W7i0?si=Zhfmh0Nucrv49vHM",
      description: "Уран бүтээлч 290-ийн үзэл бодол, дотоод ертөнцийн тухай гүнзгий ярилцлага.",
    },
    {
      title: "290 - be my summer (ft. Chill with Yavuuhulan) | LyricSutra",
      type: "Blaze Entertainment",
      url: "https://youtu.be/H3kIpPCeYTE?si=a56T3p8-EQbA3Vhn",
      description: "Уран бүтээлч 290-ийн үзэл бодол, дотоод ертөнцийн тухай гүнзгий ярилцлага.",
    },
    {
      title: "Дууны үгийг учирлая | 290, Twoninety",
      type: "KAIZENEO",
      url: "https://youtu.be/V_ZteucRElU?si=NGXb2HPBCijrEU8N",
      description: "Уран бүтээлч 290-ийн үзэл бодол, дотоод ертөнцийн тухай гүнзгий ярилцлага.",
    },
    {
      title: "Triple X Music Festival 2024",
      type: "Live Performance",
      url: "https://youtu.be/Babqj_fYxl8",
      description: "Тайзан дээрх эрч хүч, түүний үлдээсэн томоохон тоглолтуудын нэг.",
    },
    {
      title: "Studio Life / Song Making",
      type: "Live Stream",
      url: "https://www.youtube.com/live/LOZDTGqeWXE",
      description: "Дуу хэрхэн бүтдэг процесс, түүний хөгжмийн лаборатори.",
    },
  ];

  // YouTube URL-аас ID салгаж авах функц
  const getEmbedUrl = (url: string) => {
    let videoId = "";
    if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1]?.split("?")[0];
    else if (url.includes("youtube.com/live/")) videoId = url.split("live/")[1]?.split("?")[0];
    else videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  return (
    <div className="min-h-screen bg-[#070707] text-gray-100 font-sans selection:bg-[#FFC107] selection:text-black">
      <Navigation socialLinks={[]} /> {/* Өөрийн Navigation component-оо хэвээр ашиглана */}

      {/* 1. HERO SECTION & CURRENT VIDEO */}
      <section className="relative pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
            <div>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-[#FFC107]">
                {artistData.name}
              </h1>
              <p className="text-gray-500 tracking-[0.4em] uppercase mt-2">{artistData.full_name}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-[#FFC107]/60 block mb-1 uppercase tracking-widest">Digital Archive</span>
              
            </div>
          </div>
        </motion.div>

        {/* MAIN VIDEO PLAYER */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 group">
            <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-[#FFC107]/5">
              <iframe
                src={getEmbedUrl(archiveVideos[activeVideo].url)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-3 text-[#FFC107]">
                <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 bg-[#FFC107]/10 rounded">
                  {archiveVideos[activeVideo].type}
                </span>
              </div>
              <h2 className="text-3xl font-bold">{archiveVideos[activeVideo].title}</h2>
              <p className="text-gray-400 max-w-2xl leading-relaxed">
                {archiveVideos[activeVideo].description}
              </p>
            </div>
          </div>

          {/* SIDEBAR PLAYLIST */}
          <div className="space-y-4 h-full">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <Play size={14} className="fill-current" /> Сүүлийн архивууд
            </h3>
            <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              {archiveVideos.map((video, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  onClick={() => setActiveVideo(index)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                    activeVideo === index 
                    ? "bg-[#FFC107]/10 border-[#FFC107]/30 shadow-lg shadow-[#FFC107]/5" 
                    : "bg-[#111] border-white/5 hover:border-white/20"
                  }`}
                >
                  <p className="text-[10px] text-[#FFC107] uppercase font-bold mb-1 tracking-tighter">
                    {video.type}
                  </p>
                  <h4 className={`font-medium ${activeVideo === index ? "text-white" : "text-gray-400"}`}>
                    {video.title}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. LEGACY SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold italic font-serif">
              “Түүний үлдээсэн хөгжим, бидний зүрхэнд мөнх.”
            </h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
              <p>
                Мөнхбаатарын Төгөлдөр нь зөвхөн дуучин бус, продюсер, зураач, 
                инженер гээд олон талын авьяастай уран бүтээлч байсан юм. 
                Түүний хөгжмийн ертөнц дэх өнгө төрх нь Yasha нэгдлийн салшгүй хэсэг байлаа.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-[#FFC107] transition-colors">
                <Music size={18} /> SoundCloud Сонсох
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {/* Thumbnail-ууд */}
             {[
               "https://i.pinimg.com/736x/d9/45/f8/d945f8ca49de63f3807024d4b2082d5e.jpg",
               "https://i.pinimg.com/736x/86/9e/6a/869e6ad17e22e5932420ffc057a2de88.jpg"
             ].map((img, i) => (
               <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                 <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Legacy" />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center">
        <div className="flex justify-center space-x-8 mb-8">
          <Globe className="text-gray-600 hover:text-[#FFC107] cursor-pointer transition-colors" />
          <Music className="text-gray-600 hover:text-[#FFC107] cursor-pointer transition-colors" />
          <Mail className="text-gray-600 hover:text-[#FFC107] cursor-pointer transition-colors" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-700">
          TWOGO • 2026
        </p>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FFC107;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default DocumentaryPage;