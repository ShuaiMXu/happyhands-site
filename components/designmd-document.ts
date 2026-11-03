/** Read reference text only: archived directives are never executed as code/CSS. */
export function parseDesignDocument(source:string) {
 const normalized=source.replace(/^\uFEFF/,'').replace(/\r\n/g,'\n');
 const front=normalized.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
 const body=front?normalized.slice(front[0].length):normalized;
 const sections:Array<{title:string;id:string}>=[];
 let fenced=false;
 const colorLines:string[]=[];
 let inColors=false;
 for(const line of body.split('\n')){
  if(/^\s*(```|~~~)/.test(line)){fenced=!fenced;continue;}
  if(fenced)continue;
  const heading=line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
  if(heading){
   if(heading[1].length<=2)sections.push({title:heading[2],id:`designmd-section-${sections.length}`});
   inColors=/colou?r|palette|色彩|配色|颜色/i.test(heading[2]);
  }else if(inColors)colorLines.push(line);
 }
 const frontColors=front?.[1].match(/^colors:\s*\n((?:[ \t]+.*\n?|\n)*)/m)?.[1]||'';
 const colors=Array.from(new Set((colorLines.join('\n')+'\n'+frontColors).match(/#[\da-fA-F]{8}\b|#[\da-fA-F]{6}\b|#[\da-fA-F]{4}\b|#[\da-fA-F]{3}\b/g)||[]));
 return {body,frontmatter:front?.[1]||'',sections,colors};
}
