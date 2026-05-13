'use client';

import { LETTERS, TILE_COLORS, Progress } from '@/lib/data';

type Props = {
  progress: Progress;
  onPick: (i: number) => void;
};

export default function HomeScreen({ progress, onPick }: Props) {
  return (
    <div className="home">
      <div className="home-bg">
        <span className="deco star" style={{ top: 80, left: '34%', color: '#FFBE0B' }}>★</span>
        <span className="deco star" style={{ top: 130, left: '64%', color: '#F72585', animationDelay: '0.6s' }}>✦</span>
        <span className="deco star" style={{ bottom: 60, left: '24%', color: '#4CC9F0', animationDelay: '1.2s' }}>✸</span>
        <span className="deco star" style={{ top: 220, right: '12%', color: '#7209B7', animationDelay: '0.3s' }}>✺</span>
      </div>
      <div className="home-content">
        <div className="home-side">
          <div className="greeting">
            <p className="hi">مَرحَباً يا بَطَل!</p>
            <p className="sub">هَيّا نَتَعلَّم حَرفاً جَديداً</p>
          </div>
          <div className="progress-card">
            <div className="lbl">حُروفُكَ المُنجَزَة</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span className="num">{progress.completed.length}</span>
              <span style={{ color: 'var(--ink-soft)', fontWeight: 700 }}>/ 28</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(progress.completed.length / 28) * 100}%` }} />
            </div>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: 13, color: 'var(--purple)' }}>أَحسَنت!</span>
              <span style={{ fontFamily: 'var(--font-fun)', color: 'var(--yellow)', fontSize: 22 }}>★ {progress.stars}</span>
            </div>
          </div>
          <button
            className="btn-big pink"
            style={{ width: '100%', justifyContent: 'center', fontSize: 18 }}
            onClick={() => onPick(progress.lastIndex ?? 0)}
          >
            <span>تابِع التَّعَلُّم</span>
            <span style={{ fontSize: 22 }}>←</span>
          </button>
        </div>

        <div className="grid">
          {LETTERS.map((L, i) => {
            const c = TILE_COLORS[i % TILE_COLORS.length];
            const done = progress.completed.includes(i);
            return (
              <div
                key={L.l}
                className={`tile pop-in${done ? ' done' : ''}`}
                style={{ background: c.bg, color: c.ink, animationDelay: `${i * 0.02}s` }}
                onClick={() => onPick(i)}
              >
                <span className="tile-bubble" style={{ width: 40, height: 40, top: -10, right: -10, background: c.accent }} />
                <span className="tile-bubble" style={{ width: 22, height: 22, bottom: 10, left: 8, background: c.accent }} />
                <span className="letter">{L.l}</span>
                <span className="name" style={{ color: c.ink }}>{L.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
