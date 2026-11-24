/// <reference types="vite/client" />
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import type { ComponentType, ReactNode } from "react";
import "../../packages/design-tokens/happyhands.css";
import "./preview.css";
import { PreviewScenarioPicker } from "../../packages/ui/PreviewScenarioPicker";
import {FoundationSpecimen} from "./FoundationSpecimen";
const params = new URLSearchParams(location.search);
const gallery = params.get("gallery") || "";
const foundationOnly = Boolean(params.get("foundation")) || gallery === "foundations";
const system = ["sodium", "glaze", "quartz", "lime", "meridian-mono", "meridian-glass", "meridian-slate", "meridian-clay"].includes(
  params.get("system") || "",
)
  ? params.get("system")!
  : "quartz";
const family = ({'meridian-mono':'sodium','meridian-glass':'glaze','meridian-slate':'quartz','meridian-clay':'lime'} as Record<string,string>)[system] || system;
const theme = params.get("theme") === "dark" ? "dark" : "light";
const lang = params.get("lang") === "zh" ? "zh" : "en";
document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
document.body.className = system;
document.body.dataset.theme = theme;
document.documentElement.dataset.theme = theme;
const modules = import.meta.glob("./generated/*/{ui,ai,blocks,lib}/*.{ts,tsx}");
const styles = import.meta.glob("./generated/*/compiled.css");
const variantFixtures=new Set(["button","input","textarea","card","frame","tabs","checkbox","switch","slider","progress","select","badge","status","avatar","skeleton"]);
const documentedExamples = import.meta.glob("./generated/*/examples/*.tsx");
const sourceCatalog = await import("./generated/catalog.json");
const { blocks, components: bookComponents } = (
  sourceCatalog.default as Record<string, {
    blocks: { file: string; name: string }[];
    components: { path: string; title: string }[];
  }>
)[system];
const loaded: Record<string, any> = {};
async function load(section: string, file: string) {
  const key = `./generated/${system}/${section}/${file}`;
  const importer = modules[key + ".tsx"] || modules[key + ".ts"];
  if (!importer) return null;
  return (loaded[section + "/" + file] ||= await importer());
}
const names = [
  "button",
  "input",
  "textarea",
  "checkbox",
  "switch",
  "slider",
  "progress",
  "tabs",
  "badge",
  "status",
  "avatar",
  "card",
  "frame",
  "dialog",
  "popover",
  "select",
  "radio-group",
  "radio",
  "skeleton",
];
await styles[`./generated/${system}/compiled.css`]();
if (!foundationOnly && gallery !== "examples") {
  await Promise.all(names.map((name) => load("ui", name)));
}
const portal = foundationOnly ? null : await load("lib", "portal");
const Provider =
  portal?.[system.split("-").map(part=>part[0].toUpperCase()+part.slice(1)).join("") + "PortalProvider"] ||
  React.Fragment;
const wallFoundations = [
  "color",
  "typography",
  "space",
  "radius",
  "motion",
  "borders-and-lines",
  "elevation",
  "iconography",
];
const get = (file: string, name: string) =>
  loaded["ui/" + file]?.[name] as ComponentType<any> | undefined;
