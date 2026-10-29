'use client';

import {Button} from '@/components/sodium/ui/button';
import {Frame, FrameBody, FrameDescription, FrameHeader, FrameStatus, FrameTitle, FrameValue} from '@/components/sodium/ui/frame';
import {Status} from '@/components/sodium/ui/status';
import {StatusStrip, StatusStripCell, StatusStripLabel, StatusStripValue} from '@/components/sodium/ui/status-strip';

// A block: the page an on-call engineer opens on their phone when a job fails, sized to its content at phone width
// with no device frame. One frame: the header names the pipeline and carries its state and time (orders-daily, then
// Job failed and 02:14 UTC at the end), so the body starts with what to know: one sentence, then the facts as a 2x2
// StatusStrip ruled into the frame (the same grid Pipeline and Backfill use), then Acknowledge and Retry step, the one
// slab. Wire `facts` to the failed job.

const facts = [
  {label: 'Pipeline', value: 'orders-daily'},
  {label: 'Step', value: 'write_partitions'},
  {label: 'Partition', value: '2026-10-18'},
  {label: 'Attempts', value: '3 of 3'},
];

/** A failed job at phone width: the failure, its facts, Acknowledge and Retry step. */
export function OnCall({className}: {className?: string}) {
  return (
    <Frame aria-label="Failed job" className={className ?? 'w-full max-w-sm'}>
      <FrameHeader>
        <FrameTitle>orders-daily</FrameTitle>
        <FrameStatus><Status status="fail" size="sm">Job failed</Status></FrameStatus>
        <FrameValue meta>02:14 UTC</FrameValue>
      </FrameHeader>
      <FrameBody>
        <FrameDescription>The source dropped a column, so the next run at 03:00 will fail the same way.</FrameDescription>
      </FrameBody>
      <FrameBody padding="none">
        <StatusStrip variant="plain" label="Failed job">
          {facts.map(f => <StatusStripCell key={f.label}>
            <StatusStripLabel>{f.label}</StatusStripLabel>
            <StatusStripValue>{f.value}</StatusStripValue>
          </StatusStripCell>)}
        </StatusStrip>
      </FrameBody>
      <FrameBody>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary">Acknowledge</Button>
          <Button>Retry step</Button>
        </div>
      </FrameBody>
    </Frame>
  );
}
