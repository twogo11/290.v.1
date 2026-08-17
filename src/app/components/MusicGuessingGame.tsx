"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  Disc3,
  Heart,
  LoaderCircle,
  Music,
  Play,
  RotateCcw,
  Timer,
  Trophy,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import type { Track } from "../../types/track";

const TOTAL_ROUNDS = 10;
const STARTING_LIVES = 3;
const ANSWER_SECONDS = 15;
const CHOICE_COUNT = 4;

const DIFFICULTIES = [
  {
    label: "Энгийн",
    description: "5 секунд сонсоно",
    durationMs: 5000,
  },
  {
    label: "Хэцүү",
    description: "3 секунд сонсоно",
    durationMs: 3000,
  },
] as const;

const VISUALIZER_BARS = [
  { height: 48, duration: 0.72, delay: 0.08 },
  { height: 76, duration: 0.58, delay: 0.16 },
  { height: 100, duration: 0.84, delay: 0 },
  { height: 64, duration: 0.65, delay: 0.22 },
  { height: 88, duration: 0.77, delay: 0.12 },
  { height: 56, duration: 0.61, delay: 0.28 },
  { height: 92, duration: 0.8, delay: 0.05 },
  { height: 68, duration: 0.69, delay: 0.2 },
] as const;

type GameState = "setup" | "loading" | "playing" | "answered" | "game-over";
type RoundPhase = "loading" | "ready" | "listening" | "guessing" | "failed";

function randomIndex(max: number) {
  const value = new Uint32Array(1);
  crypto.getRandomValues(value);
  return value[0] % max;
}

