'use client';

import { Progress } from '@/lib/data';

type Props = {
  progress: Progress;
  onPick: (i: number) => void;
};

export default function ProfileScreen({ progress, onPick }: Props) {
  const badges = [
    { id: 1, icon: '★', title: 'البِداية', desc: 'أَكمَلَ أَوَّل حَرف', got: progress.completed.length >= 1, color: '#FFBE0B' },
    { id: 2, icon: '✿', title: 'مُجتَهِد', desc: 'أَكمَلَ 5 حُروف', got: progress.completed.length >= 5, color: '#F72585' },
    { id: 3, icon: '✦', title: 'ذكي جدا', desc: 'أَكمَلَ 10 حُروف', got: progress.completed.length >= 10, color: '#4CC9F0' },
    { id: 4, icon: '☀', title: 'بَطَل القِراءة', desc: 'أَكمَلَ نِصف الحُروف', got: progress.completed.length >= 14, color: '#7209B7' },
    { id: 5, icon: '♛', title: 'مَلِك الحُروف', desc: 'أَكمَلَ كُلَّ الحُروف', got: progress.completed.length >= 28, color: '#06C167' },
    { id: 6, icon: '✎', title: 'كاتِب صَغير', desc: 'تَتَبَّع 5 حُروف', got: progress.stars >= 5, color: '#FF6B35' },
  ];
  return (
    <div className="screen">
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: 'var(--font-fun)', fontSize: 30, color: 'var(--purple)' }}>مَلَفّ الإِنجازات</div>
        <div style={{ color: 'var(--ink-soft)', fontWeight: 700 }}>اُنظُر كَم تَعَلَّمت! 🌟</div>
      </div>
      <div className="profile-grid">
        <div className="profile-card">
          <div className="avatar">
            <svg viewBox="0 0 100 100" width="100" height="100">
              <circle cx="50" cy="42" r="22" fill="#FFE8B0" />
              <circle cx="42" cy="40" r="3" fill="#2A1B4A" />
              <circle cx="58" cy="40" r="3" fill="#2A1B4A" />
              <path d="M40 50 Q50 60 60 50" stroke="#2A1B4A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle cx="32" cy="48" r="4" fill="#F72585" opacity="0.5" />
              <circle cx="68" cy="48" r="4" fill="#F72585" opacity="0.5" />
              <path d="M28 76 Q50 66 72 76 L72 90 L28 90 Z" fill="#7209B7" />
            </svg>
          </div>
          <h3 className="profile-name">سامي الصَّغير</h3>
          <p className="profile-meta">عُمر 4 سَنَوات • المُستَوى 2</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span className="stat-pill">
              <span style={{ color: 'var(--yellow)', fontSize: 18 }}>★</span> {progress.stars}
            </span>
            <span className="stat-pill">
              <span style={{ color: 'var(--pink)', fontSize: 18 }}>✓</span> {progress.completed.length}/28
            </span>
            <span className="stat-pill">
              <span style={{ color: 'var(--cyan)', fontSize: 18 }}>♦</span> {badges.filter((b) => b.got).length}
            </span>
          </div>
          <button
            className="btn-big"
            style={{ marginTop: 10, fontSize: 18, padding: '12px 22px' }}
            onClick={() => onPick(progress.completed.length % 28)}
          >
            تابِع التَّعَلُّم
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              padding: '16px 20px',
              border: '3px solid #fff',
              boxShadow: '0 8px 18px rgba(114, 9, 183, 0.08)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-fun)', fontSize: 22, color: 'var(--purple)' }}>التَّقَدُّم اليَوميّ</span>
              <span style={{ fontWeight: 800, color: 'var(--ink-soft)' }}>7 أَيّام مُتَتالية 🔥</span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              {['س', 'ح', 'ث', 'ر', 'خ', 'ج', 'س'].map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      margin: '0 auto',
                      borderRadius: 12,
                      background: i < 6 ? 'linear-gradient(135deg,#F72585,#FFBE0B)' : '#F0EAF8',
                      color: i < 6 ? '#fff' : 'var(--ink-soft)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                    }}
                  >
                    {i < 6 ? '★' : ''}
                  </div>
                  <div style={{ fontSize: 11, marginTop: 4, color: 'var(--ink-soft)', fontWeight: 700 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontFamily: 'var(--font-fun)', fontSize: 22, color: 'var(--purple)' }}>الشّارات</div>
          <div className="achievements">
            {badges.map((b) => (
              <div key={b.id} className={`badge${b.got ? '' : ' locked'}`}>
                <div className="icon" style={{ color: b.color }}>{b.icon}</div>
                <div className="ttl">{b.title}</div>
                <div className="desc">{b.desc}</div>
                {b.got && <span style={{ position: 'absolute', top: 6, left: 6, fontSize: 14 }}>✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
