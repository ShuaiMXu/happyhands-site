import {autoSizeFrame} from "../../packages/ui/frame-sizing";
import { Input } from "../../packages/ui";
import { useEffect,useRef,useMemo, useState } from "react";
import { Button } from "../../packages/ui";
import { Select } from "../../packages/ui/Select";
import {
  registry,
  defaultConfig,
  type ComponentConfig,
} from "../../packages/component-studio/registry";
import { componentDocument } from "../../packages/component-studio/document";
import type { ThemeStyles, Mode } from "../../packages/theme-core";
import "./component-workbench.css";
export function ComponentWorkbench({
  config = defaultConfig,
  onChange,
  styles,
  mode,
  lang,
  onExport,
}: {
  config?: ComponentConfig;
  onChange: (c: ComponentConfig) => void;
  styles: ThemeStyles;
  mode: Mode;
  lang: "zh" | "en";
  onExport: (name: string, text: string) => void;
}) {
  const [overview,setOverview]=useState(true);
  const frame=useRef<HTMLIFrameElement>(null);
  useEffect(()=>frame.current?autoSizeFrame(frame.current,"hh:component-height",true):undefined,[]);
  const previewDocument=useMemo(()=>componentDocument(config,styles,mode,lang,overview),[config,styles,mode,lang,overview]);
  const [query, setQuery] = useState("");
  const en = lang === "en";
  const copy = (zh: string, english: string) => (en ? english : zh);
  const document = useMemo(
    () => componentDocument(config, styles, mode, lang),
    [config, styles, mode, lang],
  );
  const [past, setPast] = useState<ComponentConfig[]>([]),
    [future, setFuture] = useState<ComponentConfig[]>([]);
  function update(patch: Partial<ComponentConfig>) {
    setPast((p) => [...p, config].slice(-30));
    setFuture([]);
    onChange({ ...config, ...patch });
  }
  const entries = registry.filter((item) =>
    `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section
      className="component-workbench"
      aria-label={copy("组件工作台", "Component workbench")}
    >
      <div className="workbench-view-switch" role="group" aria-label={copy("预览范围","Preview scope")}>
       <Button aria-pressed={overview} onClick={()=>setOverview(true)}>{copy("全部组件","All components")}</Button>
       <Button aria-pressed={!overview} onClick={()=>setOverview(false)}>{copy("自定义单个组件","Customize a component")}</Button>
      </div>
      <p className="workbench-summary">{copy("12 项交互预览，随项目主题实时更新。按钮、输入框和卡片支持独立配置与导出。","12 interactive previews follow your project theme. Button, Input and Card support individual configuration and export.")}</p>
      <div hidden={overview}>
      <div className="workbench-config">
        <label>
          {copy("组件", "Component")}
          <Select
            value={config.component}
            onChange={(e) =>
              update({
                component: e.target.value as ComponentConfig["component"],
              })
            }
          >
            {registry
              .filter((i) => i.capabilities.preview)
              .map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
          </Select>
        </label>
        <label>
          {copy("形态", "Variant")}
          <Select
            value={config.variant}
            onChange={(e) =>
              update({ variant: e.target.value as ComponentConfig["variant"] })
            }
          >
            <option value="solid">{copy("实色", "Solid")}</option>
            <option value="outline">{copy("描边", "Outline")}</option>
            <option value="soft">{copy("柔和", "Soft")}</option>
          </Select>
        </label>
        <label>
          {copy("尺寸", "Size")}
          <Select
            value={config.size}
            onChange={(e) =>
              update({ size: e.target.value as ComponentConfig["size"] })
            }
          >
            <option value="compact">{copy("紧凑", "Compact")}</option>
            <option value="regular">{copy("常规", "Regular")}</option>
            <option value="large">{copy("宽松", "Large")}</option>
          </Select>
        </label>
        <label>
          {copy("状态", "State")}
          <Select
            value={config.state}
            onChange={(e) =>
              update({ state: e.target.value as ComponentConfig["state"] })
            }
          >
            <option value="default">{copy("默认", "Default")}</option>
            <option value="disabled">{copy("禁用", "Disabled")}</option>
          </Select>
        </label>
        <label>
          {copy("操作文案", "Action label")}
          <Input
            value={config.label}
            maxLength={120}
            onChange={(e) => update({ label: e.target.value })}
          />
        </label>
      </div>
      <div className="workbench-actions">
        <Button
          disabled={!past.length}
          onClick={() => {
            setFuture((f) => [config, ...f]);
            onChange(past.at(-1)!);
            setPast((p) => p.slice(0, -1));
          }}
        >
          {copy("撤销组件修改", "Undo component change")}
        </Button>
        <Button
          disabled={!future.length}
          onClick={() => {
            setPast((p) => [...p, config]);
            onChange(future[0]);
            setFuture((f) => f.slice(1));
          }}
        >
          {copy("重做组件修改", "Redo component change")}
        </Button>
        <Button onClick={() => onExport(`${config.component}.html`, document)}>
          {copy("导出可运行组件", "Export runnable component")}
        </Button>
      </div>
      </div>
      <iframe
        ref={frame}
        title={copy("可交互组件预览", "Interactive component preview")}
        sandbox="allow-scripts allow-forms"
        srcDoc={previewDocument}
      />
      <details className="workbench-coverage">
        <summary>
          {copy("查看组件接入进度", "Component integration progress")} /{" "}
          {registry.filter((i) => i.capabilities.preview).length} /{" "}
          {registry.length}
        </summary>
        <p>
          {copy(
            "已接入 3 项，其余待接入。独立 HTML 导出；React 组件包尚未支持。",
            "3 integrated; remaining items are pending. Standalone HTML export; React package export is not supported yet.",
          )}
        </p>
        <label>
          {copy("搜索组件名称", "Search component names")}
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="workbench-ledger">
          {entries.map((i) => (
            <div key={i.id}>
              <span>{i.name}</span>
              <span>
                {i.capabilities.preview
                  ? copy("已接入 / 待验收", "Integrated / awaiting acceptance")
                  : copy("待接入", "Pending")}
              </span>
            </div>
          ))}
        </div>
        {!entries.length && (
          <p role="status">{copy("没有匹配组件", "No matching components")}</p>
        )}
        <Button
          onClick={() =>
            onExport(
              "component-coverage.json",
              JSON.stringify(registry, null, 2),
            )
          }
        >
          {copy("导出台账", "Export coverage ledger")}
        </Button>
      </details>
    </section>
  );
}
