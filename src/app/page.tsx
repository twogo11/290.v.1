import {
  ExternalLink,
  Copyright,
  Sun,
  Sparkles,
  Archive,
  User,
  Disc,
  ShoppingBag,
  Gamepad2,
} from "lucide-react";
import Navigation from "./components/Navigation";
import Link from "next/link";
import { SITE_SECTIONS, SOCIAL_LINKS } from "../constants/site";

const sectionIcons = {
  user: User,
  archive: Archive,
  disc: Disc,
  shoppingBag: ShoppingBag,
  gamepad: Gamepad2,
};

const VIDEO_URL =
  "https://res.cloudinary.com/do7jyitxi/video/upload/q_auto/f_auto/v1778255999/lv_0_20260508235921_fphr4m.mp4";

export default function ArtistPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      {/* Наранцэцгийн тоос мэт хөвөх эффект */}
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

      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-600/10 blur-[150px] rounded-full z-0 animate-pulse-slow" />

      <Navigation />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-[100vh] flex flex-col justify-center items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale-[30%] brightness-[0.6]"
            >
              <source src={VIDEO_URL} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
          </div>

          <div className="relative z-10 text-center space-y-8 px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500 text-[10px] uppercase tracking-[0.4em] animate-fade-in">
              <Sparkles size={12} /> Наранцэцэг
            </div>
            <h1 className="text-[13vw] leading-none font-black text-white tracking-tighter uppercase">
              TWO{" "}
              <span className="text-amber-500 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                NINETY
              </span>
            </h1>
            <p className="text-sm md:text-lg tracking-[0.4em] uppercase text-amber-100/80 font-light">
              Munkhbaatar Tuguldur / 290
            </p>
          </div>

          <div className="absolute bottom-12 animate-bounce opacity-40">
            <div className="w-[1px] h-16 bg-gradient-to-b from-amber-500 to-transparent" />
          </div>
        </section>

        {/* The Legacy Section - Солигдсон хэсэг */}
        <section className="grid md:grid-cols-12 gap-16 p-8 md:p-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
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
                ертөнцөд{" "}
                <span className="italic font-serif text-amber-500">
                  наранцэцэг.
                </span>
              </h3>
            </div>

            <div className="space-y-8 text-xl leading-relaxed text-zinc-400 max-w-xl font-light">
              <p>
                Лондонд төрж, Улаанбаатарт өссөн Төгөлдөр нь{" "}
                <span className="text-white font-medium italic">&ldquo;YASHA&rdquo;</span>{" "}
                болон
                <span className="text-white font-medium italic"> &ldquo;NOITON&rdquo; </span>
                брэндүүдийг үүсгэн байгуулж, залуусын соёл, загварын чиг хандлагад өөрийн гэсэн тод мөрийг үлдээсэн юм.
              </p>

              <p className="text-lg text-zinc-500">
                Энэхүү дижитал архив нь түүний туурвисан хөгжим, дизайн болон бүтээлч сэтгэлгээний ертөнцийг нэгтгэн хадгалах зорилготой билээ.
              </p>

              <div className="relative p-8 border-l-4 border-amber-600 bg-amber-950/10 rounded-r-2xl italic group hover:bg-amber-900/20 transition-all duration-500">
                <p className="text-amber-100/90 text-lg">
                  &ldquo;Би их сургуульдаа 6 жилийг өнгөрөөсөн, учир нь 2 жил сураад,
                  2 жил өөрийн дууны карьераа хөөсөн...&rdquo;
                </p>
                <Sun className="absolute -right-4 -bottom-4 text-amber-500/10 group-hover:rotate-90 transition-transform duration-1000" size={100} />
              </div>
            </div>
          </div>

          {/* Navigation Chapters - Үндсэн цэсүүд рүү үсрэх хэсэг */}
          <div className="md:col-span-5 relative">
            <div className="sticky top-32 bg-zinc-900/30 p-8 md:p-12 border border-amber-500/10 rounded-[3rem] backdrop-blur-xl">
              <h3 className="text-amber-500 text-xs uppercase mb-10 flex items-center gap-3 tracking-widest font-bold">
                <Archive size={16} className="animate-pulse" /> Archive Chapters
              </h3>
              <ul className="space-y-2">
                {SITE_SECTIONS.map((section, index) => {
                  const Icon = sectionIcons[section.icon];

                  return (
                    <li key={section.href}>
                      <Link
                        href={section.href}
                        className="group/item flex justify-between items-center py-5 border-b border-white/5 hover:border-amber-500/40 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-5">
                          <span className="text-[10px] text-amber-800 font-mono group-hover/item:text-amber-500 transition-colors">
                            0{index + 1}
                          </span>
                          <div className="flex flex-col">
                            <span className="group-hover/item:text-white transition-colors uppercase text-sm tracking-widest flex items-center gap-2">
                              <Icon size={16} /> {"homeLabel" in section ? section.homeLabel : section.label}
                            </span>
                            <span className="text-[9px] text-zinc-600 uppercase tracking-tighter group-hover/item:text-amber-500/60 transition-colors">
                              {section.description}
                            </span>
                          </div>
                        </div>
                        <ExternalLink
                          size={14}
                          className="opacity-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 text-amber-500 transition-all"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* Creative Universe */}
        <section className="py-32 px-8 text-center border-t border-white/5 bg-black">
          <h2 className="text-zinc-600 text-[10px] uppercase tracking-[0.8em] mb-20">
            Creative Universe
          </h2>
          <div className="flex flex-wrap justify-center gap-16 md:gap-32 items-center">
            {["YASHA", "NOITON", "MOTR", "HAR MAF"].map((brand) => (
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
            290 LEGACY {" "}
            <span className="text-amber-500/50 italic">
              . ARCHIVE 2026
            </span>
          </span>
        </div>
        <div className="flex gap-12">
          {SOCIAL_LINKS.map((link) => (
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

    </div>
  );
}
