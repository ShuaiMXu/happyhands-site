import "../packages/design-tokens/happyhands.css";
import "../packages/ui/site-layout.css";
import "../packages/ui/site-shell.css";
import "../packages/ui/icons.css";
import "./style.css";
import {readTheme,savePreference} from "../packages/ui/site-preferences";
import {setupSiteMenu} from "../packages/ui/site-menu";
import {iconMarkup} from "../packages/ui/icons";
const lang=location.pathname.startsWith("/en/")?"en":"zh";
savePreference("pd-lang",lang);
const button=document.querySelector<HTMLButtonElement>("#theme-toggle");
function applyTheme(){const theme=readTheme();document.documentElement.dataset.theme=theme;document.documentElement.dataset.hhTheme=theme;document.documentElement.style.colorScheme=theme;if(button)button.innerHTML=iconMarkup(theme==="dark"?"sun":"moon")+`<span class="hh-tool-label">${lang==="zh"?(theme==="dark"?"浅色":"深色"):(theme==="dark"?"Light":"Dark")}</span>`;}
button?.addEventListener("click",()=>{savePreference("hh-theme",readTheme()==="dark"?"light":"dark");applyTheme()});
matchMedia("(prefers-color-scheme: dark)").addEventListener("change",applyTheme);applyTheme();
setupSiteMenu(document.querySelector<HTMLElement>(".hh-site-header")!,lang);
