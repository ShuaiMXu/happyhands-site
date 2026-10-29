'use client';

import {Button} from '@/components/glaze/ui/button';
import {Status} from '@/components/glaze/ui/status';

// A block: the assistant listening, at phone width. The running Status and the time in mono over the words as they
// are heard, the settled ones in text-1 and the last few, still forming, in text-3. Cancel sits flat beside the one
// glass key, which stops and hands the words to the assistant. Wire `heard` and `forming` to your speech recogniser.

const heard = 'Remind me to call about the kitchen leak on Monday, and find a plumber';
const forming = 'who can come this week';

/** Listening: the time, the words so far and Send it. */
export function VoiceCapture({className}: {className?: string}) {
  return (
    <section aria-label="Voice note" className={className ?? 'flex w-full max-w-sm flex-col gap-4'}>
      <div className="flex items-baseline gap-2">
        <Status status="running" live className="me-auto">Listening</Status>
        <span className="data type-label text-text-2">0:14</span>
      </div>
      <p aria-live="polite" className="type-heading">
        {heard} <span className="text-text-3">{forming}</span>
      </p>
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1">Cancel</Button>
        <Button className="flex-1">Send it</Button>
      </div>
    </section>
  );
}
