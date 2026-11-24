import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../packages/ui/shadcn/button';
import { SystemDocumentNavigation } from './SystemDocumentNavigation';
import './resource-presentation.css';
import './system-documentation.css';

export type SystemDocumentSection = {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
};

export function SystemDocumentLink({ children, primary = false, ...props }: React.ComponentPropsWithoutRef<'a'> & {
  primary?: boolean;
}) {
  return (
    <Button asChild variant={primary ? 'default' : 'outline'} className={`system-detail-action${primary ? ' system-detail-action--primary' : ''}`}>
      <a {...props}>{children}</a>
    </Button>
  );
}

export function DesignSystemDocumentation({ name, description, lang, sections, actions, facts, footer }: {
  name: string;
  description?: string;
  lang: string;
  sections: readonly SystemDocumentSection[];
  actions?: React.ReactNode;
  facts?: ReadonlyArray<readonly [string, string]>;
  footer?: React.ReactNode;
}) {
  const zh = lang === 'zh';
  const title = zh ? '本页目录' : 'On this page';
  const content = useRef<HTMLDivElement>(null);
  const firstId = sections[0]?.id;
  const sectionIds = sections.map(({ id }) => id).join(' ');
  const [active, setActive] = useState(firstId);
  const topId = 'system-documentation-top';
  const activeId = sections.some((section) => section.id === active) ? active : firstId;

  useEffect(() => {
    const ids = sectionIds.split(' ').filter(Boolean);
    const targets = Array.from(content.current?.querySelectorAll<HTMLElement>(':scope > .system-book-section') ?? []).reverse();
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const page = document.documentElement;
        const atPageEnd = window.scrollY > 0 && page.scrollHeight - window.innerHeight - window.scrollY <= 2;
        const candidate = atPageEnd
          ? targets[0]
          : targets.find((target) => target.getBoundingClientRect().top <= 88);
        setActive(candidate?.id || firstId);
      });
    };
    const syncHash = () => {
      let hash = location.hash.slice(1);
      if (hash === 'system-download' && !ids.includes(hash)) {
        hash = ids.includes('system-setup') ? 'system-setup' : topId;
        history.replaceState(history.state, '', `#${hash}`);
        document.getElementById(hash)?.scrollIntoView();
      }
      if (ids.includes(hash)) setActive(hash);
    };
    syncHash();
    if (ids.includes(location.hash.slice(1))) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    }
    const observer = new ResizeObserver(update);
    if (content.current) observer.observe(content.current);
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    addEventListener('hashchange', syncHash);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
      removeEventListener('hashchange', syncHash);
    };
  }, [firstId, sectionIds]);

  return <div className="system-documentation">
    <header id={topId} className="resource-detail-header system-detail-hero system-documentation-header">
      <nav className="system-detail-crumbs" aria-label={zh ? '当前位置' : 'Breadcrumb'}>
        <ol>
          <li><a href={`${zh ? '' : '/en'}/components/?provider=systems`}>{zh ? '设计系统' : 'Design systems'}</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{name}</li>
        </ol>
      </nav>
      <div className="system-detail-grid">
        <div>
          <h1>{name}</h1>
          {description && <p className="system-detail-lead">{description}</p>}
        </div>
        {actions && <div className="system-detail-actions">{actions}</div>}
      </div>
      {!!facts?.length && <dl className="system-detail-meta">
        {facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>}
    </header>
    <div className="system-book">
      <aside className="system-book-toc">
        <p className="system-book-toc-title" aria-hidden="true">{title}</p>
        <SystemDocumentNavigation label={title}>
          {sections.map(({ id, title: label }) => <a
            key={id}
            href={`#${id}`}
            aria-current={activeId === id ? 'location' : undefined}
            onClick={() => setActive(id)}
          >{label}</a>)}
        </SystemDocumentNavigation>
        <a className="system-book-top" href={`#${topId}`}>{zh ? '回到顶部' : 'Back to top'}</a>
      </aside>
      <div ref={content} className="system-book-content">
        {sections.map(({ id, title: heading, description: intro, content: body }) => (
          <section key={id} id={id} className="system-book-section" aria-labelledby={`${id}-heading`}>
            <header className="system-book-heading">
              <h2 id={`${id}-heading`}>{heading}</h2>
              {intro && <p>{intro}</p>}
            </header>
            {body}
          </section>
        ))}
        {footer}
      </div>
    </div>
  </div>;
}
