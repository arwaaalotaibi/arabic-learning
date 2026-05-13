'use client';

import { Screen } from '@/lib/data';

type Props = {
  screen: Screen;
  stars: number;
  onBack: () => void;
  onHome: () => void;
};

export default function AppBar({ screen, stars, onBack, onHome }: Props) {
  return (
    <div className="appbar">
      <div style={{ display: 'flex', gap: 10 }}>
        {screen !== 'home' && (
          <button className="circle-btn" onClick={onBack} aria-label="رجوع">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        )}
        {screen !== 'home' && (
          <button className="circle-btn" onClick={onHome} aria-label="الرئيسية">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />
            </svg>
          </button>
        )}
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <span className="pill" style={{ background: 'linear-gradient(135deg, #FFEEB5, #FFD8E8)', cursor: 'default' }}>
          <span style={{ color: '#FFBE0B', fontFamily: 'var(--font-fun)', fontSize: 22 }}>★</span>
          <span>{stars}</span>
        </span>
      </div>
    </div>
  );
}
