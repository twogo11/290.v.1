"use client";

import Image from "next/image";
import {
  Globe,
  Music,
  ExternalLink,
  Copyright,
  Sun,
  Sparkles,
} from "lucide-react";
import Navigation from "./components/Navigation";

export default function ArtistPage() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: <Globe size={20} />,
      url: "https://www.instagram.com/thetwoninety/",
    },
    {
      name: "SoundCloud",
      icon: <Music size={20} />,
      url: "https://soundcloud.com/two290ninety",
    },
  ];

  const tracks = [
    "Flowershop",
    "Narantsetseg",
    "Ulaanbaatar gunigtai",
    "Be my summer",
    "Road w/o u",
    "Hungun",
    "10/10",
    "Cuz of i luv u",
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      {/* Наранцэцгийн тоос мэт хөвөх эффект (Particles) */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-amber-500/30 rounded-full blur-[2px] animate-float"
            style={{
              width: `${4 + (i % 5) * 2}px`,
              height: `${4 + (i % 5) * 2}px`,
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${10 + (i % 5) * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-600/10 blur-[150px] rounded-full z-0 animate-pulse-slow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-900/10 blur-[150px] rounded-full z-0" />

      {/* Navigation */}
      <Navigation socialLinks={socialLinks} />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-[100vh] flex flex-col justify-center items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://i.pinimg.com/736x/4c/5c/2d/4c5c2d5e798eae5a7d7ff9e121f7a780.jpg"
              alt="290 Legacy"
              fill
              className="object-cover opacity-40 grayscale-[30%] brightness-[0.6]"
              priority
            />

            {/* Decorative Sunflower Images from Pinterest */}
            <div className="absolute left-[-5%] top-[15%] w-[350px] h-[350px] opacity-15 rotate-[-15deg] mix-blend-screen hidden lg:block">
              <Image
                src="https://i.pinimg.com/736x/4c/5c/2d/4c5c2d5e798eae5a7d7ff9e121f7a780.jpg"
                alt="flower-sketch"
                fill
                className="object-cover opacity-15 rotate-[-15deg] mix-blend-screen hidden lg:block"
              />
            </div>

            <div className="absolute right-[-8%] bottom-[5%] w-[450px] h-[450px] opacity-25 rotate-[20deg] mix-blend-lighten hidden lg:block">
              <Image
                src="https://i.pinimg.com/736x/4c/5c/2d/4c5c2d5e798eae5a7d7ff9e121f7a780.jpg"
                alt="flower-golden"
                fill
                className="object-cover opacity-25 rotate-[20deg] mix-blend-lighten hidden lg:block"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
          </div>

          <div className="relative z-10 text-center space-y-8 px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500 text-[10px] uppercase tracking-[0.4em] animate-fade-in">
              <Sparkles size={12} /> наранцэцэг
            </div>
            <h1 className="text-[13vw] leading-none font-black text-white tracking-tighter uppercase drop-shadow-2xl text-amber-500/50 bg-black bg-clip-text">
              TWO{" "}
              <span className="text-amber-500 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                NINETY
              </span>
            </h1>
            <div className="flex items-center justify-center gap-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
              <p className="text-sm md:text-lg tracking-[0.4em] uppercase text-amber-100/80 font-light">
                Munkhbaatar Tuguldur / 290
              </p>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-500/50" />
            </div>
          </div>

          <div className="absolute bottom-12 animate-bounce opacity-40">
            <div className="w-[1px] h-16 bg-gradient-to-b from-amber-500 to-transparent" />
          </div>
        </section>

        {/* Content Section */}
        <section className="grid md:grid-cols-12 gap-16 p-8 md:p-32 bg-[#050505] relative overflow-hidden">
          {/* Background Sunflower Pattern (Subtle) */}
          <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none scale-150 rotate-45">
            <Sun size={800} />
          </div>

          <div className="md:col-span-7 space-y-12 relative z-10">
            <div className="space-y-6">
              <h2 className="text-amber-500 text-sm uppercase tracking-[0.5em] font-bold">
                The Legacy
              </h2>
              <h3 className="text-white text-5xl md:text-7xl font-light leading-tight tracking-tight">
                Монголын хип хоп <br />
                ертөнцийн{" "}
                <span className="italic font-serif text-amber-500">
                  наранцэцэг.
                </span>
              </h3>
            </div>

            <div className="space-y-8 text-xl leading-relaxed text-zinc-400 max-w-xl">
              <p>
                Лондонд төрж, Улаанбаатарт өссөн Төгөлдөр нь{" "}
                <span className="text-white font-medium italic">"YASHA"</span>{" "}
                болон
                <span className="text-white font-medium italic">
                  {" "}
                  "NOITON"
                </span>{" "}
                брэндүүдийг үүсгэн байгуулж, залуусын соёл, загварын чиг
                хандлагад өөрийн гэсэн тод, дулаахан мөрийг үлдээсэн юм.
              </p>
              <div className="relative p-8 border-l-4 border-amber-600 bg-amber-950/10 rounded-r-2xl italic group hover:bg-amber-900/20 transition-all">
                <p className="text-amber-100/90 text-lg">
                  "Би их сургуульдаа 6 жилийг өнгөрөөсөн, учир нь 2 жил сураад,
                  2 жил өөрийн дууны карьераа хөөсөн..."
                </p>
                <Sun
                  className="absolute -right-4 -bottom-4 text-amber-500/10 group-hover:rotate-90 transition-transform duration-1000"
                  size={100}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="sticky top-32 bg-zinc-900/30 p-8 md:p-12 border border-amber-500/10 rounded-[3rem] backdrop-blur-xl">
              <h3 className="text-amber-500 text-xs uppercase mb-10 flex items-center gap-3 tracking-widest font-bold">
                <Music size={16} className="animate-pulse" /> Selected Works
              </h3>
              <ul className="space-y-2">
                {tracks.map((track, index) => (
                  <li
                    key={track}
                    className="group/item flex justify-between items-center py-4 border-b border-white/5 hover:border-amber-500/40 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-[10px] text-amber-800 font-mono group-hover/item:text-amber-500 transition-colors">
                        0{index + 1}
                      </span>
                      <span className="group-hover/item:text-white transition-colors uppercase text-sm tracking-widest">
                        {track}
                      </span>
                    </div>
                    <ExternalLink
                      size={14}
                      className="opacity-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 text-amber-500 transition-all"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Brands/Projects */}
        <section className="py-32 px-8 text-center border-t border-white/5 bg-gradient-to-b from-transparent via-amber-950/5 to-transparent">
          <h2 className="text-zinc-600 text-[10px] uppercase tracking-[0.8em] mb-20">
            Creative Ventures
          </h2>
          <div className="flex flex-wrap justify-center gap-16 md:gap-32 items-center">
            {["YASHA", "NOITON", "MOTR", "1VS100"].map((brand) => (
              <span
                key={brand}
                className="text-3xl md:text-6xl font-black tracking-tighter text-zinc-800 hover:text-amber-500 transition-all duration-700 cursor-default uppercase"
              >
                {brand}
              </span>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 bg-black relative z-10">
        <div className="flex items-center gap-4 text-[10px] tracking-[0.4em] text-zinc-500 uppercase">
          <Copyright size={14} className="text-amber-600" />
          <span>
            2025 Legacy of 290.{" "}
            <span className="text-amber-500/50 italic">
              Always facing the sun.
            </span>
          </span>
        </div>

        <div className="flex gap-12">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 hover:text-amber-500 transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          50% {
            transform: translateY(-100px) translateX(20px);
          }
          75% {
            opacity: 1;
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.1);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 2s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
