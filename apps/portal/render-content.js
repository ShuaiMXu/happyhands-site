import { resourceFeed } from './resource-feed.js';

// Keep the homepage focused on the product entry and browsable resources.
export function portalContent(lang = 'zh') {
  return resourceFeed(lang);
}
