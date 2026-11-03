import React from 'react';
import {createRoot} from 'react-dom/client';
import * as Select from '@radix-ui/react-select';

// Keep the native field as the form/reset source of truth, but never open its OS menu.
document.querySelectorAll<HTMLSelectElement>('.preview-select select').forEach((native,index)=>{
  const host=document.createElement('span');
  native.after(host);
  const label=native.getAttribute('aria-label') || native.closest('label')?.firstChild?.textContent?.trim() || 'Select';
  const triggerId='preview-select-'+index;
  const parentLabel=native.closest('label');
  if(parentLabel)parentLabel.htmlFor=triggerId;
  native.hidden=true;
  native.tabIndex=-1;
  native.setAttribute('aria-hidden','true');
  function Control(){
    const [value,setValue]=React.useState(String(native.selectedIndex));
    React.useEffect(()=>{
      const sync=()=>setValue(String(native.selectedIndex));
      const reset=()=>setTimeout(sync,0);
      native.addEventListener('change',sync);
      native.form?.addEventListener('reset',reset);
      return()=>{native.removeEventListener('change',sync);native.form?.removeEventListener('reset',reset)};
    },[]);
    return <Select.Root value={value} disabled={native.disabled} onValueChange={next=>{
      native.selectedIndex=Number(next);
      native.dispatchEvent(new Event('input',{bubbles:true}));
      native.dispatchEvent(new Event('change',{bubbles:true}));
    }}>
      <Select.Trigger id={triggerId} className="preview-select-trigger" aria-label={label} aria-invalid={native.getAttribute('aria-invalid')==='true'}><Select.Value/><Select.Icon><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 9 6 6 6-6"/></svg></Select.Icon></Select.Trigger>
      <Select.Portal><Select.Content className="preview-select-popup" position="popper" sideOffset={6} collisionPadding={8}>
        <Select.Viewport>{Array.from(native.options).map((option,i)=><Select.Item className="preview-select-option" key={i} value={String(i)} disabled={option.disabled}>
          <Select.ItemText>{option.text}</Select.ItemText><Select.ItemIndicator className="preview-select-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m5 12 4 4L19 6"/></svg></Select.ItemIndicator>
        </Select.Item>)}</Select.Viewport>
      </Select.Content></Select.Portal>
    </Select.Root>;
  }
  createRoot(host).render(<Control/>);
});