function usePart(file: string, name: string, fallback?: ComponentType<any>) {
  return get(file, name) || fallback || (() => null);
}
function FoundationWall() {
  return (
    <section className="foundation-wall" aria-label="Foundation specimens">
      {wallFoundations.map((name) => (
        <article className="foundation-wall-item" key={name}>
          <FoundationSpecimen
            system={system}
            name={name}
            compact
            limit={name === "color" ? 8 : name === "space" ? 6 : 5}
          />
        </article>
      ))}
    </section>
  );
}
function WallCopyButton({ path, title }: { path: string; title: string }) {
  const [state, setState] = useState<"idle" | "copying" | "done" | "error">("idle");
  useEffect(() => {
    if (state !== "done" && state !== "error") return;
    const timer = window.setTimeout(() => setState("idle"), 1800);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function copy() {
    setState("copying");
    try {
      const clipboard = navigator.clipboard;
      if (!clipboard) throw new Error("Clipboard unavailable");
      const text = fetch("/" + path).then(response => {
        if (!response.ok) throw new Error("Could not load component document");
        return response.text();
      });
      if (typeof ClipboardItem === "function" && clipboard.write) {
        await clipboard.write([
          new ClipboardItem({ "text/plain": text.then(value => new Blob([value], { type: "text/plain" })) }),
        ]);
      } else {
        await clipboard.writeText(await text);
      }
      setState("done");
    } catch {
      setState("error");
    }
  }

  const label = `${lang === "zh" ? "复制" : "Copy"} ${title} design.md`;
  return <button type="button" className="component-wall-copy"
    title={label} aria-label={label} disabled={state === "copying"} onClick={copy}>
    {state === "done" ? (lang === "zh" ? "已复制" : "Copied")
      : state === "error" ? (lang === "zh" ? "复制失败" : "Copy failed")
      : (lang === "zh" ? "复制" : "Copy")}
  </button>;
}
function ComponentWall() {
  if (!bookComponents.length) {
    return <p className="demo-copy" role="status">
      {lang === "zh" ? "暂时没有可预览的组件。" : "No component previews are available."}
    </p>;
  }
  return (
    <section className="component-wall" aria-label={lang === "zh" ? "组件示例" : "Component specimens"}>
      {bookComponents.map((doc) => {
        const slug = doc.path.split("/").at(-1)!.replace(/\.md$/, "");
        const hasExample = Boolean(
          documentedExamples[`./generated/${system}/examples/${slug}.tsx`],
        );
        return (
          <article className="component-wall-item" key={slug}>
            <header className="component-wall-head">
              <h2>{doc.title}</h2>
              <WallCopyButton path={doc.path} title={doc.title} />
            </header>
            {hasExample ? (
              <DocumentedExample name={slug} />
            ) : (variantFixtures.has(slug) || slug === "dialog") ? (
              <Controls only={slug} />
            ) : (
              <p className="demo-copy">{lang === "zh" ? "暂无交互示例。" : "No interactive example."}</p>
            )}
          </article>
        );
      })}
    </section>
  );
}

function Controls({ only = "" }: { only?: string }) {
  const Button = usePart("button", "Button"),
    Input = usePart("input", "Input"),
    Textarea = usePart("textarea", "Textarea");
  const Checkbox = usePart("checkbox", "Checkbox"),
    Switch = usePart("switch", "Switch"),
    Slider = usePart("slider", "Slider"),
    Progress = usePart("progress", "Progress");
  const Tabs = usePart("tabs", "Tabs"),
    TabsList = usePart("tabs", "TabsList"),
    TabsTrigger = usePart("tabs", "TabsTrigger"),
    TabsContent = usePart("tabs", "TabsContent");
  const Badge = usePart("badge", "Badge"),
    Status = usePart("status", "Status");
  const Avatar = usePart("avatar", "Avatar");
  const Skeleton = usePart("skeleton", "Skeleton");
  const Dialog = usePart("dialog", "Dialog"),
    DialogTrigger = usePart("dialog", "DialogTrigger"),
    DialogContent = usePart("dialog", "DialogContent"),
    DialogTitle = usePart("dialog", "DialogTitle"),
    DialogDescription = usePart("dialog", "DialogDescription"),
    DialogClose = usePart("dialog", "DialogClose");
  const Popover = usePart("popover", "Popover"),
    PopoverTrigger = usePart("popover", "PopoverTrigger"),
    PopoverContent = usePart("popover", "PopoverContent");
  const Select = usePart("select", "Select"),
    SelectTrigger = usePart("select", "SelectTrigger"),
    SelectValue = usePart("select", "SelectValue"),
    SelectContent = usePart("select", "SelectContent"),
    SelectItem = usePart("select", "SelectItem");
  const Card = usePart(
    family === "sodium" ? "frame" : "card",
    family === "sodium" ? "Frame" : "Card",
  );
  const CardHeader = usePart(
    family === "sodium" ? "frame" : "card",
    family === "sodium" ? "FrameHeader" : "CardHeader",
  );
  const CardTitle = usePart(
    family === "sodium" ? "frame" : "card",
    family === "sodium" ? "FrameTitle" : "CardTitle",
  );
  const CardContent = usePart(
    family === "sodium" ? "frame" : "card",
    family === "sodium" ? "FrameBody" : "CardContent",
  );
  const [saved, setSaved] = useState(false);
  const show = (ids: string[], title: string, children: ReactNode) =>
    !only || ids.includes(only) ? (
      <section className="demo-section">
        <h2 className="demo-label">{title}</h2>
        {children}
      </section>
    ) : null;
  return (
    <>
      {show(
        ["button", "button-group", "copy-button"],
        "Buttons",
        <div className="demo-row">
          <Button onClick={() => setSaved(!saved)}>
            {saved ? "Saved" : "Save changes"}
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </div>,
      )}
      {show(
        ["input", "field"],
        "Input",
        <label className="demo-field">
          <span>Project name</span>
          <Input aria-label="Project name" placeholder="Your next project" />
        </label>,
      )}
      {show(
        ["textarea"],
        "Textarea",
        <label className="demo-field">
          <span>Notes</span>
          <Textarea aria-label="Notes" placeholder="Add a note…" />
        </label>,
      )}
      {show(
        ["checkbox"],
        "Checkbox",
        <label className="demo-row">
          <Checkbox defaultChecked />
          Notify me
        </label>,
      )}
      {show(
        ["switch"],
        "Switch",
        <label className="demo-row">
          <Switch aria-label="Automatic updates" defaultChecked />
          Automatic updates
        </label>,
      )}
      {show(
        ["slider"],
        "Slider",
        <Slider
          aria-label="Volume"
          thumbLabels={["Volume"]}
          defaultValue={[64]}
          showValue
        />,
      )}
      {show(
        ["badge"],
        "Badge",
        <div className="demo-row">
          <Badge>Draft</Badge>
          <Badge variant="neutral">Published</Badge>
        </div>,
      )}
      {show(
        ["status"],
        "Status",
        <Status
          status={family === "lime" ? "done" : "ok"}
          label={family === "lime" ? "Ready" : undefined}
        >
          Ready
        </Status>,
      )}
      {show(
        ["avatar"],
        "Avatar",
        <Avatar name="Arlan Marat" />,
      )}
      {show(
        ["progress", "meter"],
        "Progress",
        <Progress value={64} label="Completed" aria-label="Completed" />,
      )}
      {show(
        ["skeleton"],
        "Skeleton",
        <Skeleton style={{ height: 12, width: "55%" }} />,
      )}
      {show(
        ["tabs", "segmented", "segmented-control"],
        "Tabs",
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="demo-copy">
              Everything you need for your next project.
            </p>
          </TabsContent>
          <TabsContent value="activity">
            <p className="demo-copy">Your changes have been saved.</p>
          </TabsContent>
        </Tabs>,
      )}
      {show(
        ["card", "frame", "panel"],
        "Card",
        <Card>
          <CardHeader>
            <CardTitle>Project overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="demo-copy">A focused workspace for your team.</p>
            <Button variant="secondary">View project</Button>
          </CardContent>
        </Card>,
      )}
      {show(
        ["dialog", "alert-dialog", "sheet"],
        "Dialog",
        <Dialog>
          <DialogTrigger render={<Button variant="secondary" />}>
            Open dialog
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Project settings</DialogTitle>
            <DialogDescription>
              Preview the original dialog and keyboard behavior.
            </DialogDescription>
            <DialogClose render={<Button variant="secondary" />}>
              Close
            </DialogClose>
          </DialogContent>
        </Dialog>,
      )}
      {show(
        ["popover", "tooltip", "dropdown-menu"],
        "Popover",
        <Popover>
          <PopoverTrigger render={<Button variant="secondary" />}>
            Open popover
          </PopoverTrigger>
          <PopoverContent>
            <p className="demo-copy">A useful detail, beside its action.</p>
          </PopoverContent>
        </Popover>,
      )}
      {show(
        ["select", "combobox"],
        "Select",
        <Select
          defaultValue="design"
          items={[
            { label: "Design", value: "design" },
            { label: "Engineering", value: "engineering" },
          ]}
        >
          <SelectTrigger aria-label="Team">
            {get("select", "SelectValue") ? <SelectValue /> : null}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
          </SelectContent>
        </Select>,
      )}
    </>
  );
}
function Foundations() {
  const [colors, setColors] = useState<{ name: string; value: string }[]>([]);
  useEffect(() => {
    const names = (
      {
        lime: [
          "page",
          "surface",
          "surface-2",
          "fg",
          "fg-2",
          "accent",
          "line",
          "success",
        ],
        sodium: [
          "page",
          "panel",
          "text-1",
          "text-2",
          "accent",
          "accent-text",
          "line",
          "ok-text",
        ],
        glaze: [
          "page",
          "paper",
          "ink",
          "text-1",
          "text-2",
          "line",
          "ok-text",
          "fail-text",
        ],
        quartz: [
          "surface-page",
          "surface-card",
          "text-1",
          "text-2",
          "hue-1-mark",
          "hue-3-mark",
          "hue-4-mark",
          "hue-5-mark",
        ],
      } as Record<string, string[]>
    )[family];
    const css = getComputedStyle(document.body);
    setColors(
      names
        .map((name) => ({
          name,
          value: css.getPropertyValue("--" + name).trim(),
        }))
        .filter((x) => x.value),
    );
  }, []);
  return (
    <section className="demo-section">
      <h2 className="demo-label">Color and typography</h2>
      <div className="demo-swatches">
        {colors.map((c) => (
          <div key={c.name}>
            <i style={{ background: `var(--${c.name})` }} />
            <span>{c.name}</span>
          </div>
        ))}
      </div>
      <div className="demo-type">
        <strong>Aa 字 0123</strong>
        <p>A clear view of the work ahead.</p>
        <code>const project = "HappyHands";</code>
      </div>
    </section>
  );
}
class ErrorBoundary extends React.Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <p role="alert" className="demo-copy">
        {lang === "zh" ? "无法加载示例。可以在资料中查看源码。" : "Could not load the example. Its source is available in the documentation."}
      </p>
    ) : (
      this.props.children
    );
  }
}
function Block({ file, name }: { file: string; name: string }) {
  const [View, setView] = useState<ComponentType<any> | null>(null);
  const [failed, setFailed] = useState(false);
  const [range, setRange] = useState("24h");
  useEffect(() => {
    let live = true;
    load("blocks", file).then((mod) => {
      if (!live) return;
      if (mod?.[name]) setView(() => mod[name]);
      else setFailed(true);
    }).catch(() => {
      if (live) setFailed(true);
    });
    return () => {
      live = false;
    };
  }, [file, name]);
  return (
    <ErrorBoundary key={file + name}>
      {View ? (
        <View range={range} onRangeChange={setRange} />
      ) : (
        <PreviewStatus failed={failed} />
      )}
    </ErrorBoundary>
  );
}
function PreviewStatus({ failed }: { failed: boolean }) {
  return <p className="demo-copy" role={failed ? "alert" : "status"}>
    {failed
      ? (lang === "zh" ? "无法加载示例。" : "Could not load the example.")
      : (lang === "zh" ? "正在加载示例…" : "Loading preview…")}
  </p>;
}

