"use client";

// Beautiful UI's original chat shell, wired to the HappyHands review endpoint.
// Upstream: 44a274e598395ab61e7c96c26fda2758780253b7, Shane Levine (MIT).
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import LoadingState from "./upstream/primitives/LoadingState";
import PromptBar from "./upstream/primitives/PromptBar";
import SidebarNav from "./upstream/primitives/SidebarNav";
import { StreamText } from "./upstream/atoms/StreamText";
import { UseThisModal } from "./upstream/site/UseThisHarness";
import { useSitePreferences } from "../../packages/ui/useSitePreferences";
import { ReviewEvidence, submitReview, type ReviewResult, type ConversationTurn } from "./review-runtime";
import "./review.css";

type Translate = (zh: string, en: string) => string;
type AssistantMessage = {
  id: number;
  role: "assistant";
} & ({ pending: true } | { pending?: false; text: string } | { pending?: false; result: ReviewResult; file: File });
type Msg = { id: number; role: "user"; text: string; file?: File } | AssistantMessage;
type Chat = { id: number; title: string | null; messages: Msg[]; screenshot?: File };

function SuggestionIcon({ kind }: { kind: string }) {
  const paths: Record<string, ReactNode> = {
    todos: <g><path d="M11 6h9M11 12h9M11 18h9" /><path d="M4 6l1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17" /></g>,
    workload: <g><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 10l2.5 2.5L16 8" /></g>,
    "find-ticket": <g><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></g>,
    suppliers: <g><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>,
    restock: <path d="M8 6l-5 6 5 6M16 6l5 6-5 6" />,
    rewrite: <g><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></g>,
    tune: <g><path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h14M20 18h0" /><circle cx="16" cy="6" r="2" /><circle cx="8" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></g>,
    appeal: <g><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></g>,
  };
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[kind] ?? paths.workload}
    </svg>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end pl-10 sm:pl-24" style={{ animation: "fade-up 300ms cubic-bezier(0.23,1,0.32,1) both" }}>
      <div className="rounded-xl bg-field px-3.5 py-2 text-[13px] leading-relaxed text-ink shadow-hairline">{text}</div>
    </div>
  );
}

/* ── empty state ──────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────
 * HOME ENTRANCE STORYBOARD
 *
 * Read top-to-bottom. Each value is ms after mount.
 *
 *  170ms   “Hello Shane” rises 23px, blur 17px → 0
 *  330ms   question follows with the same reveal
 *  400ms   prompt bar resolves into place
 *  550ms   recommendations finish the sequence
 * ───────────────────────────────────────────────────────── */

const HOME_REVEAL_TIMING = {
  hello:           170, // greeting enters first
  question:        330, // question follows closely
  prompt:          400, // composer lands after the copy
  recommendations: 550, // secondary actions finish the scene
};

const HOME_REVEAL = {
  offsetY:  23, // px traveled upward
  blur:     17, // px of initial blur
  duration: 800, // ms for each element to settle
  easing:   "cubic-bezier(0.16, 1, 0.3, 1)",
};

/* Static entrance params. These were previously tunable via DialKit; DialKit
 * (a dev-only tuning overlay) has been removed, so we use the tuned defaults. */
const revealParams = {
  reveal: {
    blur: HOME_REVEAL.blur,
    offsetY: HOME_REVEAL.offsetY,
    duration: HOME_REVEAL.duration,
  },
  sequence: {
    helloAt: HOME_REVEAL_TIMING.hello,
    questionAt: HOME_REVEAL_TIMING.question,
    promptAt: HOME_REVEAL_TIMING.prompt,
    recommendationsAt: HOME_REVEAL_TIMING.recommendations,
  },
};

function homeRevealStyle(
  visible: boolean,
  reveal: { blur: number; offsetY: number; duration: number },
): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0, 0, 0)" : `translate3d(0, ${reveal.offsetY}px, 0)`,
    filter: visible ? "blur(0px)" : `blur(${reveal.blur}px)`,
    transition: ["opacity", "transform", "filter"]
      .map((property) => `${property} ${reveal.duration}ms ${HOME_REVEAL.easing}`)
      .join(", "),
  };
}

