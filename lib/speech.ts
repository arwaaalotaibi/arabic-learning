'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Browsers load the voice list asynchronously; getVoices() can return [] on the
// first call until the `voiceschanged` event fires. We cache the resolved list.
let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesReady: Promise<SpeechSynthesisVoice[]> | null = null;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return Promise.resolve([]);
  }
  if (voicesReady) return voicesReady;

  voicesReady = new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const existing = synth.getVoices();
    if (existing.length) {
      cachedVoices = existing;
      resolve(existing);
      return;
    }
    const onChange = () => {
      cachedVoices = synth.getVoices();
      synth.removeEventListener('voiceschanged', onChange);
      resolve(cachedVoices);
    };
    synth.addEventListener('voiceschanged', onChange);
    // Safari sometimes never fires the event — fall back after a short wait.
    setTimeout(() => {
      cachedVoices = synth.getVoices();
      resolve(cachedVoices);
    }, 1000);
  });
  return voicesReady;
}

// Known high-quality Arabic voices across platforms, best first.
const PREFERRED_NAMES = ['maged', 'majed', 'naayf', 'hoda', 'tarik', 'laila', 'google'];

function pickArabicVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const arabic = voices.filter((v) => v.lang.toLowerCase().startsWith('ar'));
  if (!arabic.length) return null;

  const byName = arabic
    .map((v) => ({ v, rank: PREFERRED_NAMES.findIndex((n) => v.name.toLowerCase().includes(n)) }))
    .filter((x) => x.rank !== -1)
    .sort((a, b) => a.rank - b.rank);
  if (byName.length) return byName[0].v;

  // Fall back to ar-SA, then any local (offline, lower-latency) voice, then the first.
  return (
    arabic.find((v) => v.lang.toLowerCase() === 'ar-sa') ??
    arabic.find((v) => v.localService) ??
    arabic[0]
  );
}

// Cache <audio> elements per clip so repeated taps are instant, and remember
// which clip files are missing so we don't retry the network each time.
const audioCache = new Map<string, HTMLAudioElement>();
const missingClips = new Set<string>();
let currentAudio: HTMLAudioElement | null = null;

function getAudio(src: string): HTMLAudioElement {
  let a = audioCache.get(src);
  if (!a) {
    a = new Audio(src);
    a.preload = 'auto';
    audioCache.set(src, a);
  }
  return a;
}

export type SpeakOpts = {
  /** Path to a pre-recorded clip (under /public). Played in preference to TTS. */
  clip?: string;
  rate?: number;
  pitch?: number;
};

export type Speaker = {
  /** Speak Arabic text, preferring a pre-recorded clip when available. */
  speak: (text: string, opts?: SpeakOpts) => void;
  /** True once an Arabic TTS voice is confirmed available. */
  hasArabicVoice: boolean;
  /** True if the browser supports speech synthesis at all. */
  supported: boolean;
};

export function useSpeech(): Speaker {
  const [supported, setSupported] = useState(false);
  const [hasArabicVoice, setHasArabicVoice] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    setSupported(true);
    let alive = true;
    loadVoices().then((voices) => {
      if (!alive) return;
      const v = pickArabicVoice(voices);
      voiceRef.current = v;
      setHasArabicVoice(!!v);
    });
    return () => {
      alive = false;
    };
  }, []);

  const speakTTS = useCallback((text: string, opts?: SpeakOpts) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      const synth = window.speechSynthesis;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ar-SA';
      u.rate = opts?.rate ?? 0.75;
      u.pitch = opts?.pitch ?? 1.05;
      if (voiceRef.current) u.voice = voiceRef.current;
      synth.cancel();
      synth.speak(u);
    } catch {}
  }, []);

  const speak = useCallback(
    (text: string, opts?: SpeakOpts) => {
      const clip = opts?.clip;
      if (clip && !missingClips.has(clip)) {
        try {
          if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
          }
          const a = getAudio(clip);
          currentAudio = a;
          a.currentTime = 0;
          a.play().catch(() => {
            // Missing/unsupported clip — remember and fall back to TTS.
            missingClips.add(clip);
            speakTTS(text, opts);
          });
          return;
        } catch {
          missingClips.add(clip);
        }
      }
      speakTTS(text, opts);
    },
    [speakTTS],
  );

  return { speak, hasArabicVoice, supported };
}
