import React, { useState } from "react";
import manifest from "../public/resources/v1/platform-media.json";
function key(src: string) {
  return decodeURIComponent(src)
    .split("/")
    .at(-1)!
    .replace(/~(dark|light)|@\dx/g, "");
}
type Asset = {
  light?: string;
  dark?: string;
  video?: string;
  poster?: string | null;
};
export function platformAsset(path: string, src: string, dark = false) {
  const doc = (
    manifest.documents as Record<string, { media: Record<string, Asset> }>
  )[path];
  const item = doc?.media[key(src)];
  const absolute = (url?: string) =>
    url
      ? new URL(
          url.replace(/^\/+/, ""),
          "https://developer.apple.com/tutorials/",
        ).href
      : undefined;
  return item
    ? {
        url: absolute(
          item.video ||
            (dark ? item.dark || item.light : item.light || item.dark),
        ),
        video: Boolean(item.video),
        poster: absolute(doc.media[key(item.poster || "")]?.light),
      }
    : null;
}
export function PlatformMedia({
  path,
  src,
  alt,
  zh,
  dark = false,
}: {
  path: string;
  src: string;
  alt?: string;
  zh: boolean;
  dark?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const asset = platformAsset(path, src, dark);
  const url = asset?.url || (/^https:\/\//.test(src) ? src : undefined);
  if (!url || failed)
    return (
      <span className="platform-media-fallback">
        {alt}{" "}
        <a
          href="https://developer.apple.com/design/human-interface-guidelines"
          target="_blank"
          rel="noopener noreferrer"
        >
          {zh ? "查看原始规范" : "View original guidelines"}
        </a>
      </span>
    );
  if (asset?.video)
    return (
      <video
        className="platform-reference-media"
        controls
        preload="none"
        playsInline
        src={url}
        poster={asset.poster}
        aria-label={alt}
        onError={() => setFailed(true)}
      />
    );
  return (
    <img
      className={
        /checkmark|availability/.test(src)
          ? "platform-reference-indicator"
          : "platform-reference-media"
      }
      src={url}
      alt={alt || ""}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
