// Optional product inputs for the upstream primitives. The unmodified versions
// remain in the registry archive for source downloads and attribution.
function replace(source, from, to) {
  if (!source.includes(from)) throw new Error('Beautiful UI source changed: ' + from);
  return source.replace(from, to);
}

export function adaptPromptBar(source) {
  const edits = [
    ['  onSend,\n', '  onSend,\n  review,\n'],
    ['  onSend?: (text: string) => void;', '  onSend?: (text: string, screenshot?: File) => void;\n  review?: { language: string; busy?: boolean };'],
    ['  const pill =', `  const pickerRef = useRef<HTMLInputElement>(null);
  const [screenshot, setScreenshot] = useState<File>();
  const [invalidScreenshot, setInvalidScreenshot] = useState(false);
  const zh = review?.language === "zh";
  function attachScreenshot(file?: File) {
    if (!file) return;
    const valid = ["image/png", "image/jpeg", "image/webp"].includes(file.type) && file.size > 0 && file.size <= 3 * 1024 * 1024;
    setInvalidScreenshot(!valid);
    if (valid) {
      setScreenshot(file);
      setAttachments([file.name]);
      setDismissed(true);
    }
  }
  const pill =`],
    ['  const token = dismissed ? null', '  const token = dismissed || review ? null'],
    ['    menu === "at"\n      ? SOURCES', '    menu === "at"\n      ? review ? [{ key: "review-screenshot", name: zh ? "添加截图" : "Attach screenshot", desc: "PNG, JPG, WebP" }] : SOURCES'],
    ['    const source = SOURCES.find((s) => s.key === row.key);', `    if (review && row.key === "review-screenshot") {
      closeMenus();
      pickerRef.current?.click();
      return;
    }
    const source = SOURCES.find((s) => s.key === row.key);`],
    ['  const canSend = draft.trim().length > 0 || attachments.length > 0;', '  const canSend = !review?.busy && (draft.trim().length > 0 || attachments.length > 0);'],
    ['    onSend?.(draft.trim());', '    onSend?.(review ? draft.trim().slice(0, 2000) : draft.trim(), screenshot);\n    setScreenshot(undefined);\n    setInvalidScreenshot(false);'],
    ['        {attachments.length > 0 && (', `        {review && <input hidden ref={pickerRef} type="file" accept="image/png,image/jpeg,image/webp"
          onChange={(event) => {
            attachScreenshot(event.target.files?.[0]);
            event.target.value = "";
            inputRef.current?.focus();
          }} />}
        {invalidScreenshot && <p className="px-2 text-xs text-ink-2" role="alert">
          {zh ? "请选择 3 MB 以内的 PNG、JPG 或 WebP。" : "Choose a PNG, JPG or WebP up to 3 MB."}
        </p>}
        {attachments.length > 0 && (`],
    ['                  onClick={() => setAttachments((current) => current.filter((_, j) => j !== i))}', '                  onClick={() => {\n                    if (review) setScreenshot(undefined);\n                    setAttachments((current) => current.filter((_, j) => j !== i));\n                  }}'],
    ['            aria-label="Add attachments and sources"', '            aria-label={zh ? "添加附件" : "Add attachments and sources"}'],
    ['            onKeyDown={(event) => {\n              if (menu', `            maxLength={review ? 2000 : undefined}
            onPaste={(event) => {
              if (!review) return;
              const file = Array.from(event.clipboardData.files).find((item) => item.type.startsWith("image/"));
              if (file) {
                event.preventDefault();
                attachScreenshot(file);
              }
            }}
            onKeyDown={(event) => {
              if (event.nativeEvent.isComposing || event.keyCode === 229) return;
              if (menu`],
    ['            aria-label="Prompt"', '            aria-label={zh ? "审查指令" : "Prompt"}'],
    ['            aria-label="Choose model"', '            aria-label={review ? "HappyHands Review" : "Choose model"}\n            disabled={Boolean(review)}'],
    ['            {model.name}', '            {review ? "HappyHands Review" : model.name}'],
    ['            aria-pressed={listening}', '            aria-pressed={listening}\n            disabled={Boolean(review)}'],
    ['            aria-label="Send"', '            aria-label={zh ? "发送指令" : "Send"}'],
  ];
  for (const [from, to] of edits) source = replace(source, from, to);
  return source;
}

export function adaptSidebar(source) {
  source = replace(source, '  activeTitle?: string | null;', '  workspaceName?: string;\n  activeTitle?: string | null;');
  source = replace(source, 'export default function SidebarNav({', 'export default function SidebarNav({\n  workspaceName,');
  source = replace(source, 'ref={workspaceButtonRef}', 'ref={workspaceButtonRef}\n            disabled={Boolean(workspaceName)}');
  source = source.replaceAll('{WORKSPACE.name}', '{workspaceName || WORKSPACE.name}');
  // The original demo workspace menu uses its own identity.
  source = replace(source, '{workspaceName || WORKSPACE.name}', '{WORKSPACE.name}');
  source = replace(source, '{NAV_ITEMS.map((item)', '{NAV_ITEMS.filter((item) => !workspaceName || item.key !== "invite").map((item)');
  return source;
}
