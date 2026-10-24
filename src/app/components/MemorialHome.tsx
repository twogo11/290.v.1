"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpRight, Disc3, Play, Sun, X } from "lucide-react";
import Navigation from "./Navigation";
import DailySong from "./DailySong";
import YashaCrew from "./YashaCrew";
import SmoothScroll from "./SmoothScroll";
import { MotionModeContext, ScrollReveal as Reveal, useSoftProgress } from "./ScrollEffects";
import { TrackPlayButton, useMusic } from "./MusicPlayer";

const interviews = [
  { title: "Асуулт, хариулт.", category: "CENTRAL TV · ЯРИЛЦЛАГА", image: "/images/interview-central.jpg", id: "5znbJ-uUKQc", note: "Өөрийнх нь үгээр. Өөрийнх нь дуу хоолойгоор." },
  { title: "290 × UTV Podcast", category: "U BRAND · ПОДКАСТ", image: "/images/interview-utv.jpg", id: "xBNx1kU25AQ", note: "Уран бүтээл, нөхөрлөл, амьдралын тухай яриа." },
  { title: "Тайзан дээрх 290.", category: "TRIPLE X · LIVE 2024", image: "/images/live.jpg", id: "Babqj_fYxl8", note: "Хөгжим, тайз, хамтдаа дуулсан тэр мөч." },
];
const photos = [
  { src: "/images/portrait-01.jpg", caption: "Нар жаргах үеэр.", number: "01" },
  { src: "/images/portrait-02.jpg", caption: "Энгийн нэгэн мөч.", number: "02" },
  { src: "/images/portrait-04.jpg", caption: "Хамтдаа.", number: "03" },
  { src: "/images/portrait-03.jpg", caption: "Тайзан дээр.", number: "04" },
];
const albums = [
  { no: "01", name: "0", year: "2023", date: "2023.03.20", tracks: "29 ДУУ", duration: "1 ЦАГ 18 МИН", image: "/images/album-0.jpg", route: "/Album0", title: "Эндээс эхэлсэн.", text: "29 дуутай «0» цомог. Дууны тоо, цомгийн нэр нийлээд — 290.", songs: [{ title: "Hodolguur", length: "1:56" }, { title: "HMM", length: "1:50" }, { title: "Game", length: "2:25" }] },
  { no: "02", name: "9", year: "2026", date: "2026.03.28", tracks: "9 ДУУ", duration: "27 МИН", image: "/images/album-9.jpg", route: "/Album9", title: "Үргэлжлэх хөгжим.", text: "290-ийн хөгжмийн ертөнцийн дараагийн бүлэг. Дуу бүрд нь үлдсэн өөрийн өнгө.", songs: [{ title: "INTRO", length: "1:45" }, { title: "GUDAMJ", length: "3:12" }, { title: "HOVORHON", length: "3:40" }] },
];

type OpenMedia = { kind: "video"; id: string; title: string } | { kind: "photo"; src: string; title: string };

