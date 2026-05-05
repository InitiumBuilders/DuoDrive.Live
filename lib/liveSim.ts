'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Shared live-simulation engine. A single tick scheduler that fires roughly
 * every 1.5–4s with a randomized event (chat message into one of three feeds,
 * view-count increment, motus-views bump, votus stake, forge meter tick,
 * commit ship, sparkline point). Components subscribe to specific channels.
 */

export type Feed = 'pirate' | 'duo' | 'refiner';

export type ChatMessage = {
  id: string;
  feed: Feed;
  who: string;
  txt: string;
  votus?: number;
};

const PIRATE_VOICES = [
  { who: 'lily.eth', txt: 'the avari signal idea is GENIUS' },
  { who: 'pirate.0x', txt: 'this could replace github for vibe builds' },
  { who: 'jordash_fan', txt: 'jordash going crazy on the prompts today 🔥' },
  { who: 'shoji', txt: 'love the typography restraint here' },
  { who: 'salt.atelier', txt: 'pirate-coding is officially a verb' },
  { who: 'rune.dash', txt: 'the prompt window in his stream is so clean' },
  { who: 'kai.dev', txt: 'who needs figma when you have a pirate?' },
  { who: 'reva', txt: 'every prompt is a thesis. who taught you this?' },
  { who: 'old.salt', txt: 'first time i\'ve watched a builder think OUT LOUD this clearly' },
  { who: 'mira', txt: 'the cursor blink at the end of his prompt is somehow art' },
  { who: 'jules.dev', txt: 'I\'d pay just to watch jordash brainstorm tbh' },
  { who: 'iko', txt: 'pls write an essay on the whisper protocol' },
  { who: 'tide', txt: 'forge meter at 78 already, this is a ship night' },
  { who: 'koa', txt: 'replacing standups with whisper polls. our team is happier.' },
  { who: 'arro', txt: 'first DAO i\'ve seen that doesn\'t feel performative' },
  { who: 'mei', txt: 'is the avari signal patentable? asking for science.' },
  { who: 'oda', txt: 'the dash username on every stream is a quiet flex' },
  { who: 'ven.dash', txt: 'staking 8 votus on the pirate-coding term entering the public lexicon' },
  { who: 'crow', txt: 'this is what "build in public" was supposed to mean before it became LARP' },
  { who: 'ember.dash', txt: '@jordash where do i sign up to refine for someone' },
  { who: 'taro', txt: 'the typewriter cursor at end of prompt = ASMR' },
  { who: 'flint', txt: 'avari sync explains why my last 3 startups failed lol' },
  { who: 'wren', txt: 'jordash is the first person to make me want to write prompts on stream' },
  { who: 'sigil', txt: 'the meta is real — building duodrive ON duodrive. pirates love recursion.' },
  { who: 'bram.dash', txt: 'unironic question: how do you turn this into a city government tool' },
  { who: 'iva', txt: 'we forked the manifesto for our farm collective. it just works.' },
  { who: 'roan', txt: 'the dash savings account idea kato dropped > whole ETH ecosystem rn' },
  { who: 'plume', txt: 'whispering > shouting. always.' },
];
const REFINER_VOICES = [
  { who: 'davara_fam', txt: 'shipping at this speed is unreal' },
  { who: 'mr.refine', txt: 'is the code open source already?' },
  { who: 'shoji', txt: 'the diff scrolls beautifully on the side feed' },
  { who: 'cortex.helper', txt: 'davara just wrote AvariSignal in 4 minutes' },
  { who: 'devhime', txt: 'refiner-mode is a vibe' },
  { who: 'noah.eth', txt: 'commit cadence is hypnotic' },
  { who: 'yuna', txt: 'your git history is cleaner than most production repos' },
  { who: 'kestrel', txt: 'is that next 16 + tokens-only theme system? chef\'s kiss' },
  { who: 'opal', txt: 'the breathe animation on the avatar halo is so subtle. perfect.' },
  { who: 'sage', txt: 'when the type token system clicks, you stop fighting tailwind' },
  { who: 'frost', txt: 'unironically the cleanest tsx i\'ve watched in months' },
  { who: 'ember.dash', txt: 'ship the whisper component pls. need it for my own initium' },
  { who: 'varda', txt: 'the diff feed > most code review tools' },
  { who: 'kato.dash', txt: 'davara just used dash data contracts as a state primitive. brilliant.' },
  { who: 'symble.dash', txt: 'this is the architecture I want for veros.io' },
  { who: 'cipher', txt: 'oklch in 2026 is finally non-negotiable. proven again.' },
  { who: 'lila', txt: 'I want a refiner like this for my next Initium' },
  { who: 'haze', txt: 'name a cleaner code-on-stream setup. I\'ll wait.' },
  { who: 'pip', txt: 'the css var token rename mid-stream was so fearless' },
  { who: 'ido', txt: 'davara\'s tests-first cadence is a lesson in itself' },
  { who: 'briar', txt: 'fork-and-go templates idea = killer for cohorts/bootcamps' },
  { who: 'shoji', txt: 'votus tokenomics on dash is the cleanest mental model i\'ve seen' },
  { who: 'pax', txt: 'the avari echo system literally turns streams into a knowledge graph' },
  { who: 'tarn.dash', txt: '"the diff is the truth" — stealing this for our team values' },
  { who: 'oren', txt: 'i finally get why two-keyed governance > multisig theater' },
  { who: 'meri', txt: 'every commit has a watcher cheering. that\'s the moat.' },
  { who: 'finch', txt: 'a refiner who narrates the why > a refiner who narrates the what' },
];
const DUO_VOICES = [
  { who: 'cortex', txt: '@jordash @davara — could the cortex donate testers for /signup ?', votus: 18 },
  { who: 'jordash', txt: 'taking that — open the role.' },
  { who: 'davara', txt: 'pushing AvariSignal v0.2 in 2.' },
  { who: 'lily.eth', txt: 'I can run typography QA when you ship', votus: 4 },
  { who: 'shoji', txt: 'staking 50 votus on the revenue model poll', votus: 50 },
  { who: 'davara', txt: '+ Whisper component shipped. polls now hide tally by default.' },
  { who: 'jordash', txt: 'echo-catch this line: "the screen is the forge"' },
  { who: 'pirate.0x', txt: 'I\'ll stress-test /signup tonight at 100 concurrent', votus: 12 },
  { who: 'system', txt: 'Avari Echo flagged a worth-keeping moment → README updated' },
  { who: 'cortex', txt: 'forge meter just ticked to 80%' },
  { who: 'symble.dash', txt: 'cross-streaming over from veros.io — your two-key drive is what dash subscriptions need', votus: 22 },
  { who: 'jordash', txt: '@symble.dash send the spec, we\'ll route a cortex helper your way' },
  { who: 'kato.dash', txt: 'agreed. our subscriptions data contract could share the same vault primitive', votus: 18 },
  { who: 'davara', txt: '+ initium proposal: cross-link DuoDrive vaults with Veros sub-contracts' },
  { who: 'ember.dash', txt: 'staking 30 votus on the cross-initium collab', votus: 30 },
  { who: 'cortex', txt: 'new role proposed: Cross-Initium Liaison — awaiting claim' },
  { who: 'system', txt: 'Forge meter ticked 80% → 82% — streak day +1' },
  { who: 'jordash', txt: 'whispering this: should votus be transferable in y1, or only earnable?' },
  { who: 'davara', txt: 'leaning earnable-only y1. transferable y2 with a 90d vesting cliff. opens whisper poll.' },
  { who: 'roan', txt: 'i\'ve been waiting for someone to take the goodhart problem seriously', votus: 8 },
];

