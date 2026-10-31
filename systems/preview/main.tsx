/// <reference types="vite/client" />
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { ComponentType, ReactNode } from "react";
import "./preview.css";
const params = new URLSearchParams(location.search);
const system = ["sodium", "glaze", "quartz", "lime"].includes(
  params.get("system") || "",
)
  ? params.get("system")!
  : "quartz";
const theme = params.get("theme") === "dark" ? "dark" : "light";
document.body.className = system;
document.body.dataset.theme = theme;
document.documentElement.dataset.theme = theme;
const modules = import.meta.glob("./generated/*/{ui,ai,blocks,lib}/*.{ts,tsx}");
const styles = import.meta.glob("./generated/*/compiled.css");
const sourceCatalog = await import("./generated/catalog.json");
const blocks = (
  sourceCatalog.default as Record<
    string,
    { blocks: { file: string; name: string }[] }
  >
)[system].blocks;
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
await Promise.all(names.map((name) => load("ui", name)));
const portal = await load("lib", "portal");
const Provider =
  portal?.[system[0].toUpperCase() + system.slice(1) + "PortalProvider"] ||
  React.Fragment;
const get = (file: string, name: string) =>
  loaded["ui/" + file]?.[name] as ComponentType<any> | undefined;
function usePart(file: string, name: string, fallback?: ComponentType<any>) {
  return get(file, name) || fallback || (() => null);
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
    system === "sodium" ? "frame" : "card",
    system === "sodium" ? "Frame" : "Card",
  );
  const CardHeader = usePart(
    system === "sodium" ? "frame" : "card",
    system === "sodium" ? "FrameHeader" : "CardHeader",
  );
  const CardTitle = usePart(
    system === "sodium" ? "frame" : "card",
    system === "sodium" ? "FrameTitle" : "CardTitle",
  );
  const CardContent = usePart(
    system === "sodium" ? "frame" : "card",
    system === "sodium" ? "FrameBody" : "CardContent",
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
        ["input", "field", "textarea"],
        "Fields",
        <div className="demo-fields">
          <label>
            Project name
            <Input aria-label="Project name" placeholder="Your next project" />
          </label>
          <label>
            Notes
            <Textarea aria-label="Notes" placeholder="Add a note…" />
          </label>
        </div>,
      )}
      {show(
        ["checkbox", "switch", "slider", "radio-group", "radio"],
        "Selection",
        <div className="demo-fields">
          <div className="demo-row">
            <label className="demo-row">
              <Checkbox defaultChecked />
              Notify me
            </label>
            <label className="demo-row">
              <Switch aria-label="Automatic updates" defaultChecked />
              Automatic updates
            </label>
          </div>
          <Slider
            aria-label="Volume"
            thumbLabels={["Volume"]}
            defaultValue={[64]}
            showValue
          />
        </div>,
      )}
      {show(
        ["progress", "meter", "status", "badge", "avatar", "skeleton"],
        "Status and progress",
        <div className="demo-fields">
          <div className="demo-row">
            {get("badge", "Badge") && (
              <>
                <Badge>Draft</Badge>
                <Badge variant="neutral">Published</Badge>
              </>
            )}
            <Status
              status={system === "lime" ? "done" : "ok"}
              label={system === "lime" ? "Ready" : undefined}
            >
              Ready
            </Status>
            {get("avatar", "Avatar") && <Avatar name="Arlan Marat" />}
          </div>
          <Progress value={64} label="Completed" aria-label="Completed" />
          <Skeleton style={{ height: 12, width: "55%" }} />
        </div>,
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
        [
          "dialog",
          "alert-dialog",
          "popover",
          "tooltip",
          "sheet",
          "dropdown-menu",
        ],
        "Overlays",
        <div className="demo-row">
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
          </Dialog>
          <Popover>
            <PopoverTrigger render={<Button variant="secondary" />}>
              Open popover
            </PopoverTrigger>
            <PopoverContent>
              <p className="demo-copy">A useful detail, beside its action.</p>
            </PopoverContent>
          </Popover>
        </div>,
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
    )[system];
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
        This example could not render. Its complete source remains available in
        the document library.
      </p>
    ) : (
      this.props.children
    );
  }
}
function Block({ file, name }: { file: string; name: string }) {
  const [View, setView] = useState<ComponentType<any> | null>(null);
  const [range, setRange] = useState("24h");
  useEffect(() => {
    let live = true;
    load("blocks", file).then((mod) => {
      if (live && mod?.[name]) setView(() => mod[name]);
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
        <p className="demo-copy">Loading preview…</p>
      )}
    </ErrorBoundary>
  );
}
function App() {
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
  return (
    <Provider>
      <main className="demo-root">
        {!component && <Foundations />}
        <ErrorBoundary>
          <Controls only={component} />
        </ErrorBoundary>
        {!component && (
          <section className="demo-section">
            <div className="demo-heading">
              <h2 className="demo-label">Page examples</h2>
              <label className="demo-select-label">
                Example
                <select
                  aria-label="Page example"
                  value={selected}
                  disabled={!blocks.length}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  {blocks.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name.replace(/([a-z])([A-Z])/g, "$1 $2")}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="demo-block">
              {block ? <Block file={block.file} name={block.name} /> : <p className="demo-copy" role="status">Page examples are not available in this build.</p>}
            </div>
          </section>
        )}
      </main>
    </Provider>
  );
}
createRoot(document.getElementById("root")!).render(<App />);

const report = () => {
  const root = document.querySelector(".demo-root");
  if (root && parent !== window)
    parent.postMessage(
      {
        type: "design-system-preview-height",
        height: root.getBoundingClientRect().height,
      },
      location.origin,
    );
};
new ResizeObserver(report).observe(document.body);
addEventListener("load", report);
