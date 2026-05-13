'use client';

import { Tweaks } from '@/lib/data';

type Props = {
  kind: Tweaks['mascot'];
  x: number;
  y: number;
  scale?: number;
  talking?: boolean;
  message?: string;
};

export default function Mascot({ kind, x, y, scale = 1, talking, message }: Props) {
  const renders: Record<Tweaks['mascot'], JSX.Element> = {
    owl: (
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <ellipse cx="60" cy="70" rx="42" ry="40" fill="#A77BFF" />
        <ellipse cx="60" cy="78" rx="30" ry="28" fill="#DCC9FF" />
        <ellipse cx="28" cy="36" rx="10" ry="14" fill="#A77BFF" transform="rotate(-20 28 36)" />
        <ellipse cx="92" cy="36" rx="10" ry="14" fill="#A77BFF" transform="rotate(20 92 36)" />
        <circle cx="44" cy="56" r="14" fill="#fff" />
        <circle cx="76" cy="56" r="14" fill="#fff" />
        <circle cx="44" cy="56" r="6" fill="#2A1B4A" />
        <circle cx="76" cy="56" r="6" fill="#2A1B4A" />
        <circle cx="46" cy="54" r="2" fill="#fff" />
        <circle cx="78" cy="54" r="2" fill="#fff" />
        <polygon points="60,64 54,72 66,72" fill="#FFBE0B" />
        <circle cx="32" cy="74" r="6" fill="#F72585" opacity="0.45" />
        <circle cx="88" cy="74" r="6" fill="#F72585" opacity="0.45" />
        <ellipse cx="50" cy="108" rx="6" ry="3" fill="#FFBE0B" />
        <ellipse cx="70" cy="108" rx="6" ry="3" fill="#FFBE0B" />
      </svg>
    ),
    parrot: (
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <ellipse cx="30" cy="90" rx="22" ry="8" fill="#4CC9F0" transform="rotate(-15 30 90)" />
        <ellipse cx="34" cy="92" rx="18" ry="6" fill="#06C167" transform="rotate(-15 34 92)" />
        <ellipse cx="64" cy="64" rx="38" ry="42" fill="#F72585" />
        <ellipse cx="64" cy="80" rx="22" ry="22" fill="#FFE0F0" />
        <ellipse cx="84" cy="64" rx="14" ry="22" fill="#7209B7" />
        <ellipse cx="56" cy="38" rx="22" ry="18" fill="#FF6B9F" />
        <circle cx="50" cy="40" r="9" fill="#fff" />
        <circle cx="50" cy="40" r="5" fill="#2A1B4A" />
        <circle cx="52" cy="38" r="2" fill="#fff" />
        <polygon points="38,46 24,50 38,56" fill="#FFBE0B" />
        <polygon points="38,54 28,58 38,60" fill="#C88A00" />
        <ellipse cx="58" cy="108" rx="4" ry="3" fill="#FFBE0B" />
        <ellipse cx="72" cy="108" rx="4" ry="3" fill="#FFBE0B" />
      </svg>
    ),
    cat: (
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <ellipse cx="22" cy="90" rx="14" ry="5" fill="#FFBE0B" transform="rotate(-25 22 90)" />
        <ellipse cx="62" cy="78" rx="40" ry="32" fill="#FFBE0B" />
        <ellipse cx="62" cy="86" rx="26" ry="20" fill="#FFE9B0" />
        <polygon points="32,28 38,52 52,38" fill="#FFBE0B" />
        <polygon points="92,28 86,52 72,38" fill="#FFBE0B" />
        <polygon points="36,34 40,48 48,40" fill="#FFB5A7" />
        <polygon points="88,34 84,48 76,40" fill="#FFB5A7" />
        <ellipse cx="62" cy="50" rx="32" ry="28" fill="#FFBE0B" />
        <ellipse cx="48" cy="48" rx="6" ry="8" fill="#fff" />
        <ellipse cx="76" cy="48" rx="6" ry="8" fill="#fff" />
        <ellipse cx="48" cy="50" rx="3" ry="5" fill="#2A1B4A" />
        <ellipse cx="76" cy="50" rx="3" ry="5" fill="#2A1B4A" />
        <circle cx="49" cy="48" r="1.5" fill="#fff" />
        <circle cx="77" cy="48" r="1.5" fill="#fff" />
        <polygon points="62,58 58,62 66,62" fill="#F72585" />
        <circle cx="40" cy="60" r="5" fill="#F72585" opacity="0.4" />
        <circle cx="84" cy="60" r="5" fill="#F72585" opacity="0.4" />
        <line x1="32" y1="60" x2="42" y2="62" stroke="#2A1B4A" strokeWidth="1.5" />
        <line x1="32" y1="66" x2="42" y2="65" stroke="#2A1B4A" strokeWidth="1.5" />
        <line x1="92" y1="60" x2="82" y2="62" stroke="#2A1B4A" strokeWidth="1.5" />
        <line x1="92" y1="66" x2="82" y2="65" stroke="#2A1B4A" strokeWidth="1.5" />
      </svg>
    ),
  };
  return (
    <div className="mascot" style={{ left: x, top: y, transform: `scale(${scale})` }}>
      <div style={{ animation: 'wiggle 2.4s ease-in-out infinite' }}>{renders[kind] || renders.owl}</div>
      {talking && message && (
        <div className="mascot-bubble" style={{ position: 'absolute', top: -8, right: 100, transform: 'translateY(-100%)' }}>
          {message}
        </div>
      )}
    </div>
  );
}
