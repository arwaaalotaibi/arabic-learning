'use client';

import { useState } from 'react';
import { LETTERS, TILE_COLORS, HARAKAT, MUDOOD, Screen, letterClip, wordClip, harakaClip, maddClip } from '@/lib/data';
import { useSpeech } from '@/lib/speech';

type Props = {
  index: number;
  onChange: (i: number) => void;
  onGoto: (s: Screen) => void;
};

export default function LetterScreen({ index, onChange, onGoto }: Props) {
  const L = LETTERS[index];
  const c = TILE_COLORS[index % TILE_COLORS.length];
  const [playing, setPlaying] = useState<string | null>(null);
  const { speak: say } = useSpeech();

  const speak = (text: string, clip?: string) => {
    setPlaying(text);
    say(text, clip ? { clip } : undefined);
    setTimeout(() => setPlaying(null), 900);
  };

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-fun)', fontSize: 24, color: c.ink }}>الحرف {index + 1} من 28</div>
          <div style={{ color: 'var(--ink-soft)', fontWeight: 700 }}>اِستَمِع، ثُمَّ تَدَرَّب على الكِتابة</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="circle-btn" onClick={() => onChange(Math.max(0, index - 1))} disabled={index === 0}>
            <span style={{ fontSize: 22, fontWeight: 900 }}>›</span>
          </button>
          <button
            className="circle-btn"
            onClick={() => onChange(Math.min(LETTERS.length - 1, index + 1))}
            disabled={index === LETTERS.length - 1}
          >
            <span style={{ fontSize: 22, fontWeight: 900 }}>‹</span>
          </button>
        </div>
      </div>

      <div className="letter-hero">
        <div className="big-letter-card pop-in" style={{ background: c.bg }}>
          <span style={{ position: 'absolute', top: 18, left: 30, width: 50, height: 50, borderRadius: '50%', background: c.accent, opacity: 0.4 }} />
          <span style={{ position: 'absolute', bottom: 30, right: 24, width: 70, height: 70, borderRadius: '50%', background: c.accent, opacity: 0.25 }} />
          <span style={{ position: 'absolute', top: 60, right: 50, fontFamily: 'var(--font-fun)', fontSize: 28, color: c.accent, opacity: 0.55 }}>★</span>

          <div className="name-tag" style={{ color: c.ink, background: 'rgba(255,255,255,0.7)', padding: '4px 18px', borderRadius: 999 }}>
            {L.name}
          </div>
          <div
            className="glyph"
            style={{ color: c.ink, cursor: 'pointer' }}
            onClick={() => speak(L.name, letterClip(index))}
            title="اِضغَط لِتَسمَع اسم الحَرف"
          >
            {L.l}
          </div>
          <div className="word-row">
            <span style={{ fontFamily: 'var(--font-letter)', fontSize: 32, color: c.ink, fontWeight: 700 }}>{L.word}</span>
            <button
              className="circle-btn"
              onClick={() => speak(L.word, wordClip(index))}
              style={{ width: 40, height: 40, color: c.accent }}
              title="اِستَمِع لِلكَلِمة"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 4 6 20 10 20 16 24 16 0 10 4" />
                <path d="M19 8a5 5 0 0 1 0 8" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => speak(L.name, letterClip(index))}
            style={{
              marginTop: 10,
              background: c.accent,
              color: '#fff',
              border: 'none',
              borderRadius: 999,
              padding: '10px 22px',
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 15,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 4 6 20 10 20 16 24 16 0 10 4" />
              <path d="M19 8a5 5 0 0 1 0 8" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <span>اِسمَع اسمَ الحَرف</span>
          </button>
        </div>

        <div className="harakat-stack">
          {HARAKAT.map((h, idx) => {
            const m = MUDOOD[idx];
            const shortText = L.l + h.mark;
            const longText = L.l + m.mark + m.vowel;
            return (
              <div key={h.name} className="haraka-card">
                <div className="sound-pair">
                  <button
                    className={`sound-btn${playing === shortText ? ' active' : ''}`}
                    style={{ background: h.color + '14', color: h.color, borderColor: h.color + '33' }}
                    onClick={() => speak(shortText, harakaClip(index, h.sound))}
                  >
                    <span className="sb-glyph">{shortText}</span>
                    <span className="sb-tag">{h.name} ▶</span>
                  </button>
                  <button
                    className={`sound-btn${playing === longText ? ' active' : ''}`}
                    style={{ background: m.color + '14', color: m.color, borderColor: m.color + '33' }}
                    onClick={() => speak(longText, maddClip(index, m.sound))}
                  >
                    <span className="sb-glyph">{longText}</span>
                    <span className="sb-tag">{m.name} ▶</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 18 }}>
        <button className="btn-big" onClick={() => onGoto('write')}>
          <span>✎</span>
          <span>تَعَلَّم الكِتابة</span>
        </button>
        <button className="btn-big yellow" onClick={() => onGoto('game')}>
          <span>★</span>
          <span>لَعبة الحَرف</span>
        </button>
      </div>
    </div>
  );
}
