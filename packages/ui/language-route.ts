/** English has a stable URL; the base URL remains the Chinese canonical. */
export function languagePath(path:string, language:'zh'|'en') {
 const base=path.replace(/^\/en(?=\/)/,'');
 return language==='en'?'/en'+base:base;
}
export function hasLanguageRoute(path:string) {
 return /^\/(?:en\/)?(?:apps\/portal|components|systems\/[^/]+)\/?$/.test(path);
}
