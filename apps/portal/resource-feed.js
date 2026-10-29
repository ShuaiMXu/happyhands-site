import React from "react";
import { createRoot } from "react-dom/client";
import { archiveTypeRules } from "../../components/archive-facets";
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
const referenceCard = (item) =>
  `<a class="feed-item feed-reference" href="/components/?provider=design-md&design=${escape(item.slug)}" data-preview="${escape(item.video)}"><div class="feed-art"><img src="/design-archive/${escape(item.slug)}/thumbnail.jpg" alt="" loading="lazy" width="640" height="400"></div><div class="feed-caption"><h3>${escape(item.name)}</h3><span>${escape(new URL(item.site_url).hostname)}</span></div></a>`;
const componentCard = ([id, title], lang) =>
  `<a class="feed-item" href="/components/?provider=cult-ui&component=${id}"><div class="feed-art feed-component" aria-hidden="true"><iframe title="${escape(title)} preview" data-feed-component data-src="/components/preview/?component=${id}&theme=light&lang=${lang}&motion=off" loading="lazy" tabindex="-1" inert sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe></div><div class="feed-caption"><h3>${escape(title)}</h3><span>Cult UI</span></div></a>`;
export function resourceFeed(lang) {
  const zh = lang === "zh";

  return `<section class="content-section resource-feed" id="design-resources" data-feed-lang="${lang}">
    <div class="feed-tabs" role="tablist" aria-label="${zh ? "设计资源" : "Design resources"}">${[
      ["design-md", "Design.md"],
      ["systems", zh ? "设计系统" : "Design systems"],
      ["cult-ui", zh ? "组件库" : "Components"],
    ]
      .map(
        ([id, label], i) =>
          `<button type="button" role="tab" id="feed-tab-${id}" aria-controls="feed-panel-${id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-feed-tab="${id}">${label}</button>`,
      )
      .join("")}</div>
    <div data-feed-controls></div>
    <div class="feed-collection" role="tabpanel" id="feed-panel-design-md" aria-labelledby="feed-tab-design-md"><div class="feed-grid">${references.map((item) => referenceCard(item)).join("")}</div></div>
    <div class="feed-collection" role="tabpanel" id="feed-panel-systems" aria-labelledby="feed-tab-systems" hidden><div class="feed-grid">${systems.map((id) => `<a class="feed-item" href="/components/?provider=systems&system=${id}"><div class="feed-art feed-system"><img src="/system-covers/${id}.png" alt="" loading="lazy" width="1500" height="938"></div><div class="feed-caption"><h3>${id === "happyhands" ? "HappyHands" : id.charAt(0).toUpperCase() + id.slice(1)}</h3></div></a>`).join("")}</div></div>
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

