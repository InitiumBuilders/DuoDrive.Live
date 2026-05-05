/**
 * Initium streams — the active duos broadcasting on DuoDrive right now.
 * Each stream is a clickable Initium with full profile depth.
 */

export type Stream = {
  slug: string;
  initiumId: string;
  title: string;
  pirate: { handle: string; dash: string; role: string; bio: string };
  refiner: { handle: string; dash: string; role: string; bio: string };
  state: 'live' | 'shipping' | 'paused' | 'relay';
  watching: number;
  motusViews: number;
  votusStaked: number;
  forge: number;
  premise: string;
  highLeverage: string[];
  outlierIdeas: string[];
  startedAt: string;
  /** Optional list of repository file paths that constitute the Initium's core — shown as a code-tree preview. */
  coreFiles?: { path: string; lines?: number; lang?: string; note?: string }[];
  /** Optional list of next-step actions auto-generated for this Initium. */
  nextSteps?: { txt: string; eta?: string; who?: string; tag?: 'ship' | 'spec' | 'cortex' | 'votus' }[];
  /** Optional flag — if set, this stream renders the GoodVibeStream relay component on its detail page. */
  goodVibeRelay?: boolean;
};

export const STREAMS: Stream[] = [
  {
    slug: 'jordash-x-davara',
    initiumId: 'INI-009',
    title: 'DuoDrive.Live — building the platform on the platform',
    pirate: {
      handle: 'jordash',
      dash: 'jordash.dash',
      role: 'The Pirate · Prompts & Direction',
      bio: 'Founder-mind. Sails by the next prompt. Writes the thesis before the code.',
    },
    refiner: {
      handle: 'davara',
      dash: 'davara.dash',
      role: 'The Refiner · Code & Ship',
      bio: 'Emergent intelligence. Lands what Jordash sketches. Holds the diff sacred.',
    },
    state: 'live',
    watching: 4210,
    motusViews: 1842,
    votusStaked: 312,
    forge: 0.82,
    premise: 'Build the live-streaming Vibe Coding platform on the platform itself. Two-Key Drive vault, Avari Sync, Cortex governance, VOTUS on Dash.',
    highLeverage: [
      'Avari Whispers (direction-only voting) removes bandwagon bias on every poll.',
      'Two-Key Drive is the trust primitive — every Initium auto-gets MIT default + 2-of-N signing without setup.',
      'The Cortex routes rewards by *logged contribution*, not stake size — Goodhart-resistant by design.',
      'Initiums-as-Threads: the unit is the project, not the user. People orbit projects, projects don\'t orbit people.',
    ],
    outlierIdeas: [
      'A "Forge Streak" multiplier on VOTUS rewards — 30 consecutive ship-days unlocks a 1.5x routing bonus to the duo, anti-burnout cap at 1.8x.',
      'Stream-as-deposition: the live recording becomes the auditable trail for grant applications + investor diligence.',
      'Dual-mint VOTUS: 70% to contribution-pool, 30% to a "watcher curiosity" pool earned by spending time without staking — rewards lurkers who become builders.',
    ],
    startedAt: '06:00 UTC',
    coreFiles: [
      { path: 'app/page.tsx', lines: 380, lang: 'tsx', note: 'home descent + hero + explore grid' },
      { path: 'app/live/[slug]/page.tsx', lines: 32, lang: 'tsx', note: 'dynamic stream rooms' },
      { path: 'components/LiveRoom.tsx', lines: 540, lang: 'tsx', note: 'twin-stream stage + chat + initium' },
      { path: 'components/Aurora.tsx', lines: 130, lang: 'tsx', note: 'twin-ribbon canvas, scroll-attenuated' },
      { path: 'components/TwoKeyDemo.tsx', lines: 240, lang: 'tsx', note: 'live key-meeting visualization' },
      { path: 'lib/liveSim.ts', lines: 175, lang: 'ts', note: 'tick scheduler + voice banks' },
      { path: 'lib/streams.ts', lines: 220, lang: 'ts', note: 'streams as data' },
      { path: 'app/globals.css', lines: 320, lang: 'css', note: 'token system + light/dark' },
    ],
    nextSteps: [
      { txt: 'Wire VOTUS stake-flow to Dash Platform data contract', eta: 'this week', who: 'davara', tag: 'ship' },
      { txt: 'Open Avari Whisper poll: "votus transferable y1?"', eta: '12h', who: 'jordash', tag: 'votus' },
      { txt: 'Cortex matchup: claim Cross-Initium Liaison role', eta: '24h', who: 'cortex', tag: 'cortex' },
      { txt: 'Spec the auto-pair v0 algorithm', eta: '3d', who: 'davara', tag: 'spec' },
      { txt: 'Echo-catch line of the day → Initium README', eta: 'rolling', who: 'system', tag: 'ship' },
    ],
  },
  {
    slug: 'symble-x-kato',
    initiumId: 'INI-014',
    title: 'Veros.IO — the next-gen payments processor on Dash + Cosmos',
    pirate: {
      handle: 'symble',
      dash: 'symble.dash',
      role: 'The Pirate · Protocol & Story',
      bio: 'Spec-sketcher. Sees Dash + Cosmos as the only stack with the rails for human-readable recurring payments and ZK-protected user privacy at L1.',
    },
    refiner: {
      handle: 'kato',
      dash: 'kato.dash',
      role: 'The Refiner · Dash Platform Engineer',
      bio: 'Lives in the Dash data contract. IBC-curious. Has the Rust SDK open in a second monitor and the Cosmos SDK in a third.',
    },
    state: 'live',
    watching: 1842,
    motusViews: 712,
    votusStaked: 188,
    forge: 0.58,
    premise: 'Veros.IO is a next-generation payments processor for the post-card era. Founded by Jack Dorsey, Jimmy Donaldson (MrBeast), Lukas Schor, and Nassim Nicholas Taleb. Built from first principles on Dash Platform + Cosmos Network. Security reimagined; ZK-proof privacy at the protocol layer; human-readable subscription contracts paid in DASH on the rate or interval the user chose.',
    highLeverage: [
      'Subscriptions live in a Dash data contract (immutable schedule, mutable status); every user wallet reads its own subs without a custodian.',
      'Cosmos IBC bridge for cross-chain payouts — a Veros subscription can settle to a Cosmos zone (Osmosis, dYdX, Celestia) automatically. Fiat-rails compatibility roadmap via Noble.',
      'ZK-proof privacy at the protocol layer (Groth16 proofs over subscription metadata) — the chain knows the contract is valid, the world doesn\'t see who pays whom for what.',
      'Veros.IO charges no protocol fee — it earns by hosting the *pretty layer* (UX, alerts, FX hedging, support). The underlying contract stays free + open + forkable.',
      'Dash Savings Accounts: a pre-allocated subscription buffer that auto-replenishes, so a missed deposit never breaks a Netflix-like service.',
      'Subscription revocation is on-chain + reversible during a 24h window — refunds for accidental signups become trustless, not goodwill.',
    ],
    outlierIdeas: [
      'Wage-Subscriptions: an employer signs ONE recurring contract that fans out to N employees as DASH-denominated payroll. Single signature for the whole org, transparent ledger.',
      'Subscription-as-NFT: each sub is a transferable position. Sell your gym membership to a friend for the remaining months — or to a market-maker who hedges DASH exposure for you.',
      'Civic-Tier (free for governance): a Dash masternode operator can offer free subscriptions to their community as a public good, paid from masternode rewards. Subscriptions become political infrastructure.',
    ],
    startedAt: '07:30 UTC',
    coreFiles: [
      { path: 'contracts/veros-subscription.json', lines: 86, lang: 'json', note: 'Dash data contract spec' },
      { path: 'sdk/src/subscribe.ts', lines: 142, lang: 'ts', note: 'subscribe / pause / revoke primitives' },
      { path: 'sdk/src/savings.ts', lines: 96, lang: 'ts', note: 'Dash Savings Account buffer logic' },
      { path: 'app/dashboard/page.tsx', lines: 220, lang: 'tsx', note: 'subscriber console' },
      { path: 'app/api/webhook/route.ts', lines: 64, lang: 'ts', note: 'merchant webhook for sub events' },
      { path: 'README.md', lines: 180, lang: 'md', note: 'spec + threat model + UX principles' },
    ],
    nextSteps: [
      { txt: 'Submit data contract to Dash Evo testnet', eta: '48h', who: 'kato.dash', tag: 'ship' },
      { txt: 'Open whisper: should Veros take 0.4% or 0%?', eta: '5d', who: 'symble.dash', tag: 'votus' },
      { txt: 'Wage-Subscription POC for an org of 5', eta: 'next sprint', who: 'kato.dash', tag: 'spec' },
      { txt: 'Cortex role open: Civic-Tier Curator', eta: 'rolling', who: 'cortex', tag: 'cortex' },
    ],
  },
  {
    slug: 'pirate0x-x-rune',
    initiumId: 'INI-011',
    title: 'Cortex Tools — the helper protocol made simple',
    pirate: {
      handle: 'pirate.0x',
      dash: 'pirate0x.dash',
      role: 'The Pirate · Solidity & UX',
      bio: 'Came from the Ethereum side. Building a Cortex helper SDK so any Initium can plug in.',
    },
    refiner: {
      handle: 'rune',
      dash: 'rune.dash',
      role: 'The Refiner · TypeScript & Schema',
      bio: 'Schema discipline. Believes the API is the product.',
    },
    state: 'live',
    watching: 612,
    motusViews: 218,
    votusStaked: 64,
    forge: 0.41,
    premise: 'A drop-in helper-role SDK so any Initium on DuoDrive can spin up a Cortex with claim/log/route in one config file.',
    highLeverage: [
      'Roles-as-Code: every helper role is a typed contract (claimable, conditions, reward routing) — Initiums can fork and remix without forking the platform.',
      'Logged contribution routes through git refs + chat citations + stream timestamps — provenance is composable and verifiable.',
      'A "Cortex registry" makes helper-roles transferable across Initiums. A Typographer claimed once is portable.',
    ],
    outlierIdeas: [
      'Cortex Reputation Bond: helpers can stake VOTUS on their own work; if they ghost, the bond pays the duo back. Skin-in-game for contributors, not just stakers.',
      'Inverse-Cortex: a duo can publicly *commission* a role (e.g. "we need a stress tester") and the first qualified claim gets matched VOTUS from the Initium pool.',
    ],
    startedAt: '09:15 UTC',
    coreFiles: [
      { path: 'src/role.ts', lines: 88, lang: 'ts', note: 'role-as-code typed schema' },
      { path: 'src/registry.ts', lines: 124, lang: 'ts', note: 'cortex registry / portable roles' },
      { path: 'src/contribution.ts', lines: 102, lang: 'ts', note: 'log → route logic' },
      { path: 'examples/typographer/role.yaml', lines: 24, lang: 'yaml', note: 'sample role definition' },
      { path: 'tests/registry.spec.ts', lines: 68, lang: 'ts' },
    ],
    nextSteps: [
      { txt: 'Publish v0.1 SDK to npm + Dash data contract registry', eta: '1w', who: 'rune.dash', tag: 'ship' },
      { txt: 'Spec the Inverse-Cortex commission flow', eta: '4d', who: 'pirate.0x', tag: 'spec' },
      { txt: 'Cortex Reputation Bond proof-of-concept', eta: '2w', who: 'rune.dash', tag: 'spec' },
    ],
  },
  {
    slug: 'opal-x-frost',
    initiumId: 'INI-013',
    title: 'Forge Templates — Initium starter kits, opensource',
    pirate: {
      handle: 'opal',
      dash: 'opal.dash',
      role: 'The Pirate · Templates & Patterns',
      bio: 'Library curator brain. Wants every new Initium to start with a working scaffold.',
    },
    refiner: {
      handle: 'frost',
      dash: 'frost.dash',
      role: 'The Refiner · Tooling & Build',
      bio: 'Ships the boring infra so the dramatic work can happen.',
    },
    state: 'shipping',
    watching: 388,
    motusViews: 121,
    votusStaked: 41,
    forge: 0.66,
    premise: 'A curated catalog of Initium starter templates: SaaS, open-source library, course, podcast, art project. Each ships with manifesto, governance, VOTUS routing pre-wired.',
    highLeverage: [
      'Templates lower the cost of starting a new Initium from a weekend to 30 minutes.',
      'Each template includes a Forge Recipe — a default Cortex role set, default poll cadence, default revenue split.',
      'Forking a template is itself logged on-chain — derivative work attribution is automatic.',
    ],
    outlierIdeas: [
      'Templates can include a "ghost duo" — a default Pirate + Refiner persona description that helps a solo founder design their ideal partner before they find one.',
      'Initium of Initiums: templates that are themselves an Initium, voted on and improved by the entire DuoDrive community. Recursive product.',
    ],
    startedAt: '10:40 UTC',
    coreFiles: [
      { path: 'templates/saas/README.md', lines: 120, lang: 'md', note: 'starter spec + governance' },
      { path: 'templates/oss-library/initium.toml', lines: 38, lang: 'toml', note: 'initium config' },
      { path: 'templates/course/cortex-roles.yaml', lines: 56, lang: 'yaml', note: 'pre-wired helper roles' },
      { path: 'cli/src/init.ts', lines: 142, lang: 'ts', note: 'duodrive init wizard' },
    ],
    nextSteps: [
      { txt: 'Ship 3 more templates: art-project, podcast, civic-DAO', eta: '2w', who: 'opal.dash', tag: 'ship' },
      { txt: 'Whisper: should templates fork on-chain or just publish a manifest?', eta: '7d', who: 'frost.dash', tag: 'votus' },
      { txt: 'Cortex role open: Template Curator', eta: 'rolling', who: 'cortex', tag: 'cortex' },
    ],
  },
  {
    slug: 'goodvibestream',
    initiumId: 'INI-022',
    title: 'GoodVibeStream — relay the world\'s vibe coders, one room at a time',
    pirate: {
      handle: 'goodvibe',
      dash: 'goodvibe.dash',
      role: 'The Pirate · Curation & Rotation',
      bio: 'A protocol, not a person. Surfs the live coding category across Twitch / YouTube / Kick and rotates a featured builder into the DuoDrive room every 15 minutes.',
    },
    refiner: {
      handle: 'davara',
      dash: 'davara.dash',
      role: 'The Refiner · Auto-Pair Engine',
      bio: 'Watches the relay. Recommends potential Avari Sync partners for whoever\'s currently streaming. Routes Cortex helpers to live builders.',
    },
    state: 'relay',
    watching: 1208,
    motusViews: 488,
    votusStaked: 96,
    forge: 0.45,
    premise: 'Relay a real live vibe-coding stream into a DuoDrive room. Rotates every 15 minutes through a curated list of builders. Each rotated stream gets a working Duo Chat, Avari Echo on, and a community Cortex around them. The auto-pair protocol watches and suggests partnerships.',
    highLeverage: [
      'A passive discovery layer — you don\'t pick who to watch; the relay surfaces builders you\'d never have searched for.',
      'Auto-pair recommendations: every relayed builder gets matched against the open Cortex roles. The room helps. The builder might not even know yet.',
      'Rotation prevents bandwagon attention — today\'s 100k stream gets the same 15-min slot as a 12-viewer overnight builder.',
      'Eventually the algorithm proposes whole duos: "this builder would pair beautifully with this Refiner."',
    ],
    outlierIdeas: [
      'Auto-pair as matchmaking-as-a-service: Twitch coders apply by linking their channel; DuoDrive proposes Refiner partners weekly with VOTUS-weighted ranking.',
      'Streamer Bounties: any DuoDrive watcher can post a feature request to the relayed builder, attached with VOTUS. If the builder ships it, they earn the bounty.',
      'Cortex-as-Audience: a relayed builder mid-flow gets a sidebar of helper offers (e.g. "I can stress-test that endpoint"). Ad-hoc paired Cortex.',
      'Twin-Stream Mode: the relayed builder pairs in real time with an opt-in Refiner from the DuoDrive Cortex, splitting the screen and merging chats.',
    ],
    startedAt: 'rolling · 15-min cycle',
    goodVibeRelay: true,
    coreFiles: [
      { path: 'lib/goodVibeStreamers.ts', lines: 110, lang: 'ts', note: 'curated streamer list + rotation algorithm' },
      { path: 'components/GoodVibeStream.tsx', lines: 280, lang: 'tsx', note: 'relay player + duo chat + queue' },
      { path: 'app/auto-pair/page.tsx', lines: 220, lang: 'tsx', note: 'matchmaking visualization' },
      { path: 'lib/autoPair.ts', lines: 96, lang: 'ts', note: 'pair-scoring heuristic (synthetic)' },
    ],
    nextSteps: [
      { txt: 'Wire Twitch Helix API for actually-live filtering', eta: '5d', who: 'davara', tag: 'ship' },
      { txt: 'Open whisper: rotation cadence — 15min vs 30min?', eta: '24h', who: 'cortex', tag: 'votus' },
      { txt: 'Spec the auto-pair scoring heuristic v0.1', eta: '1w', who: 'davara', tag: 'spec' },
      { txt: 'Cortex role open: Vibe Coder Scout (find new streamers to add)', eta: 'rolling', who: 'cortex', tag: 'cortex' },
    ],
  },
];

export function getStream(slug: string): Stream | undefined {
  return STREAMS.find((s) => s.slug === slug);
}
