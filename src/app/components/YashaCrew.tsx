"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Play, Sun } from "lucide-react";
import { ScrollReveal, useMotionMode, useSoftProgress } from "./ScrollEffects";

const members = ["290", "TUUG18", "Khandgai", "COZYSLASHCLOT", "TSE", "BLOND", "KLE TNGS", "KOF CAESAR"];
const channel = "https://www.youtube.com/@yasha1335";

export default function YashaCrew({ onPlay, onPhoto }: { onPlay: () => void; onPhoto: () => void }) {
  const heading = useRef<HTMLDivElement>(null);
  const [liveStarted, setLiveStarted] = useState(false);
  const startLive = () => { onPlay(); setLiveStarted(true); };
  const enabled = useMotionMode();
  const { scrollYProgress } = useScroll({ target: heading, offset: ["start end", "end start"] });
  const progress = useSoftProgress(scrollYProgress);
  const titleY = useTransform(progress, [0, .38], [65, 0]);
  const titleOpacity = useTransform(progress, [.04, .3], [.12, 1]);
  const logoY = useTransform(progress, [0, 1], [35, -25]);
  const logoRotate = useTransform(progress, [0, 1], [-8, 7]);

  return <section id="story" className="yasha-crew section-pad" aria-labelledby="yasha-title">
    <div className="section-index"><span>01 / YASHA CREW</span><Sun size={17} /></div>
    <div ref={heading} className="yasha-heading">
      <div className="yasha-title-wrap">
        <span className="yasha-eyebrow">290-ИЙН ХҮРЭЭЛЭЛ / EST. 2019</span>
        <div className="yasha-title-mask"><motion.h2 id="yasha-title" style={enabled ? { y: titleY, opacity: titleOpacity } : undefined}>YASHA<span>CREW</span></motion.h2></div>
      </div>
      <motion.div className="yasha-logo" style={enabled ? { y: logoY, rotate: logoRotate } : undefined}>
        <Image src="/images/yasha-logo-transparent.png" alt="YASHA — шүдэнзний хайрцаг бүхий лого" width={1536} height={1024} unoptimized sizes="(max-width: 700px) 62vw, 360px" />
      </motion.div>
    </div>

    <div className="yasha-introduction">
      <ScrollReveal className="yasha-group">
        <button type="button" className="yasha-group-photo" onClick={onPhoto} aria-label="290 найзуудтайгаа авахуулсан хамтын зургийг томруулах">
          <Image src="https://res.cloudinary.com/do7jyitxi/image/upload/v1792854670/Nine_Friends_in_an_Abandoned_Pool_q990uj.png" alt="290 найзуудтайгаа хамт авахуулсан зураг" fill sizes="(max-width: 700px) 90vw, 560px" />
          <span className="yasha-photo-open"><ArrowUpRight size={19} /></span>
        </button>
      </ScrollReveal>
      <ScrollReveal className="yasha-about">
        <h3>YASHA-ийн тухай</h3>
        <p className="yasha-description">YASHA бол 2019 онд 290-ийн үүсгэн байгуулсан уран бүтээлчдийн нэгдэл. Crew-ийн хамтын бүтээл, live тоглолт болон бусад бичлэгийг албан ёсны YouTube сувгаас нь үзэх боломжтой.</p>
        <dl className="yasha-facts">
          <div><dt>ҮҮССЭН ОН</dt><dd>2019</dd></div>
          <div><dt>ҮҮСГЭН БАЙГУУЛАГЧ · АХЛАГЧ</dt><dd>290<small>Мөнхбаатарын Төгөлдөр</small></dd></div>
        </dl>
        <a href={channel} target="_blank" rel="noreferrer" className="yasha-channel"><span className="yasha-youtube-icon"><Play size={18} fill="currentColor" /></span><span>Албан ёсны YouTube<small>@yasha1335</small></span><ArrowUpRight size={19} /></a>
      </ScrollReveal>
    </div>

    <div className="yasha-members">
      <div className="yasha-subheading"><h3>Гишүүд</h3><span>CREW MEMBERS</span></div>
      <ul className="yasha-member-list">{members.map((name, i) => <motion.li key={name} initial={{ opacity: .25, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .8 }} transition={{ duration: .65, delay: i % 3 * .06, ease: [.22, 1, .36, 1] }} className={name === "290" ? "yasha-member-founder" : ""}><span className="yasha-member-index">{String(i + 1).padStart(2, "0")}</span><span className="yasha-member-name">{name}</span>{name === "290" && <Sun size={18} strokeWidth={1.2} />}</motion.li>)}</ul>
    </div>

    <ScrollReveal className="yasha-live">
      <div className="yasha-live-media">
        {liveStarted ? <iframe
          src="https://www.youtube-nocookie.com/embed/QV-W4cASjSc?autoplay=1&rel=0&playsinline=1"
          title="YASHA — Spichki Vol. 1 / Monstar Live"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        /> : <button type="button" className="yasha-live-poster" onClick={startLive} aria-label="YASHA live тоглолтыг энд тоглуулах">
          <Image src="/images/yasha-live.jpg" alt="YASHA live тоглолтын бичлэг" fill sizes="(max-width: 700px) 100vw, 48vw" />
          <span className="yasha-live-badge"><i /> LIVE PERFORMANCE</span>
          <span className="yasha-live-play"><Play size={24} fill="currentColor" /></span>
          <span className="yasha-live-poster-label">YASHA — SPICHKI VOL. 1 <ArrowUpRight size={19} /></span>
        </button>}
      </div>
      <div className="yasha-live-copy">
        <span className="yasha-eyebrow">LIVE / MONSTAR TV</span>
        <h3>Spichki Vol. 1</h3>
        <p>YASHA · Monstar Live</p>
        <a href="https://www.youtube.com/watch?v=QV-W4cASjSc" target="_blank" rel="noreferrer" className="text-link">YouTube дээр үзэх <ArrowUpRight size={17} /></a>
        <a href={channel} target="_blank" rel="noreferrer" className="yasha-more-videos">YASHA-ийн албан ёсны суваг <ArrowUpRight size={13} /></a>
      </div>
    </ScrollReveal>
    <div className="yasha-chapter-end"><span>YASHA / ХАМТЫН ЕРТӨНЦ</span><a href="#music">Үлдээсэн хөгжмийг нь сонсох <ArrowDownRight size={18} /></a></div>
  </section>;
}