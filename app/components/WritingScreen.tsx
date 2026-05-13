'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { LETTERS, TILE_COLORS, getLetterForms } from '@/lib/data';

type Props = {
  index: number;
  onChange: (i: number) => void;
  onComplete: () => void;
};

type Mode = 'trace' | 'dots' | 'color';

const COLORS = ['#7209B7', '#F72585', '#4CC9F0', '#FFBE0B', '#06C167', '#FF6B35', '#2A1B4A'];

// letters where the natural first-stroke direction is vertical (top-to-bottom),
// so we don't penalize lack of leftward motion on them
const VERTICAL_FIRST = ['ا', 'ل', 'ك', 'ط', 'ظ'];

export default function WritingScreen({ index, onChange, onComplete }: Props) {
  const L = LETTERS[index];
  const c = TILE_COLORS[index % TILE_COLORS.length];
  const forms = useMemo(() => getLetterForms(L.l), [L.l]);
  const [formIdx, setFormIdx] = useState(0);
  const currentForm = forms[formIdx];
  const [mode, setMode] = useState<Mode>('trace');
  const [penColor, setPenColor] = useState(COLORS[0]);
  const [step, setStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const strokeStart = useRef<{ x: number; y: number } | null>(null);
  const directionChecked = useRef(false);
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showError = (msg: string) => {
    if (errorTimer.current) clearTimeout(errorTimer.current);
    setErrorMsg(msg);
    errorTimer.current = setTimeout(() => setErrorMsg(null), 1600);
  };

  const clear = () => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, cv.width, cv.height);
    setStep(0);
  };

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formIdx, mode, index]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const parent = cv.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    cv.width = rect.width;
    cv.height = rect.height;
  }, [mode, index, formIdx]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const cv = canvasRef.current!;
    const rect = cv.getBoundingClientRect();
    const touch = 'touches' in e ? e.touches[0] : null;
    const x = (touch ? touch.clientX : (e as React.MouseEvent).clientX) - rect.left;
    const y = (touch ? touch.clientY : (e as React.MouseEvent).clientY) - rect.top;
    return { x, y };
  };
  const start = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    drawing.current = true;
    const p = getPos(e);
    last.current = p;
    strokeStart.current = p;
    directionChecked.current = false;
    setStep((s) => s + 1);

    if (mode !== 'trace' && mode !== 'dots') return;
    const cv = canvasRef.current;
    if (!cv) return;
    // wrong start: touched the left 40% of the canvas
    if (p.x < cv.width * 0.4) {
      showError('ابدَأ مِنَ اليَمين 👉');
    }
  };
  const move = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current) return;
    e.preventDefault();
    const p = getPos(e);
    const cv = canvasRef.current!;
    const ctx = cv.getContext('2d');
    if (!ctx || !last.current) return;
    ctx.strokeStyle = penColor;
    ctx.lineWidth = mode === 'color' ? 28 : 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;

    // direction check: once user has moved ~30px from stroke start, decide if
    // the dominant initial motion is leftward (correct in RTL) or rightward (wrong)
    if (!directionChecked.current && strokeStart.current && (mode === 'trace' || mode === 'dots')) {
      const dx = p.x - strokeStart.current.x;
      const dy = p.y - strokeStart.current.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 30) {
        directionChecked.current = true;
        const isVerticalFirst = VERTICAL_FIRST.includes(L.l);
        // wrong if moving strongly rightward AND not a vertical-first letter
        if (!isVerticalFirst && dx > 18 && Math.abs(dx) > Math.abs(dy)) {
          showError('اِكتُب مِنَ اليَمين لِليَسار 👈');
        }
      }
    }
  };
  const end = () => {
    drawing.current = false;
    strokeStart.current = null;
    directionChecked.current = false;
  };

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-fun)', fontSize: 24, color: c.ink }}>
            اُكتُب حَرف {L.name} — <span style={{ color: c.accent }}>{currentForm.name}</span>
          </div>
          <div style={{ color: 'var(--ink-soft)', fontWeight: 700 }}>{currentForm.hint} ✎</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="circle-btn" onClick={clear} title="مسح">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" />
            </svg>
          </button>
          <button className="circle-btn" onClick={() => onChange(Math.min(LETTERS.length - 1, index + 1))}>
            <span style={{ fontSize: 22, fontWeight: 900 }}>‹</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {forms.map((f, i) => {
          const active = i === formIdx;
          return (
            <button
              key={f.id}
              onClick={() => setFormIdx(i)}
              style={{
                cursor: 'pointer',
                padding: '10px 16px 10px 14px',
                borderRadius: 18,
                background: active ? c.accent : '#fff',
                color: active ? '#fff' : c.ink,
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 14,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: active ? `0 6px 14px ${c.accent}66` : '0 4px 10px rgba(114, 9, 183, 0.08)',
                border: active ? '3px solid #fff' : '3px solid transparent',
                transition: 'all .15s',
              }}
            >
              <span style={{ fontFamily: 'var(--font-letter)', fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{f.text}</span>
              <span>{f.short}</span>
            </button>
          );
        })}
      </div>

      <div className="write-card">
        <div className="canvas-box" style={{ background: c.bg + '55' }}>
          <div className="step-hint">الخُطوة {step || 1}</div>

          {(mode === 'trace' || mode === 'dots') && (
            <div className="start-here" aria-hidden="true">
              <span className="dot" />
              <span className="lbl">ابدَأ هُنا</span>
            </div>
          )}

          {errorMsg && (
            <div className="write-error" role="alert">
              <span className="x">✕</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {mode === 'trace' && (
            <>
              <div className="ghost">{currentForm.text}</div>
              <svg className="trace-overlay" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
                <text
                  x="300"
                  y="280"
                  textAnchor="middle"
                  fontSize="320"
                  style={{ fontFamily: 'var(--font-letter)' }}
                  fill="none"
                  stroke={c.accent}
                  strokeWidth="3"
                  strokeDasharray="8 8"
                  opacity="0.65"
                >
                  {currentForm.text}
                </text>
              </svg>
            </>
          )}
          {mode === 'dots' && (
            <>
              <div className="ghost" style={{ opacity: 0.12 }}>{currentForm.text}</div>
              <svg className="trace-overlay" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
                {Array.from({ length: 8 }).map((_, i) => {
                  const t = i / 7;
                  const x = 480 - t * 340;
                  const y = 220 + Math.sin(t * Math.PI) * 60;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="22" fill={c.accent} opacity="0.18" />
                      <circle cx={x} cy={y} r="14" fill="#fff" stroke={c.accent} strokeWidth="3" />
                      <text x={x} y={y + 6} textAnchor="middle" fontSize="18" fontWeight="900" fill={c.ink}>
                        {i + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </>
          )}
          {mode === 'color' && (
            <>
              <div className="ghost" style={{ color: c.accent + '40', fontSize: 440 }}>{currentForm.text}</div>
              <div
                style={{
                  position: 'absolute',
                  top: 24,
                  left: 24,
                  fontFamily: 'var(--font-fun)',
                  fontSize: 22,
                  color: c.ink,
                  background: '#fff',
                  padding: '6px 16px',
                  borderRadius: 14,
                }}
              >
                لَوِّن الحَرف بِالكامِل! 🎨
              </div>
            </>
          )}

          <canvas
            ref={canvasRef}
            className="ink-canvas"
            onMouseDown={start}
            onMouseMove={move}
            onMouseUp={end}
            onMouseLeave={end}
            onTouchStart={start}
            onTouchMove={move}
            onTouchEnd={end}
          />
        </div>

        <div className="write-side">
          <div className="mode-tabs">
            <button className={`mode-tab${mode === 'trace' ? ' active' : ''}`} onClick={() => { setMode('trace'); clear(); }}>
              تَتَبُّع
            </button>
            <button className={`mode-tab${mode === 'dots' ? ' active' : ''}`} onClick={() => { setMode('dots'); clear(); }}>
              نِقاط مُرَقَّمة
            </button>
            <button className={`mode-tab${mode === 'color' ? ' active' : ''}`} onClick={() => { setMode('color'); clear(); }}>
              تَلوين
            </button>
          </div>

          <div className="tool-panel">
            <h4>اِختَر لَونَك</h4>
            <div className="color-row">
              {COLORS.map((col) => (
                <div
                  key={col}
                  className={`color-dot${penColor === col ? ' active' : ''}`}
                  style={{ background: col }}
                  onClick={() => setPenColor(col)}
                />
              ))}
            </div>
          </div>

          <div className="tool-panel" style={{ background: 'linear-gradient(135deg, #FFF1D1, #FFE0F0)' }}>
            <h4 style={{ color: 'var(--pink)' }}>هَيّا نَكتُب!</h4>
            <ol style={{ margin: 0, paddingRight: 18, lineHeight: 1.7, color: 'var(--ink-soft)', fontWeight: 700, fontSize: 14 }}>
              <li>اِبدَأ مِنَ النُّقطَة الكَبيرَة</li>
              <li>اِتَّبِع الخَطّ المُتَقَطِّع</li>
              <li>اِرفَع أُصبُعَك عِندَ النِّهاية</li>
            </ol>
          </div>

          <button className="btn-big pink" style={{ marginTop: 'auto', justifyContent: 'center' }} onClick={onComplete}>
            <span>✓</span>
            <span>أَنهَيت! ★</span>
          </button>
        </div>
      </div>
    </div>
  );
}
