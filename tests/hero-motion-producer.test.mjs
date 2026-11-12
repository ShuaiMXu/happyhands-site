import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeHeroContexts, heroFrameNames} from './helpers/hero-motion-contexts.mjs';
const base = 'http://127.0.0.1:4173/apps/portal/';
const captured = {stateId:'hero-dark',configurationId:'phone',width:390,height:844,start:{url:base},finalUrl:base,appearance:{theme:'dark'}};
test('Hero producer retains exact captured identity, viewport, theme and language within its image budget', () => {
  const entries = [captured,{...captured,stateId:'hero-light',finalUrl:base.replace('/apps/','/en/apps/'),appearance:{theme:'light'}}];
  assert.deepEqual(normalizeHeroContexts({states:entries},base),[
    {stateId:'hero-dark',configurationId:'phone',width:390,height:844,url:base,theme:'dark',lang:'zh'},
    {stateId:'hero-light',configurationId:'phone',width:390,height:844,url:base.replace('/apps/','/en/apps/'),theme:'light',lang:'en'}
  ]);
  assert.deepEqual(heroFrameNames(2),['frame-01.png','frame-02.png','frame-03.png','frame-04.png','frame-05.png','frame-06.png','frame-07.png','frame-08.png']);
  assert.equal(heroFrameNames(4).length,12);
});
test('missing or mismatched Hero scope is rejected instead of silently using desktop defaults', () => {
  for(const values of [[],[captured,captured],[{...captured,appearance:undefined}],[{...captured,width:'390'}],[{...captured,finalUrl:'https://example.com/apps/portal/'}],[{...captured,finalUrl:'http://127.0.0.1:4173/apps/setup/'}],Array(5).fill(captured)]) {
    assert.throws(()=>normalizeHeroContexts(values,base));
  }
});
