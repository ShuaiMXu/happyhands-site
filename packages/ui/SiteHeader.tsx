import { Button } from ".";
import { Icon } from "./Icon";
import React, { useEffect, useRef } from "react";
import { setupSiteMenu } from "./site-menu";
import { siteNavigation } from "./site-navigation";
import "./site-shell.css";
export function SiteHeader({
  navigation = true,
  lang,
  dark,
  onLanguage,
  onTheme,
  active = "/apps/portal/#explore",
}: {
  navigation?: boolean;
  lang: string;
  dark: boolean;
  onLanguage: () => void;
  onTheme: () => void;
  active?: string;
}) {
  const header = useRef<HTMLElement>(null);
  useEffect(() => navigation ? setupSiteMenu(header.current!, lang) : undefined, [lang,navigation]);
  return (
    <header className={`hh-site-header${navigation ? "" : " hh-site-header-compact"}`} ref={header}>
      <a href="/apps/portal/" aria-label="HappyHands">
        <img
          src={
            dark
              ? "/brand/happyhands-logo-paper.png"
              : "/brand/happyhands-logo-ink.png"
          }
          alt="HappyHands"
        />
      </a>
      {navigation && <Button
        className="hh-site-menu-toggle"
        type="button"
        aria-controls="site-navigation"
        aria-expanded="false"
        aria-label={lang === "zh" ? "菜单" : "Menu"}
      >
        <Icon name="menu" />
      </Button>}
      {navigation && <nav
        id="site-navigation"
        aria-label={lang === "zh" ? "主要导航" : "Main navigation"}
      >
        {siteNavigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={
              item.href ===
              (active === "/apps/portal/#explore"
                ? "/components/?provider=systems"
                : active)
                ? "page"
                : undefined
            }
          >
            {lang === "zh" ? item.zh : item.en}
          </a>
        ))}
      </nav>}
      <div className="hh-site-tools">
        <Button
          onClick={onTheme}
          type="button"
          aria-label={
            lang === "zh"
              ? `切换到${dark ? "浅色" : "深色"}模式`
              : `Switch to ${dark ? "light" : "dark"} mode`
          }
        >
          <Icon name={dark ? "sun" : "moon"} />
          <span className="hh-tool-label">
            {dark
              ? lang === "zh"
                ? "浅色"
                : "Light"
              : lang === "zh"
                ? "深色"
                : "Dark"}
          </span>
        </Button>
        <Button
          onClick={onLanguage}
          type="button"
          aria-label={lang === "zh" ? "English" : "中文"}
        >
          <Icon name="globe" />
          <span className="hh-tool-label">
            {lang === "zh" ? "English" : "中文"}
          </span>
        </Button>
      </div>
    </header>
  );
}
