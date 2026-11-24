import { useEffect, useState } from 'react';

type Finding = { title: string; evidence: string; recommendation: string; x: number; y: number };
export type ReviewResult = { summary: string; findings: Finding[] };
export type ConversationTurn = { role: 'user' | 'assistant'; text: string };

export async function submitReview({ file, task, lang, context, access, signal }: {
  file: File;
  task: string;
  lang: string;
  context: ConversationTurn[];
  access: string;
  signal: AbortSignal;
}): Promise<ReviewResult> {
  const image = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const response = await fetch('/api/online-review', {
    method: 'POST', signal,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + access },
    body: JSON.stringify({ task, lang, context, image, rules: '' }),
  });
  if (!response.ok) throw response.status;
  return response.json();
}

function AnnotatedScreenshot({ result, file, label }: { result: ReviewResult; file: File; label: string }) {
  const [src, setSrc] = useState('');
  const [active, setActive] = useState(0);
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  return <figure className="review-screenshot relative mx-auto w-fit max-w-full" aria-label={label}>
    {src && <img src={src} alt={file.name} className="block max-w-full rounded-card" />}
    {src && result.findings.map((finding, index) => <button type="button" key={index}
      className="absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-xs text-canvas"
      aria-label={finding.title} aria-pressed={active === index} onClick={() => setActive(index)}
      style={{ left: `clamp(12px, ${finding.x * 100}%, calc(100% - 12px))`, top: `clamp(12px, ${finding.y * 100}%, calc(100% - 12px))` }}>
      {index + 1}
    </button>)}
    {result.findings[active] && <figcaption className="sr-only" aria-live="polite">{result.findings[active].title}</figcaption>}
  </figure>;
}

export function ReviewEvidence({ result, file, mode, label }: {
  result: ReviewResult; file: File; mode: 'image' | 'findings'; label: string;
}) {
  if (mode === 'image') return <AnnotatedScreenshot result={result} file={file} label={label} />;
  return <>
    {result.findings.length > 0 && <ol className="mt-3 grid gap-2 text-[13px]">
      {result.findings.map((finding, index) => <li key={index} className="rounded-card border border-line bg-surface p-3">
        <h2 className="font-medium text-ink">{index + 1}. {finding.title}</h2>
        <p className="mt-1 text-ink-2">{finding.evidence}</p>
        <p className="mt-1 text-ink">{finding.recommendation}</p>
      </li>)}
    </ol>}
    <details className="mt-3 text-[13px] text-ink">
      <summary className="mb-2 cursor-pointer">{label}</summary>
      <AnnotatedScreenshot result={result} file={file} label={label} />
    </details>
  </>;
}
