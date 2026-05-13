'use client';

import { useMemo } from 'react';

type Props = {
  letter: string;
  onClose: () => void;
};

export default function Celebrate({ letter, onClose }: Props) {
  const confetti = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        x: Math.random() * 100,
        delay: Math.random() * 0.6,
        bg: ['#F72585', '#FFBE0B', '#4CC9F0', '#7209B7', '#06C167', '#FF6B35'][i % 6],
        rotation: Math.random() * 360,
      })),
    [],
  );
  return (
    <div className="celebrate" onClick={onClose}>
      {confetti.map((cf, i) => (
        <span
          key={i}
          className="confetti"
          style={{
            left: `${cf.x}%`,
            top: -40,
            background: cf.bg,
            animationDelay: `${cf.delay}s`,
            transform: `rotate(${cf.rotation}deg)`,
          }}
        />
      ))}
      <div className="card">
        <div className="stars-big">★ ★ ★</div>
        <h2 className="title">أَحسَنت!</h2>
        <p className="sub">أَكمَلت حَرف «{letter}» بِنَجاح 🎉</p>
        <button className="btn-big" onClick={onClose}>
          <span>تابِع</span>
          <span>←</span>
        </button>
      </div>
    </div>
  );
}
