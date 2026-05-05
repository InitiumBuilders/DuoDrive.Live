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
  state: 'live' | 'shipping' | 'paused';
  watching: number;
  motusViews: number;
  votusStaked: number;
  forge: number;
  premise: string;
  highLeverage: string[];
  outlierIdeas: string[];
  startedAt: string;
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
  },
  {
    slug: 'symble-x-kato',
    initiumId: 'INI-014',
    title: 'Veros.IO — Dash Subscriptions, the safe way',
    pirate: {
      handle: 'symble',
      dash: 'symble.dash',
      role: 'The Pirate · Protocol & Story',
      bio: 'Spec-sketcher. Sees Dash as the only chain with the rails for human-readable recurring payments.',
    },
    refiner: {
      handle: 'kato',
      dash: 'kato.dash',
      role: 'The Refiner · Dash Platform Engineer',
      bio: 'Lives in the Dash data contract. Has the Rust SDK open in a second monitor.',
    },
    state: 'live',
    watching: 1842,
    motusViews: 712,
    votusStaked: 188,
    forge: 0.58,
    premise: 'Veros.IO — a payment provider on Dash Platform for human-readable subscriptions and Dash savings accounts. Subscribe-once, pay safely on schedule, in DASH, with revoke + pause + escrow primitives.',
    highLeverage: [
      'Subscriptions live in a single Dash data contract document (immutable schedule, mutable status), so every user wallet can read its own subs without a custodian.',
      'Veros.IO charges no protocol fee — it earns by hosting the *pretty layer* (UX, alerts, FX hedging). Underlying contract stays free + open.',
      'Dash Savings Accounts: a pre-allocated subscription buffer that auto-replenishes, so a missed Dash deposit never breaks a Netflix-like service.',
      'Subscription revocation is on-chain + reversible during a 24h window — refunds for accidental signups become trustless, not goodwill.',
    ],
    outlierIdeas: [
      'Wage-Subscriptions: an employer signs ONE recurring contract that fans out to N employees as DASH-denominated payroll. Single signature for the whole org, transparent ledger.',
      'Subscription-as-NFT: each sub is a transferable position. Sell your gym membership to a friend for the remaining months — or to a market-maker who hedges DASH exposure for you.',
      'Civic-Tier (free for governance): a Dash masternode operator can offer free subscriptions to their community as a public good, paid from masternode rewards. Subscriptions become political infrastructure.',
    ],
    startedAt: '07:30 UTC',
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
      'Each template includes a *Forge Recipe* — a default Cortex role set, default poll cadence, default revenue split.',
      'Forking a template is itself logged on-chain — derivative work attribution is automatic.',
    ],
    outlierIdeas: [
      'Templates can include a "ghost duo" — a default Pirate + Refiner persona description that helps a solo founder design their ideal partner before they find one.',
      'Initium of Initiums: templates that are themselves an Initium, voted on and improved by the entire DuoDrive community. Recursive product.',
    ],
    startedAt: '10:40 UTC',
  },
];

export function getStream(slug: string): Stream | undefined {
  return STREAMS.find((s) => s.slug === slug);
}
