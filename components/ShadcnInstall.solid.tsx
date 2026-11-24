/** @jsxImportSource @solidjs/web */
import { createSignal } from 'solid-js';
import { Button } from '@ui-sdk/solid/button';

export function ShadcnInstall(props: { url: string; lang: string }) {
  const zh = () => props.lang === 'zh';
  const [feedback, setFeedback] = createSignal('');
  const command = () => `npx shadcn@latest add "${props.url}"`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(command());
      setFeedback(zh() ? '命令已复制' : 'Command copied');
    } catch {
      setFeedback(zh() ? '请选择命令并复制' : 'Select the command to copy it');
    }
  }
  return <div class="collections-install">
    <h3>{zh() ? '使用 shadcn CLI 安装' : 'Install with the shadcn CLI'}</h3>
    <p>{zh()
      ? '在已初始化 shadcn 的 React 项目中运行。安装前核对依赖和许可。'
      : 'Run in a React project initialized with shadcn. Review dependencies and licensing before installing.'}</p>
    <pre tabindex={0}><code>{command()}</code></pre>
    <Button class="hh-button" onClick={copy}>{zh() ? '复制安装命令' : 'Copy install command'}</Button>
    <span class="resource-install-feedback" role="status">{feedback()}</span>
  </div>;
}
