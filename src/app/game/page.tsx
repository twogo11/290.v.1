import { Globe, Music } from "lucide-react";
import Navigation from '../components/Navigation';
import MusicGuessingGame from '../components/MusicGuessingGame';

export const metadata = {
  title: 'Music Guessing Game | 290',
  description: 'Guess the song from the audio snippet'
};

export default function GamePage() {
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

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#FFC107] selection:text-black overflow-x-hidden">

      {/* --- Sunflower Aesthetic Background --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[100%] lg:w-[70%] h-[70%] bg-[#FFC107]/10 rounded-full blur-[100px] lg:blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] lg:w-[50%] h-[50%] bg-[#FFB300]/5 rounded-full blur-[80px] lg:blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30L35 45L30 60L25 45L30 30Z' fill='%23FFC107'/%3E%3C/svg%3E")` }} />
      </div>

      <Navigation socialLinks={socialLinks} />
      <main className="pt-24 lg:pt-32">
        <MusicGuessingGame />
      </main>
    </div>
  );
}