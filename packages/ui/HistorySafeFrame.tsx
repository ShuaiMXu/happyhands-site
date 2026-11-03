import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState, type IframeHTMLAttributes } from "react";

/** Loading an owned preview must not add a nested entry to browser history. */
type FrameProps = Omit<IframeHTMLAttributes<HTMLIFrameElement>, "src" | "srcDoc"> & {autoHeight?:boolean} &
  ({src: string; srcDoc?: never} | {src?: never; srcDoc: string});

export const HistorySafeFrame = forwardRef<HTMLIFrameElement, FrameProps>(function HistorySafeFrame({
  src,
  srcDoc,
  loading,
  autoHeight=false,
  style,
  ...props
}, forwardedRef) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height,setHeight]=useState(300);
  useLayoutEffect(()=>{
    if(!autoHeight)return;
    const receive=(event:MessageEvent)=>{
      if(event.source===frame.current?.contentWindow&&event.data?.type==='hh:component-height'&&Number.isFinite(event.data.height))setHeight(Math.max(160,Math.min(20000,event.data.height+2)));
    };
    window.addEventListener('message',receive);
    return()=>window.removeEventListener('message',receive);
  },[autoHeight]);
  useImperativeHandle(forwardedRef, () => frame.current!, []);
  useLayoutEffect(() => {
    // Generated HTML is self-contained and retains its own CSP and sandbox.
    // Replace both the initial blank page and subsequent preview configurations.
    // A self-contained data document survives history restoration after its
    // creator frame unloads; a revoked Blob URL would restore an empty preview.
    const target = srcDoc === undefined ? new URL(src!, location.href) : null;
    if (target && target.origin !== location.origin) {
      throw new Error("Owned previews must use the current origin.");
    }
    const destination = target ? target.href : `data:text/html;charset=utf-8,${encodeURIComponent(srcDoc!)}`;
    const navigate = () => frame.current?.contentWindow?.location.replace(destination);
    const observer = loading === "lazy" ? new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { navigate(); observer!.disconnect(); }
    }) : undefined;
    if (observer && frame.current) observer.observe(frame.current);
    else navigate();
    return () => observer?.disconnect();
  }, [src, srcDoc, loading]);
  return <iframe {...props} style={autoHeight?{...style,height}:style} loading={loading} ref={frame} />;
});
