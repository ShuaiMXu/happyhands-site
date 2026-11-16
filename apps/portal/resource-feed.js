import {setupLiquidNavigation} from '../../packages/ui/liquid-navigation';
import { archiveCover } from "../../components/archive-catalog";
import {
  resourceSections,
  resourceTools,
} from "../../packages/ui/resource-navigation";
import React from "react";
import { randomizeArchive } from "../../components/archive-order";
import { createRoot } from "react-dom/client";
import references from "./resource-feed-data.json";
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const systems = ["happyhands", "quartz", "lime", "sodium", "glaze"];
const components = [
  ["shift-card", "Shift Card"],
  ["texture-button", "Texture Button"],
  ["minimal-card", "Minimal Card"],
  ["texture-card", "Texture Card"],
  ["cosmic-button", "Cosmic Button"],
  ["timer", "Timer"],
  ["cutout-card", "Cutout Card"],
  ["dynamic-island", "Dynamic Island"],
  ["choice-poll", "Choice Poll"],
  ["feature-voting", "Feature Voting"],
  ["popover-form", "Popover Form"],
  ["base-select", "Select"],
  ["direction-aware-tabs", "Direction Aware Tabs"],
  ["feature-carousel", "Feature Carousel"],
  ["popover", "Popover"],
  ["floating-panel", "Floating Panel"],
  ["color-picker", "Color Picker"],
  ["tabs-illustration-vercel", "Tabs Illustration Vercel"],
  ["copy-button", "Copy Button"],
  ["halo-button", "Halo Button"],
  ["halo-card", "Halo Card"],
  ["halo-tabs", "Halo Tabs"],
  ["halo-input", "Halo Input"],
  ["halo-select", "Halo Select"],
];
const referenceCard = (item, lang) => {
  const cover = archiveCover(item);
  return `<a class="feed-item feed-reference" href="${lang === "en" ? "/en" : ""}/components/?provider=design-md&design=${escape(item.slug)}"${item.video ? ` data-preview="${escape(item.video)}"` : ""}><div class="feed-art">${cover ? `<img src="${escape(cover)}" alt="" loading="lazy" width="640" height="400">` : `<span>${escape(item.name)}</span>`}</div><div class="feed-caption"><h3>${escape(item.name)}</h3><span>${escape(new URL(item.site_url).hostname)}</span></div></a>`;
};
const componentCard = ([id, title], lang) =>
  `<a class="feed-item" href="${lang === "en" ? "/en" : ""}/components/?provider=cult-ui&component=${id}"><div class="feed-art feed-component" aria-hidden="true"><iframe title="${escape(title)} preview" data-feed-component data-src="/components/preview/?component=${id}&theme=light&lang=${lang}&motion=off" loading="lazy" tabindex="-1" inert sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe></div><div class="feed-caption"><h3>${escape(title)}</h3><span>Cult UI</span></div></a>`;
