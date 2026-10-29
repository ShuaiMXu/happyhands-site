'use client';

import {BarBlocks, type BarBlock} from '@/components/sodium/ui/bar-blocks';
import {Button} from '@/components/sodium/ui/button';
import {Frame, FrameBody, FrameFooter, FrameHeader, FrameMeta, FrameTitle, FrameValue} from '@/components/sodium/ui/frame';
import {Swimlanes, type Swimlane, type SwimlaneStep} from '@/components/sodium/ui/swimlanes';

// A block: a nightly sync across the systems it touches. One frame, headed by the sync's name and its start time: the steps in order as
// swimlanes from the sources through the warehouse to the dashboard, the transform in yellow because it is the step
// this team owns and every other step on the well, all under one --line edge with no lane rules, then the rows the last
// sync loaded by source in a second body, which the frame rules off: Orders on the yellow wash, the rest on the well. The test's outcome is the word OK, not a green box: short, so it still shows in a third of
// a phone. Run sync is the footer's one slab. Only the load and the test carry meta, to leave the names the room.
// Wire `steps` and `sources` to your orchestrator.

const lanes: Swimlane[] = [{id: 'source', label: 'Sources'}, {id: 'warehouse', label: 'Warehouse'}, {id: 'dashboard', label: 'Dashboard'}];
const steps: SwimlaneStep[] = [
  {label: 'Extract', from: 'source'},
  {label: 'Load', from: 'source', to: 'warehouse', meta: '48,210 rows'},
  {label: 'Transform', from: 'warehouse', tone: 'accent'},
  {label: 'Test', from: 'warehouse', meta: 'OK'},
  {label: 'Publish', from: 'dashboard'},
];
const sources: BarBlock[] = [
  {label: 'Orders', value: 1_240_000},
  {label: 'Events', value: 612_000},
  {label: 'Files', value: 287_000},
];

/** A sync's steps across systems and the rows it loaded by source, with Run sync. */
export function SyncFlow({className}: {className?: string}) {
  return (
    <Frame aria-label="Nightly sync" className={className ?? 'w-full'}>
      <FrameHeader>
        <FrameTitle>nightly-sync</FrameTitle>
        <FrameValue meta>02:00 UTC</FrameValue>
      </FrameHeader>
      <FrameBody>
        <Swimlanes label="Nightly sync, sources to dashboard" lanes={lanes} steps={steps}/>
      </FrameBody>
      <FrameBody>
        <BarBlocks label="Rows by source, last sync" data={sources} unit="count" size="sm"/>
      </FrameBody>
      <FrameFooter>
        <FrameMeta>Last run 6h ago</FrameMeta>
        <Button size="sm">Run sync</Button>
      </FrameFooter>
    </Frame>
  );
}
