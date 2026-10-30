import ts from 'typescript-compiler';
import fs from 'node:fs';
const dir='packages/ui/shadcn'; const classes=new Set();
for(const name of fs.readdirSync(dir).filter(x=>x.endsWith('.tsx'))){
 let source=fs.readFileSync(`${dir}/${name}`,'utf8').replaceAll('from "cn"','from "./utils"');
 const ast=ts.createSourceFile(name,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 function visit(n){if(ts.isStringLiteral(n))for(const token of n.text.split(/\s+/))if(token)classes.add(token);ts.forEachChild(n,visit)}visit(ast);
 source=source.replace(/className="([^"]+)"/g,(_,s)=>`className={cn(${JSON.stringify(s)})}`);
 fs.writeFileSync(`${dir}/${name}`,source);
}
fs.writeFileSync(`${dir}/classes.json`,JSON.stringify([...classes],null,2));
