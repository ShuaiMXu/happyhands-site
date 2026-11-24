import { designDemoTheme, validColor, validLength } from './design-demo-theme';
import type { ReferenceSystem } from './ReferenceSpecimen';

export type ReferenceComponent = {
  name: string;
  role: string;
  description: string;
  html?: string;
};
export function componentPreviewKind(name: string) {
  if (/accordion|disclosure|FAQ/i.test(name)) return "disclosure";
  if (/divider|separator|rule line/i.test(name)) return "divider";
  if (/table|data row/i.test(name)) return "table";
  if (/按钮/.test(name)) return "button";
  if (/输入框|搜索框/.test(name)) return "input";
  if (/卡片/.test(name)) return "card";
  if (/选项卡|标签页|\btabs?\b|segmented control/i.test(name)) return "tabs";
  if (/selector|switcher|dropdown|\bselect\b|下拉/i.test(name)) return "select";
  if (/toggle|checkbox|switch/i.test(name)) return "toggle";
  if (/headline|heading|paragraph|eyebrow|caption|label|text block|date stamp/i.test(name)) return "typography";
  if (/list|bullet/i.test(name)) return "list";
  if (/announcement|notification|toast|cookie.*(?:bar|dialog)|alert/i.test(name)) return "notice";
  if (/nav bar|sidebar nav/i.test(name)) return "navigation";
  if (/input|search|field|capture|form/i.test(name)) return "input";
  if (/navigation.*link/i.test(name) && !/bar|header/i.test(name))
    return "button";
  if (/navigation|navbar|top.bar|header/i.test(name)) return "navigation";
  if (/hero|section|banner|footer|container|block/i.test(name))
    return "section";
  if (/button|cta|link/i.test(name)) return "button";
  if (/badge|tag|chip|pill/i.test(name)) return "badge";
  if (/card|panel|tile/i.test(name)) return "card";
  return extendedComponentKind(name) || 'bespoke';
}
export function extendedComponentKind(name:string){
 if(/empty state|no results/i.test(name))return 'empty';
 if(/terminal|command|code |syntax|readout|console/i.test(name))return 'code';
 if(/subtitle|title|nameplate|attribution|credit|note|legend|inline.*word|introduction/i.test(name))return 'text';
 if(/signup|submit/i.test(name))return 'action';
 if(/player|showreel|film|gallery|crop|sculpture|canvas|visual|motif|decoration|decorative|backdrop|pattern|polygon|splash|sparkle|cube|scribble|laurel|asterisk|signature/i.test(name))return 'media';
 if(/connector|underline|accent ring/i.test(name))return 'divider';
 if(/histogram|equalizer/i.test(name))return 'diagram';
 if(/logo|wordmark|brand.*(?:mark|lockup)|lockup/i.test(name))return 'brand';
 if(/avatar|portrait/i.test(name))return 'avatar';
 if(/rating|stars/i.test(name))return 'rating';
 if(/loader|loading|spinner|skeleton/i.test(name))return 'loading';
 if(/compare|comparison slider/i.test(name))return 'compare';
 if(/carousel|slider|pagination/i.test(name))return 'carousel';
 if(/tab|segment/i.test(name))return 'tabs';
 if(/modal|dialog|popover|tooltip/i.test(name))return 'dialog';
 if(/chart|graph|map|visualization|diagram/i.test(name))return 'diagram';
 if(/\bstats?\b|statistic|counter|price|metric|number|callout/i.test(name))return 'metric';
 if(/chat|message|conversation/i.test(name))return 'chat';
 if(/swatch|palette/i.test(name))return 'palette';
 if(/progress|stepper|timeline|step /i.test(name))return 'progress';
 if(/breadcrumb/i.test(name))return 'breadcrumb';
 if(/icon|glyph|hamburger|menu trigger|arrow|scroll|cursor|chevron|cue|prompt/i.test(name))return 'icon';
 if(/status|dot|indicator|accent.*(?:bar|line)/i.test(name))return 'status';
 if(/image|photo|illustration|render|mockup|frame|video|thumbnail|media|texture|shape|artwork|graphic|ornament/i.test(name))return 'media';
 if(/quote|testimonial/i.test(name))return 'quote';
 if(/copy|text|annotation|stamp|numeral/i.test(name))return 'text';
 if(/action|control|trigger/i.test(name))return 'action';
 if(/nav|menu|utility bar/i.test(name))return 'navigation';
 if(/rule|border/i.test(name))return 'divider';
 if(/grid|column|row|band|strip|rail|stack|cluster|widget|trust|proof/i.test(name))return 'composition';
 if(/cell|split|module|surface|capsule|ribbon|mosaic|spread|pair|showcase|toolbar|masthead|overlay|highlight|marker|emphasis|identifier|item|bar|box|object/i.test(name))return 'composition';
 return null;
}

