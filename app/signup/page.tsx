'use client';
import { useState } from 'react';
import Link from 'next/link';

const ROLES = ['The Pirate · Prompts', 'The Refiner · Code', 'The Cortex · Helper', 'Custom Role…'];

export default function Signup() {
  const [step, setStep] = useState(1);
  const [drive, setDrive] = useState('');
  const [role, setRole] = useState(ROLES[0]);
  const [custom, setCustom] = useState('');
  const [stream, setStream] = useState('');

  return (
    <div className="px-5 md:px-8 max-w-xl mx-auto pt-28 pb-20">
      <header className="text-center mb-10">
        <p className="chip chip-sync mx-auto mb-5">Drive Anonymously</p>
        <h1 className="font-light text-[clamp(28px,5vw,44px)] leading-[1.05] tracking-tight">
          Pick a name. <span className="twin-text">Pick a role.</span>
        </h1>
        <p className="text-fg-muted mt-3 text-[14px]">
          No email. No password. Just a Drive Name and your stream link. We relay.
        </p>
      </header>

      <div className="hairline rounded-2xl p-5 md:p-7 glass">
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 h-0.5 rounded-full ${s <= step ? 'bg-gradient-to-r from-pirate via-sync to-refiner' : 'bg-white/10'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-faint">Step 1 / 3 — Drive Name</p>
            <input
              value={drive}
              onChange={(e) => setDrive(e.target.value.replace(/[^a-zA-Z0-9._-]/g, ''))}
              placeholder="e.g. jordash"
              className="w-full glass hairline rounded-lg px-4 py-3.5 text-[16px] focus:outline-none focus:border-sync/60 transition-colors"
              autoFocus
            />
            <p className="text-[12px] text-fg-faint">Lowercase, dots, dashes. This is your handle on DuoDrive — and the prefix of your Drive ID.</p>
            <button
              onClick={() => drive.length >= 2 && setStep(2)}
              disabled={drive.length < 2}
              className="w-full mt-3 px-5 py-3 rounded-full gradient-cta bg-gradient-to-r from-pirate via-sync to-refiner text-void font-medium text-[14px] disabled:opacity-30 hover:shadow-[0_0_30px_rgba(159,124,255,0.4)] transition-shadow"
            >
              Next →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-faint">Step 2 / 3 — Role & Vibe</p>
            <div className="grid gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`text-left px-4 py-3 rounded-lg text-[14px] hairline transition-colors ${role === r ? 'border-sync bg-sync/10 text-fg' : 'text-fg hover:text-fg hover:bg-white/5'}`}
                >
                  {r}
                </button>
              ))}
            </div>
            {role === 'Custom Role…' && (
              <input
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="e.g. The Cartographer · Architecture"
                className="w-full glass hairline rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:border-sync/60"
              />
            )}
            <div className="flex gap-2 mt-3">
              <button onClick={() => setStep(1)} className="px-5 py-3 rounded-full hairline text-[14px] text-fg hover:text-fg">← Back</button>
              <button onClick={() => setStep(3)} className="flex-1 px-5 py-3 rounded-full gradient-cta bg-gradient-to-r from-pirate via-sync to-refiner text-void font-medium text-[14px]">Next →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-faint">Step 3 / 3 — Relay Your Stream</p>
            <input
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              placeholder="https://twitch.tv/…  ·  youtube.com/live/…  ·  kick.com/…"
              className="w-full glass hairline rounded-lg px-4 py-3.5 text-[14px] focus:outline-none focus:border-sync/60"
            />
            <p className="text-[12px] text-fg-faint">DuoDrive is a relay — you stream from your main provider, we mirror it into your room. Same with your duo partner.</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => setStep(2)} className="px-5 py-3 rounded-full hairline text-[14px] text-fg hover:text-fg">← Back</button>
              <button
                onClick={() => alert('Preview prototype — backend coming next sprint. Your duo room would open here.')}
                className="flex-1 px-5 py-3 rounded-full gradient-cta bg-gradient-to-r from-pirate via-sync to-refiner text-void font-medium text-[14px]"
              >
                Open My Drive →
              </button>
            </div>
            <div className="hairline-t pt-4 mt-4 text-center">
              <p className="text-[11px] font-mono tracking-wider uppercase text-fg-faint mb-1">Preview Recap</p>
              <p className="text-[14px] text-fg">
                <span className="text-pirate font-mono">@{drive || '—'}</span>
                <span className="text-fg-faint mx-2">·</span>
                <span className="text-sync">{role === 'Custom Role…' ? (custom || '—') : role}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="mt-8 text-center text-[12px] text-fg-muted">
        Already driving? <Link href="/coders" className="text-sync hover:text-fg">Find your Avari Sync →</Link>
      </p>
    </div>
  );
}