function DocumentedExample({ name }: { name: string }) {
  const [View, setView] = useState<ComponentType | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let live = true;
    setView(null);
    setFailed(false);
    documentedExamples[`./generated/${system}/examples/${name}.tsx`]()
      .then(module => {
        if (live) setView(() => (module as { default: ComponentType }).default);
      })
      .catch(() => {
        if (live) setFailed(true);
      });
    return () => { live = false; };
  }, [name]);
  return <ErrorBoundary key={name}>{View ? <View /> : <PreviewStatus failed={failed} />}</ErrorBoundary>;
}

const scenarioLabelsZh: Record<string, string> = {
  "agent-plan": "代理计划",
  "agent-procedure": "代理执行流程",
  "agent-session": "代理会话",
  "api-keys": "API 密钥",
  "assistant-alert": "助理提醒",
  "assistant-approval": "助理审批",
  "assistant-limits": "助理权限限制",
  "booking-approval": "预订审批",
  "cited-answer": "引用来源的回答",
  "conversation-insights": "对话分析",
  experiment: "实验",
  "failed-load": "加载失败",
  home: "首页",
  "job-runs": "任务运行",
  "live-requests": "实时请求",
  "note-recap": "笔记摘要",
  "on-call": "值班",
  "pipeline-history": "流水线历史",
  "project-home": "项目首页",
  "run-progress": "运行进度",
  "run-trace": "运行追踪",
  "settings-rules": "规则设置",
  simulations: "模拟测试",
  "split-request": "分摊请求",
  "sync-flow": "同步流程",
  today: "今日",
  "tool-approval": "工具调用审批",
  "voice-capture": "语音录入",
  "warehouse-capacity": "仓库容量",
  "deploy-detail": "部署详情",
};

