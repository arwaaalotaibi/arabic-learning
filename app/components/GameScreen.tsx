'use client';

import { useMemo, useState } from 'react';
import { LETTERS, TILE_COLORS, Letter } from '@/lib/data';

type Props = {
  index: number;
  onChange: (i: number) => void;
  onComplete: () => void;
};

export default function GameScreen({ index, onChange, onComplete }: Props) {
  const L = LETTERS[index];
  const c = TILE_COLORS[index % TILE_COLORS.length];
  const [picked, setPicked] = useState<Letter | null>(null);
  const [round, setRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const options = useMemo(() => {
    const others = LETTERS.filter((_, i) => i !== index);
    const shuffled = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const all = [...shuffled, L].sort(() => 0.5 - Math.random());
    return all;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, round]);

  const choose = (letter: Letter) => {
    if (picked !== null) return;
    setPicked(letter);
    if (letter.l === L.l) {
      setCorrectCount((n) => n + 1);
      setTimeout(() => {
        if (correctCount + 1 >= 2) onComplete();
        else {
          setPicked(null);
          setRound((r) => r + 1);
        }
      }, 900);
    } else {
      setTimeout(() => setPicked(null), 700);
    }
  };

  const speak = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const u = new SpeechSynthesisUtterance(L.name);
        u.lang = 'ar-SA';
        u.rate = 0.7;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch {}
    }
  };

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-fun)', fontSize: 24, color: c.ink }}>لَعبة الحَرف</div>
          <div style={{ color: 'var(--ink-soft)', fontWeight: 700 }}>اِختَر الحَرفَ الصَّحيح ★</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 1].map((i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-fun)',
                fontSize: 32,
                color: i < correctCount ? 'var(--yellow)' : 'rgba(0,0,0,0.12)',
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="game-area">
        <div className="game-prompt">
          <button className="circle-btn" onClick={speak} style={{ background: c.accent, color: '#fff', width: 60, height: 60 }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 4 6 20 10 20 16 24 16 0 10 4" />
              <path d="M19 8a5 5 0 0 1 0 8" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </button>
          <div>
            <div style={{ fontSize: 22, color: 'var(--ink-soft)', fontFamily: 'var(--font-ui)', fontWeight: 800 }}>
              اِستَمِع، ثُمَّ اِختَر
            </div>
            <div>اِختَر حَرفَ «{L.name}»</div>
          </div>
        </div>

        <div className="game-options">
          {options.map((opt) => {
            const isCorrect = picked !== null && opt.l === L.l;
            const isWrong = picked !== null && opt.l === picked.l && opt.l !== L.l;
            return (
              <button
                key={opt.l}
                className={`game-opt${isCorrect ? ' correct' : ''}${isWrong ? ' wrong' : ''}`}
                onClick={() => choose(opt)}
                style={isCorrect ? undefined : { color: TILE_COLORS[LETTERS.indexOf(opt) % TILE_COLORS.length].ink }}
              >
                {opt.l}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 14 }}>
          <button className="btn-big cyan" onClick={() => onChange(Math.min(LETTERS.length - 1, index + 1))}>
            <span>الحَرف التّالي</span>
            <span>←</span>
          </button>
        </div>
      </div>
    </div>
  );
}
