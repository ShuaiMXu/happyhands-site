export function autoSizeFrame(
  frame: HTMLIFrameElement,
  type = "hh:tool-height",
  opaque = false,
) {
  const receive = (event: MessageEvent) => {
    if (
      event.source !== frame.contentWindow ||
      event.origin !== (opaque ? "null" : location.origin) ||
      event.data?.type !== type
    )
      return;
    const height = event.data.height;
    if (
      typeof height !== "number" ||
      !Number.isFinite(height) ||
      height < 100 ||
      height > 100000 ||
      frame.closest("[hidden]")
    )
      return;
    const next = Math.ceil(height);
    if (Math.abs(frame.getBoundingClientRect().height - next) > 1)
      frame.style.height = `${next}px`;
  };
  window.addEventListener("message", receive);
  return () => window.removeEventListener("message", receive);
}