function App() {
  const preview = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = preview.current;
    if (!root || parent === window) return;

    const report = () => {
      // Radix closes on viewport resize. Keep the iframe stable while the menu is open.
      const picker = root.querySelector('.hh-preview-scenario [aria-expanded="true"]');
      if (picker) {
        selection.observe(picker, { attributeFilter: ["aria-expanded"] });
        return;
      }
      selection.disconnect();

      // Keep the previous scene height while its replacement is loading.
      if (root.querySelector(".demo-block > .demo-copy[role=status]")) return;
      parent.postMessage(
        { type: "design-system-preview-height", height: root.getBoundingClientRect().height },
        location.origin,
      );
    };

    const selection = new MutationObserver(report);
    const resize = new ResizeObserver(report);
    resize.observe(root);
    return () => {
      resize.disconnect();
      selection.disconnect();
    };
  }, []);

  const component = params.get("component") || "";
  const [selected, setSelected] = useState(
    params.get("example") ||
      (
        {
          sodium: "JobRuns",
          glaze: "Today",
          quartz: "HomeScreen",
          lime: "HomeScreen",
        } as Record<string, string>
      )[system] ||
      blocks[0]?.name,
  );
  const block = blocks.find((b) => b.name === selected) || blocks[0];
  const examplesOnly = gallery === "examples";
  const pageExamples = (
    <section className={`demo-section${examplesOnly ? " demo-examples-gallery" : ""}`}>
      {!examplesOnly && <h2 className="demo-label">{lang === "zh" ? "页面示例" : "Page examples"}</h2>}
      <PreviewScenarioPicker
        lang={lang}
        value={block?.name ?? ""}
        options={blocks.map(({ file, name }) => ({
          value: name,
          label: (lang === "zh" && scenarioLabelsZh[file]) || name.replace(/([a-z])([A-Z])/g, "$1 $2"),
        }))}
        onChange={setSelected}
      />
      <div className="demo-block">
        {block ? (
          <Block key={block.name} file={block.file} name={block.name} />
        ) : (
          <p className="demo-copy" role="status">
            {lang === "zh" ? "这个设计系统暂时没有页面示例。" : "This design system has no page examples yet."}
          </p>
        )}
      </div>
    </section>
  );
  return (
    <Provider>
      <main ref={preview} className={`demo-root${gallery ? " gallery-root" : ""}`}>
        {examplesOnly ? pageExamples : gallery === "foundations" ? <FoundationWall /> : gallery === "components" ? <ComponentWall /> : params.get("foundation") ? <><FoundationSpecimen system={system} name={params.get("foundation")!} compact={params.get("compact") === "1"} detail={params.get("detail") === "1"}/>{params.get("foundation")==="iconography"&&<DocumentedExample name="icon"/>}</> : <>
        {!component && <Foundations />}
        <ErrorBoundary>
          {component && !variantFixtures.has(component) && documentedExamples[`./generated/${system}/examples/${component}.tsx`] ? <DocumentedExample name={component}/> : <Controls only={component} />}
        </ErrorBoundary>
        {!component && pageExamples}
      </>} </main>
    </Provider>
  );
}
createRoot(document.getElementById("root")!).render(<App />);

