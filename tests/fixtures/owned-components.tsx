import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Button} from '../../packages/ui';
import {Select} from '../../packages/ui/Select';
import '../../packages/design-tokens/happyhands.css';
import '../../packages/ui/components.css';
import '../../packages/ui/system-page.css';
function Fixture(){
 const [busy,setBusy]=useState(false);
 const [clicks,setClicks]=useState(0);
 return <main><h1>Control states</h1><section>
  <label><input type="checkbox" checked={busy} onChange={event=>setBusy(event.target.checked)}/> Busy state</label>
  <div className="actions"><Button loading={busy} onClick={()=>setClicks(value=>value+1)}>Save changes</Button><Button disabled>Unavailable</Button></div>
  <p role="status">{clicks} completed</p>
  <label>Priority<Select aria-label="Priority"><option>Normal</option><option>High</option></Select></label>
  <label>Disabled priority<Select aria-label="Disabled priority" disabled><option>Normal</option></Select></label>
  <details><summary>Advanced settings</summary><p>Optional configuration.</p></details>
 </section></main>;
}
createRoot(document.getElementById('fixture')!).render(<Fixture/>);
