'use client';

import {AgentTurn, Message, MessageBubble, MessageBubbleContent, MessageContent, MessageHeader, MessageTime} from '@/components/glaze/ai/message';
import {Response} from '@/components/glaze/ai/response';
import {Button} from '@/components/glaze/ui/button';
import {Card, CardContent, CardFooter, CardHeader, CardMeta, CardTitle} from '@/components/glaze/ui/card';
import {Item, ItemContent, ItemGroup, ItemTitle} from '@/components/glaze/ui/item';
import {Status, type StatusValue} from '@/components/glaze/ui/status';

// A block: an agent that builds another agent. The person's ask in the outline bubble, paper with the control line,
// so it stays light on the grey stage; then the agent's turn: one line, and the plan as a card of changes, one row each,
// ending in its Status word. Three are done and the last waits on the person, so the footer's one lead is the green
// confirm, beside View changes. Wire `changes` to your builder and the buttons to your publish and diff.

const changes: {name: string; status: StatusValue; word: string}[] = [
  {name: 'Returns journey', status: 'ok', word: 'Written'},
  {name: 'Order and refund tools', status: 'ok', word: 'Connected'},
  {name: '50 simulated customers', status: 'ok', word: '48 passed'},
  {name: 'Chat and email', status: 'waiting', word: 'Needs you'},
];

/** The ask, the agent's four changes with three done, and Publish agent waiting on the person. */
export function AgentPlan({className}: {className?: string}) {
  return (
    <section aria-label="Agent builder" className={className ?? 'flex w-full max-w-md flex-col gap-3'}>
      <Message from="user">
        <MessageContent>
          <MessageHeader>You<MessageTime>10:02</MessageTime></MessageHeader>
          <MessageBubble variant="outline">
            <MessageBubbleContent>Build a returns agent for our shoe store.</MessageBubbleContent>
          </MessageBubble>
        </MessageContent>
      </Message>
      <AgentTurn name="Agent builder" state="waiting" time="10:06">
        <Response>Built and tested. It goes live when you say so.</Response>
        <Card>
          <CardHeader>
            <CardTitle>Returns agent</CardTitle>
          </CardHeader>
          <CardContent flush>
            <ItemGroup variant="plain" aria-label="Changes">
              {changes.map(c => <Item key={c.name} size="sm">
                <ItemContent><ItemTitle>{c.name}</ItemTitle></ItemContent>
                <Status status={c.status} size="sm" className="shrink-0">{c.word}</Status>
              </Item>)}
            </ItemGroup>
          </CardContent>
          <CardFooter>
            <CardMeta>3 of 4</CardMeta>
            <Button size="sm" variant="secondary">View changes</Button>
            <Button size="sm" variant="confirm">Publish agent</Button>
          </CardFooter>
        </Card>
      </AgentTurn>
    </section>
  );
}
