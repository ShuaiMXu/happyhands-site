'use client';

import {Response} from '@/components/glaze/ai/response';
import {Button} from '@/components/glaze/ui/button';
import {Card, CardContent, CardFooter, CardHeader, CardMeta, CardTitle} from '@/components/glaze/ui/card';
import {Item, ItemContent, ItemGroup, ItemTitle} from '@/components/glaze/ui/item';
import {Status, type StatusValue} from '@/components/glaze/ui/status';

// A block: a personal assistant's morning at phone width. The day in one line, then what it handled as a card of
// rows, each ending in its Status word; the one that waits on the person says so. Ask by voice is the card's one glass
// key. Wire `handled` to your assistant's log.

const handled: {task: string; status: StatusValue; word: string}[] = [
  {task: 'Renewed the car insurance', status: 'ok', word: 'Paid'},
  {task: 'Dentist moved to Thursday', status: 'ok', word: 'Moved'},
  {task: 'Table for four on Friday', status: 'waiting', word: 'Needs you'},
];

/** The day in a line, three things handled and Ask by voice. */
export function Today({className}: {className?: string}) {
  return (
    <section aria-label="Today" className={className ?? 'flex w-full max-w-sm flex-col gap-3'}>
      <Response>Nothing until 4 pm. One thing waits on you.</Response>
      <Card>
        <CardHeader>
          <CardTitle>Since 7 am</CardTitle>
        </CardHeader>
        <CardContent flush>
          <ItemGroup variant="plain" aria-label="Handled">
            {handled.map(h => <Item key={h.task}>
              <ItemContent><ItemTitle>{h.task}</ItemTitle></ItemContent>
              <Status status={h.status} size="sm" className="shrink-0">{h.word}</Status>
            </Item>)}
          </ItemGroup>
        </CardContent>
        <CardFooter>
          <CardMeta>Saturday, Oct 17</CardMeta>
          <Button size="sm">Ask by voice</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