export function resourceFeed(lang) {
  const zh = lang === "zh";

  return `<section class="content-section resource-feed" id="design-resources" data-feed-lang="${lang}">
    <div class="feed-navigation hh-resource-navigation"><div class="feed-tabs hh-resource-group" role="tablist" aria-label="${zh ? "设计资源" : "Design resources"}">${[
      ...resourceSections,
      ...resourceTools,
    ]
      .map(
        ({ id, zh: chinese, en: english }, i) =>
          `<button type="button" role="tab" id="feed-tab-${id}" aria-controls="feed-panel-${id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-feed-tab="${id}">${zh ? chinese : english}</button>`,
      )
      .join("")}</div></div>
    <div data-feed-tools>${resourceTools.map((tool) => `<section class="resource-tool-panel" role="tabpanel" id="feed-panel-${tool.id}" aria-labelledby="feed-tab-${tool.id}" hidden></section>`).join("")}</div>
    <div data-feed-controls></div>
    <div class="feed-collection" role="tabpanel" id="feed-panel-design-md" aria-labelledby="feed-tab-design-md"><div class="feed-grid">${randomizeArchive(
      references,
    )
      .map((item) => referenceCard(item, lang))
      .join("")}</div></div>
    <div class="feed-collection" role="tabpanel" id="feed-panel-systems" aria-labelledby="feed-tab-systems" hidden><div class="feed-grid">${systems.map((id) => `<a class="feed-item" href="${lang === "en" ? "/en" : ""}/components/?provider=systems&system=${id}"><div class="feed-art feed-system"><img src="/system-covers/${id}.png" alt="" loading="lazy" width="1500" height="938"></div><div class="feed-caption"><h3>${id === "happyhands" ? "HappyHands" : id.charAt(0).toUpperCase() + id.slice(1)}</h3></div></a>`).join("")}</div></div>
    <div class="feed-collection" role="tabpanel" id="feed-panel-cult-ui" aria-labelledby="feed-tab-cult-ui" hidden><div class="feed-grid">${components.map(([id, title]) => componentCard([id, title], lang)).join("")}</div></div>
  </section>`;
}

/** One preview at a time. Touch stays a stable link; all resources retain their full detail route. */
export function syncResourceFeedTheme(root, theme) {
  root.querySelectorAll("[data-feed-component]").forEach((frame) => {
    const url = new URL(
      frame.getAttribute("src") || frame.dataset.src,
      location.href,
    );
    if (url.searchParams.get("theme") !== theme) {
      url.searchParams.set("theme", theme);
      frame.dataset.src = url.pathname + url.search;
      if (frame.hasAttribute("src")) frame.src = url.href;
    }
  });
}

export function setupResourceFeed(
  root,
  ResourceFeedControls,
  ResourceToolPanels,
  previous = {},
  ResourceDirectory,
) {
  const controller = new AbortController(),
    lang = root.querySelector("[data-feed-lang]").dataset.feedLang;
  const tabs = [...root.querySelectorAll("[data-feed-tab]")],
    mounts = new Map();
  const tools = createRoot(root.querySelector("[data-feed-tools]"));
  root.querySelector("[data-feed-controls]").hidden = true;
  const states = structuredClone(previous.states || {});
  let active = previous.active || "design-md";
  const activate = (id) => {
    active = id;
    for (const tab of tabs) {
      const selected = tab.dataset.feedTab === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      const panel = root.querySelector(`#feed-panel-${tab.dataset.feedTab}`);
      if (panel) panel.hidden = !selected;
    }
    tools.render(
      React.createElement(ResourceToolPanels, {
        active: id,
        lang,
        tabPrefix: "feed",
      }),
    );
    if (resourceSections.some((s) => s.id === id) && !mounts.has(id)) {
      const mount = createRoot(root.querySelector(`#feed-panel-${id}`));
      mount.render(
        React.createElement(ResourceDirectory, {
          section: id,
          lang,
          embedded: true,
          initialState: states[id],
          onStateChange: (state) => {
            states[id] = state;
          },
        }),
      );
      mounts.set(id, mount);
    }
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => activate(tab.dataset.feedTab), {
      signal: controller.signal,
    });
    tab.addEventListener(
      "keydown",
      (event) => {
        const j =
          event.key === "ArrowRight"
            ? (i + 1) % tabs.length
            : event.key === "ArrowLeft"
              ? (i + tabs.length - 1) % tabs.length
              : event.key === "Home"
                ? 0
                : event.key === "End"
                  ? tabs.length - 1
                  : -1;
        if (j < 0) return;
        event.preventDefault();
        activate(tabs[j].dataset.feedTab);
        tabs[j].focus();
      },
      { signal: controller.signal },
    );
  });
  activate(active);
  const disposeLiquid = setupLiquidNavigation(root.querySelector(".hh-resource-navigation"));
  const dispose = () => {
    controller.abort();
    disposeLiquid();
    for (const mount of mounts.values()) mount.unmount();
    tools.unmount();
  };
  dispose.snapshot = () => ({ active, states: structuredClone(states) });
  return dispose;
}
