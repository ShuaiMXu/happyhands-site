import references from './resource-feed-data.json';
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const systems = ['happyhands','quartz','lime','sodium','glaze'];
const components = [['shift-card','Shift Card'],['texture-button','Texture Button'],['minimal-card','Minimal Card'],['texture-card','Texture Card'],['cosmic-button','Cosmic Button'],['timer','Timer'],['cutout-card','Cutout Card'],['dynamic-island','Dynamic Island'],['choice-poll','Choice Poll'],['feature-voting','Feature Voting'],['popover-form','Popover Form'],['base-select','Select'],["direction-aware-tabs", "Direction Aware Tabs"],["feature-carousel", "Feature Carousel"],["popover", "Popover"],["floating-panel", "Floating Panel"],["color-picker", "Color Picker"],["tabs-illustration-vercel", "Tabs Illustration Vercel"],["copy-button", "Copy Button"],["halo-button", "Halo Button"],["halo-card", "Halo Card"],["halo-tabs", "Halo Tabs"],["halo-input", "Halo Input"],["halo-select", "Halo Select"]];
const referenceCard = item => `<a class="feed-item feed-reference" href="/components/?provider=design-md&design=${escape(item.slug)}" data-preview="${escape(item.video)}"><div class="feed-art"><img src="/design-archive/${escape(item.slug)}/thumbnail.jpg" alt="" loading="lazy" width="640" height="400"></div><div class="feed-caption"><h3>${escape(item.name)}</h3><span>${escape(new URL(item.site_url).hostname)}</span></div></a>`;
const componentCard = ([id,title],lang) => `<a class="feed-item" href="/components/?provider=cult-ui&component=${id}"><div class="feed-art feed-component" aria-hidden="true"><iframe title="${escape(title)} preview" data-feed-component data-src="/components/preview/?component=${id}&theme=light&lang=${lang}&motion=off" loading="lazy" tabindex="-1" inert sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe></div><div class="feed-caption"><h3>${escape(title)}</h3><span>Cult UI</span></div></a>`;
export function resourceFeed(lang) {
  const zh = lang === 'zh';

  return `<section class="content-section resource-feed" id="design-resources" data-feed-lang="${lang}">
    <div class="feed-tabs" role="tablist" aria-label="${zh ? '设计资源' : 'Design resources'}">${[['design-md','Design.md'],['systems',zh?'设计系统':'Design systems'],['cult-ui',zh?'组件库':'Components']].map(([id,label],i)=>`<button type="button" role="tab" id="feed-tab-${id}" aria-controls="feed-panel-${id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-feed-tab="${id}">${label}</button>`).join('')}</div>
    <div class="feed-collection" role="tabpanel" id="feed-panel-design-md" aria-labelledby="feed-tab-design-md"><div class="feed-grid">${references.map(item => referenceCard(item)).join('')}</div></div>
    <div class="feed-collection" role="tabpanel" id="feed-panel-systems" aria-labelledby="feed-tab-systems" hidden><div class="feed-grid">${systems.map(id => `<a class="feed-item" href="/components/?provider=systems&system=${id}"><div class="feed-art feed-system"><img src="/system-covers/${id}.png" alt="" loading="lazy" width="1500" height="938"></div><div class="feed-caption"><h3>${id === 'happyhands' ? 'HappyHands' : id.charAt(0).toUpperCase() + id.slice(1)}</h3></div></a>`).join('')}</div></div>
    <div class="feed-collection" role="tabpanel" id="feed-panel-cult-ui" aria-labelledby="feed-tab-cult-ui" hidden><div class="feed-grid">${components.map(([id,title]) => componentCard([id,title],lang)).join('')}</div></div>
  </section>`;
}

/** One preview at a time. Touch stays a stable link; all resources retain their full detail route. */
export function syncResourceFeedTheme(root, theme) {
  root.querySelectorAll('[data-feed-component]').forEach(frame => {
    const url = new URL(frame.getAttribute('src') || frame.dataset.src, location.href);
    if (url.searchParams.get('theme') !== theme) { url.searchParams.set('theme', theme); frame.dataset.src = url.pathname + url.search; if (frame.hasAttribute('src')) frame.src = url.href; }
  });
}

export function setupResourceFeed(root) {
  syncResourceFeedTheme(root, document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  const controller = new AbortController();
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let current;
  const stop = () => { current?.remove(); current = undefined; };
  // Mount only visible component previews; hidden tabs never run embedded demos.
  const frames = new IntersectionObserver(entries => entries.forEach(({target,isIntersecting}) => {
    if (isIntersecting && !target.closest('[hidden]')) target.setAttribute('src', target.dataset.src);
    else target.removeAttribute('src');
  }), {rootMargin:'100px'});
  root.querySelectorAll('[data-feed-component]').forEach(frame => frames.observe(frame));
  const tabs = [...root.querySelectorAll('[data-feed-tab]')];
  const activate = tab => {
    stop();
    tabs.forEach(item => { const active=item===tab; item.setAttribute('aria-selected',String(active)); item.tabIndex=active?0:-1;
      const panel=root.querySelector(`#feed-panel-${item.dataset.feedTab}`); panel.hidden=!active;
      if (!active) panel.querySelectorAll('[data-feed-component]').forEach(frame => frame.removeAttribute('src'));
    });
  };
  tabs.forEach((tab,index) => {
    tab.addEventListener('click',()=>activate(tab),{signal:controller.signal});
    tab.addEventListener('keydown',event=>{
      const next=event.key==='ArrowRight'?(index+1)%tabs.length:event.key==='ArrowLeft'?(index+tabs.length-1)%tabs.length:event.key==='Home'?0:event.key==='End'?tabs.length-1:-1;
      if(next<0)return; event.preventDefault();activate(tabs[next]);tabs[next].focus();
    },{signal:controller.signal});
  });
  const observer = new IntersectionObserver(items => { if (current && items.some(item => !item.isIntersecting && item.target.contains(current))) stop(); });
  const registerCards = cards => cards.forEach(card => {
    observer.observe(card);
    const start = () => {
      stop();
      if (motion.matches) return;
      const video = document.createElement('video');
      video.muted = true; video.playsInline = true; video.loop = true; video.setAttribute('aria-hidden','true');
      video.addEventListener('playing', () => video.classList.add('is-playing'), {once:true});
      video.addEventListener('error', () => { if (current === video) stop(); }, {once:true});
      video.src = card.dataset.preview;
      card.querySelector('.feed-art').append(video); current = video;
      video.play().catch(() => { if (current === video) stop(); });
    };
    const options = {signal:controller.signal};
    card.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') start(); }, options);
    card.addEventListener('pointerleave', stop, options);
    card.addEventListener('focus', () => { if (card.matches(':focus-visible')) start(); }, options);
    card.addEventListener('blur', stop, options);
  });
  registerCards(root.querySelectorAll('.feed-reference'));
  root.addEventListener('keydown', event => { if (event.key === 'Escape') stop(); }, {signal:controller.signal});
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); }, {signal:controller.signal});
  motion.addEventListener('change', stop, {signal:controller.signal});
  const lang = root.querySelector('[data-feed-lang]').dataset.feedLang;
  const zh = lang === 'zh';
  const loaders = [];
  for (const [provider, path] of [['design-md','/design-archive/index.json'],['cult-ui','/components/cult-ui/catalog.json']]) {
    const panel = root.querySelector(`#feed-panel-${provider}`);
    const grid = panel.querySelector('.feed-grid');
    const sentinel = document.createElement('button');
    sentinel.type = 'button'; sentinel.className = 'feed-more';
    sentinel.textContent = zh ? '加载更多' : 'Load more';
    panel.append(sentinel);
    const seen = new Set(provider === 'design-md' ? references.map(x=>x.slug) : components.map(x=>x[0]));
    let remaining, busy = false;
    const more = async () => {
      if (busy || panel.hidden || sentinel.hidden) return;
      busy = true; sentinel.disabled = true;
      sentinel.textContent = zh ? '正在加载…' : 'Loading…';
      try {
        if (!remaining) {
          const response = await fetch(path,{signal:controller.signal});
          if (!response.ok) throw Error('catalog');
          const data = await response.json();
          remaining = provider === 'design-md' ? data.filter(x=>!seen.has(x.slug)) : data.items.filter(x=>x.preview && !x.aliasOf && !seen.has(x.id));
        }
        if (controller.signal.aborted) return;
        if (panel.hidden) { sentinel.textContent = zh ? '加载更多' : 'Load more'; return; }
        const batch = remaining.slice(0,24);
        const template = document.createElement('template');
        template.innerHTML = batch.map(x=>provider === 'design-md' ? referenceCard(x) : componentCard([x.id,x.title],lang)).join('');
        const cards = [...template.content.querySelectorAll('.feed-reference')];
        const addedFrames = [...template.content.querySelectorAll('[data-feed-component]')];
        grid.append(template.content);
        registerCards(cards);
        syncResourceFeedTheme(root,document.documentElement.dataset.theme === 'dark'?'dark':'light');
        addedFrames.forEach(frame=>frames.observe(frame));
        remaining = remaining.slice(batch.length);
        sentinel.hidden = remaining.length === 0;
        sentinel.textContent = zh ? '加载更多' : 'Load more';
      } catch (error) {
        if (error.name !== 'AbortError') sentinel.textContent = zh ? '加载失败，点击重试' : 'Could not load. Retry';
      } finally { busy = false; sentinel.disabled = false; }
    };
    const loader = new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)) void more();
    },{rootMargin:'400px'});
    loader.observe(sentinel); loaders.push(loader);
    sentinel.addEventListener('click',more,{signal:controller.signal});
  }
  return () => { stop(); controller.abort(); observer.disconnect(); frames.disconnect(); loaders.forEach(loader=>loader.disconnect()); };
}
