import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { analyticsPageUrl, analyticsAllowed, redactAnalyticsEvent, createPageViewFilter } from '../packages/ui/site-analytics';
import { siteAnalyticsPlugin } from '../scripts/site-analytics-plugin.mjs';

test('page views strip all query parameters and fragments', () => {
  assert.equal(analyticsPageUrl('https://happyhands.cc/apps/studio/?project=private-name&token=secret#source'), 'https://happyhands.cc/apps/studio/');
  assert.equal(analyticsPageUrl('https://www.happyhands.cc/components?provider=kage&q=private'), 'https://happyhands.cc/components/');
  assert.equal(analyticsPageUrl('https://happyhands-design.vercel.app/'), 'https://happyhands.cc/apps/portal/');
});

test('private, historical, preview and third-party pages are excluded', () => {
  for (const url of [
    'https://happyhands.cc/apps/designer/?case=private', 'https://happyhands.cc/runs/id/',
    'https://happyhands.cc/components/preview/', 'https://happyhands.cc/skillry-full/',
    'https://happyhands.cc/apps/appllama-full/', 'https://happyhands.cc/.harness/logs/',
    'https://preview-shakaka.vercel.app/apps/portal/', 'http://127.0.0.1:4246/apps/portal/',
    'https://happyhands.cc.attacker.example/apps/portal/', 'https://user:secret@happyhands.cc/apps/portal/',
    'https://happyhands.cc:8443/apps/portal/', 'invalid',
  ]) assert.equal(analyticsPageUrl(url), null, url);
});

test('tracking requires production, a top-level page and no privacy opt-out', () => {
  const context = {production:true, url:'https://happyhands.cc/apps/portal/', topLevel:true};
  assert.equal(analyticsAllowed(context), true);
  for (const extra of [{production:false}, {topLevel:false}, {doNotTrack:'1'}, {doNotTrack:'yes'}, {globalPrivacyControl:true}])
    assert.equal(analyticsAllowed({...context,...extra}), false);
});

test('beforeSend excludes custom events and emits only the sanitized page URL', () => {
  assert.deepEqual(redactAnalyticsEvent({type:'pageview',url:'https://happyhands.cc/apps/studio/?project=secret'}),{type:'pageview',url:'https://happyhands.cc/apps/studio/'});
  assert.equal(redactAnalyticsEvent({type:'event',url:'https://happyhands.cc/apps/portal/'}),null);
  assert.equal(redactAnalyticsEvent({type:'pageview',url:'https://happyhands.cc/runs/secret/'}),null);
});

test('HTML injection is limited to owned public entry pages', () => {
  const root = resolve('.'); const plugin = siteAnalyticsPlugin(root);
  assert.equal(plugin.transformIndexHtml.order, 'pre');
  for (const page of ['apps/portal','apps/studio','components','systems/happyhands','systems/quartz','systems/lime','guide','en/guide']) {
    const result=plugin.transformIndexHtml.handler('<html></html>', {filename:resolve(root,page,'index.html')});
    assert.equal(typeof result, 'object');
  }
  for (const page of ['apps/designer','components/preview','apps/appllama-full','apps/web'])
    assert.equal(plugin.transformIndexHtml.handler('<html></html>', {filename:resolve(root,page,'index.html')}), '<html></html>');
});

test('filter and project query changes do not inflate page-view counts', () => {
  const filter=createPageViewFilter();
  assert.ok(filter({type:'pageview',url:'https://happyhands.cc/apps/studio/?project=one'}));
  assert.equal(filter({type:'pageview',url:'https://happyhands.cc/apps/studio/?project=two#preview'}),null);
  assert.ok(filter({type:'pageview',url:'https://happyhands.cc/components/?provider=kage'}));
  assert.equal(filter({type:'pageview',url:'https://happyhands.cc/components/?q=secret'}),null);
});
