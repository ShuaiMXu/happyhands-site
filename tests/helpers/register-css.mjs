// Server-rendering tests inspect markup; browser checks cover actual styles.
import { register } from 'node:module';
register('./css-loader.mjs', import.meta.url);
