import {build} from 'vite';
import {writeFileSync} from 'node:fs';
const result=await build({configFile:false,logLevel:'error',define:{'process.env.NODE_ENV':JSON.stringify('production')},build:{write:false,minify:true,lib:{entry:'packages/component-studio/runtime.tsx',name:'HappyHandsComponent',formats:['iife']},cssCodeSplit:false}});
const output=Array.isArray(result)?result[0].output:result.output;
writeFileSync('packages/component-studio/runtime-bundle.json',JSON.stringify({js:output.filter(x=>x.type==='chunk').map(x=>x.code).join('\n'),css:output.filter(x=>x.type==='asset'&&x.fileName.endsWith('.css')).map(x=>String(x.source)).join('\n')}));