export function setupResourceFeed(root, ResourceFeedControls) {
  syncResourceFeedTheme(
    root,
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );
  const controller = new AbortController();
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let current;
  const stop = () => {
    current?.remove();
    current = undefined;
  };
  // Mount only visible component previews; hidden tabs never run embedded demos.
  const frames = new IntersectionObserver(
    (entries) =>
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting && !target.closest("[hidden]"))
          target.setAttribute("src", target.dataset.src);
        else target.removeAttribute("src");
      }),
    { rootMargin: "100px" },
  );
  root
    .querySelectorAll("[data-feed-component]")
    .forEach((frame) => frames.observe(frame));
  const tabs = [...root.querySelectorAll("[data-feed-tab]")];
  let refreshCollection = () => {};
  const activate = (tab) => {
    stop();
    tabs.forEach((item) => {
      const active = item === tab;
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
      const panel = root.querySelector(`#feed-panel-${item.dataset.feedTab}`);
      panel.hidden = !active;
      if (!active)
        panel
          .querySelectorAll("[data-feed-component]")
          .forEach((frame) => frame.removeAttribute("src"));
    });
    refreshCollection(tab.dataset.feedTab);
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab), {
      signal: controller.signal,
    });
    tab.addEventListener(
      "keydown",
      (event) => {
        const next =
          event.key === "ArrowRight"
            ? (index + 1) % tabs.length
            : event.key === "ArrowLeft"
              ? (index + tabs.length - 1) % tabs.length
              : event.key === "Home"
                ? 0
                : event.key === "End"
                  ? tabs.length - 1
                  : -1;
        if (next < 0) return;
        event.preventDefault();
        activate(tabs[next]);
        tabs[next].focus();
      },
      { signal: controller.signal },
    );
  });
  const observer = new IntersectionObserver((items) => {
    if (
      current &&
      items.some(
        (item) => !item.isIntersecting && item.target.contains(current),
      )
    )
      stop();
  });
  const registerCards = (cards) =>
    cards.forEach((card) => {
      observer.observe(card);
      const start = () => {
        stop();
        if (motion.matches) return;
        const video = document.createElement("video");
        video.muted = true;
        video.playsInline = true;
        video.loop = true;
        video.setAttribute("aria-hidden", "true");
        video.addEventListener(
          "playing",
          () => video.classList.add("is-playing"),
          { once: true },
        );
        video.addEventListener(
          "error",
          () => {
            if (current === video) stop();
          },
          { once: true },
        );
        video.src = card.dataset.preview;
        card.querySelector(".feed-art").append(video);
        current = video;
        video.play().catch(() => {
          if (current === video) stop();
        });
      };
      const options = { signal: controller.signal };
      card.addEventListener(
        "pointerenter",
        (event) => {
          if (event.pointerType === "mouse") start();
        },
        options,
      );
      card.addEventListener("pointerleave", stop, options);
      card.addEventListener(
        "focus",
        () => {
          if (card.matches(":focus-visible")) start();
        },
        options,
      );
      card.addEventListener("blur", stop, options);
    });
  registerCards(root.querySelectorAll(".feed-reference"));
  root.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") stop();
    },
    { signal: controller.signal },
  );
  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) stop();
    },
    { signal: controller.signal },
  );
  motion.addEventListener("change", stop, { signal: controller.signal });
  const lang = root.querySelector("[data-feed-lang]").dataset.feedLang;
  const zh = lang === "zh";
  const controls = createRoot(root.querySelector("[data-feed-controls]"));
  const groupLabels = [
    ["buttons", "按钮", "Buttons"],
    ["inputs", "输入与选择", "Inputs"],
    ["cards", "卡片与投票", "Cards and polls"],
    ["navigation", "导航与切换", "Navigation"],
    ["overlays", "弹层与展开", "Overlays"],
    ["type", "文字与数字", "Typography"],
    ["illustrations", "插画与设备", "Illustrations"],
    ["sections", "页面区块", "Sections"],
    ["effects", "背景与效果", "Effects"],
  ];
  const systemLabels = [
    ["happyhands", "品牌规范", "Brand guidelines"],
    ["quartz", "AI 工作流", "AI workflows"],
    ["lime", "个人助手", "Personal assistants"],
    ["sodium", "数据工具", "Data tools"],
    ["glaze", "AI 产品", "AI products"],
  ];
  const catalogs = {
    "design-md": {
      items: references,
      loaded: false,
      path: "/design-archive/index.json",
      categories: archiveTypeRules,
    },
    "cult-ui": {
      items: components.map(([id, title]) => ({ id, title })),
      loaded: false,
      path: "/components/cult-ui/catalog.json",
      categories: groupLabels,
    },
    systems: {
      items: systemLabels.map(([id, cn, en]) => ({
        id,
        name:
          id === "happyhands"
            ? "HappyHands"
            : id[0].toUpperCase() + id.slice(1),
        description: zh ? cn : en,
        category: id,
      })),
      loaded: true,
      categories: systemLabels,
    },
  };
  let provider = "design-md";
  const states = Object.fromEntries(
    Object.keys(catalogs).map((id) => [
      id,
      { query: "", category: "", limit: 24 },
    ]),
  );
  const systemCard = (x) =>
    `<a class="feed-item" href="/components/?provider=systems&system=${x.id}"><div class="feed-art feed-system"><img src="/system-covers/${x.id}.png" alt="" width="1500" height="938" loading="lazy"></div><div class="feed-caption"><h3>${x.name}</h3><span>${escape(x.description)}</span></div></a>`;
  const matchingCategory = (x, id) =>
    !id ||
    (provider === "design-md"
      ? id === "unclassified"
        ? !x.types?.length
        : x.types?.includes(id)
      : x.category === id);
  const moreObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (
          entry.isIntersecting &&
          !entry.target.closest("[hidden]") &&
          entry.target.isConnected
        )
          entry.target.click();
    },
    { rootMargin: "400px" },
  );
  const render = () => {
    if (controller.signal.aborted) return;
    stop();
    const catalog = catalogs[provider],
      state = states[provider];
    const matches = catalog.items.filter((x) =>
      `${x.name || x.title || ""} ${x.description || ""} ${x.site_url || ""} ${x.north_star || ""} ${(x.fonts || []).join(" ")} ${catalog.categories
        .filter(([id]) => matchingCategory(x, id))
        .map((row) => row.slice(1, 3).join(" "))
        .join(" ")}`
        .toLowerCase()
        .includes(state.query.trim().toLowerCase()),
    );
    const filtered = matches.filter((x) => matchingCategory(x, state.category));
    const categories =
      provider === "design-md"
        ? [...catalog.categories, ["unclassified", "未分类", "Unclassified"]]
        : catalog.categories;
    const options = [
      {
        value: "",
        label: zh ? "全部分类" : "All categories",
        count: matches.length,
      },
      ...categories.map(([id, cn, en]) => ({
        value: id,
        label: zh ? cn : en,
        count: matches.filter((x) => matchingCategory(x, id)).length,
      })),
    ];
    controls.render(
      React.createElement(ResourceFeedControls, {
        zh,
        query: state.query,
        category: state.category,
        options,
        count: filtered.length,
        loading: !!catalog.loading,
        error: !!catalog.error,
        onRetry: () => load(provider),
        onQueryChange: (value) => {
          state.query = value;
          state.limit = 24;
          render();
        },
        onCategoryChange: (value) => {
          state.category = value;
          state.limit = 24;
          render();
        },
      }),
    );
    const panel = root.querySelector(`#feed-panel-${provider}`),
      grid = panel.querySelector(".feed-grid");
    grid
      .querySelectorAll(".feed-reference")
      .forEach((x) => observer.unobserve(x));
    grid
      .querySelectorAll("[data-feed-component]")
      .forEach((x) => frames.unobserve(x));
    grid.innerHTML = filtered
      .slice(0, state.limit)
      .map((x) =>
        provider === "design-md"
          ? referenceCard(x)
          : provider === "systems"
            ? systemCard(x)
            : componentCard([x.id, x.title], lang),
      )
      .join("");
    registerCards(grid.querySelectorAll(".feed-reference"));
    syncResourceFeedTheme(
      root,
      document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    );
    grid
      .querySelectorAll("[data-feed-component]")
      .forEach((x) => frames.observe(x));
    panel.querySelector(".feed-empty")?.remove();
    const oldMore = panel.querySelector(".feed-more");
    if (oldMore) {
      moreObserver.unobserve(oldMore);
      oldMore.remove();
    }
    if (!filtered.length && !catalog.loading && !catalog.error) {
      const empty = document.createElement("div");
      empty.className = "feed-empty";
      empty.innerHTML = `<p>${zh ? "没有匹配的资源" : "No matching resources"}</p><button type="button">${zh ? "清除筛选" : "Clear filters"}</button>`;
      empty.querySelector("button").onclick = () => {
        state.query = "";
        state.category = "";
        render();
      };
      panel.append(empty);
    }
    if (filtered.length > state.limit) {
      const more = document.createElement("button");
      more.type = "button";
      more.className = "feed-more";
      more.textContent = zh ? "加载更多" : "Load more";
      more.onclick = () => {
        state.limit += 24;
        render();
      };
      panel.append(more);
      moreObserver.observe(more);
    }
  };
  const load = async (id) => {
    const catalog = catalogs[id];
    if (catalog.loaded || catalog.loading) return;
    catalog.loading = true;
    catalog.error = false;
    if (provider === id) render();
    try {
      const response = await fetch(catalog.path, { signal: controller.signal });
      if (!response.ok) throw Error("catalog");
      const data = await response.json();
      const items =
        id === "design-md"
          ? data
          : data.items.filter((x) => x.preview && !x.aliasOf);
      const featured =
        id === "design-md"
          ? references.map((x) => x.slug)
          : components.map((x) => x[0]);
      catalog.items = [
        ...featured
          .map((key) => items.find((x) => (x.slug || x.id) === key))
          .filter(Boolean),
        ...items.filter((x) => !featured.includes(x.slug || x.id)),
      ];
      catalog.loaded = true;
    } catch (error) {
      if (error.name !== "AbortError") catalog.error = true;
    } finally {
      catalog.loading = false;
      if (provider === id) render();
    }
  };
  refreshCollection = (id) => {
    provider = id;
    render();
    void load(id);
  };
  refreshCollection(provider);
  return () => {
    stop();
    controller.abort();
    observer.disconnect();
    frames.disconnect();
    moreObserver.disconnect();
    controls.unmount();
  };
}
