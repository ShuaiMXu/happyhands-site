export type SearchResult = { id: string; label: string; href: string };

export type SearchKeyEvent = {
  key: string;
  isComposing?: boolean;
  nativeEvent?: { isComposing?: boolean };
  target?: unknown;
  preventDefault: () => void;
};

export type SearchKeyState = {
  /** ArrowDown only opens results when the input itself has focus. */
  input: unknown;
  query: string;
  results?: SearchResult[];
  expanded: boolean;
  setOpen: (open: boolean) => void;
  focusInput: () => void;
  focusFirstResult: () => void;
};

/**
 * Search-card key handling, shared by the component and its event-order test.
 *
 * Escape returns focus *before* dismissing on purpose: refocusing the input fires
 * a bubbling focus handler that reopens the panel, so the dismissal has to be the
 * last write. IME composition never consumes a key.
 */
export function handleSearchKeyDown(event: SearchKeyEvent, state: SearchKeyState) {
  if (event.isComposing || event.nativeEvent?.isComposing) return;
  if (event.key === "Escape") {
    event.preventDefault();
    state.focusInput();
    state.setOpen(false);
    return;
  }
  if (event.key !== "ArrowDown" || event.target !== state.input) return;
  if (!state.query.trim() || state.results === undefined) return;
  event.preventDefault();
  if (state.expanded) state.focusFirstResult();
  else state.setOpen(true);
}
