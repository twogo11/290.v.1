"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Heart,
  Zap,
  RotateCcw,
  Volume2,
  Music,
  Check,
  X,
  Timer,
} from "lucide-react";

interface Track {
  id: number;
  title: string;
  preview: string;
  artist_name: string;
  album_cover: string;
}

type GameState = "setup" | "loading" | "playing" | "answered" | "game-over";

export default function MusicGuessingGame() {
  // Game Configuration
  const [tracks, setTracks] = useState<Track[]>([]);
  const [sessionTracks, setSessionTracks] = useState<Track[]>([]);
  const [reserveTracks, setReserveTracks] = useState<Track[]>([]); // НӨӨЦ ДУУНУУД
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState<GameState>("setup");
  
  // Game Stats
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [snippetDuration, setSnippetDuration] = useState<number>(3000);
  
  // Round State
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [choices, setChoices] = useState<Track[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Progress, Timers & Loading
  const [playbackProgress, setPlaybackProgress] = useState(100);
  const [answerTimer, setAnswerTimer] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTrackLoading, setIsTrackLoading] = useState(false); // ДУУ УНШИЖ БАЙГАА ЭСЭХ

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const shuffle = <T,>(array: T[]): T[] => {
    const s = [...array];
    for (let i = s.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
  };

  const loadTracks = async (): Promise<Track[] | null> => {
    try {
      const response = await fetch("/api/tracks");
      const data: Track[] = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to load tracks:", error);
      return null;
    }
  };

  const initGame = async (duration: number) => {
    setSnippetDuration(duration);
    setGameState("loading");
    const allTracks = await loadTracks();
    
    // 1. FILTER ON FETCH: Зөвхөн preview линк нь байгаа дуунуудыг шүүж авах
    const validTracks = allTracks?.filter((t: Track) => t.preview && t.preview.trim() !== "") || [];
    setTracks(validTracks);
    
    if (validTracks.length >= 10) {
      const shuffled = shuffle(validTracks);
      setSessionTracks(shuffled.slice(0, 10)); // Үндсэн 10 дуу
      setReserveTracks(shuffled.slice(10)); // Үлдсэнийг нь алдаа гарсан үед ашиглахаар нөөцлөх
      
      setCurrentIndex(0);
      setScore(0);
      setLives(3);
      setStreak(0);
      startRound(shuffled.slice(0, 10), 0, validTracks); 
    } else {
      alert("Тоглоом эхлүүлэхэд хангалттай дуу алга байна.");
      setGameState("setup");
    }
  };

  const startRound = (trackList: Track[], index: number, allDbTracks: Track[] = tracks) => {
    if (index >= 10 || lives <= 0) {
      setGameState("game-over");
      return;
    }

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (audioRef.current) audioRef.current.pause();
    
    setIsPlaying(false);
    setIsTrackLoading(true); // 3. PRE-LOADING STATE: Дууг ачаалж эхэллээ

    const correctTrack = trackList[index];
    const distractors = allDbTracks
      .filter((t) => t.id !== correctTrack.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    setCurrentTrack(correctTrack);
    setChoices(shuffle([correctTrack, ...distractors]));
    setSelectedAnswer(null);
    setIsCorrect(null);
    setAnswerTimer(15);
    setPlaybackProgress(100);
    setGameState("playing");
    
    // Зөвхөн src-ийг зааж өгөөд хүлээх (onCanPlayThrough эвэнт хүртэл)
    if (audioRef.current) {
      audioRef.current.src = correctTrack.preview;
      audioRef.current.load();
    }
  };

  // ДУУ БҮРЭН АЧААЛАГДАЖ ДУУССАН ҮЕД АЖИЛЛАХ ФУНКЦ
  const handleCanPlayThrough = () => {
    if (!isTrackLoading) return; // Олон удаа дуудагдахаас сэргийлэх
    setIsTrackLoading(false); // Loading-ийг алга болгох
    
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.random() * 15; 
    setIsPlaying(true);
    
    audio.play().catch((e) => {
      console.error("Audio play error:", e);
      handleAudioError(); // Браузерын play block хийсэн үед эсвэл алдаа заасан үед
    });

    // Хөдөлгөөн болон цагийг эхлүүлэх
    let start: number | null = null;
    const animate = (time: number) => {
      if (!start) start = time;
      const elapsed = time - start;
      const remain = Math.max(0, 100 - (elapsed / snippetDuration) * 100);
      setPlaybackProgress(remain);
      
      if (elapsed < snippetDuration) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        audio.pause();
        setIsPlaying(false);
        startAnswerCountdown();
      }
    };
    animationRef.current = requestAnimationFrame(animate);
  };

  // 2. ERROR HANDLING: ДУУ АЖИЛЛАХГҮЙ БОЛСОН ҮЕД АЖИЛЛАХ ФУНКЦ
  const handleAudioError = () => {
    console.warn("Дууны линк эвдэрсэн байна. Нөөц дуу дуудаж байна...");
    
    if (reserveTracks.length > 0) {
      // Нөөцнөөс шинэ дуу авах
      const newReserve = [...reserveTracks];
      const backupTrack = newReserve.pop()!;
      setReserveTracks(newReserve);

      // Одоогийн дууг нөөц дуугаар солих
      const updatedSession = [...sessionTracks];
      updatedSession[currentIndex] = backupTrack;
      setSessionTracks(updatedSession);

      // Үеийг дахин эхлүүлэх (хэрэглэгчийн амь хасагдахгүй)
      startRound(updatedSession, currentIndex, tracks);
    } else {
      // Хэрвээ нөөц дуу дууссан бол шууд дараагийн үе рүү шилжих
      nextRound();
    }
  };

  const startAnswerCountdown = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      setAnswerTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current!);
          handleAnswer(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswer = (trackId: number) => {
    if (gameState !== "playing") return;
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);

    const correct = trackId === currentTrack?.id;
    setIsCorrect(correct);
    setSelectedAnswer(trackId);
    setGameState("answered");

    if (correct) {
      const speedBonus = Math.floor(answerTimer * 10);
      setScore((prev) => prev + 100 + speedBonus + (streak * 20));
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
      setLives((prev) => prev - 1);
    }
  };

  const nextRound = () => {
    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    if (nextIdx < 10 && lives > 0) {
      startRound(sessionTracks, nextIdx, tracks);
    } else {
      setGameState("game-over");
    }
  };

  return (
    <div className="text-[#FFC107] font-sans p-4 flex items-center justify-center">
      {/* Аудио элемент дээр onError болон onCanPlayThrough-г залгасан */}
      <audio 
        ref={audioRef} 
        onCanPlayThrough={handleCanPlayThrough}
        onError={handleAudioError}
      />

      <div className="max-w-md w-full">
        {/* Header Stats */}
        {gameState !== "setup" && gameState !== "loading" && (
          <div className="flex justify-between items-center mb-8 bg-black/40 p-4 rounded-2xl border border-[#FFC107]/20">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Heart key={i} className={`w-5 h-5 ${i < lives ? "fill-[#FFC107]" : "text-gray-700"}`} />
              ))}
            </div>
            <div className="text-center">
               <span className="text-xs block text-gray-500 uppercase tracking-widest">Track</span>
               <span className="font-bold">{currentIndex + 1} / 10</span>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-right">
                  <span className="text-xs block text-gray-500 uppercase tracking-widest">Score</span>
                  <span className="font-bold text-white">{score}</span>
               </div>
               <Zap className={`w-6 h-6 ${streak > 0 ? "fill-yellow-400 text-yellow-400" : "text-gray-700"}`} />
            </div>
          </div>
        )}

        <div className="bg-[#1A1A1A] rounded-[2rem] shadow-2xl overflow-hidden border border-[#FFC107]/10">
          {/* 1. SETUP STATE */}
          {gameState === "setup" && (
            <div className="p-10 text-center">
              <Music className="w-16 h-16 mx-auto mb-6 text-[#FFC107]" />
              <h1 className="text-3xl font-black mb-2 italic">BEAT GUESSER</h1>
              <p className="text-gray-400 mb-8">Choose your difficulty to start</p>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => initGame(5000)}
                  className="p-6 bg-[#FFC107] text-black rounded-2xl font-bold hover:scale-105 transition-transform"
                >
                  <span className="text-2xl block">5s</span>
                  Normal
                </button>
                <button 
                  onClick={() => initGame(3000)}
                  className="p-6 bg-black border-2 border-[#FFC107] text-[#FFC107] rounded-2xl font-bold hover:scale-105 transition-transform"
                >
                  <span className="text-2xl block">3s</span>
                  Expert
                </button>
              </div>
            </div>
          )}

          {/* 2. LOADING STATE (Тоглоом эхлэх үеийн таталт) */}
          {gameState === "loading" && (
            <div className="p-20 text-center">
              <div className="w-12 h-12 border-4 border-[#FFC107] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="animate-pulse">Loading Tracks...</p>
            </div>
          )}

          {/* 3. PLAYING / ANSWERED STATE */}
          {(gameState === "playing" || gameState === "answered") && currentTrack && (
            <div className="p-6">
              
              {/* Visualizer & Loading UI */}
              <div className="relative aspect-square w-full bg-black rounded-2xl mb-6 overflow-hidden flex items-center justify-center">
                
                {/* ДУУ АЧААЛЖ БАЙХ ҮЕД ХАРАГДАХ LOADING СЭТГЭГДЭЛ */}
                {isTrackLoading && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20">
                    <div className="w-10 h-10 border-4 border-[#FFC107] border-t-transparent rounded-full animate-spin mb-3" />
                    <span className="text-sm font-bold text-[#FFC107] tracking-widest uppercase animate-pulse">
                      Loading Track...
                    </span>
                  </div>
                )}

                {isPlaying && !isTrackLoading ? (
                  <div className="flex items-end gap-1 h-20">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-3 bg-[#FFC107] animate-bounce" 
                        style={{ animationDuration: `${0.5 + Math.random()}s`, height: `${Math.random() * 100}%` }}
                      />
                    ))}
                  </div>
                ) : (
                  <img 
                    src={currentTrack.album_cover} 
                    className={`w-full h-full object-cover transition-opacity duration-500 ${gameState === 'answered' ? 'opacity-60' : 'opacity-0'}`}
                    alt="Album"
                  />
                )}
                
                {gameState === "playing" && !isPlaying && !isTrackLoading && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
                    <Timer className="w-10 h-10 mb-2 animate-pulse" />
                    <span className="text-2xl font-black">{answerTimer}s</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-gray-800 rounded-full mb-6 overflow-hidden">
                <div 
                  className={`h-full bg-[#FFC107] ${gameState === "playing" && !isPlaying && !isTrackLoading ? "transition-all duration-1000 ease-linear" : ""}`}
                  style={{ width: `${(answerTimer / 15) * 100}%` }}
                />
              </div>

              {/* Answer Choices */}
              <div className="space-y-3">
                {choices.map((track) => {
                  const isSelected = selectedAnswer === track.id;
                  const isCorrectBtn = track.id === currentTrack.id;
                  
                  let btnClass = "bg-[#252525] text-white hover:bg-[#333]";
                  if (gameState === "answered") {
                    if (isCorrectBtn) btnClass = "bg-green-600 text-white";
                    else if (isSelected) btnClass = "bg-red-600 text-white";
                    else btnClass = "opacity-40 bg-[#252525]";
                  }

                  return (
                    <button
                      key={track.id}
                      disabled={gameState === "answered" || isTrackLoading}
                      onClick={() => handleAnswer(track.id)}
                      className={`w-full p-4 rounded-xl text-left font-semibold transition-all flex justify-between items-center ${btnClass} ${isTrackLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <span className="truncate pr-4">{track.title}</span>
                      {gameState === "answered" && isCorrectBtn && <Check className="w-5 h-5" />}
                      {gameState === "answered" && isSelected && !isCorrectBtn && <X className="w-5 h-5" />}
                    </button>
                  );
                })}
              </div>

              {gameState === "answered" && (
                <button 
                  onClick={nextRound}
                  className="w-full mt-6 p-4 bg-[#FFC107] text-black font-black rounded-xl hover:bg-[#ffd700] transition-colors"
                >
                  {currentIndex === 9 ? "SEE RESULTS" : "NEXT TRACK"}
                </button>
              )}
            </div>
          )}

          {/* 4. GAME OVER STATE */}
          {gameState === "game-over" && (
            <div className="p-10 text-center">
              <h2 className="text-4xl font-black mb-2">FINISHED!</h2>
              <div className="my-8">
                <span className="text-gray-400 uppercase tracking-tighter">Final Score</span>
                <div className="text-6xl font-black text-[#FFC107]">{score}</div>
              </div>
              
              <div className="bg-black/30 p-4 rounded-2xl mb-8 flex justify-around">
                <div>
                  <div className="text-xs text-gray-500 uppercase">Correct</div>
                  <div className="text-xl font-bold">{score / 100 >= 1 ? Math.floor(score/100) : 0}/10</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase">Streak</div>
                  <div className="text-xl font-bold">{streak} max</div>
                </div>
              </div>

              <button 
                onClick={() => setGameState("setup")}
                className="w-full p-4 bg-[#FFC107] text-black font-black rounded-xl flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> TRY AGAIN
              </button>
            </div>
          )}
        </div>
        
        <p className="text-center mt-8 text-gray-600 text-xs tracking-widest uppercase">
          Powered by Deezer API • 10 Rounds • Error Handled
        </p>
      </div>
    </div>
  );
}