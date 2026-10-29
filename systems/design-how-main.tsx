import React from "react";
import { createRoot } from "react-dom/client";
import { SiteHeader } from "../packages/ui/SiteHeader";
import { SystemBreadcrumb } from "../packages/ui/SystemBreadcrumb";
import { useSitePreferences } from "../packages/ui/useSitePreferences";
import {
  DesignHowLibrary,
  designHowSystems,
} from "../components/DesignHowLibrary";
import "../packages/design-tokens/happyhands.css";
import "../packages/ui/site-layout.css";
import "../packages/ui/system-page.css";
import "../packages/ui/owned-ui.css";
function App() {
  const { lang, dark, toggleTheme, toggleLanguage } = useSitePreferences();
  const system = location.pathname.split("/")[2];
  const data = designHowSystems.find((s) => s.id === system)!;
  return (
    <>
      <SiteHeader
        lang={lang}
        dark={dark}
        onTheme={toggleTheme}
        onLanguage={toggleLanguage}
      />
      <main className="design-how-page" id="main-content">
        <SystemBreadcrumb current={data.name} lang={lang} />
        <h1>{data.name}</h1>
        <DesignHowLibrary system={system} lang={lang} />
      </main>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