function EmptyState({ onSend, shuffle, offset, t, onAccess, enabled }: {
  onSend: (text: string, file?: File) => void;
  shuffle: () => void;
  offset: number;
  t: Translate;
  onAccess: () => void;
  enabled: boolean | undefined;
}) {
  const SUGGESTION_POOL = [
    { id: "workload", label: t("检查首屏主操作是否清楚", "Check whether the primary action is clear") },
    { id: "find-ticket", label: t("找出妨碍用户完成任务的问题", "Find what blocks users from completing the task") },
    { id: "tune", label: t("检查页面的层级与对齐", "Review hierarchy and alignment") },
    { id: "rewrite", label: t("检查按钮和错误提示的文案", "Review button labels and error messages") },
    { id: "todos", label: t("按影响程度列出修改建议", "Prioritize the changes by impact") },
  ];
  const shown = [0, 1, 2].map((i) => SUGGESTION_POOL[(offset + i) % SUGGESTION_POOL.length]);
  const [stage, setStage] = useState(0);
  useEffect(() => {
    setStage(0);
    const timers = [
      setTimeout(() => setStage(1), revealParams.sequence.helloAt),
      setTimeout(() => setStage(2), revealParams.sequence.questionAt),
      setTimeout(() => setStage(3), revealParams.sequence.promptAt),
      setTimeout(() => setStage(4), revealParams.sequence.recommendationsAt),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="mx-auto flex min-h-full max-w-[720px] flex-col justify-center px-4 py-10 sm:px-8">
      <h1 className="text-[26px] font-normal tracking-[-0.02em] text-ink">
        <span className="home-reveal block text-ink-3" style={homeRevealStyle(stage >= 1, revealParams.reveal)}>{t("你好，这里是 HappyHands", "Hello from HappyHands")}</span>
        <span className="home-reveal block" style={homeRevealStyle(stage >= 2, revealParams.reveal)}>{t("你想审查什么？", "What can I help you with?")}</span>
      </h1>

      <div className="home-reveal relative mt-7" style={homeRevealStyle(stage >= 3, revealParams.reveal)}>
        <div className="relative">
          <PromptBar
            demo={false}
            tall
            review={{ language: t("zh", "en") }}
            placeholder={t("输入审查指令，或添加页面截图…", "Send a review instruction or attach a screenshot…")}
            onSend={onSend}
          />
        </div>
      </div>

      <div className="home-reveal mt-6 flex flex-col" style={homeRevealStyle(stage >= 4, revealParams.reveal)}>
        {shown.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              onSend(item.label);
            }}
            className="-mx-2 flex items-center gap-3 rounded-control px-2 py-2.5 text-left text-[14px] text-ink transition-colors duration-150 hover:bg-hover"
          >
            <span className="text-ink-3">
              {item.id === "offboarding" ? (
                <span className="block size-3.5 rounded-full bg-gradient-to-br from-orange to-red" />
              ) : (
                <SuggestionIcon kind={item.id} />
              )}
            </span>
            <span className="min-w-0 truncate">{item.label}</span>
          </button>
        ))}
        <div className="mt-1 flex items-center gap-5 pl-0.5 text-[13px] text-ink-3">
          <button type="button" disabled={!enabled} onClick={onAccess} className="flex items-center gap-2 py-1 transition-colors duration-150 enabled:hover:text-ink">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden><circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /></svg>
            {enabled === true ? t("预览访问码", "Preview access code") : enabled === false ? t("审查模型未连接", "Review model offline") : t("正在连接", "Connecting")}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
          <button type="button" onClick={shuffle} className="flex items-center gap-2 py-1 transition-colors duration-150 hover:text-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" /></svg>
            {t("换一组建议", "Shuffle suggestions")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IceCreamHarness() {
  const { lang, dark } = useSitePreferences({ embeddedLanguage: true });
  const t: Translate = (zh, en) => lang === "zh" ? zh : en;
  const [chats, setChats] = useState<Chat[]>([{ id: 1, title: null, messages: [] }]);
  const [activeId, setActiveId] = useState(1);
  const [offset, setOffset] = useState(0);
  const [useOpen, setUseOpen] = useState(false);
  const [enabled, setEnabled] = useState<boolean>();
  const [access, setAccess] = useState("");
  const [closedPaneId, setClosedPaneId] = useState(0);
  const chatIdRef = useRef(1);
  const msgIdRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  const accessDialog = useRef<HTMLDialogElement>(null);
  const requests = useRef(new Map<number, AbortController>());
  const [composerH, setComposerH] = useState(150);

  const chat = chats.find((c) => c.id === activeId) ?? chats[0];
  const active = chat.messages.length > 0;
  const lastPaneMsg = chat.messages.slice().reverse().find((message) => "result" in message);
  const paneMsg = lastPaneMsg?.id === closedPaneId ? undefined : lastPaneMsg;

  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  useEffect(() => {
    const availability = new AbortController();
    const running = requests.current;
    fetch("/api/online-review", { signal: availability.signal })
      .then(async (response) => setEnabled(response.ok && (await response.json()).enabled === true))
      .catch(() => { if (!availability.signal.aborted) setEnabled(false); });
    return () => {
      availability.abort();
      running.forEach((request) => request.abort());
      running.clear();
    };
  }, []);

  async function send(text: string, attached?: File) {
    if (requests.current.has(chat.id) || (!text && !attached)) return;
    const file = attached ?? chat.screenshot;
    const recentTask = chat.messages.slice().reverse().find((message) => message.role === "user" && message.text);
    const task = text || (recentTask?.role === "user" && recentTask.text) ||
      t("审查这个页面最影响用户完成任务的体验问题。", "Find the most important usability issues on this page.");
    const id = ++msgIdRef.current;
    const user: Msg = { id: ++msgIdRef.current, role: "user", text, file: attached };
    const update = (last: AssistantMessage, append = false) => setChats((current) => current.map((thread) => thread.id !== chat.id ? thread : {
      ...thread,
      title: thread.title ?? (task.length > 30 ? task.slice(0, 30) + "…" : task),
      screenshot: file,
      messages: append ? [...thread.messages, user, last] : thread.messages.map((item) => item.id === id ? last : item),
    }));
    const reply = (value: string) => update({ id, role: "assistant", text: value }, true);
    if (!file) {
      reply(t("请用输入框的 + 添加页面截图，我会根据你的指令审查。", "Use + in the prompt bar to attach a screenshot for this review."));
      return;
    }
    if (!enabled) {
      reply(t("审查模型尚未连接，指令和截图已留在这条对话里。", "The review model is offline. Your instruction and screenshot are still in this conversation."));
      return;
    }
    if (!access.trim()) {
      accessDialog.current?.showModal();
      reply(t("请输入预览访问码，然后重新发送指令。", "Enter the preview access code, then send the instruction again."));
      return;
    }
    const controller = new AbortController();
    requests.current.set(chat.id, controller);
    update({ id, role: "assistant", pending: true }, true);
    const history: ConversationTurn[] = [];
    for (const message of chat.messages) {
      if (message.role === "user" && message.file) history.length = 0;
      if (message.role === "user" && message.text) history.push({ role: "user", text: message.text });
      if ("result" in message) {
        const { summary, findings } = message.result;
        const reply = [summary, ...findings.map((item) => item.title + " — " + item.recommendation)].join("\n").slice(0, 2000);
        if (reply.trim()) history.push({ role: "assistant", text: reply });
      }
    }
    try {
      const context = attached && chat.screenshot ? [] : history.slice(-4);
      const result = await submitReview({ file, task, access: access.trim(), context, lang, signal: controller.signal });
      requests.current.delete(chat.id);
      update({ id, role: "assistant", result, file });
    } catch (error) {
      requests.current.delete(chat.id);
      if (controller.signal.aborted) return;
      const status = typeof error === "number" ? error : 0;
      if (status === 401) accessDialog.current?.showModal();
      update({ id, role: "assistant", text: status === 401 ? t("访问码有误，请修改后重试。", "Check the access code and try again.")
        : status === 429 ? t("审查请求过多，请稍后重试。", "Too many requests. Try again later.")
        : t("审查暂时失败，请重新发送指令。", "Review is temporarily unavailable. Send the instruction again.") });
    }
  }

  const newChat = () => {
    const id = (chatIdRef.current += 1);
    setChats((current) => [...current, { id, title: null, messages: [] }]);
    setActiveId(id);
  };

  const closeChat = (id: number) => {
    requests.current.get(id)?.abort();
    requests.current.delete(id);
    const remaining = chats.filter((c) => c.id !== id);
    if (remaining.length === 0) {
      const nid = (chatIdRef.current += 1);
      setChats([{ id: nid, title: null, messages: [] }]);
      setActiveId(nid);
      return;
    }
    setChats(remaining);
    if (id === activeId) setActiveId(remaining[remaining.length - 1].id);
  };

  useEffect(() => {
    if (!active) return;
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [chat.messages, active]);

  /* the composer floats over the thread (ChatGPT-style), so the thread pads its
   * bottom by the composer's height — that lets the last message rest flush with
   * the bar and older content scroll behind it. Measure it as it changes. */
  useEffect(() => {
    const el = composerRef.current;
    if (!el) return;
    const measure = () => setComposerH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active, activeId]);

  /* artifacts (charts, tables, approval cards) reveal after the text streams
   * in, growing the thread well after `messages` last changed — often in one
   * big jump. Track whether the reader is pinned to the bottom from their
   * scroll position, then follow any later growth so a tall reply's footer
   * isn't left clipped behind the composer. Scrolling up to re-read releases
   * the pin. */
  useEffect(() => {
    if (!active) return;
    const el = scrollRef.current;
    const content = el?.firstElementChild;
    if (!el || !content) return;
    let stick = true;
    let raf = 0;
    const onScroll = () => {
      stick = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    };
    const pin = () => {
      if (!stick) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    // ResizeObserver catches gradual growth (streaming); MutationObserver catches
    // a whole artifact being inserted and its height-animation style ticks.
    const resize = new ResizeObserver(pin);
    resize.observe(content);
    const mutate = new MutationObserver(pin);
    mutate.observe(content, { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });
    return () => {
      el.removeEventListener("scroll", onScroll);
      resize.disconnect();
      mutate.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [active, activeId]);

  /* the tab bar rides the top of the main pane in both layouts */
  const tabBar = (
    <div className="flex h-11 shrink-0 items-center gap-1 overflow-x-auto border-b border-line px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {chats.map((c) => (
        <div
          key={c.id}
          /* fixed width so every close button sits in the same spot — you can
           * close a run of tabs without chasing the next × across the bar */
          className={`group/tab flex h-7 w-36 shrink-0 items-center gap-0.5 rounded-[7px] pl-2.5 pr-0.5 text-[12.5px] font-medium transition-colors duration-100 ${
            c.id === activeId ? "bg-hover-2 text-ink" : "text-ink-2 hover:bg-hover hover:text-ink"
          }`}
        >
          <button type="button" aria-pressed={c.id === activeId} onClick={() => setActiveId(c.id)} title={c.title ?? t("新对话", "New chat")} className="min-w-0 flex-1 text-left">
            <span className="block truncate">{c.title ?? t("新对话", "New chat")}</span>
          </button>
          <button
            type="button"
            aria-label={t("关闭标签", "Close tab")}
            onClick={() => closeChat(c.id)}
            className="-my-1 flex size-6 shrink-0 items-center justify-center rounded-[5px] text-ink-3 transition-[background-color,color] duration-100 hover:bg-hover-2 hover:text-ink"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
      <button
        type="button"
        aria-label={t("新对话", "New chat")}
        onClick={newChat}
        className="ml-0.5 flex size-7 shrink-0 items-center justify-center rounded-[7px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );

  /* the message thread + composer — reused as the main column (wide) or the
   * docked assistant panel in spreadsheet mode (narrow) */
  const renderThread = (narrow: boolean) => (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div ref={scrollRef} role="log" aria-label={t("审查对话", "Review conversation")} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div
          className={`flex flex-col gap-8 pt-8 ${narrow ? "px-4" : "px-4 sm:px-8 lg:px-12"}`}
          /* pad the bottom by the floating composer's height so the last message
             can rest flush with the bar and older content scrolls behind it */
          style={{ paddingBottom: composerH + 16 }}
        >
          {chat.messages.map((message) => (
            <div key={message.id} className={narrow ? "w-full" : "mx-auto w-full max-w-[720px]"}>
              {message.role === "user" ? (
                <UserBubble text={[message.text, message.file?.name].filter(Boolean).join("\n")} />
              ) : (
                <article className="min-w-0">
                  {message.pending ? (
                    <div role="status"><LoadingState label={t("正在审查截图", "Reviewing screenshot")} variant="Dots" /></div>
                  ) : "result" in message ? (
                    <>
                      <p className="whitespace-pre-wrap [overflow-wrap:anywhere] text-[14px] leading-relaxed text-ink">
                        <StreamText text={message.result.summary} caret={false} />
                      </p>
                      <ReviewEvidence result={message.result} file={message.file} mode="findings"
                        label={t("查看截图标注", "View annotated screenshot")} />
                    </>
                  ) : <p className="text-[14px] leading-relaxed text-ink">{message.text}</p>}
                </article>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* soft fade so content dissolves into the bar instead of hard-clipping */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: composerH + 32, background: "linear-gradient(to top, var(--review-backdrop, var(--page)) 64%, transparent)" }}
      />

      {/* the composer floats over the thread; content scrolls behind it */}
      <div
        ref={composerRef}
        className={`absolute inset-x-0 bottom-0 ${narrow ? "p-3" : "px-4 pb-6 sm:px-8 lg:px-12"}`}
      >
        <div className={narrow ? "" : "mx-auto max-w-[720px]"}>
          <PromptBar
            demo={false}
            tall
            key={chat.id}
            review={{ language: lang, busy: requests.current.has(chat.id) }}
            placeholder={t("继续追问…", "Reply")}
            onSend={send}
          />
        </div>
      </div>
    </div>
  );

  return (
    <main data-beautiful-ui-harness aria-label={t("审查 Agent", "Review agent")} className="flex h-[100dvh] gap-0 bg-canvas p-2.5 text-ink lg:pl-0">
      <SidebarNav
        fill
        className="hidden lg:flex"
        recents={chats.flatMap((c) => c.title ? [{ id: String(c.id), label: c.title }] : [])}
        activeTitle={chat.title}
        onPick={(id) => setActiveId(Number(id))}
        onNewChat={newChat}
        onNavigate={(key) => { if (key === "home" && active) newChat(); }}
        workspaceName="HappyHands"
        footerLabel="Fork this"
        onFooterClick={() => setUseOpen(true)}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        {/* panels row — main pane + docked side pane */}
        <div className="flex min-h-0 flex-1 gap-2.5">
          <section className="review-conversation-pane flex min-w-0 flex-1 flex-col overflow-hidden rounded-[14px] border border-line bg-page">
            {tabBar}
            {active ? (
              renderThread(false)
            ) : (
              <div className="min-h-0 flex-1 overflow-y-auto">
                <EmptyState key={chat.id} onSend={send} shuffle={() => setOffset((current) => current + 3)}
                  offset={offset} t={t} enabled={enabled} onAccess={() => accessDialog.current?.showModal()} />
              </div>
            )}
          </section>

          {/* artifact pane — its own rounded container */}
          {active && paneMsg && "result" in paneMsg && (
              <aside
                key={paneMsg.id}
                className="hidden w-[360px] shrink-0 flex-col overflow-hidden rounded-[14px] border border-line bg-page lg:flex"
                style={{ animation: "fade-in 300ms ease both" }}
              >
                <div className="flex h-11 shrink-0 items-center justify-between border-b border-line px-3 sm:pl-4">
                  <span className="text-[13px] font-semibold text-ink">{t("截图证据", "Screenshot evidence")}</span>
                  <div className="flex items-center gap-0.5 text-ink-3">
                    <button
                      type="button"
                      aria-label="Close pane"
                      onClick={() => setClosedPaneId(paneMsg.id)}
                      className="flex size-6 items-center justify-center rounded-[6px] transition-colors duration-100 hover:bg-hover hover:text-ink"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto p-4">
                  <ReviewEvidence result={paneMsg.result} file={paneMsg.file} mode="image" label={t("截图标注", "Annotated screenshot")} />
                </div>
              </aside>
          )}
        </div>
      </div>
      <dialog ref={accessDialog} className="review-access rounded-window bg-surface p-5 text-ink shadow-overlay"
        aria-label={t("预览访问码", "Preview access code")}>
        <form method="dialog" className="grid gap-3">
          <label className="grid gap-2 text-sm">
            {t("预览访问码", "Preview access code")}
            <input type="password" autoComplete="off" className="rounded-control border border-line bg-field p-2"
              value={access} onChange={(event) => setAccess(event.currentTarget.value)} />
          </label>
          <button className="justify-self-end rounded-control bg-ink px-3 py-2 text-sm text-canvas" type="submit">
            {t("完成", "Done")}
          </button>
        </form>
      </dialog>
      <UseThisModal open={useOpen} onClose={() => setUseOpen(false)} />
    </main>
  );
}
