"use client";

import { Globe, Music } from "lucide-react";
import type { ReactNode } from "react";
import { SOCIAL_LINKS } from "../../constants/site";

const SOCIAL_ICONS = {
  Instagram: Globe,
  SoundCloud: Music,
};

interface SocialIconLinksProps {
  className?: string;
  linkClassName?: string;
  iconSize?: number;
  iconStrokeWidth?: number;
  onLinkClick?: () => void;
  after?: ReactNode;
}

export default function SocialIconLinks({
  className,
  linkClassName,
  iconSize = 20,
  iconStrokeWidth,
  onLinkClick,
  after,
}: SocialIconLinksProps) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = SOCIAL_ICONS[link.name];

        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            onClick={onLinkClick}
            className={linkClassName}
          >
            <Icon size={iconSize} strokeWidth={iconStrokeWidth} />
          </a>
        );
      })}
      {after}
    </div>
  );
}
