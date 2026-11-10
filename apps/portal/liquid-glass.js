import {setupHeaderMaterial} from '../../packages/ui/header-material.js';

// Preserve the approved homepage geometry and Hero mark using the shared lens.
export function setupLiquidGlass() {
  return setupHeaderMaterial({targets:document.querySelectorAll('.portal-glass-header'),heroMark:true});
}
