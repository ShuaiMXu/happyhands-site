import type {ReactElement} from 'react';
import {Tooltip as Root,TooltipProvider,TooltipTrigger,TooltipContent} from './shadcn/tooltip';
export function Tooltip({label,children}:{label:string;children:ReactElement}){return <TooltipProvider delayDuration={400}><Root><TooltipTrigger asChild>{children}</TooltipTrigger><TooltipContent side="bottom">{label}</TooltipContent></Root></TooltipProvider>}
