'use client';

import { useEffect, useState } from 'react';
import { LETTERS, LETTER_FONTS, Progress, Screen, TWEAK_DEFAULTS, Tweaks } from '@/lib/data';
import HomeScreen from './HomeScreen';
import LetterScreen from './LetterScreen';
import WritingScreen from './WritingScreen';
import GameScreen from './GameScreen';
import ProfileScreen from './ProfileScreen';
import AppBar from './AppBar';
import BottomTabs from './BottomTabs';
import Mascot from './Mascot';
import Celebrate from './Celebrate';
import TweaksPanel from './TweaksPanel';

const STORAGE_KEY_PROGRESS = 'arabic-learning:progress';
const STORAGE_KEY_TWEAKS = 'arabic-learning:tweaks';

const INITIAL_PROGRESS: Progress = {
  completed: [0, 1, 5, 11, 12],
  stars: 18,
  lastIndex: 2,
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [letterIndex, setLetterIndex] = useState(0);
  const [progress, setProgress] = useState<Progress>(INITIAL_PROGRESS);
  const [celebrate, setCelebrate] = useState<string | null>(null);
  const [tweaks, setTweaks] = useState<Tweaks>(TWEAK_DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (p) setProgress(JSON.parse(p));
      const t = localStorage.getItem(STORAGE_KEY_TWEAKS);
      if (t) setTweaks({ ...TWEAK_DEFAULTS, ...JSON.parse(t) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch {}
  }, [progress, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_TWEAKS, JSON.stringify(tweaks));
    } catch {}
  }, [tweaks, hydrated]);

  useEffect(() => {
    const f = LETTER_FONTS[tweaks.letterFont] || LETTER_FONTS.naskh;
    document.documentElement.style.setProperty('--font-letter', f.family);
  }, [tweaks.letterFont]);

  const setTweak = <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
    setTweaks((t) => ({ ...t, [key]: value }));
  };

  const goto = (s: Screen, idx?: number) => {
    if (typeof idx === 'number') setLetterIndex(idx);
    setScreen(s);
  };

  const finishLetter = () => {
    setProgress((p) => ({
      ...p,
      completed: p.completed.includes(letterIndex) ? p.completed : [...p.completed, letterIndex],
      stars: p.stars + 3,
      lastIndex: letterIndex,
    }));
    setCelebrate(LETTERS[letterIndex].l);
  };

  const mascotPos = (() => {
    switch (screen) {
      case 'home':
        return { x: 30, y: 530, scale: 1.0, msg: 'اِضغَط على حَرف!' };
      case 'letter':
        return { x: 36, y: 600, scale: 0.85, msg: 'اِستَمِع جَيِّداً' };
      case 'write':
        return { x: 30, y: 630, scale: 0.8, msg: 'تابِع الخَطّ' };
      case 'game':
        return { x: 36, y: 600, scale: 0.85, msg: 'اِختَر الصَّحيح!' };
      case 'profile':
        return { x: 950, y: 580, scale: 0.9, msg: 'فَخور بِك!' };
      default:
        return { x: 30, y: 600, scale: 1, msg: '' };
    }
  })();

  return (
    <div className="stage">
      <h1 className="stage-title">تَعليم الحُروف العَرَبيّة لِلأَطفال</h1>
      <p className="stage-sub" style={{ margin: 0, fontSize: 14 }}>
        تَطبيق تَفاعُليّ بِـ Next.js
      </p>

      <div className="ipad">
        <div className="ipad-screen" data-theme={tweaks.theme}>
          {screen === 'home' && <HomeScreen progress={progress} onPick={(i) => goto('letter', i)} />}
          {screen === 'letter' && (
            <LetterScreen index={letterIndex} onChange={setLetterIndex} onGoto={(s) => setScreen(s)} />
          )}
          {screen === 'write' && (
            <WritingScreen index={letterIndex} onChange={setLetterIndex} onComplete={finishLetter} />
          )}
          {screen === 'game' && (
            <GameScreen index={letterIndex} onChange={setLetterIndex} onComplete={finishLetter} />
          )}
          {screen === 'profile' && <ProfileScreen progress={progress} onPick={(i) => goto('letter', i)} />}

          <AppBar
            screen={screen}
            stars={progress.stars}
            onBack={() => {
              if (screen === 'write' || screen === 'game') setScreen('letter');
              else setScreen('home');
            }}
            onHome={() => setScreen('home')}
          />

          <BottomTabs current={screen} onSelect={setScreen} />

          {tweaks.showMascot && (
            <Mascot
              kind={tweaks.mascot}
              x={mascotPos.x}
              y={mascotPos.y}
              scale={mascotPos.scale}
              talking={true}
              message={mascotPos.msg}
            />
          )}

          {celebrate && (
            <Celebrate
              letter={celebrate}
              onClose={() => {
                setCelebrate(null);
                setScreen('home');
              }}
            />
          )}
        </div>
      </div>

      <TweaksPanel tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
}