export const sampleFamilies = [
  'button', 'input', 'select', 'toggle', 'card', 'tabs', 'disclosure', 'badge',
  'divider', 'table', 'typography', 'list', 'notice', 'navigation', 'section',
  'composition', 'empty', 'code', 'rating', 'loading', 'compare', 'carousel',
  'dialog', 'metric', 'chat', 'palette', 'progress', 'breadcrumb', 'status', 'quote',
  'media', 'brand', 'diagram', 'icon', 'avatar', 'shape',
] as const;
export type SampleFamily = (typeof sampleFamilies)[number];

const supported = new Set<string>(sampleFamilies);
const aliases: Readonly<Record<string, SampleFamily>> = {
  action: 'button',
  text: 'typography',
};

function sampleFamilyFromContext(component: ReferenceComponent): SampleFamily {
  const name = component.name;
  if (/^page$|detail page|side.by.side|triptych|\bboard\b/i.test(name)) return 'composition';
  if (/product.*(?:preview|screen|mock.?up|display)|poster|screenshot|background|scene|character|mascot|doodle|sticker|device|vignette/i.test(name)) return 'media';
  if (/consent|inline.*notice|notification|error state/i.test(name)) return 'notice';
  if (/popup|launcher/i.test(name)) return 'dialog';
  if (/checkmark|shortcut|QR|FAB|cue/i.test(name)) return 'icon';
  if (/watermark|monogram|seal|certification/i.test(name)) return 'brand';
  if (/step|node|data point|network/i.test(name)) return 'diagram';
  if (/filter|tester|drop zone/i.test(name)) return 'input';
  if (/entry|roster|lineup/i.test(name)) return 'list';
  if (/meta|statement|fine print|byline|lead|phrase|passage|description|word|numerals?|type specimen/i.test(name)) return 'typography';
  // A source can document a custom mark or surface with no portable asset.
  // Show its measurable shape and color without inventing a control role.
  return 'shape';
}

export function designSampleFamily(component: ReferenceComponent): SampleFamily | 'original' {
  if (component.html) return 'original';
  const kind = componentPreviewKind(component.name);
  return aliases[kind] ?? (supported.has(kind) ? kind as SampleFamily : sampleFamilyFromContext(component));
}

export function designSampleTokens(component: ReferenceComponent, get?: (path: string) => string | undefined) {
  const description = component.description;
  const tokenKey = component.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const token = (name: string) => tokenKey && get?.(`components.${tokenKey}.${name}`) || undefined;
  return {
    radius: validLength(token('rounded') ?? description.match(/\b(?:rounded|borderRadius)\s*:\s*["']?([^\s"']+)/i)?.[1]
      ?? description.match(/(\d+(?:\.\d+)?(?:px|rem|em))\s+border-radius/i)?.[1]),
    padding: validLength(token('padding') ?? description.match(/^padding:\s*["']?([^\s"']+)/mi)?.[1]
      ?? description.match(/(\d+(?:\.\d+)?(?:px|rem|em))\s+padding on all sides/i)?.[1]),
    fill: validColor(token('backgroundColor') ?? description.match(/^backgroundColor:\s*["']?(#[\da-f]{3,6})\b/mi)?.[1]),
    ink: validColor(token('textColor')),
    size: validLength(description.match(/(?:^|[\s(])([1-9]\d?(?:\.\d+)?px)(?:\s+diameter|\s+at\b|[)–-]|\s+(?:size|glyph|icon))/i)?.[1]),
    borderless: /no border|borderless|zero border/i.test(description),
  };
}

export function buildOriginalComponentPreview(component: ReferenceComponent, system?: ReferenceSystem) {
  const theme = designDemoTheme('', system);
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; form-action 'none'; base-uri 'none'"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:24px;background:${theme.background};color:${theme.ink};font-family:${theme.font}}*{box-sizing:border-box}</style></head><body inert>${component.html ?? ''}</body></html>`;
}
