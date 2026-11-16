// Local demo data only. No requests, credentials, or production actions.
export const options = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
];
export const records = [
  {
    id: "run-01",
    name: "Daily sync",
    status: "completed",
    rows: 1204,
    duration: 1200,
    day: "Mon",
    calls: 24,
    value: 24,
  },
  {
    id: "run-02",
    name: "Import",
    status: "completed",
    rows: 826,
    duration: 860,
    day: "Tue",
    calls: 32,
    value: 32,
  },
  {
    id: "run-03",
    name: "Export",
    status: "failed",
    rows: 0,
    duration: 400,
    day: "Wed",
    calls: 18,
    value: 18,
  },
];
export const run = {
  id: "run-01",
  status: "completed",
  finishedAt: "2026-10-13T09:00:00Z",
  startedAt: "2026-10-13T08:59:58Z",
  createdAt: "2026-10-13T08:59:58Z",
  name: "Daily sync",
  traceId: "trace-21",
};
