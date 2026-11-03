const esc=(value:string)=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export function extendedComponentKind(name:string){
 if(/empty state|no results/i.test(name))return 'empty';
 if(/terminal|command|code |syntax|readout|console/i.test(name))return 'code';
 if(/subtitle|title|nameplate|attribution|credit|note|legend|inline.*word|introduction/i.test(name))return 'text';
 if(/signup|submit/i.test(name))return 'action';
 if(/player|showreel|film|gallery|crop|sculpture|canvas|visual|motif|decoration|decorative|backdrop|pattern|polygon|splash|sparkle|cube|scribble|laurel|asterisk|signature/i.test(name))return 'media';
 if(/connector|underline|accent ring/i.test(name))return 'divider';
 if(/histogram|equalizer/i.test(name))return 'diagram';
 if(/logo|wordmark|brand.*(?:mark|lockup)|lockup/i.test(name))return 'brand';
 if(/avatar|portrait/i.test(name))return 'avatar';
 if(/rating|stars/i.test(name))return 'rating';
 if(/loader|loading|spinner|skeleton/i.test(name))return 'loading';
 if(/compare|comparison slider/i.test(name))return 'compare';
 if(/carousel|slider|pagination/i.test(name))return 'carousel';
 if(/tab|segment/i.test(name))return 'tabs';
 if(/modal|dialog|popover|tooltip/i.test(name))return 'dialog';
 if(/chart|graph|map|visualization|diagram/i.test(name))return 'diagram';
 if(/\bstats?\b|statistic|counter|price|metric|number|callout/i.test(name))return 'metric';
 if(/chat|message|conversation/i.test(name))return 'chat';
 if(/swatch|palette/i.test(name))return 'palette';
 if(/progress|stepper|timeline|step /i.test(name))return 'progress';
 if(/breadcrumb/i.test(name))return 'breadcrumb';
 if(/icon|glyph|hamburger|menu trigger|arrow|scroll|cursor|chevron|cue|prompt/i.test(name))return 'icon';
 if(/status|dot|indicator|accent.*(?:bar|line)/i.test(name))return 'status';
 if(/image|photo|illustration|render|mockup|frame|video|thumbnail|media|texture|shape|artwork|graphic|ornament/i.test(name))return 'media';
 if(/quote|testimonial/i.test(name))return 'quote';
 if(/copy|text|annotation|stamp|numeral/i.test(name))return 'text';
 if(/action|control|trigger/i.test(name))return 'action';
 if(/nav|menu|utility bar/i.test(name))return 'navigation';
 if(/rule|border/i.test(name))return 'divider';
 if(/grid|column|row|band|strip|rail|stack|cluster|widget|trust|proof/i.test(name))return 'composition';
 if(/cell|split|module|surface|capsule|ribbon|mosaic|spread|pair|showcase|toolbar|masthead|overlay|highlight|marker|emphasis|identifier|item|bar|box|object/i.test(name))return 'composition';
 return null;
}

