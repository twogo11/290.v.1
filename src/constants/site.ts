export const SITE_SECTIONS = [
  {
    label: "Tuguldur",
    href: "/Tuguldur",
    icon: "user",
    description: "Personal Journey",
  },
  {
    label: "Digital archive",
    homeLabel: "Archive",
    href: "/digital-archive",
    icon: "archive",
    description: "Creative Footprints",
  },
  {
    label: "Album 0",
    href: "/Album0",
    icon: "disc",
    description: "The Beginning",
  },
  {
    label: "Album 9",
    href: "/Album9",
    icon: "disc",
    description: "The Evolution",
  },
  {
    label: "Merch",
    href: "/Merch",
    icon: "shoppingBag",
    description: "NOITON Collective",
  },
  {
    label: "Guess the song",
    homeLabel: "Game",
    href: "/game",
    icon: "gamepad",
    description: "Interactive Exp",
  },
] as const;

export const NAV_ITEMS = SITE_SECTIONS.map(({ label, href }) => ({ label, href }));

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/thetwoninety/",
  },
  {
    name: "SoundCloud",
    url: "https://soundcloud.com/two290ninety",
  },
] as const;
