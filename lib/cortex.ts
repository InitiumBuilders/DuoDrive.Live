/**
 * Cortex decisions — open whispers the room is currently considering.
 * Exposed as a typed list so the focus interface can browse one at a time.
 */

export type DecisionStage = 'propose' | 'whisper' | 'anvil' | 'shipped';

export type CortexDecision = {
  id: string;
  title: string;
  body: string;
  stage: DecisionStage;
  pirateTake: { who: string; dash: string; text: string };
  refinerTake: { who: string; dash: string; text: string };
  whisper: number; // 0..1, lean toward "yes"
  staked: number;
  contributors: number;
  closesIn: string; // human time
  initium: string;
  category: 'tokenomics' | 'governance' | 'product' | 'partnership';
};

export const DECISIONS: CortexDecision[] = [
  {
    id: 'D-001',
    title: 'Should VOTUS be transferable in Y1, or earn-only?',
    body: 'Earn-only forces builders to actually build. Transferable accelerates liquidity but invites speculation farmers. The room weighs the trade-off.',
    stage: 'whisper',
    pirateTake: {
      who: 'jordash',
      dash: 'jordash.dash',
      text: 'Earn-only. Speculation kills culture before utility lands. Y2 we re-open with a 90d vesting cliff.',
    },
    refinerTake: {
      who: 'davara',
      dash: 'davara.dash',
      text: 'Earn-only Y1. Add a 90d cliff Y2. Cap initial transfer velocity at 10% of held balance per epoch — Goodhart-resistant by construction.',
    },
    whisper: 0.78,
    staked: 144,
    contributors: 22,
    closesIn: '12h',
    initium: 'INI-009',
    category: 'tokenomics',
  },
  {
    id: 'D-002',
    title: 'Add subscription paywall on Two-Key Drive vaults > 100MB?',
    body: 'Free vaults up to 100MB. Premium tier ($5/mo paid in DASH) for unlimited storage and revoke-window extensions. Some Cortex members worry it gates the literal product.',
    stage: 'whisper',
    pirateTake: {
      who: 'jordash',
      dash: 'jordash.dash',
      text: 'Yes — only the duos who need the heavy primitive pay. Storage scales with conviction, not with feature creep.',
    },
    refinerTake: {
      who: 'davara',
      dash: 'davara.dash',
      text: 'Yes if free tier is generous (100MB ≈ 3000 files). Add a 30-day grace before lock so nobody loses work to a missed payment.',
    },
    whisper: 0.62,
    staked: 88,
    contributors: 14,
    closesIn: '2d',
    initium: 'INI-009',
    category: 'product',
  },
  {
    id: 'D-003',
    title: 'Default Initium license: MIT or Apache-2.0?',
    body: 'MIT is the default for everything DuoDrive ships. Apache-2.0 adds an explicit patent grant — relevant for partnerships with Dash Foundation and enterprise. Should the platform default change?',
    stage: 'whisper',
    pirateTake: {
      who: 'jordash',
      dash: 'jordash.dash',
      text: 'MIT default. Apache opt-in. Defaults shape culture; MIT signals "take it and run."',
    },
    refinerTake: {
      who: 'davara',
      dash: 'davara.dash',
      text: 'MIT default + Apache opt-in surfaces the patent question only when it matters. A Cortex helper offers a one-line opt-in command on init.',
    },
    whisper: 0.84,
    staked: 64,
    contributors: 9,
    closesIn: '5d',
    initium: 'INI-009',
    category: 'governance',
  },
  {
    id: 'D-004',
    title: 'Cosmos IBC payouts: opt-in or default for Veros subscriptions?',
    body: 'A Veros.IO subscription can settle on Dash, or auto-bridge to a Cosmos zone (Osmosis, dYdX, Celestia). Should IBC payouts be the default, or an explicit opt-in by the merchant?',
    stage: 'propose',
    pirateTake: {
      who: 'symble',
      dash: 'symble.dash',
      text: 'Default to Dash settlement. IBC opt-in. Most merchants want a single asset; the IBC complexity should be earned, not imposed.',
    },
    refinerTake: {
      who: 'kato',
      dash: 'kato.dash',
      text: 'Agreed. But surface the IBC option as a one-toggle in the merchant dashboard with a clear "settle anywhere" affordance.',
    },
    whisper: 0.67,
    staked: 92,
    contributors: 18,
    closesIn: '4d',
    initium: 'INI-014',
    category: 'partnership',
  },
  {
    id: 'D-005',
    title: 'Auto-pair recommendations: surface in DM only, or public feed?',
    body: 'When the auto-pair algorithm suggests two builders should partner, should the suggestion surface privately to the two builders (DM) or publicly on a "Suggested Pairs" feed?',
    stage: 'whisper',
    pirateTake: {
      who: 'davara',
      dash: 'davara.dash',
      text: 'DM first. Both must thumbs-up before it goes public. Otherwise we push pairings on people who didn\'t ask, and that breaks consent.',
    },
    refinerTake: {
      who: 'jordash',
      dash: 'jordash.dash',
      text: 'Strong agree on DM-first. Public surface only after consent. Privacy is the default; visibility is earned.',
    },
    whisper: 0.91,
    staked: 51,
    contributors: 11,
    closesIn: '18h',
    initium: 'INI-022',
    category: 'governance',
  },
];

export const FLOW_STEPS: { id: DecisionStage; label: string; color: 'pirate' | 'sync' | 'refiner' | 'forge' }[] = [
  { id: 'propose', label: 'Propose', color: 'pirate' },
  { id: 'whisper', label: 'Whisper', color: 'sync' },
  { id: 'anvil', label: 'Anvil', color: 'refiner' },
  { id: 'shipped', label: 'Shipped', color: 'forge' },
];

export function stageIndex(s: DecisionStage): number {
  return FLOW_STEPS.findIndex((f) => f.id === s);
}
