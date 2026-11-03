import runtime from './preview-select-bundle.json';
/** Shared Radix controls for authored examples only; never injected into source HTML. */
export const previewControlScript = runtime.js.replace(/<\/script/gi, '<\\/script');
export const previewControlStyles = `
body:has(>label .preview-select){min-height:300px;align-content:start}
.preview-select{display:block;width:100%;max-width:320px;min-width:0;color:var(--surface-ink,var(--ink))}
.preview-select select[hidden]{display:none!important}
.preview-select-trigger{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-width:0;min-height:44px;padding:10px 12px;font:inherit;line-height:1.5;text-align:start;color:var(--surface-ink,var(--ink));background:var(--surface);border:.5px solid var(--control-border,currentColor);border-radius:var(--control-radius,8px);cursor:pointer;filter:none!important}
.preview-select-trigger>span:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.preview-select-trigger svg,.preview-select-check svg{display:block;width:16px;height:16px;flex:none}
.preview-select-trigger:focus-visible{outline:2px solid currentColor;outline-offset:3px}
.preview-select-trigger:disabled{opacity:.5;cursor:not-allowed}
.preview-select-popup{box-sizing:border-box;z-index:100;min-width:var(--radix-select-trigger-width);max-width:calc(100vw - 16px);max-height:var(--radix-select-content-available-height);overflow:auto;padding:6px;border:.5px solid var(--control-border,currentColor);border-radius:12px;background:var(--surface);color:var(--surface-ink,var(--ink));box-shadow:0 6px 20px #0002;font:inherit}
.preview-select-option{position:relative;display:flex;align-items:center;min-height:44px;padding:10px 36px 10px 12px;border-radius:6px;line-height:1.5;cursor:pointer;outline:none;overflow-wrap:anywhere}
.preview-select-option[data-state=checked]{background:color-mix(in srgb,currentColor 8%,transparent)}
.preview-select-option[data-highlighted]{background:color-mix(in srgb,currentColor 14%,transparent);outline:1px solid currentColor;outline-offset:-1px}
.preview-select-option[data-disabled]{opacity:.45;pointer-events:none}
.preview-select-check{position:absolute;inset-inline-end:12px;top:50%;transform:translateY(-50%);display:flex}
@media(forced-colors:active){.preview-select-trigger,.preview-select-popup{border-color:ButtonText}.preview-select-option[data-highlighted]{outline:2px solid Highlight}}
`;
export const previewSelect = (markup:string) => `<span class="preview-select">${markup}</span>`;
