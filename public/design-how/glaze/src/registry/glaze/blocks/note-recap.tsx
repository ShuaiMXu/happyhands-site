'use client';

import {Response} from '@/components/glaze/ai/response';
import {Button} from '@/components/glaze/ui/button';
import {Card, CardContent, CardFooter, CardHeader, CardMeta, CardTitle} from '@/components/glaze/ui/card';
import {Checkbox} from '@/components/glaze/ui/checkbox';

// A block: the note the assistant wrote from a voice note, at phone width. What it understood in a sentence, then the
// to-dos as a card of checkboxes, with where the note came from in the footer and Share note as its one glass key.
// Wire `summary` and `todos` to your assistant's output.

const summary = 'A plumber can come **Tuesday, 9 to 11 am**, and I asked the landlord to cover it.';

const todos = [
  {label: 'Clear the cupboard under the sink', done: true},
  {label: 'Send two photos of the leak', done: false},
  {label: 'Be home Tuesday morning', done: false},
];

/** The note's summary and three to-dos, with Share note. */
export function NoteRecap({className}: {className?: string}) {
  return (
    <section aria-label="Kitchen leak" className={className ?? 'flex w-full max-w-sm flex-col gap-3'}>
      <Response>{summary}</Response>
      <Card>
        <CardHeader>
          <CardTitle>Kitchen leak</CardTitle>
        </CardHeader>
        <CardContent className="gap-2.5 pt-0">
          {todos.map(t => <label key={t.label} className="flex items-center gap-2.5 type-body-sm">
            <Checkbox defaultChecked={t.done}/>
            <span className={t.done ? 'text-text-2 line-through' : undefined}>{t.label}</span>
          </label>)}
        </CardContent>
        <CardFooter>
          <CardMeta>From a voice note, 9:12 am</CardMeta>
          <Button size="sm">Share note</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
