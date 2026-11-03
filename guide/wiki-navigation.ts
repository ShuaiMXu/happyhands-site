import {iconMarkup} from '../packages/ui/icons.ts';
import {siteNavigation} from '../packages/ui/site-navigation.ts';
type Language = 'zh' | 'en';
export type WikiSection = readonly [string, string];
const core = 'https://github.com/ShuaiMXu/happyhands';
const pages = [
 {path:'/guide/', zh:'HappyHands 使用指南', en:'The HappyHands guide'},
 {path:'/ai-ui-review/', zh:'AI 界面评审，让每次修改有依据', en:'AI UI review for agent-built websites'},
 {path:'/ai-website-design/', zh:'AI 网站设计，从初稿走向可复核的界面', en:'AI website design, from first build to reviewed UI'},
];
const localized = (path:string,lang:Language) => `${lang==='en'?'/en':''}${path}`;
const escape = (text:string) => text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function pageLinks(lang:Language,path:string) {
 return pages.map(page=>`<a href="${localized(page.path,lang)}"${page.path===path?' aria-current="page"':''}>${escape(page[lang])}</a>`).join('');
}
function sectionLinks(sections:readonly WikiSection[]) {
 return sections.map(([id,title])=>`<a href="#${escape(id)}">${escape(title)}</a>`).join('');
}
export function wikiHeader(lang:Language,path:string) {
 const t=(zh:string,en:string)=>lang==='zh'?zh:en;
 return `<div class="wiki-header-slot"><header class="hh-site-header"><a class="wordmark" href="/apps/portal/" aria-label="HappyHands"><img class="guide-logo-light" src="/brand/happyhands-logo-ink.png" alt="HappyHands"><img class="guide-logo-dark" src="/brand/happyhands-logo-paper.png" alt="HappyHands"></a><button class="hh-site-menu-toggle" type="button" aria-controls="site-navigation" aria-expanded="false" aria-label="${t('菜单','Menu')}">${iconMarkup('menu')}</button><nav id="site-navigation" aria-label="${t('主要导航','Main navigation')}">${siteNavigation.map(x=>`<a href="${x.href}">${x[lang]}</a>`).join('')}</nav><div class="hh-site-tools"><button id="theme-toggle" type="button" aria-label="${t('切换主题','Switch theme')}">${iconMarkup('moon')}<span class="hh-tool-label">${t('深色','Dark')}</span></button><a class="guide-language" href="${localized(path,lang==='zh'?'en':'zh')}" lang="${lang==='zh'?'en':'zh-CN'}" hreflang="${lang==='zh'?'en':'zh-CN'}">${iconMarkup('globe')}${t('English','中文')}</a></div></header></div>`;
}
export function wikiColumnsStart(lang:Language,path:string,sections:readonly WikiSection[]) {
 const t=(zh:string,en:string)=>lang==='zh'?zh:en;
 return `<div class="wiki-columns"><aside class="wiki-pages" aria-label="${t('指南章节','Guide pages')}" data-more-above="false" data-more-below="false"><div class="wiki-page-scroll"><nav aria-label="${t('指南章节','Guide pages')}">${pageLinks(lang,path)}</nav></div><button type="button" data-wiki-scroll="up" tabindex="-1" aria-hidden="true">${iconMarkup('down')}</button><button type="button" data-wiki-scroll="down" tabindex="-1" aria-hidden="true">${iconMarkup('down')}</button></aside><nav class="guide-contents wiki-outline" aria-label="${t('本页内容','On this page')}">${sectionLinks(sections)}</nav>`;
}
export function wikiColumnsEnd(lang:Language,path:string) {
 const t=(zh:string,en:string)=>lang==='zh'?zh:en;
 const index=pages.findIndex(page=>page.path===path),prev=pages[index-1],next=pages[index+1];
 return `<div class="wiki-article-end"><section class="wiki-help"><h2>${t('仍需帮助？','Still need help?')}</h2><a href="${core}/issues">${t('提交问题或反馈','Report an issue or share feedback')} ${iconMarkup('external')}</a><a href="${core}/blob/main/docs/harness.md">${t('Harness 文档','Harness documentation')} ${iconMarkup('external')}</a></section><nav class="wiki-pagination" aria-label="${t('前后章节','Previous and next pages')}"><a rel="prev" href="${prev?localized(prev.path,lang):'/apps/portal/'}"><span>${t('上一页','Previous')}</span>${prev?escape(prev[lang]):'HappyHands'}</a>${next?`<a rel="next" href="${localized(next.path,lang)}"><span>${t('下一页','Next')}</span>${escape(next[lang])}</a>`:''}</nav></div></div>`;
}
export function wikiFooter(lang:Language,path:string,sections:readonly WikiSection[]) {
 const t=(zh:string,en:string)=>lang==='zh'?zh:en;
 const sheet=(id:string,title:string,links:string)=>`<dialog class="wiki-sheet" id="${id}" aria-labelledby="${id}-title"><div class="wiki-sheet-heading"><h2 id="${id}-title">${title}</h2><button type="button" data-wiki-close aria-label="${t('关闭','Close')}">${iconMarkup('close')}</button></div><nav aria-label="${title}">${links}</nav></dialog>`;
 return `<footer class="guide-footer"><div class="wiki-footer-grid"><div class="wiki-footer-brand"><a href="/apps/portal/">HappyHands</a><a href="/llms.txt">${t('产品信息摘要','Product facts')}</a></div><nav class="wiki-footer-section" aria-label="${t('指南章节','Guide pages')}"><h2>${t('指南章节','Guide pages')}</h2>${pageLinks(lang,path)}</nav><nav class="wiki-footer-section" aria-label="${t('设计资源','Resources')}"><h2>${t('设计资源','Resources')}</h2>${siteNavigation.map(item=>`<a href="${item.href}">${item[lang]}</a>`).join('')}</nav><nav class="wiki-footer-section" aria-label="${t('仍需帮助？','Still need help?')}"><h2>${t('仍需帮助？','Still need help?')}</h2><a href="${core}/issues">${t('提交问题或反馈','Report an issue or share feedback')}</a><a href="${core}/blob/main/docs/harness.md">${t('Harness 文档','Harness documentation')}</a><a href="${core}">${t('核心源码','Core source')}</a></nav></div></footer><div class="wiki-mobile-bar"><button type="button" data-wiki-open="wiki-pages-dialog" aria-haspopup="dialog" aria-controls="wiki-pages-dialog">${iconMarkup('menu')}<span>${t('指南章节','Guide pages')}</span></button><button type="button" data-wiki-open="wiki-outline-dialog" aria-haspopup="dialog" aria-controls="wiki-outline-dialog">${iconMarkup('down')}<span class="wiki-current-section">${escape(sections[0]?.[1]??t('本页内容','On this page'))}</span></button></div>${sheet('wiki-pages-dialog',t('指南章节','Guide pages'),pageLinks(lang,path))}${sheet('wiki-outline-dialog',t('本页内容','On this page'),sectionLinks(sections))}`;
}
