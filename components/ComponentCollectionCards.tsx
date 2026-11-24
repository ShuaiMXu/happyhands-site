import React from 'react';
import { ResourceCard } from './ResourcePresentation';
import type { ResourceEntry } from './resource-directory';

export const componentCollection = (row: ResourceEntry) => row.system || row.collection;

export function componentCollectionName(id: string, labels: Record<string, string>) {
  return labels[id] || id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function groupComponentResources<T extends ResourceEntry>(rows: T[]) {
  const groups = new Map<string, T[]>();
  for (const row of rows) {
    const id = componentCollection(row);
    const group = groups.get(id);
    if (group) group.push(row);
    else groups.set(id, [row]);
  }
  return groups;
}

function representative(rows: ResourceEntry[], covers: Record<string, string>) {
  const covered = rows.filter(row => covers[row.id] || row.cover);
  return covered.find(row => /\/button\.json$/.test(row.path)) || covered[0];
}

export function ComponentCollectionCards({ groups, labels, covers, lang }: {
  groups: Map<string, ResourceEntry[]>;
  labels: Record<string, string>;
  covers: Record<string, string>;
  lang: string;
}) {
  const zh = lang === 'zh';
  const prefix = zh ? '' : '/en';
  const entries = [...groups].sort(([a], [b]) =>
    componentCollectionName(a, labels).localeCompare(componentCollectionName(b, labels), zh ? 'zh-Hans' : 'en'));
  return <div className="archive-grid">
    {entries.map(([id, rows]) => {
      const preview = representative(rows, covers);
      const cover = preview && (covers[preview.id] || preview.cover);
      const title = componentCollectionName(id, labels);
      return <ResourceCard
        key={id}
        className="resource-collection-card"
        href={`${prefix}/components/?provider=cult-ui&collection=${encodeURIComponent(id)}`}
        title={title}
        description={zh ? `${rows.length} 项组件资源` : `${rows.length} component resources`}
        mediaClassName={cover ? 'archive-card-media' : 'collections-summary-media'}
        media={cover
          ? <img src={cover} alt="" loading="lazy" />
          : <div className="collections-type-preview">{rows.slice(0, 4).map(row => (
            <span key={row.id}>{row.name.split(' / ').at(-1)}</span>
          ))}</div>}
      />;
    })}
  </div>;
}
