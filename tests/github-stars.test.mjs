import test from 'node:test';
import assert from 'node:assert/strict';
import { readGitHubStars } from '../api/github-stars.mjs';
import { githubStarsSnapshot } from '../packages/ui/github-stars-snapshot.js';

test('GitHub count accepts zero and real counts', async () => {
  for (const count of [0, 33, 1500]) {
    const result = await readGitHubStars(async () => ({ok:true,json:async()=>({stargazers_count:count})}));
    assert.equal(result.count,count);assert.equal(result.stale,false);
  }
});
test('rate limits, timeout and invalid data retain the verified snapshot', async () => {
  for(const fetcher of [async()=>({ok:false}),async()=>{throw Error('timeout')},async()=>({ok:true,json:async()=>({stargazers_count:-1})})]){
    const result=await readGitHubStars(fetcher);
    assert.equal(result.count,githubStarsSnapshot.count);assert.equal(result.checkedAt,githubStarsSnapshot.checkedAt);assert.equal(result.stale,true);
  }
});
test('browser keeps a visible snapshot when same-origin refresh fails', async () => {
  const previous=globalThis.fetch;
  globalThis.fetch=async()=>{throw Error('offline')};
  try {
    const {populateGitHubStars}=await import('../apps/portal/github-stars.js');
    const badge={hidden:true,textContent:''};
    const attributes={};
    const link={isConnected:true,querySelector:()=>badge,setAttribute:(k,v)=>attributes[k]=v};
    await populateGitHubStars(link,githubStarsSnapshot.repository,'zh');
    assert.equal(badge.hidden,false);assert.equal(badge.textContent,String(githubStarsSnapshot.count));
    assert.match(link.title,/更新于/);
    assert.match(attributes['aria-label'],/stars/);
  } finally {globalThis.fetch=previous}
});
