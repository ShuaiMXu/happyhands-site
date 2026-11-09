/** One transient notice at a time; both success and failure have a recovery path. */
export function createFeedback(
  showElement,
  { schedule = setTimeout, cancel = clearTimeout } = {},
) {
  let timer;
  return (message, delay = 1800) => {
    const element = showElement();
    if (!element) return;
    element.textContent = message;
    element.classList.add("show");
    cancel(timer);
    timer = schedule(() => element.classList.remove("show"), delay);
  };
}
