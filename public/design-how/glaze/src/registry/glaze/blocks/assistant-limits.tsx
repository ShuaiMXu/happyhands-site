'use client';

import {AutonomyRule, type AutonomyLevel} from '@/components/glaze/ai/autonomy-rule';
import {ItemGroup} from '@/components/glaze/ui/item';

// A block: what the assistant may do on its own, one AutonomyRule per kind of action with its limit in the title.
// A change applies at once, so it has no Save and no glass key; each level is a Select at the row's end, which keeps a
// rule to one row at phone width.
// Wire `rules` to your assistant's permissions.

const rules: {title: string; level: AutonomyLevel}[] = [
  {title: 'Pay bills under $50', level: 'auto'},
  {title: 'Book tables and visits', level: 'ask'},
  {title: 'Message people for you', level: 'ask'},
  {title: 'Spend over $200', level: 'never'},
];

/** Four rules for what the assistant does on its own. */
export function AssistantLimits({className}: {className?: string}) {
  return (
    <ItemGroup aria-label="On its own" className={className ?? 'w-full max-w-sm'}>
      {rules.map(r => <AutonomyRule key={r.title} title={r.title} defaultValue={r.level} control="select"/>)}
    </ItemGroup>
  );
}
