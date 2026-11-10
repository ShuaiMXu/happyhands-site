export function dshWorkflowContent(lang:'zh'|'en') {
 const zh=lang==='zh';
 const steps=zh ? [
  '在 DSH 中打开可访问 HappyHands 和目标项目的会话，提供预览地址及一个用户任务。无需启动 HappyHands 工作台。',
  '复制接入详情中的 DSH 提示词。先读取项目规范和实际命令，采集原始截图，再确定问题和修改范围。',
  '选择可用的已注册执行器，在 Harness 隔离工作副本中修改。DSH 专用执行适配器尚未接通，不使用 --agent dsh。',
  '预览修改后的工作副本，复拍相同状态并独立复核，最后由你接受或拒绝。截图、计划和结果保存在同一份审阅记录。'
 ] : [
  'Open a DSH session with access to HappyHands and the target project. Provide a working preview and one user task. The HappyHands workbench is optional.',
  'Copy the DSH prompt from Setup details. Read project rules and inspect real commands, capture originals, then confirm the finding and scope.',
  'Choose an available registered executor for an isolated Harness edit. A dedicated DSH executor is not connected; do not use --agent dsh.',
  'Preview the changed worktree, recapture matching states and obtain independent review. You accept or reject the result. Retain the same evidence, plan and review record.'
 ];
 const prefix=zh?'':'/en';
 return `<ol>${steps.map(step=>`<li>${step}</li>`).join('')}</ol>
 <p>${zh?'内置模型诊断和视觉复核仍需配置并登录 Codex CLI。DSH 负责调度，不能据此宣称全程仅由 DeepSeek 执行。':'Built-in model diagnosis and visual review still require a configured, signed-in Codex CLI. DSH coordinates the workflow; this does not establish a DeepSeek-only execution loop.'}</p>
 <p><a href="${prefix}/components/?provider=setup&amp;agent=dsh">${zh?'复制 DSH 提示词':'Copy the DSH prompt'}</a> / <a href="https://github.com/ShuaiMXu/happyhands/blob/main/docs/${zh?'dsh.zh-CN.md':'dsh.md'}">${zh?'完整调用说明':'Full DSH workflow'}</a></p>
 <h3>${zh?'终端调用（可选）':'Optional terminal use'}</h3>
 <pre><code>dsh --help\ndsh headless --help\ndsh headless --json - &lt; review-request.txt</code></pre>
 <p>${zh?'先按所用 DSH 版本配置命令和模型凭据，review-request.txt 为本次任务请求。桌面端已登录不等于 headless 已配置；本机 0.2.2-rc.1 的 headless 默认不读取桌面托管凭据。本机试运行因缺少凭据停止，尚未验证 DSH 完整修复闭环。':'Configure the command and model credentials for your DSH version first; review-request.txt contains your task. Desktop sign-in does not configure headless authentication. The inspected 0.2.2-rc.1 headless profile does not read managed desktop credentials by default. The local smoke attempt stopped on missing credentials; the full DSH repair loop remains unverified.'}</p>`;
}
