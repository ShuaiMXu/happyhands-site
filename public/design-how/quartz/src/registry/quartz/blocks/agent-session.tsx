'use client';

import {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {
  Conversation, ConversationContent, ConversationJump, ConversationProvider, ConversationTail, ConversationTimeline, ConversationViewport,
  useConversation, type ConversationRow, type ConversationStatus,
} from '@/components/quartz/ai/conversation';
import {AgentTurn as Turn, Message, MessageBubble, MessageBubbleContent, MessageContent, MessageFooter, MessageHeader, MessageModel, MessageTime, type MessageStatusProps} from '@/components/quartz/ai/message';
import {PromptInput, PromptQueue, type PromptInputHandle, type PromptValue, type QueuedMessage} from '@/components/quartz/ai/prompt-input';
import {Response} from '@/components/quartz/ai/response';
import type {SendStatus} from '@/components/quartz/ai/send-button';
import {ToolCallList, registerTool, useToolCalls, type ToolCallData, type ToolRenderer} from '@/components/quartz/ai/tool-call';
import {CopyButton} from '@/components/quartz/ui/copy-button';

// A block: one agent session, the canonical AI turn. The thread keeps to its newest line. A turn is message flow: the
// tool rows (a checklist of steps), then the answer in prose, then a footer with copy and the model that answered. While
// it works, the calls before the current one fold into one line and the current call is the row with the arc; a finished
// turn folds them all into "Worked for 14s". While the agent works, a message the person sends joins the queue above
// the composer instead of interrupting. Wire `send` to your agent's stream.

const order = '#4821'; // value-ok: an order number, not a color
const earlier = '#4790'; // value-ok: an order number, not a color
const agent = 'support-agent';
const t = (s: number) => ({startedAt: 0, endedAt: s * 1000});

/** A support tool's words: the -ing phrase, the done phrase and the imperative, with the object in the detail. */
const supportTool = (active: string, done: string, ask: string, noun: string, key: string, one: string, many: (n: number) => string, detail?: (input: Record<string, unknown>) => string | undefined): ToolRenderer => ({
  active, done, ask, noun, lines: 8, detailMono: !!detail,
  summary: {key, one, many}, detail,
});
const str = (v: unknown) => (typeof v === 'string' ? v : undefined);

// Register your own tools once, at module scope, so a row reads "Looked up order #4821" and not "Called lookup_order".
registerTool('lookup_order', supportTool('Looking up order', 'Looked up order', 'Look up order', 'order', 'order', 'looked up an order', n => `looked up ${n} orders`, input => str(input.order)));
registerTool('search_policy', supportTool('Checking the refund policy', 'Checked the refund policy', 'Check the refund policy', 'policy check', 'policy', 'checked a policy', n => `checked ${n} policies`));
registerTool('draft_reply', supportTool('Drafting the reply', 'Drafted the reply', 'Draft the reply', 'reply', 'reply', 'drafted a reply', n => `drafted ${n} replies`));
registerTool('run_eval', supportTool('Running evals', 'Ran evals', 'Run evals', 'eval run', 'eval', 'ran evals', n => `ran evals ${n} times`, input => str(input.suite)));

/** The calls of the turn under way: three done, the evals still running. */
const workCalls: ToolCallData[] = [
  {id: 'w1', seq: 1, tool: 'lookup_order', status: 'completed', input: {order}, ...t(0.2)},
  {id: 'w2', seq: 1, tool: 'search_policy', status: 'completed', input: {query: 'refund policy'}, ...t(0.4)},
  {id: 'w3', seq: 1, tool: 'draft_reply', status: 'completed', input: {order}, ...t(1.1)},
  {id: 'w4', seq: 1, tool: 'run_eval', status: 'running', input: {suite: 'refund-policy'}, startedAt: Date.now() - 4200},
];

/** The run on the introduction: two steps done, the reply still being drafted. */
const runCalls: ToolCallData[] = [workCalls[0], workCalls[1], {id: 'r3', seq: 1, tool: 'draft_reply', status: 'running', input: {order}, startedAt: Date.now() - 2600}];

/**
 * The live moment of a session: Ana's ask as a person row, then the agent's turn as plain flow, its finished calls
 * folded into one line and the running call under it with the arc, then the composer. The composer works: sending adds
 * Ana's message and the agent answers a moment later, and Stop ends the answer early.
 */
export function AgentRun() {
  const [asks, setAsks] = useState<{id: number; text: string; reply?: string}[]>([]);
  const [status, setStatus] = useState<SendStatus>('ready');
  const [run, setRun] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  // Stand-in for your agent: answers 900ms after a send.
  const send = (value: PromptValue) => {
    const id = run + 1;
    setRun(id);
    setStatus('streaming');
    setAsks(a => [...a, {id, text: value.serialized}]);
    timer.current = setTimeout(() => {
      setAsks(a => a.map(m => (m.id === id ? {...m, reply: 'Done. Maya has her refund and a reply.'} : m)));
      setStatus('ready');
    }, 900);
  };
  const stop = (generation: string | number | undefined) => {
    if (generation !== run) return;
    clearTimeout(timer.current);
    setStatus('ready');
  };
  return (
    <section aria-label="Agent run" className="flex w-full max-w-md flex-col gap-3 *:data-[slot=message]:px-0">
      <Message from="user">
        <MessageContent>
          <MessageHeader>Ana<MessageTime>14:02</MessageTime></MessageHeader>
          <MessageBubble><MessageBubbleContent>Refund order {order} and let the customer know.</MessageBubbleContent></MessageBubble>
        </MessageContent>
      </Message>
      <AgentTurn state="live" time="14:02"><ToolCallList calls={runCalls} live/></AgentTurn>
      {asks.map(m => <Fragment key={m.id}>
        <Message from="user">
          <MessageContent>
            <MessageHeader>Ana<MessageTime>14:03</MessageTime></MessageHeader>
            <MessageBubble><MessageBubbleContent>{m.text}</MessageBubbleContent></MessageBubble>
          </MessageContent>
        </Message>
        {m.reply && <AgentTurn time="14:03"><Response>{m.reply}</Response></AgentTurn>}
      </Fragment>)}
      <PromptInput
        label={`Message ${agent}`}
        layout="inline"
        placeholder="Ask support-agent to do something"
        status={status}
        generation={run}
        onStop={stop}
        onSubmit={send}
        onAttach={() => {}}
      />
    </section>
  );
}

const earlierCalls: ToolCallData[] = [
  {id: 'e1', seq: 1, tool: 'search_policy', status: 'completed', input: {query: 'refund limit'}, ...t(6.2)},
  {id: 'e2', seq: 1, tool: 'lookup_order', status: 'completed', input: {order: earlier}, ...t(14)},
];

/** One agent turn of this session: the shared turn, named for the agent. */
function AgentTurn({state = 'done', time, children}: {state?: MessageStatusProps['state']; time: string; children: React.ReactNode}) {
  return <Turn name={agent} state={state} time={time}>{children}</Turn>;
}

/** The footer of a finished turn: copy, and the model at the end. The fold line already says how long it worked and the header says when. */
function TurnFooter({model, text}: {model: string; text: string}) {
  return <MessageFooter>
    <CopyButton value={text} label="answer" size="icon-sm"/>
    <MessageModel model={model}/>
  </MessageFooter>;
}

const firstAnswer = 'Every refund over **$500** waits for a person to approve it. 37 have queued since 06:00, and the oldest has waited 52 minutes.';
const lastAnswer = 'Sent the replies and logged each one on its ticket.';

const history: ConversationRow[] = [
  {type: 'user', id: 'u1', name: 'Ana', meta: '14:01', text: 'Why are refund replies slow since this morning?'},
  {type: 'assistant', id: 'a1', content: <AgentTurn time="14:01">
    <ToolCallList calls={earlierCalls}/>
    <Response>{firstAnswer}</Response>
    <TurnFooter model="model-s" text={firstAnswer.replaceAll('**', '')}/>
  </AgentTurn>},
  {type: 'user', id: 'u2', name: 'Ana', meta: '14:02', text: 'Draft replies for the queued refunds and run the refund evals.'},
];

/** The queue and the composer. Sending snaps the thread to its end, so the person's own message lands in view. */
function Composer({busy, queue, setQueue, onSend, status, run, onStop}: {
  busy: boolean; queue: QueuedMessage[]; setQueue: React.Dispatch<React.SetStateAction<QueuedMessage[]>>;
  onSend: (text: string) => void; status: SendStatus; run: number; onStop: (generation: string | number | undefined) => void;
}) {
  const composer = useRef<PromptInputHandle>(null);
  const {snap} = useConversation();
  const [editing, setEditing] = useState<string | null>(null);
  // When the agent is free, the head of the queue goes, unless it failed or is being edited.
  useEffect(() => {
    const head = queue[0];
    if (busy || !head || head.status === 'failed' || editing === head.id) return;
    setQueue(q => q.slice(1));
    onSend(head.text);
  }, [busy, queue, editing, setQueue, onSend]);
  const submit = (value: PromptValue) => {
    if (busy || queue.length) setQueue(q => [...q, {id: `q${Date.now()}`, text: value.serialized}]);
    else onSend(value.serialized);
    snap();
  };
  return <div className="flex flex-col">
    <PromptQueue
      items={queue}
      editingId={editing}
      onEditingChange={setEditing}
      onEdit={(id, text) => setQueue(q => q.map(m => (m.id === id ? {...m, text, status: 'queued', error: undefined} : m)))}
      onRemove={id => setQueue(q => q.filter(m => m.id !== id))}
      onRetry={id => setQueue(q => q.map(m => (m.id === id ? {...m, status: 'queued', error: undefined} : m)))}
      onMove={(id, index) => setQueue(q => { const item = q.find(m => m.id === id); const next = q.filter(m => m.id !== id); if (item) next.splice(index, 0, item); return next; })}
      returnFocus={() => composer.current?.focus()}
    />
    <PromptInput
      ref={composer}
      label={`Message ${agent}`}
      draftKey={`session:${agent}`}
      status={status}
      generation={run}
      onStop={onStop}
      onSubmit={submit}
      placeholder={busy ? 'Queue a follow-up' : 'Ask support-agent to do something'}
    />
  </div>;
}

/** One agent session: the thread, the live turn's rows, the queue and the composer. */
export function AgentSession() {
  const [tools, dispatch] = useToolCalls(workCalls);
  const [rows, setRows] = useState(history);
  const [status, setStatus] = useState<SendStatus>('streaming');
  const [run, setRun] = useState(1);
  const [queue, setQueue] = useState<QueuedMessage[]>([{id: 'q1', text: 'Then send the replies to the customers'}]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const busy = status === 'submitted' || status === 'streaming' || status === 'stopping';

  // Stand-in for your agent: answers 900ms after a send. Replace it with the stream, dispatching each tool event
  // through useToolCalls with its seq.
  const latest = useRef(1);
  const send = useCallback((text: string) => {
    const id = ++latest.current;
    setRun(id);
    setStatus('submitted');
    setRows(rs => [...rs, {type: 'user', id: `u${id}`, name: 'Ana', text}, {type: 'thinking', id: `t${id}`, author: agent}]);
    timers.current.push(setTimeout(() => {
      if (latest.current !== id) return;
      setRows(rs => [...rs.filter(row => row.type !== 'thinking'), {type: 'assistant', id: `a${id}`, content: <AgentTurn time="14:04"><Response>{lastAnswer}</Response><TurnFooter model="model-s" text={lastAnswer}/></AgentTurn>}]);
      setStatus('ready');
    }, 900));
  }, []);
  // Settle the calls before anything else, then mark the cut in the thread. Only the run the stop names.
  const stop = (generation: string | number | undefined) => {
    if (generation !== run) return;
    if (run === 1) dispatch({type: 'stop', gen: tools.gen});
    timers.current.forEach(clearTimeout);
    setRows(rs => [...rs.filter(row => row.type !== 'thinking'), {type: 'divider', id: `s${run}`, reason: 'interrupted'}]);
    setStatus('ready');
  };

  // The first turn arrives mid-way: its calls stream in as rows, the finished ones folded into one line. To show only
  // the calls still running or in trouble, pass hideCompleted to the ToolCallList; never filter the calls yourself.
  const firstTurnLive = run === 1 && busy;
  const thread: ConversationRow[] = [
    ...rows.slice(0, history.length),
    {type: 'assistant', id: 'a2', content: <AgentTurn state={firstTurnLive ? 'live' : tools.stopped ? 'stopped' : 'done'} time="14:02"><ToolCallList calls={tools.calls} live={firstTurnLive}/></AgentTurn>},
    ...rows.slice(history.length),
  ];
  const conversation: ConversationStatus = busy ? 'streaming' : rows.at(-1)?.type === 'divider' ? 'stopped' : 'idle';

  return <section aria-label="Agent session" className="flex h-140 w-full max-w-2xl flex-col gap-4">
    <ConversationProvider status={conversation}>
      <Conversation className="min-h-0 flex-1">
        <ConversationViewport aria-label={`Session with ${agent}`}>
          <ConversationContent className="pb-2">
            <ConversationTimeline rows={thread}/>
            <ConversationTail>
              {conversation === 'idle' && <CopyButton value={rows.some(row => row.id.startsWith('a') && row.id !== 'a1') ? lastAnswer : firstAnswer.replaceAll('**', '')} label="answer" size="icon-sm"/>}
            </ConversationTail>
          </ConversationContent>
        </ConversationViewport>
        <ConversationJump/>
      </Conversation>
      <Composer busy={busy} queue={queue} setQueue={setQueue} onSend={send} status={status} run={run} onStop={stop}/>
    </ConversationProvider>
  </section>;
}
