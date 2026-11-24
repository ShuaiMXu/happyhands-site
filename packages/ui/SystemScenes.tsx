import { Input } from "./index";
import { Button } from "./index";
import React, { useState, type CSSProperties } from "react";
import { SystemExample } from "./SystemExample";
import { PreviewScenarioPicker } from "./PreviewScenarioPicker";
import { LimeExample } from "../../systems/lime/LimeExample";
type SystemId = "happyhands" | "quartz" | "lime";
import quartz from "../../systems/quartz/foundations.json";
import hh from "../design-tokens/happyhands.json";
import lime from "../../systems/lime/palette.json";
import "./system-scenes.css";
const scenes = {
  happyhands: [
    ["审阅选择", "Review selection"],
    ["项目概览", "Project overview"],
    ["工作空间设置", "Workspace settings"],
  ],
  quartz: [
    ["操作授权", "Tool approval"],
    ["运行追踪", "Run trace"],
    ["通知设置", "Notification settings"],
  ],
  lime: [
    ["助手提醒", "Assistant reminder"],
    ["今日计划", "Daily plan"],
    ["提醒设置", "Reminder settings"],
  ],
};
export function SystemScenes({
  system,
  lang,
  dark,
}: {
  system: SystemId;
  lang: string;
  dark: boolean;
}) {
  const zh = lang === "zh",
    t = (a: string, b: string) => (zh ? a : b);
  const [scene, setScene] = useState(0),
    [appearance, setAppearance] = useState<boolean | null>(null),
    [active, setActive] = useState(0),
    [done, setDone] = useState(false),
    [query, setQuery] = useState(""),
    [name, setName] = useState(""),
    [notification, setNotification] = useState(true),
    [message, setMessage] = useState("");
  const isDark = appearance ?? dark;
  const labels =
    system === "happyhands"
      ? [
          ["品牌网站", "Brand website"],
          ["产品工作台", "Product workspace"],
          ["移动端导航", "Mobile navigation"],
        ]
      : system === "quartz"
        ? [
            ["读取项目规范", "Read project guidelines"],
            ["生成修改建议", "Prepare a proposal"],
            ["等待人工确认", "Awaiting approval"],
          ]
        : [
            ["出门走走", "Take a walk"],
            ["整理本周计划", "Plan the week"],
            ["阅读时间", "Time to read"],
          ];
  const base = isDark ? hh.dark : hh.light,
    lp = isDark ? lime.dark : lime.light;
  const qp = isDark ? quartz.dark : quartz.light;
  const style = {
    "--scene-bg":
      system === "lime"
        ? lp.page
        : system === "quartz"
          ? `oklch(${qp["canvas-c"]})`
          : base.bg,
    "--scene-panel":
      system === "lime"
        ? lp.surface
        : system === "quartz"
          ? `oklch(${qp["paper-c"]})`
          : base["bg-raised"],
    "--scene-ink": system === "lime" ? lp.fg : system === "quartz" ? `oklch(${qp["ink-c"]})` : base.ink,
    "--scene-muted": system === "lime" ? lp["fg-2"] : base["ink-muted"],
    "--scene-line": system === "lime" ? lp["line-strong"] : base["line-strong"],
    "--scene-action": system === "lime" ? lp.accent : base.primary,
    "--scene-on": system === "lime" ? lp["on-accent"] : base["on-primary"],
    "--scene-radius":
      system === "lime" ? "16px" : system === "quartz" ? "6px" : "10px",
  } as CSSProperties;
  return (
    <section id="scenes" className="system-scenes">
      <h2>{t("应用场景", "Application examples")}</h2>
      <div className="scene-controls">
        <PreviewScenarioPicker
          lang={lang}
          value={String(scene)}
          options={scenes[system].map((label, index) => ({
            value: String(index),
            label: label[zh ? 0 : 1],
          }))}
          onChange={value => {
            setScene(Number(value));
            setMessage("");
          }}
        />
        <div className="scene-appearance" role="group" aria-label={t("示例外观", "Example appearance")}>
          <Button aria-pressed={!isDark} onClick={() => setAppearance(false)}>
            {t("浅色", "Light")}
          </Button>
          <Button aria-pressed={isDark} onClick={() => setAppearance(true)}>
            {t("深色", "Dark")}
          </Button>
        </div>
      </div>
      <div
        className={`scene-frame scene-${system}`}
        style={style}
        data-appearance={isDark ? "dark" : "light"}
      >
        {scene === 0 ? (
          <div className="scene-stage">
            {system === "lime" ? (
              <LimeExample lang={lang} dark={isDark} hideAppearanceControl />
            ) : (
              <SystemExample
                hideAppearanceControl
                system={system}
                lang={lang}
                dark={isDark}
              />
            )}
          </div>
        ) : scene === 1 ? (
          <div className="scene-workspace">
            <aside className="scene-workspace-nav">
              <b>{t("工作空间", "Workspace")}</b>
              <span>{scenes[system][1][zh ? 0 : 1]}</span>
              <small>{t("示例项目", "Demo project")}</small>
            </aside>
            <div className="scene-workspace-main">
              <h3>{scenes[system][1][zh ? 0 : 1]}</h3>
              <label className="scene-search">
                {t("搜索条目", "Search entries")}
                <Input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("按名称查找", "Find by name")}
                />
              </label>
              <div className="scene-master-detail">
                <div className="scene-list">
                  {labels
                    .map((label, i) => ({ label, i }))
                    .filter(({ label }) =>
                      label[zh ? 0 : 1]
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                    )
                    .map(({ label, i }) => (
                      <Button
                        key={i}
                        aria-pressed={active === i}
                        onClick={() => {
                          setActive(i);
                          setDone(false);
                        }}
                      >
                        <span>0{i + 1}</span>
                        <strong>{label[zh ? 0 : 1]}</strong>

                      </Button>
                    ))}
                  {!labels.some((l) =>
                    l[zh ? 0 : 1].toLowerCase().includes(query.toLowerCase()),
                  ) && (
                    <p role="status">
                      {t(
                        "没有匹配条目，请更换关键词。",
                        "No entries match. Try another keyword.",
                      )}
                    </p>
                  )}
                </div>
                <article className="scene-detail">
                  <span className="scene-badge">
                    {done ? t("已标记", "Marked") : t("待处理", "Pending")}
                  </span>
                  <h4>{labels[active][zh ? 0 : 1]}</h4>
                  <p>
                    {t(
                      "检查这项工作的内容与范围。你可以在示例中标记状态，然后重置。",
                      "Review this item and its scope. Mark its state in the demo, then reset it.",
                    )}
                  </p>
                  <dl>
                    <div>
                      <dt>{t("归属", "Project")}</dt>
                      <dd>{t("示例项目", "Demo project")}</dd>
                    </div>
                    <div>
                      <dt>{t("状态", "Status")}</dt>
                      <dd>
                        {done
                          ? t("已处理", "Handled")
                          : t("等待确认", "Awaiting confirmation")}
                      </dd>
                    </div>
                  </dl>
                  <Button
                    className="scene-primary"
                    onClick={() => setDone(!done)}
                  >
                    {done
                      ? t("重置状态", "Reset state")
                      : t("标记已处理", "Mark as handled")}
                  </Button>
                  <p role="status">
                    {done ? t("示例状态已更新。", "Demo state updated.") : ""}
                  </p>
                </article>
              </div>
            </div>
          </div>
        ) : (
          <div className="scene-settings">
            <div>
              <h3>{scenes[system][2][zh ? 0 : 1]}</h3>
              <p>
                {t(
                  "试用表单校验与保存反馈。",
                  "Try form validation and save feedback.",
                )}
              </p>
            </div>
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                setMessage(
                  name.trim()
                    ? t(
                        "示例设置已保存，仅保留在当前页面。",
                        "Demo settings saved in this page only.",
                      )
                    : t("请填写名称后再保存。", "Enter a name before saving."),
                );
              }}
            >
              <label>
                {t("名称", "Name")}
                <Input
                  value={name}
                  aria-invalid={!!message && !name.trim()}
                  onChange={(e) => {
                    setName(e.target.value);
                    setMessage("");
                  }}
                  placeholder={t("例如：我的工作空间", "e.g. My workspace")}
                />
              </label>
              <label className="scene-checkbox">
                <Input
                  type="checkbox"
                  checked={notification}
                  onChange={(e) => setNotification(e.target.checked)}
                />
                {t("完成后通知我", "Notify me when complete")}
              </label>
              <div className="scene-form-actions">
                <Button type="submit" className="scene-primary">
                  {t("保存示例", "Save example")}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setName("");
                    setNotification(true);
                    setMessage("");
                  }}
                >
                  {t("重置", "Reset")}
                </Button>
              </div>
              <p role="status">{message}</p>
            </form>
          </div>
        )}
      </div>
      <p className="note">
        {t(
          "场景由 HappyHands 实现，用于说明布局与交互；不连接真实项目，也不代替上游组件安装。",
          "Scenes implemented by HappyHands to illustrate layout and behavior. No project connection; these do not replace upstream component installation.",
        )}
      </p>
    </section>
  );
}
