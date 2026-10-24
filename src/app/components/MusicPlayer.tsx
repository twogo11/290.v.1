"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { LoaderCircle, Pause, Play } from "lucide-react";
import type { Track } from "../../types/track";

type PlayerContext = { play: (title: string, source?: Track) => Promise<void>; pause: () => void; loading: string | null; current: Track | null; playing: boolean; message: string | null };
const MusicContext = createContext<PlayerContext | null>(null);
export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("Music player provider is missing");
  return context;
}
function normalize(value: string) { return value.toLowerCase().replace(/\s*\(feat\..*$/i, "").replace(/[^\p{L}\p{N}]/gu, ""); }

export default function MusicProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const pool = useRef<Track[]>([]);
  const request = useRef(0);
  const [current, setCurrent] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => () => { request.current += 1; }, []);

  async function play(title: string, source?: Track) {
    const thisRequest = ++request.current;
    setMessage(null);
    if (current && normalize(current.title) === normalize(title)) {
      if (audio.current?.paused) {
        try { await audio.current?.play(); } catch { setMessage("Сонсох товчийг дахин дарна уу."); }
      } else audio.current?.pause();
      return;
    }
    setLoading(title);
    try {
      if (!source && !pool.current.length) {
        const response = await fetch("/api/tracks", { signal: AbortSignal.timeout(12000) });
        if (!response.ok) throw new Error("Дууны санг ачаалж чадсангүй. Дахин оролдоно уу.");
        const result: unknown = await response.json();
        if (!Array.isArray(result)) throw new Error("Дууны мэдээллийг авч чадсангүй.");
        pool.current = result.filter((item): item is Track => Boolean(item && typeof item.title === "string" && typeof item.preview === "string" && item.preview));
      }
      if (thisRequest !== request.current) return;
      const next = source || pool.current.find((track) => normalize(track.title) === normalize(title));
      if (!next) throw new Error("Энэ дууны хэсэг одоогоор байхгүй байна. SoundCloud-оор бүтнээр нь сонсоорой.");
      if (!audio.current) return;
      audio.current.pause();
      audio.current.src = next.preview;
      setCurrent(next);
      try { await audio.current.play(); } catch { setMessage("Тоглуулах товчийг дарж үргэлжлүүлээрэй."); }
    } catch (error) {
      if (thisRequest === request.current) setMessage(error instanceof Error ? error.message : "Дууг тоглуулж чадсангүй.");
    } finally {
      if (thisRequest === request.current) setLoading(null);
    }
  }
  return <MusicContext.Provider value={{ play, pause: () => audio.current?.pause(), loading, current, playing, message }}>
    {children}
    <audio ref={audio} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => { setPlaying(false); setMessage("Дууны хэсгийг ачаалж чадсангүй. SoundCloud-оор сонсох боломжтой."); }} />
  </MusicContext.Provider>;
}
export function TrackPlayButton({ title, className = "" }: { title: string; className?: string }) {
  const { play, loading, current, playing } = useMusic();
  const active = Boolean(current && normalize(current.title) === normalize(title) && playing);
  return <button type="button" className={"track-play " + className} aria-label={title + (active ? " түр зогсоох" : " сонсох")} aria-pressed={active} disabled={loading !== null} onClick={() => void play(title)}>{loading === title ? <LoaderCircle size={17} className="animate-spin" /> : active ? <Pause size={17} /> : <Play size={17} />}</button>;
}
