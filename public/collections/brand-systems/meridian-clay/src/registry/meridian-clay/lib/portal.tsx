'use client';

import {createContext, useContext, useEffect, useState, type ReactNode} from 'react';

// Where Meridian Clay's overlays portal to. Base UI portals to document.body by default, which sits outside the
// .meridian-clay scope, so the tokens, the theme and the font never reach a popup. MeridianClayPortalProvider renders an
// empty element as the last child of the scope and hands it down; every overlay passes it to its Base UI
// Portal:
//
//   const container = useMeridianClayPortal();
//   <PopoverPrimitive.Portal container={container}>...</PopoverPrimitive.Portal>
//
// Without a provider the hook falls back to one shared .meridian-clay element on document.body (light theme), so an
// overlay never renders unstyled. The hook returns null until the element exists, which Base UI waits on.

const MeridianClayPortalContext = createContext<HTMLElement | null | undefined>(undefined);

export function MeridianClayPortalProvider({children}: {children: ReactNode}) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  return (
    <MeridianClayPortalContext.Provider value={container}>
      {children}
      <div ref={setContainer} data-blue-portal=""/>
    </MeridianClayPortalContext.Provider>
  );
}

let fallback: HTMLElement | null = null;

function fallbackContainer() {
  if (fallback && fallback.isConnected) return fallback;
  fallback = document.createElement('div');
  fallback.className = 'blue';
  fallback.setAttribute('data-system', 'blue');
  fallback.setAttribute('data-blue-portal', 'fallback');
  document.body.appendChild(fallback);
  return fallback;
}

export function useMeridianClayPortal() {
  const scoped = useContext(MeridianClayPortalContext);
  const [own, setOwn] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (scoped === undefined) setOwn(fallbackContainer());
  }, [scoped]);
  return scoped === undefined ? own : scoped;
}
