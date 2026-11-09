export const registryVersion = '2026-11-09.2';
export function hostedDocument(text) {
  return text.replaceAll('https://design.how/r/', 'https://happyhands.cc/r/')
    .replace(/https:\/\/design\.how\/systems\/(quartz|lime|glaze|sodium)([^\s)"<>]*)/g, (_, system, tail) => {
      const [raw, fragment] = tail.split('#');
      let path = raw.replace(/\/$/, '');
      if (!path || path === '.md') path = '/index.md';
      else if (!path.endsWith('.md')) path += '.md';
      return `https://happyhands.cc/systems/${system}${path}${fragment ? '#'+fragment : ''}`;
    });
}
