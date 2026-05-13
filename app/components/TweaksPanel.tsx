'use client';

import { useState } from 'react';
import { Tweaks, LETTER_FONTS } from '@/lib/data';

type Props = {
  tweaks: Tweaks;
  setTweak: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void;
};

const THEMES: { value: Tweaks['theme']; label: string }[] = [
  { value: 'candy', label: 'حَلوى' },
  { value: 'ocean', label: 'بَحر' },
  { value: 'sunset', label: 'غُروب' },
  { value: 'meadow', label: 'مَرج' },
];

const MASCOTS: { value: Tweaks['mascot']; label: string }[] = [
  { value: 'owl', label: 'بومة' },
  { value: 'parrot', label: 'بَبَّغاء' },
  { value: 'cat', label: 'قِطّة' },
];

export default function TweaksPanel({ tweaks, setTweak }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="tweaks-toggle" onClick={() => setOpen((o) => !o)} aria-label="إعدادات">
        ⚙
      </button>
      {open && (
        <div className="tweaks-panel">
          <h3>إِعدادات</h3>

          <div className="tweak-section">
            <div className="label">الخَلفيّة</div>
            <div className="tweak-row">
              {THEMES.map((t) => (
                <button
                  key={t.value}
                  className={`tweak-chip${tweaks.theme === t.value ? ' active' : ''}`}
                  onClick={() => setTweak('theme', t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tweak-section">
            <div className="label">خَطّ الحُروف</div>
            <select
              className="tweak-select"
              value={tweaks.letterFont}
              onChange={(e) => setTweak('letterFont', e.target.value as Tweaks['letterFont'])}
            >
              {Object.entries(LETTER_FONTS).map(([value, f]) => (
                <option key={value} value={value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div className="tweak-section">
            <div className="label">الشَّخصيّة المُرافِقة</div>
            <div className="tweak-row">
              {MASCOTS.map((m) => (
                <button
                  key={m.value}
                  className={`tweak-chip${tweaks.mascot === m.value ? ' active' : ''}`}
                  onClick={() => setTweak('mascot', m.value)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tweak-section">
            <div className="label">إِظهار الشَّخصيّة</div>
            <div className="tweak-row">
              <button
                className={`tweak-chip${tweaks.showMascot ? ' active' : ''}`}
                onClick={() => setTweak('showMascot', true)}
              >
                نَعَم
              </button>
              <button
                className={`tweak-chip${!tweaks.showMascot ? ' active' : ''}`}
                onClick={() => setTweak('showMascot', false)}
              >
                لا
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
