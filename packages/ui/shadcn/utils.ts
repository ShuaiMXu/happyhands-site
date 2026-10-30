import {clsx, type ClassValue} from 'clsx';
import classes from './classes.json';
import './generated.css';
import './adaptations.css';
const utilities = new Set(classes);
/** Prefix official utilities to prevent collisions with source previews and legacy pages. */
export function cn(...inputs: ClassValue[]) {
 return 'hh-shadcn ' + clsx(inputs).split(/\s+/).map(token => utilities.has(token) ? `sc:${token}` : token).join(' ');
}