const SYNTHETIC_CODE_MOMENTS = [
  '+ Whisper.tsx · 38 lines',
  '+ AvariSignal.tsx · 142 lines',
  '~ ForgeMeter.tsx · refactor',
  '+ Cortex/RoleCard.tsx · 64 lines',
  '+ tests/avariSignal.spec.ts · 24 lines',
  '~ globals.css · light mode tokens',
];

let counter = 0;
function nextId() { counter++; return `m${Date.now()}-${counter}`; }

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export type SimState = {
  messages: ChatMessage[];
  watching: number;
  motusViews: number;
  votusStaked: number;
  forge: number; // 0..1
  spark: number[];
  shipped: string[];
};

const INITIAL: SimState = {
  messages: [
    { id: 'seed-1', feed: 'pirate', who: 'lily.eth', txt: 'the avari signal idea is GENIUS' },
    { id: 'seed-2', feed: 'duo', who: 'system', txt: 'Initium opened: building DuoDrive.Live · 32 watching' },
    { id: 'seed-3', feed: 'refiner', who: 'davara_fam', txt: 'shipping at this speed is unreal' },
    { id: 'seed-4', feed: 'duo', who: 'jordash', txt: "let's ship the avari echo first. it's the soul." },
    { id: 'seed-5', feed: 'pirate', who: 'pirate.0x', txt: 'this could replace github for vibe builds' },
    { id: 'seed-6', feed: 'refiner', who: 'mr.refine', txt: 'is the code open source already?' },
    { id: 'seed-7', feed: 'duo', who: 'davara', txt: 'taking the suggestion. cortex roles open in 5.', votus: 8 },
  ],
  watching: 4210,
  motusViews: 1842,
  votusStaked: 312,
  forge: 0.78,
  spark: [4, 6, 5, 8, 12, 10, 14, 18, 22, 19, 28, 35, 31, 44, 51, 47, 58, 72, 88, 102, 138, 184, 246, 312],
  shipped: [],
};

