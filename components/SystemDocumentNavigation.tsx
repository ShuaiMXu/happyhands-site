// Adapted from Beautiful UI's GlideMenu, copyright 2026 Shane Levine (MIT).
import React, { useRef, useState } from 'react';

export function SystemDocumentNavigation({ label, children }: {
  label: string;
  children: React.ReactNode;
}) {
  const navigation = useRef<HTMLElement>(null);
  const [box, setBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [visible, setVisible] = useState(false);

  function moveTo(target: EventTarget | null) {
    const container = navigation.current;
    const row = target instanceof Element ? target.closest('a') : null;
    if (!container || !row || !container.contains(row)) return;
    const bounds = container.getBoundingClientRect();
    const item = row.getBoundingClientRect();
    setBox({ x: item.x - bounds.x, y: item.y - bounds.y, width: item.width, height: item.height });
    setVisible(true);
  }

  return <nav
    ref={navigation}
    className="system-book-nav"
    aria-label={label}
    onPointerOver={(event) => { if (event.pointerType === 'mouse') moveTo(event.target); }}
    onPointerLeave={() => setVisible(false)}
    onFocusCapture={(event) => moveTo(event.target)}
    onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setVisible(false);
    }}
  >
    {box && <span aria-hidden="true" className="system-book-nav-highlight" style={{
      width: box.width,
      height: box.height,
      transform: `translate(${box.x}px, ${box.y}px)`,
      opacity: visible ? 1 : 0,
    }} />}
    {children}
  </nav>;
}
