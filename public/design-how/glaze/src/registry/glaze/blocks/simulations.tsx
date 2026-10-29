'use client';

import {Button} from '@/components/glaze/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardMeta, CardTitle} from '@/components/glaze/ui/card';
import {Chart, type StatusBarBucket} from '@/components/glaze/ui/chart';
import {Item, ItemContent, ItemDescription, ItemGroup, ItemTitle} from '@/components/glaze/ui/item';
import {Status, type StatusValue} from '@/components/glaze/ui/status';

// A block: simulated customers run against an agent before it ships. The pass count, the last 30 runs as a status
// strip (a failing run is the only colour), then four scenarios as rows, each ending in its Status word and glyph:
// the failure first, with what went wrong, then the one still running. Run all leads the footer; Open failures sits
// beside it, flat. Wire `runs` and `scenarios` to your eval runner.

const runs: StatusBarBucket[] = Array.from({length: 30}, (_, i) => {
  const failed = i === 6 || i === 17 ? 3 : i === 27 ? 2 : 0;
  return {label: `Run ${i + 1}`, count: 50, status: failed ? 'fail' : 'ok', issues: failed || undefined};
});

const scenarios: {name: string; note?: string; status: StatusValue}[] = [
  {name: 'Refund over the limit', note: 'Sent $640 without approval', status: 'fail'},
  {name: 'Order never arrived', status: 'running'},
  {name: 'Exchange for a larger size', status: 'ok'},
  {name: 'Customer asks for a person', status: 'ok'},
];

/** The pass count, the last 30 runs and four scenarios, with Open failures and Run all. */
export function Simulations({className}: {className?: string}) {
  return (
    <Card aria-label="Simulations" className={className ?? 'w-full max-w-md'}>
      <CardHeader>
        <CardTitle>Simulations</CardTitle>
        <CardDescription>Returns agent, draft 3</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="flex items-baseline gap-2">
          <span className="type-heading data">48 of 50</span>
          <span className="type-body-sm text-text-2">passed</span>
        </p>
        <Chart type="status" frame="none" label="Last 30 runs" data={runs} noun={['customer', 'customers']} range={['30 runs ago', 'Now']}/>
      </CardContent>
      <CardContent flush>
        <ItemGroup variant="plain" aria-label="Scenarios">
          {scenarios.map(s => <Item key={s.name}>
            <ItemContent>
              <ItemTitle>{s.name}</ItemTitle>
              {s.note && <ItemDescription>{s.note}</ItemDescription>}
            </ItemContent>
            <Status status={s.status} size="sm" className="shrink-0"/>
          </Item>)}
        </ItemGroup>
      </CardContent>
      <CardFooter>
        <CardMeta>4m ago</CardMeta>
        <Button size="sm" variant="secondary">Open failures</Button>
        <Button size="sm">Run all</Button>
      </CardFooter>
    </Card>
  );
}
