/** Shared geometry for authored examples only; never injected into source HTML. */
export const previewControlStyles = `
.preview-select{position:relative;display:block;width:100%;max-width:320px;min-width:0;color:var(--surface-ink,var(--ink))}
.preview-select select{appearance:none;-webkit-appearance:none;display:block;width:100%;max-width:100%;min-width:0;min-height:44px;padding:10px 44px 10px 12px;font:inherit;line-height:1.5;color:inherit;background:var(--surface);border:1px solid var(--control-border,currentColor);border-radius:var(--control-radius,8px);cursor:pointer}
.preview-select svg{position:absolute;inset-inline-end:14px;top:50%;transform:translateY(-50%);width:16px;height:16px;pointer-events:none;flex:none}
.preview-select select:focus-visible{outline:2px solid currentColor;outline-offset:3px}
@media(forced-colors:active){.preview-select select{border-color:ButtonText}.preview-select svg{color:ButtonText}}
`;
export const previewSelect = (markup:string) => `<span class="preview-select">${markup}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span>`;
