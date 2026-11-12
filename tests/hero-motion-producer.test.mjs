import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeHeroContexts, heroFrameNames} from './helpers/hero-motion-contexts.mjs';
import {normalHeroStatus, contextLossStatus} from './helpers/hero-motion-result.mjs';
import {captureShuffleRandom} from '../apps/portal/hero-capture-seed.js';
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
test('known layout failures cannot be downgraded to missing motion evidence', () => {
  const layout={singleMark:true,overflow:false,actionsVisible:true,coverCount:189};
  const item={layout,errors:[],motionObserved:false,openingSampled:false,pointerEventObserved:false,scroll:{paused:false,resumed:false}};
  assert.equal(normalHeroStatus(item),'needs-evidence');
  for(const change of [{singleMark:false},{overflow:true},{actionsVisible:false},{coverCount:188}]) {
    assert.equal(normalHeroStatus({...item,layout:{...layout,...change}}),'fail');
  }
  assert.equal(normalHeroStatus({...item,errors:['Uncaught render error']}),'fail');
});
test('a lost context with a timed-out fallback cannot pass just because the loss event fired', () => {
  const layout={singleMark:true,overflow:false,actionsVisible:true,coverCount:189};
  const item={contextLost:true,fallbackRecovered:false,errors:[],layout};
  assert.equal(contextLossStatus(item),'fail');
  assert.equal(contextLossStatus({...item,contextLost:false}),'needs-evidence');
  assert.equal(contextLossStatus({...item,fallbackRecovered:true}),'pass');
  assert.equal(contextLossStatus({...item,fallbackRecovered:true,layout:{...layout,actionsVisible:false}}),'fail');
});
test('only an explicit development capture seed stabilizes cover selection', () => {
  const sequence=seed=>Array.from({length:190},captureShuffleRandom('?hh-capture-seed='+seed,true));
  assert.deepEqual(sequence('same-baseline'),sequence('same-baseline'));
  assert.notDeepEqual(sequence('same-baseline'),sequence('another-baseline'));
  assert.ok(sequence('same-baseline').every(value=>value>=0&&value<1));
  assert.equal(captureShuffleRandom('?hh-capture-seed=same-baseline',false),Math.random);
  for(const search of ['', '?hh-capture-seed=', '?hh-capture-seed=not%20a%20seed'])assert.equal(captureShuffleRandom(search,true),Math.random);
});
