/**
 * GoodVibeStream — curated seed list of real live-coding streamers on Twitch.
 *
 * Strategy: rotate through this list with a deterministic-but-rotating
 * selection (seeded by current 15-minute bucket). The Twitch player iframe
 * embed gracefully renders offline screens when the streamer is not live,
 * so the relay never breaks — and when one of these channels IS live,
 * we show their actual stream.
 *
 * In production we would query Twitch Helix `Get Streams` with a
 * filter on game_id="Software and Game Development" and rotate among
 * actually-live channels. This curated list is the prototype anchor.
 */

export type VibeStreamer = {
  twitch: string;
  display: string;
  vibe: string;
  stack: string;
  bio: string;
  // Synthetic stats for the preview when channel offline
  followers: number;
  emoji: string;
};

export const VIBE_STREAMERS: VibeStreamer[] = [
  {
    twitch: 'ThePrimeagen',
    display: 'ThePrimeagen',
    vibe: 'Vim wizardry · Rust · TypeScript',
    stack: 'Neovim, Rust, Go',
    bio: 'Former Netflix engineer. Lives in Neovim. Famous for unhinged-good takes and visceral keystrokes. The patron saint of "actually shipping in your terminal."',
    followers: 590000,
    emoji: '⌨️',
  },
  {
    twitch: 'tsoding',
    display: 'Tsoding',
    vibe: 'C, low-level, unironic emacs',
    stack: 'C, OCaml, Emacs',
    bio: 'Builds compilers and game engines from scratch on stream. The Carmack of livestream coding. If it can be done in 200 lines of C, he\'s already done it.',
    followers: 162000,
    emoji: '🛠',
  },
  {
    twitch: 'teej_dv',
    display: 'teej_dv',
    vibe: 'Neovim core · plugin dev · Lua',
    stack: 'Neovim, Lua, Go',
    bio: 'Neovim core maintainer. Teaches editor mastery in real time. Long-form streams that turn into love letters to the craft of writing software.',
    followers: 110000,
    emoji: '✍',
  },
  {
    twitch: 'fasterthanlime',
    display: 'fasterthanlime',
    vibe: 'Rust deep dives · systems craft',
    stack: 'Rust, systems',
    bio: 'Calm, surgical Rust streams. Often debugging real-world rust packages live. The streamer who makes you understand the ownership model in your bones.',
    followers: 86000,
    emoji: '🦀',
  },
  {
    twitch: 'codeneo',
    display: 'codeneo',
    vibe: 'Full-stack startup grind',
    stack: 'Next.js, Postgres, Prisma',
    bio: 'Building a SaaS in public. Streams the un-glamorous middle of product development — the bug hunts, the schema migrations, the deploy retries.',
    followers: 32000,
    emoji: '⚡',
  },
  {
    twitch: 'georgehotz',
    display: 'George Hotz',
    vibe: 'tinygrad · ML · chaos',
    stack: 'Python, ML, custom hardware',
    bio: 'Comma.ai founder. Streams tinygrad development — building a competitor to PyTorch live. Equal parts genius and unhinged. Always interesting.',
    followers: 240000,
    emoji: '🧠',
  },
  {
    twitch: 'jblow888',
    display: 'Jonathan Blow',
    vibe: 'Game dev · Jai language',
    stack: 'Jai, custom engine, C++',
    bio: 'Builder of Braid + The Witness. Streams development of his own programming language and game engine. Long, philosophical, deeply technical.',
    followers: 180000,
    emoji: '🎮',
  },
  {
    twitch: 'NoBoilerplate',
    display: 'No Boilerplate',
    vibe: 'Rust · functional · clarity',
    stack: 'Rust, OCaml',
    bio: 'Streams "boring on purpose" — the discipline of writing code that doesn\'t need to be re-explained next week.',
    followers: 22000,
    emoji: '✨',
  },
  {
    twitch: 'midudev',
    display: 'midudev',
    vibe: 'JavaScript · React · Spanish',
    stack: 'React, Next.js, TypeScript',
    bio: 'Spanish-language web dev streamer. Massive following. Known for shipping practical builds with a community that codes along in real time.',
    followers: 410000,
    emoji: '🌐',
  },
  {
    twitch: 'dougdoug',
    display: 'DougDoug',
    vibe: 'Hacky Python · LLM chaos',
    stack: 'Python, OpenAI, ffmpeg',
    bio: 'Builds absurd projects with LLMs live. The Pirate energy of the entire space. Proof that vibe coding works best when you don\'t take yourself too seriously.',
    followers: 920000,
    emoji: '🎲',
  },
];

/**
 * Pick a streamer for the current 15-minute window — rotates predictably,
 * seems random to a viewer, swaps when the bucket flips.
 */
export function pickCurrentStreamer(now = Date.now()): VibeStreamer {
  const bucket = Math.floor(now / (15 * 60 * 1000));
  const idx = bucket % VIBE_STREAMERS.length;
  return VIBE_STREAMERS[idx];
}

/**
 * How long until the next rotation (in seconds), for the countdown UI.
 */
export function secondsUntilNextRotation(now = Date.now()): number {
  const bucketMs = 15 * 60 * 1000;
  const nextBucket = (Math.floor(now / bucketMs) + 1) * bucketMs;
  return Math.max(0, Math.floor((nextBucket - now) / 1000));
}
