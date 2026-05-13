'use client';

import { Screen } from '@/lib/data';

type Props = {
  current: Screen;
  onSelect: (s: Screen) => void;
};

export default function BottomTabs({ current, onSelect }: Props) {
  const tabs: { id: Screen; icon: string; label: string }[] = [
    { id: 'home', icon: '⌂', label: 'الحُروف' },
    { id: 'profile', icon: '★', label: 'إِنجازاتي' },
  ];
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 18,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 999,
        padding: 6,
        display: 'flex',
        gap: 4,
        border: '2px solid #fff',
        boxShadow: '0 10px 30px rgba(114, 9, 183, 0.18)',
        zIndex: 11,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          style={{
            border: 'none',
            cursor: 'pointer',
            padding: '12px 22px',
            borderRadius: 999,
            background: current === tab.id ? 'var(--purple)' : 'transparent',
            color: current === tab.id ? '#fff' : 'var(--ink)',
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all .2s',
          }}
        >
          <span style={{ fontSize: 18 }}>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
