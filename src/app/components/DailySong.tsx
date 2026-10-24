"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, LoaderCircle, Pause, Play } from "lucide-react";
import { useMusic } from "./MusicPlayer";
import { useMotionMode, useSoftProgress } from "./ScrollEffects";

const artwork = "/images/dursamj.png";
const dailyTrack = {
  id: 1721833904,
  title: "Dursamj",
  artistName: "290",
  albumCover: artwork,
  preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/fb/8c/a2/fb8ca27d-8d54-adfa-c389-cac3978e55b4/mzaf_13245293114193178691.plus.aac.p.m4a",
};

function todayInUlaanbaatar() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ulaanbaatar", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (name: string) => parts.find((item) => item.type === name)?.value || "";
  return {
    day: part("day"),
    month: Number(part("month")) + "-р сар",
    year: part("year"),
    weekday: ({
      Sun: "Ням гараг", Mon: "Даваа гараг", Tue: "Мягмар гараг", Wed: "Лхагва гараг",
      Thu: "Пүрэв гараг", Fri: "Баасан гараг", Sat: "Бямба гараг",
    } as Record<string, string>)[new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Ulaanbaatar", weekday: "short" }).format(now)],
    iso: part("year") + "-" + part("month") + "-" + part("day"),
  };
}

function ScrollLine({ children, index, progress, accent = false }: {
  children: ReactNode; index: number; progress: MotionValue<number>; accent?: boolean;
}) {
  const enabled = useMotionMode();
  const start = .07 + index * .045;
  const y = useTransform(progress, [start, start + .15], ["112%", "0%"]);
  const rotate = useTransform(progress, [start, start + .15], [3, 0]);
  const opacity = useTransform(progress, [start, start + .13], [0, 1]);
  return <span className={"daily-title-mask " + (accent ? "daily-title-accent" : "")}>
    <motion.span style={enabled ? { y, rotate, opacity } : undefined}>{children}</motion.span>
  </span>;
}

function Sunflower({ progress, playing }: { progress: MotionValue<number>; playing: boolean }) {
  const enabled = useMotionMode();
  const draw = useTransform(progress, [0, .3], [0, 1]);
  const turn = useTransform(progress, [0, 1], [-48, 75]);
  const rise = useTransform(progress, [0, .4], [55, 0]);
  const drift = useTransform(progress, [0, 1], [-13, 17]);
  const opacity = useTransform(progress, [0, .2], [0, 1]);
  return <motion.div className={"daily-flower " + (playing ? "is-playing" : "")} style={enabled ? { y: rise, x: drift, opacity } : undefined} aria-hidden="true">
    <svg viewBox="0 0 300 430" fill="none" className="daily-flower-drawing">
      <motion.path d="M145 410C123 334 177 271 151 143" stroke="currentColor" strokeWidth="1.4" style={enabled ? { pathLength: draw } : undefined} />
      <g transform="translate(145 323)">
        <g className="daily-flower-leaf daily-flower-leaf-left">
          <motion.path d="M0 0C-34-5-67-25-70-63C-33-57-7-40 0 0Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity=".025" style={enabled ? { pathLength: draw } : undefined} />
          <path d="M0 0L-53-45" stroke="currentColor" strokeWidth=".7" opacity=".5" />
        </g>
      </g>
      <g transform="translate(146 278)">
        <g className="daily-flower-leaf daily-flower-leaf-right">
          <motion.path d="M0 0C29-6 55-27 59-58C24-54 4-31 0 0Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity=".025" style={enabled ? { pathLength: draw } : undefined} />
          <path d="M0 0L44-41" stroke="currentColor" strokeWidth=".7" opacity=".5" />
        </g>
      </g>
      <g transform="translate(150 125)">
        <motion.g style={enabled ? { rotate: turn, transformOrigin: "0px 0px" } : undefined}>
          <g className="daily-flower-petals">
            {Array.from({ length: 21 }, (_, i) => <ellipse key={i} cx="0" cy="-62" rx={i % 2 ? 12 : 10} ry="43" transform={"rotate(" + (i * 360 / 21) + ")"} stroke="currentColor" strokeWidth="1.1" fill="#ffe127" fillOpacity={i % 3 === 0 ? ".09" : ".025"} />)}
          </g>
          <circle r="34" fill="#080808" stroke="currentColor" strokeWidth="1.2" />
          <circle r="28" stroke="currentColor" strokeWidth=".6" opacity=".5" />
          {Array.from({ length: 65 }, (_, i) => {
            const angle = i * 2.39996;
            const radius = 3.1 * Math.sqrt(i);
            return <circle key={i} cx={Number((Math.cos(angle) * radius).toFixed(3))} cy={Number((Math.sin(angle) * radius).toFixed(3))} r=".9" fill="currentColor" opacity=".65" />;
          })}
        </motion.g>
      </g>
    </svg>
    <span className="daily-flower-note">нар руу, үргэлж.</span>
  </motion.div>;
}

