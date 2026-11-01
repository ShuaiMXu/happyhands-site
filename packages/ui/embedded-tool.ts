import './embedded-tool.css';
if(new URLSearchParams(location.search).get('embedded')==='1'){
 document.documentElement.dataset.embeddedTool='true';
 window.addEventListener('message',event=>{
  if(event.source===window.parent&&event.origin===location.origin&&event.data?.type==='hh:tool-active'){
   window.dispatchEvent(new Event('hh:preview-resume'));
  }
 });
 const start=()=>{
  const root=document.getElementById('root')||document.getElementById('setup-page')||document.body;
  let pending=0;
  const send=()=>{cancelAnimationFrame(pending);pending=requestAnimationFrame(()=>{
   const height=Math.ceil(root.getBoundingClientRect().bottom+window.scrollY+24);
   window.parent.postMessage({type:'hh:tool-height',height},location.origin);
  });};
  new ResizeObserver(send).observe(root);window.addEventListener('resize',send);send();
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
}