// The host scrolls the full gallery while fixed specimens use its visible region.
if (gallery === "components" && window.frameElement) {
  const frame = window.frameElement;
  const host = frame.ownerDocument.defaultView!;
  const header = frame.ownerDocument.querySelector(".hh-site-header");
  const viewport = host.visualViewport;
  let pending = 0;
  const update = () => {
    pending = 0;
    const rect = frame.getBoundingClientRect();
    const viewportTop = viewport?.offsetTop ?? 0;
    const viewportBottom = viewportTop + (viewport?.height ?? host.innerHeight);
    const top = Math.max(0, Math.max(viewportTop, header?.getBoundingClientRect().bottom ?? 0) - rect.top);
    const height = Math.min(rect.height, viewportBottom - rect.top) - top;
    if (height <= 0) return;
    const root = document.documentElement;
    root.dataset.galleryViewport = "";
    root.style.setProperty("--gallery-view-top", `${top}px`);
    root.style.setProperty("--gallery-view-height", `${height}px`);
  };
  const schedule = () => {
    if (!pending) pending = requestAnimationFrame(update);
  };

  update();
  host.addEventListener("scroll", schedule, { passive: true });
  host.addEventListener("resize", schedule);
  viewport?.addEventListener("scroll", schedule);
  viewport?.addEventListener("resize", schedule);
  const observer = new ResizeObserver(schedule);
  observer.observe(frame);
  addEventListener("pagehide", () => {
    host.removeEventListener("scroll", schedule);
    host.removeEventListener("resize", schedule);
    viewport?.removeEventListener("scroll", schedule);
    viewport?.removeEventListener("resize", schedule);
    observer.disconnect();
    cancelAnimationFrame(pending);
  }, { once: true });
}
