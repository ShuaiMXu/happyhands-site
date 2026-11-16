import { exampleOverride } from "./source-example-overrides.mjs";
import { readFile, readdir, writeFile, mkdir, rm } from "node:fs/promises";
import ts from "typescript-compiler";
const systems = [
  "sodium",
  "glaze",
  "quartz",
  "lime",
  "meridian-mono",
  "meridian-glass",
  "meridian-slate",
  "meridian-clay",
];
const manifest = {};
const nameSafe = (file) => file.replace(/\.md$/, "");
for (const system of systems) {
  const base = system.startsWith("meridian-")
    ? `public/collections/brand-systems/${system}`
    : `public/design-how/${system}`;
  const source = `${base}/src/registry/${system}`,
    exports = new Map();
  for (const section of ["ui", "ai", "blocks"]) {
    let files;
    try {
      files = await readdir(`${source}/${section}`);
    } catch {
      continue;
    }
    for (const file of files.filter((f) => /\.tsx?$/.test(f))) {
      const code = await readFile(`${source}/${section}/${file}`, "utf8"),
        ast = ts.createSourceFile(file, code, 99, true, ts.ScriptKind.TSX);
      for (const node of ast.statements) {
        if (
          ts.isExportDeclaration(node) &&
          !node.isTypeOnly &&
          node.exportClause &&
          ts.isNamedExports(node.exportClause)
        )
          for (const e of node.exportClause.elements)
            if (!e.isTypeOnly && !exports.has(e.name.text))
              exports.set(e.name.text, `${section}/${file}`);
        if (
          node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) &&
          node.name &&
          !ts.isInterfaceDeclaration(node) &&
          !ts.isTypeAliasDeclaration(node) &&
          !exports.has(node.name.text)
        )
          exports.set(node.name.text, `${section}/${file}`);
      }
    }
  }
  const icon = await readFile(`${source}/icon.tsx`, "utf8").catch(() => "");
  for (const m of icon.matchAll(
    /(?:export\s*\{([^}]+)\}|export (?:const|function) (\w+))/g,
  )) {
    for (const name of (m[1] || m[2] || "")
      .split(",")
      .map((x) =>
        x
          .trim()
          .split(/\s+as\s+/)
          .at(-1),
      )
      .filter(Boolean))
      if (!exports.has(name)) exports.set(name, "icon.tsx");
  }
  const out = `systems/preview/generated/${system}/examples`;
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  manifest[system] = {};
  for (const file of await readdir(`${base}/components`)) {
    const doc = await readFile(`${base}/components/${file}`, "utf8"),
      match = doc.match(/## Minimal example\s*```(?:tsx|jsx)\n([\s\S]*?)```/);
    if (!match) continue;
    const code = exampleOverride(system, nameSafe(file)) || match[1].trim();
    if (!code.startsWith("<")) continue;
    const ast = ts.createSourceFile(
        "example.tsx",
        `const example = <>${code}</>`,
        99,
        true,
        ts.ScriptKind.TSX,
      ),
      refs = new Set(),
      locals = new Set(["example"]);
    function visit(n) {
      if (ts.isParameter(n) && ts.isIdentifier(n.name)) locals.add(n.name.text);
      if (ts.isIdentifier(n)) {
        const p = n.parent;
        if (
          !(ts.isPropertyAccessExpression(p) && p.name === n) &&
          !(ts.isPropertyAssignment(p) && p.name === n) &&
          !(ts.isJsxAttribute(p) && p.name === n) &&
          !(ts.isJsxAttribute(p) && p.initializer === n) &&
          !ts.isJsxClosingElement(p) &&
          !/^[a-z]/.test(n.text) &&
          n.text !== "React"
        )
          refs.add(n.text);
        else if (
          /^[a-z]/.test(n.text) &&
          !ts.isJsxAttribute(p) &&
          !(ts.isPropertyAccessExpression(p) && p.name === n) &&
          !(ts.isPropertyAssignment(p) && p.name === n) &&
          !ts.isJsxOpeningElement(p) &&
          !ts.isJsxClosingElement(p) &&
          !ts.isJsxSelfClosingElement(p)
        )
          refs.add(n.text);
      }
      ts.forEachChild(n, visit);
    }
    visit(ast);
    if (ast.parseDiagnostics.length) continue;
    const imports = [],
      missing = [];
    for (const ref of refs) {
      if (
        locals.has(ref) ||
        [
          "Date",
          "Math",
          "Array",
          "JSON",
          "Number",
          "String",
          "undefined",
        ].includes(ref)
      )
        continue;
      if (exports.has(ref))
        imports.push(
          `import {${ref}} from '../${exports.get(ref).replace(/\.tsx?$/, "")}';`,
        );
      else missing.push(ref);
    }
    const bindings = [];
    const unsupported = [];
    const scalar = {
      running: "false",
      streaming: "false",
      saving: "false",
      failed: "false",
      firstToken: "false",
      done: "64",
      now: "2400",
      startedAt: "0",
      started: "0",
      seconds: "2",
      elapsed: "2400",
      loaded: "640",
      percent: "64",
      page: "1",
      today: "new Date('2026-10-13T12:00:00Z')",
      step: "{active:'Writing partitions'}",
      file: "{name:'report.csv',type:'text/csv',size:1000}",
      user: "{name:'Alex Morgan',initials:'AM'}",
      ticket: "{id:'T-1042'}",
      url: "'https://example.com/project'",
      trace: "{id:'trace-01-import-records-1204'}",
      available: "1250",
      answer: "'The report is ready.'",
      text: "'The report is ready.'",
      textSoFar: "'The report is ready.'",
      draft: "'Review this report'",
      runId: "'run-01'",
      phase: "'complete'",
      status: "'idle'",
      call: "{endedAt:Date.now()-60000,undoUntil:Date.now()+600000}",
      toolCall: "{id:'call-01',name:'search',status:'completed'}",
      source: "'const total = items.length;'",
      query: "'SELECT * FROM orders LIMIT 10;'",
      jobs: "records",
      runs: "records",
      calls: nameSafe(file) === "chart" ? "records" : "[]",
      rows: nameSafe(file) === "chart" ? "records" : "'3 records'",
      regions: "options",
      models: "options",
      languages: "options",
      accounts: "options",
      pipelines: "options",
      agents: "options",
      friends: "options",
      statusOptions: "options",
      options: "options",
      keys: "[]",
      lines: "[]",
      reasoningParts: "[]",
      parts: "[]",
      files: "[]",
      selected: "['run-01','run-02']",
      anySet: "false",
      loading: "false",
      reloading: "false",
      error: "''",
      limit: "50",
      rules: "{refundSmall:'auto',refundLarge:'ask'}",
    };
    for (const ref of missing) {
      if (ref === "run") {
        imports.push("import {run} from '../../../example-data';");
        continue;
      }
      if (ref === "on") {
        bindings.push("const [on,setOn]=React.useState(true);");
        continue;
      }
      if (["setOn"].includes(ref)) continue;
      if (ref === "open") {
        bindings.push("const [open,setOpen]=React.useState(false);");
        continue;
      }
      if (ref === "setOpen") continue;
      if (ref === "value") {
        bindings.push('const [value,setValue]=React.useState("");');
        continue;
      }
      if (ref === "setValue") continue;
      if (ref === "rules") {
        bindings.push(
          `const [rules,setRules]=React.useState(${scalar.rules});`,
        );
        continue;
      }
      if (ref === "save" && missing.includes("rules")) {
        bindings.push(
          "const save=(key:string,value:string)=>setRules(r=>({...r,[key]:value}));",
        );
        continue;
      }
      if (ref in scalar) {
        if (ref !== "options") bindings.push(`const ${ref}=${scalar[ref]};`);
        continue;
      }
      if (
        /^(set|save|send|stop|retry|clear|remove|undo|open|check|pick|publish|deploy|join|verify|rerun|reload|pay|copy|show)/.test(
          ref,
        )
      ) {
        bindings.push(
          `const ${ref}=async (..._args:any[])=>{setFeedback('Preview updated')};`,
        );
        continue;
      }
      unsupported.push(ref);
    }
    if (unsupported.length) continue;
    const name = file.replace(/\.md$/, "");
    await writeFile(
      `${out}/${name}.tsx`,
      `import React from 'react';\nimport {options,records} from '../../../example-data';\n${imports.join("\n")}\nexport default function Example(){const [feedback,setFeedback]=React.useState('');${bindings.join("\n")}return <>${code}<span role="status">{feedback}</span></>}\n`,
    );
    manifest[system][name] = {
      document: `${base.replace(/^public\//, "")}/components/${file}`,
    };
  }
}
const blocks = JSON.parse(
  await readFile("systems/preview/generated/catalog.json", "utf8"),
);
for (const [system, { blocks: items }] of Object.entries(blocks)) {
  const files = [...new Set(items.map((x) => x.file))];
  for (const file of files) {
    const choices = items.filter((x) => x.file === file);
    const match =
      choices.find((x) => x.name.toLowerCase() === file.replaceAll("-", "")) ||
      choices.at(-1);
    const out = `systems/preview/generated/${system}/examples/${file}.tsx`;
    await writeFile(
      out,
      `import React from 'react';import {${match.name}} from '../blocks/${file}';export default function Example(){const [range,setRange]=React.useState('24h');return <${match.name} range={range} onRangeChange={setRange}/>}`,
    );
    manifest[system][file] = { block: match.name };
  }
}
for (const system of systems) {
  const family =
    {
      "meridian-mono": "sodium",
      "meridian-glass": "glaze",
      "meridian-slate": "quartz",
      "meridian-clay": "lime",
    }[system] || system;
  const extra = {};
  if (family === "lime") {
    extra["list-item-menu"] =
      `import {ListItemMenu} from '../ui/list-item-menu';import {DropdownMenuItem} from '../ui/dropdown-menu';export default function Example(){return <ListItemMenu label="More actions"><DropdownMenuItem>Edit</DropdownMenuItem><DropdownMenuItem>Archive</DropdownMenuItem></ListItemMenu>}`;
    extra.toast = `import {ToastProvider,useToast} from '../ui/toast';import {Button} from '../ui/button';function Demo(){const toast=useToast();return <Button onClick={()=>toast.show({title:'Changes saved'})}>Show notification</Button>}export default function Example(){return <ToastProvider><Demo/></ToastProvider>}`;
    extra.collapsible = `import {Collapsible,CollapsibleTrigger,CollapsibleContent} from '../ui/collapsible';export default function Example(){return <Collapsible><CollapsibleTrigger>Details</CollapsibleTrigger><CollapsibleContent>Three records were checked.</CollapsibleContent></Collapsible>}`;
  }
  if (family === "quartz") {
    extra.mention = `import {Mention} from '../ai/mention';export default function Example(){return <p>Read <Mention type="file">report.csv</Mention></p>}`;
    extra["bulk-action-bar"] =
      `import {BulkActionBar,BulkAction} from '../ui/bulk-action-bar';export default function Example(){const [count,setCount]=React.useState(2);return <BulkActionBar count={count} noun={['record','records']} onClear={()=>setCount(0)}><BulkAction onClick={()=>setCount(0)}>Archive</BulkAction></BulkActionBar>}`;
    extra["page-header"] =
      `import {PageHeader,PageHeaderTitle,PageHeaderDescription} from '../ui/page-header';export default function Example(){return <PageHeader><PageHeaderTitle>Project overview</PageHeaderTitle><PageHeaderDescription>Recent runs and deployment status.</PageHeaderDescription></PageHeader>}`;
    extra["send-button"] =
      `import {SendButton} from '../ai/send-button';export default function Example(){const [status,setStatus]=React.useState('ready');return <SendButton status={status} onClick={()=>setStatus('streaming')} onStop={()=>setStatus('ready')}/>}`;
  }
  extra.icon = `import * as icons from '../icon';export default function Example(){return <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>{Object.entries(icons).filter(([name,value])=>name!=='Icon'&&/^[A-Z]/.test(name)&&(typeof value==='function'||typeof value==='object')).slice(0,24).map(([name,icon])=><icons.Icon key={name} icon={icon} size={24}/>)}</div>}`;
  for (const [name, code] of Object.entries(extra)) {
    await writeFile(
      `systems/preview/generated/${system}/examples/${name}.tsx`,
      `import React from 'react';${code}`,
    );
    manifest[system][name] = { fixture: true };
  }
}
await writeFile(
  "systems/preview/generated/examples.json",
  JSON.stringify(manifest, null, 2),
);
await writeFile(
  "public/resources/v1/examples.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  "Original documented examples:",
  Object.values(manifest).reduce((n, v) => n + Object.keys(v).length, 0),
);