export function useLiveSim() {
  const [state, setState] = useState<SimState>(INITIAL);
  const tRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    function schedule() {
      const delay = 1500 + Math.random() * 2500;
      tRef.current = window.setTimeout(tick, delay);
    }
    function tick() {
      if (cancelled) return;
      setState((s) => step(s));
      schedule();
    }
    schedule();
    return () => {
      cancelled = true;
      if (tRef.current) clearTimeout(tRef.current);
    };
  }, []);

  return state;
}

function step(s: SimState): SimState {
  // Pick an event class: chat 60% / view 15% / motus 10% / votus 8% / commit 5% / forge 2%
  const r = Math.random();
  const watching = s.watching + Math.floor(Math.random() * 9) - 2;
  let next: SimState = { ...s, watching: Math.max(3000, watching) };

  if (r < 0.6) {
    // chat
    const feed: Feed = Math.random() < 0.4 ? 'duo' : Math.random() < 0.5 ? 'pirate' : 'refiner';
    const bank = feed === 'pirate' ? PIRATE_VOICES : feed === 'refiner' ? REFINER_VOICES : DUO_VOICES;
    // Avoid emitting a message identical to the last 5 in the same feed
    const recentInFeed = s.messages.filter(mm => mm.feed === feed).slice(-5).map(mm => mm.txt);
    let voice = pick(bank);
    let attempts = 0;
    while (recentInFeed.includes(voice.txt) && attempts < 6) { voice = pick(bank); attempts++; }
    const m: ChatMessage = { id: nextId(), feed, who: voice.who, txt: voice.txt, votus: (voice as any).votus };
    next.messages = [...s.messages.slice(-29), m];
    if ((voice as any).votus) {
      next.votusStaked = s.votusStaked + ((voice as any).votus as number);
      next.spark = [...s.spark.slice(1), next.votusStaked];
    }
  } else if (r < 0.75) {
    next.motusViews = s.motusViews + Math.floor(Math.random() * 4);
  } else if (r < 0.85) {
    next.motusViews = s.motusViews + Math.floor(Math.random() * 12) + 2;
  } else if (r < 0.93) {
    const stake = Math.floor(Math.random() * 12) + 1;
    next.votusStaked = s.votusStaked + stake;
    next.spark = [...s.spark.slice(1), next.votusStaked];
    next.messages = [...s.messages.slice(-29), {
      id: nextId(),
      feed: 'duo',
      who: 'system',
      txt: `+ ${stake} VOTUS staked on this Initium`,
    }];
  } else if (r < 0.98) {
    const ship = pick(SYNTHETIC_CODE_MOMENTS);
    next.shipped = [...s.shipped.slice(-5), ship];
    next.messages = [...s.messages.slice(-29), {
      id: nextId(),
      feed: 'duo',
      who: 'davara',
      txt: ship,
    }];
    next.forge = Math.min(1, s.forge + 0.01);
  } else {
    next.forge = Math.min(1, s.forge + 0.005);
  }

  return next;
}
