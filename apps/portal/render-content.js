import { resourceFeed } from './resource-feed.js';

export function portalContent(lang = 'zh') {
  return resourceFeed(lang);
}
