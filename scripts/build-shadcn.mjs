import {compile} from '@tailwindcss/node';
import {readFileSync,writeFileSync} from 'node:fs';
const dir='packages/ui/shadcn';
const classes=JSON.parse(readFileSync(`${dir}/classes.json`,'utf8'));
const roles={background:'bg',foreground:'ink',card:'bg-raised','card-foreground':'ink',popover:'bg-raised','popover-foreground':'ink',primary:'primary','primary-foreground':'on-primary',secondary:'bg-sunken','secondary-foreground':'ink',muted:'bg-sunken','muted-foreground':'ink-muted',accent:'bg-hover','accent-foreground':'ink',destructive:'danger',border:'line',input:'line-strong',ring:'ring'};
const variants=readFileSync(`${dir}/variants.css`,"utf8");
const source=`${variants}
@layer theme,base,components,utilities;
@import "tailwindcss/theme.css" layer(theme) prefix(sc);
@import "tailwindcss/utilities.css" layer(utilities) prefix(sc);
@custom-variant dark (&:where(:root[data-hh-theme=dark] *, :root[data-theme=dark] *, .dark *));
@theme inline {${Object.entries(roles).map(([role,token])=>`--color-${role}:var(--hh-${token});`).join('')}
--font-sans:var(--hh-font-sans);--radius-sm:6px;--radius-md:8px;--radius-lg:10px;--radius-xl:14px;--radius-2xl:18px;--radius-3xl:22px;--radius-4xl:26px;}
@layer base {.hh-shadcn{margin:0;box-sizing:border-box;border:0 solid var(--hh-line);font-family:var(--hh-font-sans);}button.hh-shadcn,input.hh-shadcn,textarea.hh-shadcn{font:inherit;}button.hh-shadcn{background:transparent;color:inherit;}}
`;
const result=await compile(source,{base:process.cwd(),onDependency:()=>{}});
writeFileSync(`${dir}/generated.css`,result.build(classes.map(x=>`sc:${x}`)));