/** Authored, inert examples; source descriptions are escaped, never executed. */
export function extendedComponentBody(kind:string,name:string,role:string,zh:boolean){
 const t=(a:string,b:string)=>zh?a:b,label=esc(name),copy=esc(role),sample=t('示例项目','Sample project');
 const shell=(body:string)=>`<section class="extended-demo" style="width:100%;max-width:760px">${body}</section>`;
 const arrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
 switch(kind){
 case 'compare':return shell(`<div style="position:relative;height:180px;border:1px solid currentColor;overflow:hidden;border-radius:8px"><div style="position:absolute;inset:0;background:var(--accent);color:var(--canvas);padding:24px"><h2>${t('调整后','After')}</h2><p>${sample}</p></div><div id="compare-before" style="position:absolute;inset:0 auto 0 0;width:50%;overflow:hidden;background:var(--surface);border-right:2px solid currentColor"><div style="padding:24px;width:300px"><h2>${t('调整前','Before')}</h2><p>${sample}</p></div></div></div><label style="margin-top:16px">${t('拖动比较','Drag to compare')}<input id="compare-range" type="range" min="0" max="100" value="50" style="width:100%;accent-color:var(--accent)"></label><small>${t('前后对照交互示例，非原始产品图片。','Before/after interaction example, not original product images.')}</small><script>document.getElementById('compare-range').oninput=function(){document.getElementById('compare-before').style.width=this.value+'%'};</script>`);
 case 'empty':return shell(`<div style="text-align:center;padding:24px"><h2>${t('暂无项目','No projects yet')}</h2><p>${t('创建项目后，内容会显示在这里。','Your projects will appear here after creation.')}</p><button>${t('创建项目','Create project')}</button></div>`);
 case 'code':return shell(`<pre style="background:var(--surface);border:.5px solid currentColor;padding:24px;overflow:auto"><code>design.tokens\n  primary: var(--accent)\n  surface: var(--surface)\n  text: var(--ink)</code></pre><small>${t('代码区域排版示例，非可执行命令。','Code layout example, not an executable command.')}</small>`);
 case 'brand':return shell(`<div style="display:flex;gap:32px;flex-wrap:wrap;align-items:center"><strong style="font-size:32px;letter-spacing:-.04em">${t('品牌名称','Brand name')}</strong>${/strip|bar|grid|cloud|wall|rail/i.test(name)?'<span>Brand A</span><span>Brand B</span><span>Brand C</span>':''}</div><p style="margin-top:24px">${t('品牌字标排版示意；原始标志请对照来源截图。','Wordmark layout example; consult the source screenshot for the original logo.')}</p>`);
 case 'avatar':return shell(`<div style="display:flex;padding:16px">${['AL','JM','SK'].slice(0,/stack|group/i.test(name)?3:1).map((v,i)=>`<span style="display:grid;place-items:center;width:64px;height:64px;background:var(--surface);border:2px solid var(--accent);border-radius:50%;margin-left:${i?'-12px':'0'}">${v}</span>`).join('')}</div><p>${t('姓名缩写示例，不替代原始人物照片。','Initials illustrate placement, not original portraits.')}</p>`);
 case 'rating':return shell(`<div aria-label="${t('评分示例：5 分','Example rating: 5 out of 5')}" style="font-size:28px;color:var(--accent)">★★★★★</div><p>5.0 / 5</p>`);
 case 'loading':return shell(/skeleton/i.test(name)?'<div class="placeholder-lines"><i></i><i></i><i></i></div>':`<div role="status" aria-label="${t('加载中示例','Loading example')}" style="height:48px;width:48px;border:4px solid var(--surface);border-top-color:var(--accent);border-right-color:var(--accent);border-radius:50%"></div><p style="margin-top:16px">${t('加载状态，静态展示以减少动效。','Loading state, displayed without motion.')}</p>`);
 case 'carousel':return shell(`<div style="display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:16px" tabindex="0" aria-label="${t('横向滚动示例','Horizontal carousel example')}">${[1,2,3].map(n=>`<article style="flex:0 0 75%;scroll-snap-align:start"><h2>${sample} ${n}</h2><p>${copy}</p></article>`).join('')}</div><small>${t('横向滚动查看下一项','Scroll horizontally to see the next item')}</small>`);
 case 'tabs':return shell(`<fieldset style="border:0;padding:0"><legend>${label}</legend><div style="display:flex;gap:16px;flex-wrap:wrap">${[t('概览','Overview'),t('详情','Details'),t('动态','Activity')].map((v,i)=>`<label style="display:flex;align-items:center;gap:8px;padding:12px"><input type="radio" name="sample-tab" ${i===0?'checked':''}>${v}</label>`).join('')}</div></fieldset><p>${copy}</p>`);
 case 'dialog':return shell(`<details style="width:100%"><summary style="cursor:pointer;padding:16px 0">${t('展开浮层内容示例','Expand overlay content example')}</summary><article><h2>${label}</h2><p>${copy}</p><small>${t('此处展示浮层内容与形态，不模拟全屏遮罩。','Shows overlay content and shape without a fullscreen backdrop.')}</small></article></details>`);
 case 'diagram':return shell(`<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">${[t('输入','Input'),t('处理','Process'),t('结果','Result')].map((v,i)=>`${i?arrow:''}<article>${v}</article>`).join('')}</div><p style="margin-top:24px">${t('结构示意，非原始数据或地图。','Structural illustration, not original data or a map.')}</p>`);
 case 'metric':return shell(`<span style="font-size:48px;line-height:1.2;color:var(--accent)">${/price/i.test(name)?'$24':'128'}</span><h2 style="margin-top:16px">${label}</h2><small>${t('示例数值','Illustrative value')}</small>`);
 case 'chat':return shell(`<div style="display:grid;gap:16px"><article style="justify-self:start;max-width:80%">${t('可以查看项目进展吗？','Can I check project progress?')}</article><article style="justify-self:end;max-width:80%;background:var(--accent);color:var(--canvas)">${t('最新设计已准备好。','The latest design is ready.')}</article><label>${t('消息输入示例','Message input example')}<input placeholder="${t('输入消息','Type a message')}"></label></div>`);
 case 'palette':return shell(`<div style="display:flex;gap:20px;flex-wrap:wrap">${['accent','canvas','surface','ink'].map(c=>`<div><div style="background:var(--${c});height:72px;width:72px;border:.5px solid currentColor"></div><small>${c}</small></div>`).join('')}</div>`);
 case 'progress':return shell(`<label>${label}<progress value="2" max="3" style="width:100%;height:16px;accent-color:var(--accent)">2/3</progress></label><ol style="display:flex;justify-content:space-between;gap:24px;padding:24px"><li>${t('准备','Prepare')}</li><li>${t('编辑','Edit')}</li><li>${t('完成','Complete')}</li></ol>`);
 case 'breadcrumb':return shell(`<nav aria-label="${t('位置示例','Breadcrumb example')}"><span>${t('首页','Home')}</span>${arrow}<span>${t('项目','Projects')}</span>${arrow}<strong>${sample}</strong></nav>`);
 case 'icon':return shell(`<div style="display:flex;align-items:center;gap:24px;color:var(--accent)">${/hamburger|menu/i.test(name)?'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>':arrow}<span>${label}</span></div><p style="margin-top:24px">${t('通用图标的尺寸与位置示例。','Generic icon sizing and placement example.')}</p>`);
 case 'status':return shell(`<div style="display:flex;align-items:center;gap:12px"><span style="width:10px;height:10px;border-radius:50%;background:var(--accent)"></span><span>${t('运行中','Active')}</span></div>`);
 case 'media':return shell(`<figure style="margin:0"><div style="aspect-ratio:${/phone/i.test(name)?'9/16':'16/9'};max-height:320px;border:1px solid currentColor;border-radius:12px;background:var(--surface);display:grid;place-items:center"><svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="4" y="8" width="56" height="48" rx="4"/><circle cx="22" cy="24" r="5"/><path d="m8 50 16-15 11 10 9-9 12 14"/></svg></div><figcaption style="margin-top:16px">${t('媒体容器示意，原图请对照来源截图。','Media container example; consult the source screenshot for original artwork.')}</figcaption></figure>`);
 case 'quote':return shell(`<blockquote style="margin:0;font-size:24px;line-height:1.5">${copy||label}</blockquote><p style="margin-top:20px">${t('引言排版示例','Quotation layout example')}</p>`);
 case 'text':return shell(`<h2>${label}</h2><p>${copy}</p>`);
 case 'action':return shell(`<button>${label}</button>`);
 case 'navigation':return shell(`<nav><strong>${sample}</strong><span>${t('概览','Overview')}</span><span>${t('资源','Resources')}</span></nav>`);
 case 'divider':return shell(`<p>${sample}</p><hr style="border:0;border-top:.5px solid currentColor;margin:24px 0"><p>${copy}</p>`);
 case 'composition':case 'bespoke':return shell(`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:24px"><section><h2>${label}</h2><p>${copy}</p></section><article><h3>${sample}</h3><div class="placeholder-lines"><i></i><i></i></div></article></div><small style="margin-top:24px">${t('根据组件用途构建的布局示意，非原站逐像素还原。','Layout interpreted from the component role, not a pixel-exact reconstruction.')}</small>`);
 default:return null;
 }
}
