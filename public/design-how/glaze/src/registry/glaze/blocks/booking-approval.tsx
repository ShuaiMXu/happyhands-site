'use client';

import {Message, MessageBubble, MessageBubbleContent, MessageContent, MessageHeader, AgentTurn} from '@/components/glaze/ai/message';
import {Response} from '@/components/glaze/ai/response';
import {Button} from '@/components/glaze/ui/button';
import {Card, CardContent, CardFooter, CardHeader, CardMeta, CardTitle} from '@/components/glaze/ui/card';
import {Item, ItemContent, ItemGroup, ItemTitle} from '@/components/glaze/ui/item';

// A block: the assistant asks before it spends, at phone width. The person's ask in the outline bubble, then the
// assistant's turn: why it is asking, in a line, and the booking as a card of three rows. Book table is the green confirm, because it says yes to
// something proposed; Not now sits beside it, flat. Wire `booking` to your assistant's proposal.

const booking = [
  {label: 'When', value: 'Fri, Oct 23, 7:30 pm'},
  {label: 'Where', value: 'Linden Table'},
  {label: 'Deposit', value: '$40'},
];

/** The ask, the reason it checks first and the booking, with Book table. */
export function BookingApproval({className}: {className?: string}) {
  return (
    <section aria-label="Book a table" className={className ?? 'flex w-full max-w-sm flex-col gap-3'}>
      <Message from="user" className="px-0">
        <MessageContent>
          <MessageHeader className="sr-only">You</MessageHeader>
          <MessageBubble variant="outline">
            <MessageBubbleContent>Book a quiet table for four on Friday.</MessageBubbleContent>
          </MessageBubble>
        </MessageContent>
      </Message>
      <AgentTurn name="Assistant" state="waiting" className="px-0">
        <Response>Found a corner table. It needs a deposit, so I&apos;m asking first.</Response>
        <Card>
          <CardHeader>
            <CardTitle>Table for four</CardTitle>
          </CardHeader>
          <CardContent flush>
            <ItemGroup variant="plain" aria-label="Booking">
              {booking.map(b => <Item key={b.label}>
                <ItemContent><ItemTitle className="text-text-2">{b.label}</ItemTitle></ItemContent>
                <span className="shrink-0 type-body-sm data">{b.value}</span>
              </Item>)}
            </ItemGroup>
          </CardContent>
          <CardFooter>
            <CardMeta>Held till 6 pm</CardMeta>
            <Button size="sm" variant="secondary">Not now</Button>
            <Button size="sm" variant="confirm">Book table</Button>
          </CardFooter>
        </Card>
      </AgentTurn>
    </section>
  );
}
