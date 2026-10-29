'use client';

import {BreadcrumbTrail} from '@/components/sodium/ui/breadcrumb';
import {DataList, DataListItem, DataListLabel, DataListValue} from '@/components/sodium/ui/data-list';
import {Frame} from '@/components/sodium/ui/frame';
import {Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemMeta, ItemTitle} from '@/components/sodium/ui/item';
import {NumberedTabs, NumberedTabsContent, NumberedTabsList, NumberedTabsPanels, NumberedTabsTrigger} from '@/components/sodium/ui/numbered-tabs';
import {StatusMark, type StatusValue} from '@/components/sodium/ui/status';
import {StemChart} from '@/components/sodium/ui/stem-chart';

// A block: a pipeline's own page, under its path. The numbered tabs head the frame, the one tab row that takes the
// yellow: runs per day as a stem chart with every value printed, the latest partitions with their status marks, and
// the schedule as label and value pairs. Wire the three panels to your scheduler.

const days = [
  {day: 'Mon', runs: 24}, {day: 'Tue', runs: 26}, {day: 'Wed', runs: 25}, {day: 'Thu', runs: 31},
  {day: 'Fri', runs: 28}, {day: 'Sat', runs: 12}, {day: 'Sun', runs: 9},
];

const partitions: {name: string; note: string; size: string; status: StatusValue}[] = [
  {name: '2026-10-18', note: 'Column region missing in the source.', size: '0 B', status: 'fail'},
  {name: '2026-10-17', note: 'Loaded and compacted.', size: '2.4 GB', status: 'ok'},
  {name: '2026-10-16', note: 'Loaded and compacted.', size: '2.3 GB', status: 'ok'},
];

const schedule = [
  {label: 'Cron', value: '0 2 * * *'},
  {label: 'Timezone', value: 'UTC'},
  {label: 'Retries', value: '3, 5m apart'},
  {label: 'Owner', value: 'data-platform'},
];

/** A pipeline's page: its path, then runs, partitions and schedule as numbered tabs. */
export function PipelineHistory({className}: {className?: string}) {
  return (
    <div className={className ?? 'flex w-full flex-col gap-3'}>
      <BreadcrumbTrail items={[
        {label: 'Pipelines', href: '#'},
        {label: 'orders-daily', href: '#', value: true},
        {label: 'Overview'},
      ]}/>
      <Frame aria-label="Pipeline orders-daily">
        <NumberedTabs defaultValue="runs" className="gap-0">
          <NumberedTabsList className="*:flex-1 after:hidden">
            <NumberedTabsTrigger value="runs">Runs</NumberedTabsTrigger>
            <NumberedTabsTrigger value="partitions">Partitions</NumberedTabsTrigger>
            <NumberedTabsTrigger value="schedule">Schedule</NumberedTabsTrigger>
          </NumberedTabsList>
          <NumberedTabsPanels>
            <NumberedTabsContent value="runs" className="p-inset">
              <StemChart label="Runs per day, this week" data={days} xKey="day" valueKey="runs" xLabel="Day" valueLabel="Runs" height={200}/>
            </NumberedTabsContent>
            <NumberedTabsContent value="partitions">
              <ItemGroup variant="plain" aria-label="Latest partitions">
                {partitions.map(p => <Item key={p.name}>
                  <ItemMedia><StatusMark status={p.status} label={p.status === 'fail' ? 'Failed' : 'Succeeded'}/></ItemMedia>
                  <ItemContent>
                    <ItemTitle>{p.name}</ItemTitle>
                    <ItemDescription>{p.note}</ItemDescription>
                  </ItemContent>
                  <ItemMeta>{p.size}</ItemMeta>
                </Item>)}
              </ItemGroup>
            </NumberedTabsContent>
            <NumberedTabsContent value="schedule" className="px-inset">
              <DataList>
                {schedule.map(s => <DataListItem key={s.label}>
                  <DataListLabel>{s.label}</DataListLabel>
                  <DataListValue>{s.value}</DataListValue>
                </DataListItem>)}
              </DataList>
            </NumberedTabsContent>
          </NumberedTabsPanels>
        </NumberedTabs>
      </Frame>
    </div>
  );
}