export default function DailySong() {
  const target = useRef<HTMLElement>(null);
  const enabled = useMotionMode();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const progress = useSoftProgress(scrollYProgress);
  const coverY = useTransform(progress, [0, 1], [34, -24]);
  const dateY = useTransform(progress, [0, .23], [24, 0]);
  const dateOpacity = useTransform(progress, [.02, .2], [0, 1]);
  const controlY = useTransform(progress, [.2, .39], [20, 0]);
  const controlOpacity = useTransform(progress, [.2, .36], [0, 1]);
  const { play, loading, current, playing, message } = useMusic();
  const [date, setDate] = useState<ReturnType<typeof todayInUlaanbaatar> | null>(null);
  const active = Boolean(current && /^dursamj(?:\b|\s)/i.test(current.title) && playing);
  const preparing = loading === "Dursamj";

  useEffect(() => {
    const update = () => setDate(todayInUlaanbaatar());
    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, []);

  return <section id="today" ref={target} className="daily-song section-pad" aria-labelledby="daily-song-title">
    <div className="daily-topline">
      <span><i /> ӨНӨӨДРИЙН VIBE-Д</span>
      <span>НЭГ ӨДӨР. НЭГ ДУУ.</span>
    </div>
    <div className="daily-layout">
      <div className="daily-copy">
        <motion.time className="daily-date" dateTime={date?.iso} style={enabled ? { y: dateY, opacity: dateOpacity } : undefined}>
          <span className="daily-date-day">{date?.day || "—"}</span>
          <span className="daily-date-detail"><span>{date ? date.month + " / " + date.year : "Өнөөдөр"}</span><span>{date?.weekday || "Улаанбаатар"}</span></span>
        </motion.time>
        <h2 id="daily-song-title" aria-label="Намайг санавал, үүнийг сонсоорой.">
          <ScrollLine index={0} progress={progress}>Намайг</ScrollLine>
          <ScrollLine index={1} progress={progress}>санавал,</ScrollLine>
          <ScrollLine index={2} progress={progress} accent>үүнийг</ScrollLine>
          <ScrollLine index={3} progress={progress} accent>сонсоорой.</ScrollLine>
        </h2>
        <motion.button type="button" className={"daily-listen " + (active ? "is-playing" : "")} style={enabled ? { y: controlY, opacity: controlOpacity } : undefined} onClick={() => void play("Dursamj", dailyTrack)} disabled={loading !== null} aria-label={active ? "Дурсамж түр зогсоох" : "Дурсамж 30 секунд сонсох"} aria-pressed={active}>
          <span className="daily-listen-icon">{preparing ? <LoaderCircle size={18} className="animate-spin" /> : active ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</span>
          <span>{preparing ? "Бэлдэж байна…" : active ? "Түр зогсоох" : "Сонсох"}<small>30 секундийн хэсэг</small></span>
          <ArrowUpRight className="daily-listen-arrow" size={18} />
        </motion.button>
        {message && <p className="daily-playback-message" role="status">{message}</p>}
      </div>
      <motion.div className={"daily-record " + (active ? "is-playing" : "")} style={enabled ? { y: coverY } : undefined}>
        <div className="daily-artwork">
          <Image src={artwork} alt="290 — Дурсамж дууны зураг" fill unoptimized sizes="(max-width: 700px) 60vw, 380px" />
          <span className="daily-cover-mark">290 / ДУРСАМЖ</span>
          <div className="daily-playing-bars" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ animationDelay: (i * -.11) + "s", height: (9 + i * 7 % 19) + "px" }} />)}</div>
        </div>
        <div className="daily-record-meta"><div><span className="daily-track-label">ӨНӨӨДРИЙН СОНГОЛТ</span><h3>Дурсамж</h3><p>290 · TWO NINETY</p></div><span className="daily-track-number">01</span></div>
        <a href="https://soundcloud.com/two290ninety/dursamj" target="_blank" rel="noreferrer" className="daily-full-track">Бүтнээр нь сонсох <ArrowUpRight size={13} /></a>
      </motion.div>
      <Sunflower progress={progress} playing={active} />
    </div>
    <div className="daily-bottomline"><p>Өнөөдөр жаахан удаан алхъя.</p><a href="#story"><span>YASHA crew-тэй танилцах</span><ArrowDownRight size={19} /></a></div>
  </section>;
}