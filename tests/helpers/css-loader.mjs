import { readFile } from 'node:fs/promises';

export async function load(url, context, nextLoad) {
  if (url.endsWith('.css')) return { format: 'module', source: 'export default {};', shortCircuit: true };
  // Server-rendering assertions cover React shell markup. The Solid islands
  // mount only in a browser and are exercised against the Vite build.
  if (url.endsWith('.solid.tsx')) {
    const code = await readFile(new URL(url), 'utf8');
    const names = [...code.matchAll(/^export function (mount\w+)\(/gm)].map(match => match[1]);
    const source = names.map(name =>
      `export function ${name}() { throw new Error('Mount Solid controls in the Vite browser tests.'); }`,
    ).join('\n');
    return { format: 'module', source, shortCircuit: true };
  }
  return nextLoad(url, context);
}