function shuffle<T>(items: readonly T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function buildChoices(correctTrack: Track, trackPool: Track[]) {
  const distractors = shuffle(
    trackPool.filter((track) => track.id !== correctTrack.id),
  ).slice(0, CHOICE_COUNT - 1);

  return shuffle([correctTrack, ...distractors]);
}

function isTrack(value: unknown): value is Track {
  if (!value || typeof value !== "object") return false;
  const track = value as Record<string, unknown>;

  return (
    typeof track.id === "number" &&
    typeof track.title === "string" &&
    typeof track.preview === "string" &&
    typeof track.artistName === "string" &&
    typeof track.albumCover === "string"
  );
}

function getResultMessage(correctAnswers: number) {
  if (correctAnswers >= 9) return "290-ийн жинхэнэ сонсогч!";
  if (correctAnswers >= 7) return "Маш сайн мэддэг юм байна.";
  if (correctAnswers >= 4) return "Сайн эхлэл — дахиад нэг оролдоорой.";
  return "Дахин сонсоод рекордоо ахиулаарай.";
}

export default function MusicGuessingGame() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [sessionTracks, setSessionTracks] = useState<Track[]>([]);
  const [reserveTracks, setReserveTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [choices, setChoices] = useState<Track[]>([]);
  const [gameState, setGameState] = useState<GameState>("setup");
  const [roundPhase, setRoundPhase] = useState<RoundPhase>("loading");
  const [snippetDuration, setSnippetDuration] = useState(5000);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerWasCorrect, setAnswerWasCorrect] = useState<boolean | null>(null);
  const [answerTimer, setAnswerTimer] = useState(ANSWER_SECONDS);
  const [playbackProgress, setPlaybackProgress] = useState(100);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const answerTimeoutRef = useRef<number | null>(null);
  const hasAnsweredRef = useRef(false);

  const currentTrack = sessionTracks[currentIndex] ?? null;

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      if (countdownRef.current !== null) window.clearInterval(countdownRef.current);
      if (answerTimeoutRef.current !== null) window.clearTimeout(answerTimeoutRef.current);
      audio?.pause();
    };
  }, []);

  function clearRoundTimers() {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (countdownRef.current !== null) {
      window.clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    if (answerTimeoutRef.current !== null) {
      window.clearTimeout(answerTimeoutRef.current);
      answerTimeoutRef.current = null;
    }
  }

  async function loadTracks() {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10_000);

    try {
      const response = await fetch("/api/tracks", { signal: controller.signal });
      const payload: unknown = await response.json();

      if (!response.ok) {
        const message =
          payload && typeof payload === "object" && "error" in payload
            ? String(payload.error)
            : "Дууны жагсаалтыг авч чадсангүй.";
        throw new Error(message);
      }

      if (!Array.isArray(payload)) throw new Error("Дууны мэдээлэл буруу бүтэцтэй ирлээ.");

      return payload.filter(isTrack).filter((track) => track.preview.trim().length > 0);
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function prepareRound(trackList: Track[], index: number, trackPool: Track[]) {
    const nextTrack = trackList[index];

    if (!nextTrack) {
      setGameState("game-over");
      return;
    }

    clearRoundTimers();
    audioRef.current?.pause();
    hasAnsweredRef.current = false;
    setCurrentIndex(index);
    setChoices(buildChoices(nextTrack, trackPool));
    setSelectedAnswer(null);
    setAnswerWasCorrect(null);
    setAnswerTimer(ANSWER_SECONDS);
    setPlaybackProgress(100);
    setStatusMessage(null);
    setRoundPhase("loading");
    setGameState("playing");
  }

  async function initGame(durationMs: number) {
    clearRoundTimers();
    audioRef.current?.pause();
    setSnippetDuration(durationMs);
    setStatusMessage(null);
    setGameState("loading");
    setScore(0);
    setLives(STARTING_LIVES);
    setStreak(0);
    setMaxStreak(0);
    setCorrectAnswers(0);

    try {
      const validTracks = await loadTracks();

      if (validTracks.length < TOTAL_ROUNDS) {
        throw new Error(`Тоглоомд ${TOTAL_ROUNDS}-аас доошгүй ажиллах дуу хэрэгтэй байна.`);
      }

      const shuffledTracks = shuffle(validTracks);
      const roundTracks = shuffledTracks.slice(0, TOTAL_ROUNDS);
      const backupTracks = shuffledTracks.slice(TOTAL_ROUNDS);

      setTracks(validTracks);
      setSessionTracks(roundTracks);
      setReserveTracks(backupTracks);
      prepareRound(roundTracks, 0, validTracks);
    } catch (error) {
      const message =
        error instanceof DOMException && error.name === "AbortError"
          ? "Сервер хэт удаан хариуллаа. Дахин оролдоно уу."
          : error instanceof Error
            ? error.message
            : "Тоглоомыг эхлүүлж чадсангүй.";

      setStatusMessage(message);
      setGameState("setup");
    }
  }

  function startAnswerCountdown() {
    setAnswerTimer(ANSWER_SECONDS);

    countdownRef.current = window.setInterval(() => {
      setAnswerTimer((remaining) => Math.max(0, remaining - 1));
    }, 1000);

    answerTimeoutRef.current = window.setTimeout(() => {
      handleAnswer(null);
    }, ANSWER_SECONDS * 1000);
  }

  async function playSnippet() {
    const audio = audioRef.current;
    if (!audio || !currentTrack || roundPhase !== "ready") return;

    clearRoundTimers();
    setStatusMessage(null);
    setPlaybackProgress(100);

    const snippetSeconds = snippetDuration / 1000;
    const duration = Number.isFinite(audio.duration) ? audio.duration : snippetSeconds;
    const maxStart = Math.max(0, duration - snippetSeconds - 0.25);
    const deterministicOffset = ((currentTrack.id * 37) % 100) / 100;
    audio.currentTime = maxStart * deterministicOffset;

    try {
      await audio.play();
      setRoundPhase("listening");
    } catch {
      setRoundPhase("ready");
      setStatusMessage("Дуу тоглуулах зөвшөөрөл хэрэгтэй байна. Play товчийг дахин дарна уу.");
      return;
    }

    let startedAt: number | null = null;

    const animateSnippet = (timestamp: number) => {
      if (startedAt === null) startedAt = timestamp;
      const elapsed = timestamp - startedAt;
      setPlaybackProgress(Math.max(0, 100 - (elapsed / snippetDuration) * 100));

      if (elapsed < snippetDuration) {
        animationRef.current = requestAnimationFrame(animateSnippet);
        return;
      }

      audio.pause();
      animationRef.current = null;
      setRoundPhase("guessing");
      startAnswerCountdown();
    };

    animationRef.current = requestAnimationFrame(animateSnippet);
  }

  function handleAnswer(trackId: number | null) {
    if (!currentTrack || hasAnsweredRef.current) return;

    hasAnsweredRef.current = true;
    clearRoundTimers();
    audioRef.current?.pause();

    const isCorrect = trackId === currentTrack.id;
    setSelectedAnswer(trackId);
    setAnswerWasCorrect(isCorrect);
    setGameState("answered");

    if (isCorrect) {
      const nextStreak = streak + 1;
      const speedBonus = answerTimer * 10;
      const streakBonus = streak * 25;

      setScore((currentScore) => currentScore + 100 + speedBonus + streakBonus);
      setStreak(nextStreak);
      setMaxStreak((currentMax) => Math.max(currentMax, nextStreak));
      setCorrectAnswers((count) => count + 1);
    } else {
      setStreak(0);
      setLives((remainingLives) => Math.max(0, remainingLives - 1));
    }
  }

  function nextRound() {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= TOTAL_ROUNDS || lives <= 0) {
      setGameState("game-over");
      return;
    }

    prepareRound(sessionTracks, nextIndex, tracks);
  }

  function handleTrackReady() {
    if (gameState === "playing" && roundPhase === "loading") {
      setRoundPhase("ready");
    }
  }

  function handleAudioError() {
    if (gameState !== "playing") return;

    clearRoundTimers();
    audioRef.current?.pause();

    const [backupTrack, ...remainingBackups] = reserveTracks;
    if (!backupTrack) {
      setRoundPhase("failed");
      setStatusMessage("Энэ дууны preview ажиллахгүй байна. Амь хасахгүйгээр алгасаж болно.");
      return;
    }

    const updatedSession = [...sessionTracks];
    updatedSession[currentIndex] = backupTrack;
    hasAnsweredRef.current = false;
    setSessionTracks(updatedSession);
    setReserveTracks(remainingBackups);
    setChoices(buildChoices(backupTrack, tracks));
    setSelectedAnswer(null);
    setAnswerWasCorrect(null);
    setPlaybackProgress(100);
    setRoundPhase("loading");
    setStatusMessage("Ажиллахгүй preview-г нөөц дуугаар сольж байна…");
  }

  function skipBrokenTrack() {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= TOTAL_ROUNDS) {
      setGameState("game-over");
      return;
    }
    prepareRound(sessionTracks, nextIndex, tracks);
  }

  const progress =
    roundPhase === "listening"
      ? playbackProgress
      : roundPhase === "guessing"
        ? (answerTimer / ANSWER_SECONDS) * 100
        : gameState === "answered"
          ? 0
          : 100;

  const roundIsEnding = currentIndex === TOTAL_ROUNDS - 1 || lives <= 0;

  return (
    <div className="flex items-center justify-center p-4 font-sans text-[#FFC107]">
      <audio
        key={currentTrack?.id ?? "empty"}
        ref={audioRef}
        src={currentTrack?.preview}
        preload="auto"
        onCanPlay={handleTrackReady}
        onError={handleAudioError}
      />

      <div className="w-full max-w-lg">
        {(gameState === "playing" || gameState === "answered") && (
          <div className="mb-6 grid grid-cols-3 items-center rounded-2xl border border-[#FFC107]/20 bg-black/50 p-4 backdrop-blur-sm">
            <div>
              <span className="mb-1 block text-[10px] uppercase tracking-widest text-gray-500">Амь</span>
              <div className="flex gap-1" aria-label={`${lives} амь үлдсэн`}>
                {Array.from({ length: STARTING_LIVES }, (_, index) => (
                  <Heart
                    key={index}
                    className={`h-5 w-5 ${
                      index < lives ? "fill-[#FFC107] text-[#FFC107]" : "text-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-center">
              <span className="block text-[10px] uppercase tracking-widest text-gray-500">Дуу</span>
              <span className="font-bold text-white">{currentIndex + 1} / {TOTAL_ROUNDS}</span>
            </div>
            <div className="flex items-center justify-end gap-3">
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-widest text-gray-500">Оноо</span>
                <span className="font-bold text-white">{score}</span>
              </div>
              <Zap className={`h-5 w-5 ${streak > 0 ? "fill-yellow-400 text-yellow-400" : "text-gray-700"}`} />
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-[2rem] border border-[#FFC107]/10 bg-[#171717] shadow-2xl shadow-black/50">
          {gameState === "setup" && (
            <div className="p-8 text-center sm:p-10">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#FFC107]/20 bg-[#FFC107]/10">
                <Music className="h-10 w-10" />
              </div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#FFC107]/70">290 music game</p>
              <h1 className="mb-4 text-4xl font-black italic text-white">Дууг таа</h1>
              <p className="mx-auto mb-8 max-w-sm text-sm leading-6 text-gray-400">
                Дууны богино хэсгийг сонсоод 15 секундийн дотор зөв нэрийг сонго. Зөв дараалал бүр streak bonus нэмнэ; гурван амьтай.
              </p>

              {statusMessage && (
                <p role="alert" className="mb-6 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">
                  {statusMessage}
                </p>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                {DIFFICULTIES.map((difficulty, index) => (
                  <button
                    key={difficulty.durationMs}
                    type="button"
                    onClick={() => initGame(difficulty.durationMs)}
                    className={`rounded-2xl p-5 text-left transition-transform hover:-translate-y-1 ${
                      index === 0
                        ? "bg-[#FFC107] text-black"
                        : "border border-[#FFC107]/40 bg-black text-[#FFC107]"
                    }`}
                  >
                    <span className="block text-lg font-black">{difficulty.label}</span>
                    <span className={`text-xs ${index === 0 ? "text-black/60" : "text-gray-500"}`}>
                      {difficulty.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameState === "loading" && (
            <div className="p-20 text-center" aria-live="polite">
              <LoaderCircle className="mx-auto mb-4 h-12 w-12 animate-spin" />
              <p className="font-bold text-white">Дуунуудыг бэлдэж байна…</p>
              <p className="mt-2 text-xs text-gray-500">Сүлжээнээс хамаарч хэдэн секунд үргэлжилж болно.</p>
            </div>
          )}

          {(gameState === "playing" || gameState === "answered") && currentTrack && (
            <div className="p-5 sm:p-6">
              <div className="relative mb-5 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-black">
                {gameState === "answered" && currentTrack.albumCover ? (
                  <Image
                    src={currentTrack.albumCover}
                    alt={`${currentTrack.title} цомгийн зураг`}
                    fill
                    sizes="(max-width: 640px) 100vw, 512px"
                    className="object-cover opacity-60"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,193,7,0.14),transparent_62%)]">
                    <Disc3 className={`h-28 w-28 text-[#FFC107]/30 ${roundPhase === "listening" ? "animate-spin-slow" : ""}`} />
                  </div>
                )}

                {roundPhase === "loading" && gameState === "playing" && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/75">
                    <LoaderCircle className="mb-3 h-10 w-10 animate-spin" />
                    <span className="text-xs font-bold uppercase tracking-widest">Дуу ачаалж байна…</span>
                  </div>
                )}

                {roundPhase === "ready" && gameState === "playing" && (
                  <button
                    type="button"
                    onClick={playSnippet}
                    className="absolute z-20 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#FFC107] text-black shadow-[0_0_40px_rgba(255,193,7,0.25)] transition-transform hover:scale-105"
                  >
                    <Play className="h-8 w-8 fill-current" />
                    <span className="mt-1 text-[10px] font-black uppercase tracking-wider">Сонсох</span>
                  </button>
                )}

                {roundPhase === "listening" && gameState === "playing" && (
                  <div className="absolute z-20 flex h-24 items-end gap-1.5" aria-label="Дуу тоглож байна">
                    {VISUALIZER_BARS.map((bar, index) => (
                      <span
                        key={index}
                        className="w-2.5 origin-bottom animate-wave rounded-full bg-[#FFC107]"
                        style={{
                          height: `${bar.height}%`,
                          animationDuration: `${bar.duration}s`,
                          animationDelay: `${bar.delay}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {roundPhase === "guessing" && gameState === "playing" && (
                  <div className="absolute z-20 flex flex-col items-center justify-center" aria-live="polite">
                    <Timer className="mb-2 h-10 w-10 animate-pulse" />
                    <span className="text-4xl font-black text-white">{answerTimer}</span>
                    <span className="mt-1 text-[10px] uppercase tracking-widest text-gray-400">секунд</span>
                  </div>
                )}

                {roundPhase === "failed" && gameState === "playing" && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 p-8 text-center">
                    <X className="mb-3 h-10 w-10 text-red-300" />
                    <p className="mb-5 text-sm text-gray-300">{statusMessage}</p>
                    <button
                      type="button"
                      onClick={skipBrokenTrack}
                      className="rounded-xl bg-[#FFC107] px-5 py-3 text-sm font-black text-black"
                    >
                      Амь хасахгүй алгасах
                    </button>
                  </div>
                )}

                {gameState === "answered" && (
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-16 text-left">
                    <p className="text-xs uppercase tracking-widest text-[#FFC107]">{currentTrack.artistName}</p>
                    <h2 className="mt-1 text-2xl font-black text-white">{currentTrack.title}</h2>
                  </div>
                )}
              </div>

              <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-gray-500">
                <span>
                  {roundPhase === "listening"
                    ? "Сонсож байна"
                    : roundPhase === "guessing"
                      ? "Хариулах хугацаа"
                      : roundPhase === "ready"
                        ? `${snippetDuration / 1000} секундийн хэсэг`
                        : ""}
                </span>
                {streak > 1 && <span className="text-[#FFC107]">{streak}× streak</span>}
              </div>
              <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                <div
                  className="h-full bg-[#FFC107] transition-[width] duration-200 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {statusMessage && roundPhase !== "failed" && (
                <p role="status" className="mb-4 rounded-xl border border-[#FFC107]/20 bg-[#FFC107]/5 p-3 text-xs text-gray-300">
                  {statusMessage}
                </p>
              )}

              <div className="space-y-3">
                {choices.map((track, index) => {
                  const isSelected = selectedAnswer === track.id;
                  const isCorrectChoice = track.id === currentTrack.id;
                  const canAnswer = gameState === "playing" && roundPhase === "guessing";

                  let buttonClass = canAnswer
                    ? "bg-[#252525] text-white hover:bg-[#333] hover:border-[#FFC107]/30"
                    : "border-transparent bg-[#202020] text-gray-500";

                  if (gameState === "answered") {
                    if (isCorrectChoice) buttonClass = "border-green-400/50 bg-green-600 text-white";
                    else if (isSelected) buttonClass = "border-red-400/50 bg-red-600 text-white";
                    else buttonClass = "border-transparent bg-[#202020] text-gray-600 opacity-50";
                  }

                  return (
                    <button
                      key={track.id}
                      type="button"
                      disabled={!canAnswer}
                      onClick={() => handleAnswer(track.id)}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left font-semibold transition-all disabled:cursor-not-allowed ${buttonClass}`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="text-xs font-mono text-[#FFC107]/60">{index + 1}</span>
                        <span className="truncate">{track.title}</span>
                      </span>
                      {gameState === "answered" && isCorrectChoice && <Check className="h-5 w-5 shrink-0" />}
                      {gameState === "answered" && isSelected && !isCorrectChoice && <X className="h-5 w-5 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {gameState === "answered" && (
                <div className="mt-6" aria-live="polite">
                  <p className={`mb-3 text-center text-sm font-bold ${answerWasCorrect ? "text-green-400" : "text-red-300"}`}>
                    {answerWasCorrect
                      ? `Зөв! +${100 + answerTimer * 10 + Math.max(0, streak - 1) * 25} оноо`
                      : selectedAnswer === null
                        ? "Хугацаа дууслаа."
                        : "Буруу хариулт."}
                  </p>
                  <button
                    type="button"
                    onClick={nextRound}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFC107] p-4 font-black text-black transition-colors hover:bg-[#ffd740]"
                  >
                    {roundIsEnding ? "Үр дүн харах" : "Дараагийн дуу"}
                  </button>
                </div>
              )}
            </div>
          )}

          {gameState === "game-over" && (
            <div className="p-8 text-center sm:p-10">
              <Trophy className="mx-auto mb-5 h-14 w-14 text-[#FFC107]" />
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-[#FFC107]/70">Тоглоом дууслаа</p>
              <h2 className="text-3xl font-black text-white">{getResultMessage(correctAnswers)}</h2>

              <div className="my-8">
                <span className="text-xs uppercase tracking-widest text-gray-500">Нийт оноо</span>
                <div className="mt-1 text-7xl font-black text-[#FFC107]">{score}</div>
              </div>

              <div className="mb-8 grid grid-cols-3 gap-2 rounded-2xl bg-black/40 p-4">
                <div>
                  <div className="text-[10px] uppercase text-gray-500">Зөв</div>
                  <div className="text-xl font-bold text-white">{correctAnswers}/{Math.min(TOTAL_ROUNDS, currentIndex + 1)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-gray-500">Max streak</div>
                  <div className="text-xl font-bold text-white">{maxStreak}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-gray-500">Үлдсэн амь</div>
                  <div className="text-xl font-bold text-white">{lives}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setGameState("setup")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFC107] p-4 font-black text-black transition-transform hover:-translate-y-0.5"
              >
                <RotateCcw className="h-5 w-5" /> Дахин тоглох
              </button>
            </div>
          )}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-[10px] uppercase tracking-[0.3em] text-gray-600">
          <Volume2 className="h-3.5 w-3.5" /> DEV BY TWOGO
        </p>
      </div>
    </div>
  );
}