export default function MemorialHome() {
  const { pause } = useMusic();
  const hero = useRef<HTMLElement>(null);
  const heroVideo = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const motionEnabled = true;
  const { scrollYProgress: rawHeroProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const heroProgress = useSoftProgress(rawHeroProgress);
  const heroY = useTransform(heroProgress, [0, 1], [0, 160]);
  const titleX = useTransform(heroProgress, [0, 1], [0, -95]);
  const titleY = useTransform(heroProgress, [0, 1], [0, -55]);
  const { scrollYProgress } = useScroll();
  const [media, setMedia] = useState<OpenMedia | null>(null);

  useEffect(() => {
    if (!media) return;
    const el = dialog.current;
    el?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { el?.close(); document.body.style.overflow = previous; };
  }, [media]);

  useEffect(() => {
    const video = heroVideo.current;
    const section = hero.current;
    if (!video || !section) return;
    let inView = true;
    const syncPlayback = () => {
      if (video.readyState >= 2 && !video.paused) setVideoReady(true);
      if (inView && motionEnabled && !media && !document.hidden) {
        void video.play().catch(() => {});
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }, { rootMargin: "120px 0px" });
    observer.observe(section);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [motionEnabled, media]);

  return <MotionModeContext.Provider value={motionEnabled}><MotionConfig reducedMotion={motionEnabled ? "never" : "always"}>
    <div className={"memorial " + (motionEnabled ? "motion-on" : "motion-paused")}>
      <SmoothScroll enabled={motionEnabled} />
      <a className="memory-skip" href="#today">Өнөөдрийн дуу руу алгасах</a>
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} />
      <Navigation />
      <main>
        <section id="top" ref={hero} className="memory-hero">
          <motion.div className="hero-portrait hero-video" style={{ y: motionEnabled ? heroY : 0 }}>
            <Image src="/images/hero-portrait-hq.jpg" className={"hero-poster " + (videoReady ? "is-hidden" : "")} alt="" fill priority unoptimized sizes="(max-width: 700px) 100vw, (max-width: 1600px) 67vw, 1080px" aria-hidden="true" />
            <div className={"hero-video-frame " + (videoReady ? "is-ready" : "")}>
              <video ref={heroVideo} className="hero-background-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" onLoadedData={(event) => { if (!event.currentTarget.paused) setVideoReady(true); }} onPlaying={() => setVideoReady(true)} onPause={() => setVideoReady(false)} onError={() => setVideoReady(false)}>
                <source src="https://res.cloudinary.com/do7jyitxi/video/upload/v1778255999/lv_0_20260508235921_fphr4m.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
          <div className="hero-shade" />
          <div className="hero-overline"><span><i /> Дурсамжийг нь мөнхлөх орон зай</span><span>2000 — ∞</span></div>
          <motion.h1 className="hero-title" style={{ y: motionEnabled ? titleY : 0, x: motionEnabled ? titleX : 0 }}><span>TWO</span><span>NINETY</span></motion.h1>
          <div className="hero-bottom"><div className="hero-intro"><Sun size={24} strokeWidth={1.1} /><p>Мөнхбаатарын Төгөлдөр</p></div><a href="#today" className="hero-scroll"><span>ДООШ ГҮЙЛГЭЭРЭЙ</span><ArrowDown size={19} /></a></div>
          <span className="hero-side-note">FOREVER IN THE MUSIC — 290</span>
        </section>

        <DailySong />
        <YashaCrew
          onPlay={pause}
          onPhoto={() => setMedia({ kind: "photo", src: "https://res.cloudinary.com/do7jyitxi/image/upload/v1792854670/Nine_Friends_in_an_Abandoned_Pool_q990uj.png", title: "YASHA-ийн хамтын зураг" })}
        />

        <section id="music" className="memory-music section-pad">
          <div className="section-index"><span>02 / ҮЛДЭЭСЭН ХӨГЖИМ</span><span>DISCOGRAPHY</span></div>
          <Reveal className="section-title-row"><h2>Дуу нь<br /><em>үлдэнэ.</em></h2><p>Дахин сонсох бүрд<br />дахин уулзах шиг.</p></Reveal>
          <div className="album-stack">{albums.map((album) => <article key={album.name} className={"album-stage album-stage-" + album.name}>
            <div className="album-art"><Image src={album.image} alt={"290 — «" + album.name + "» цомгийн нүүр"} fill sizes="(max-width: 700px) 100vw, 48vw" /><div className="album-art-tag"><Disc3 size={15} /><span>290 — ALBUM {album.name}</span><span>{album.year}</span></div></div>
            <div className="album-copy"><div className="album-topline"><span>ЦОМГИЙН БҮЛЭГ / {album.no}</span><span>{album.date}</span></div><h3>{album.title}</h3><p className="album-description">{album.text}</p><div className="album-stats"><span>{album.tracks}</span><span>{album.duration}</span></div>
              <div className="album-tracks">{album.songs.map((song, i) => <div className="home-track" key={song.title}><span className="track-number">0{i + 1}</span><span className="track-name">{song.title}</span><span className="track-duration">{song.length}</span>{album.name === "0" ? <TrackPlayButton title={song.title} /> : <Link href={album.route} className="track-detail" aria-label={song.title + " цомгийн дэлгэрэнгүй"}><ArrowUpRight size={17} /></Link>}</div>)}</div>
              <Link href={album.route} className="album-open">Цомгийг нээх <ArrowUpRight size={19} /></Link><span className="album-copy-number" aria-hidden="true">{album.name}</span>
            </div>
          </article>)}</div>
          <a href="https://soundcloud.com/two290ninety" target="_blank" rel="noreferrer" className="all-music-link"><span>Хөгжмийн ертөнцийг нь үргэлжлүүлэн сонсох</span><span>SOUNDCLOUD <ArrowUpRight size={16} /></span></a>
        </section>

        <section id="interviews" className="memory-interviews section-pad">
          <div className="section-index"><span>03 / ӨӨРИЙНХ НЬ ДУУ ХООЛОЙ</span><span>WATCH & LISTEN</span></div>
          <Reveal className="section-title-row"><h2>Яриа.<br /><em>Бодол. Тэр.</em></h2><Link href="/digital-archive" className="text-link">Бүх бичлэг <ArrowUpRight size={17} /></Link></Reveal>
          <div className="interview-grid">{interviews.map((video, i) => <Reveal key={video.id} className={"interview-item interview-item-" + i}><button className="interview-thumbnail" onClick={() => { pause(); setMedia({ kind: "video", id: video.id, title: video.title }); }} aria-label={video.title + " бичлэг үзэх"}><Image src={video.image} alt={video.title} fill sizes="(max-width: 700px) 100vw, 40vw" /><span className="watch-badge"><Play size={20} fill="currentColor" /></span><span className="video-number">{"0" + (i + 1)} / FILM</span></button><div className="video-meta"><span className="tiny-label">{video.category}</span><ArrowUpRight size={18} /></div><h3><button onClick={() => { pause(); setMedia({ kind: "video", id: video.id, title: video.title }); }}>{video.title}</button></h3><p>{video.note}</p></Reveal>)}</div>
        </section>

        <section id="collective" className="memory-collective section-pad">
          <div className="section-index"><span>04 / ХАМТЫН ЕРТӨНЦ</span><span>PEOPLE & CULTURE</span></div>
          <div className="collective-grid"><div className="collective-left"><Reveal><h2>Ганцаас<br /><em>илүү.</em></h2><p>Хөгжим, нөхөрлөл, хамтдаа үлдээсэн мөр.<br />290-ийн бүтээлч ертөнц дэх нэрс.</p></Reveal><div className="collective-photo"><Image src="/images/portrait-04.jpg" alt="Эх архив дахь 290-ийн найзуудтайгаа авахуулсан хамтын зураг" fill sizes="(max-width: 700px) 100vw, 48vw" /><span>ХАМТДАА / ЗУРГИЙН АРХИВ</span></div></div><div className="collective-right"><span className="tiny-label">НЭГ ХҮРЭЭЛЭЛ. ОЛОН ӨНГӨ.</span>{["YASHA", "MOTR", "HAR MAF", "NOITON"].map((name, i) => <div className="collective-name" key={name}><small>{"0" + (i + 1)}</small><span>{name}</span><Sun size={24} strokeWidth={1} /></div>)}<p className="collective-note">Энэ хүрээллийн тухай түүний өөрийн яриа, дурсамжийг ярилцлагуудаас үргэлжлүүлэн үзээрэй.</p><a href="#interviews" className="text-link">Ярилцлагууд руу <ArrowUpRight size={17} /></a></div></div>
        </section>

        <section id="memories" className="memory-gallery section-pad">
          <div className="section-index"><span>05 / ЗУРГИЙН ДУРСАМЖ</span><span>A FEW MOMENTS, FOREVER.</span></div>
          <Reveal className="gallery-heading"><h2>Тэр мөчүүд<span>.</span></h2><p>Зураг бүр нэг дурсамж.</p></Reveal>
          <div className="film-strip">{photos.map((photo, i) => <Reveal key={photo.src} className={"film-photo film-photo-" + i}><button aria-label={photo.caption + " Зураг томруулах"} onClick={() => setMedia({ kind: "photo", src: photo.src, title: photo.caption })}><Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 700px) 80vw, 35vw" /></button><div className="film-caption"><span>{photo.caption}</span><span>/{photo.number}</span></div></Reveal>)}</div>
        </section>

        <footer className="memory-footer section-pad"><div className="footer-top"><Sun size={30} strokeWidth={1} /><span>ХАЙРТАЙ ХҮНЭЭ ДУРСАХ ОРОН ЗАЙ.</span><a href="#top" aria-label="Эхлэл рүү буцах"><ArrowUp size={21} /></a></div><p className="footer-dedication">Хөгжимд нь.<br />Дурсамжид нь.<br /><em>Бидэнтэй хамт.</em></p><div className="footer-links"><a href="https://www.instagram.com/thetwoninety/" target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight size={13} /></a><a href="https://soundcloud.com/two290ninety" target="_blank" rel="noreferrer">SOUNDCLOUD <ArrowUpRight size={13} /></a><Link href="/game">ДУУГ ТАА <ArrowUpRight size={13} /></Link><Link href="/Merch">MERCH <ArrowUpRight size={13} /></Link></div><div className="footer-wordmark" aria-hidden="true">290<span>✳</span></div><div className="footer-bottom"><span>МӨНХБААТАРЫН ТӨГӨЛДӨР</span><span>2000 — ∞ · ҮРГЭЛЖ БИДЭНТЭЙ.</span><span>290 / DIGITAL MEMORY</span></div></footer>
      </main>
      <dialog ref={dialog} aria-labelledby="memory-media-title" className={"media-dialog " + (media?.kind === "photo" ? "media-dialog-photo" : "")} onClose={() => setMedia(null)} onClick={(event) => { if (event.target === event.currentTarget) setMedia(null); }}>
        {media && <div className="media-dialog-content"><div className="media-dialog-header"><h2 id="memory-media-title">{media.title}</h2><button aria-label="Бичлэг эсвэл зураг хаах" onClick={() => setMedia(null)}><X size={24} /></button></div>{media.kind === "video" ? <><iframe src={"https://www.youtube-nocookie.com/embed/" + media.id + "?autoplay=1&rel=0"} title={media.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /><a href={"https://www.youtube.com/watch?v=" + media.id} target="_blank" rel="noreferrer" className="text-link">YouTube дээр үзэх <ArrowUpRight size={16} /></a></> : <div className="lightbox-photo"><Image src={media.src} alt={media.title} fill sizes="90vw" /></div>}</div>}
      </dialog>
    </div>
  </MotionConfig></MotionModeContext.Provider>;
}
