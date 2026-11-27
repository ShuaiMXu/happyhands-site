export const agentPresets = [
  {id:'codex',name:'OpenAI Codex',logo:'codex.png',adapter:'codex',url:'https://developers.openai.com/codex/'},
  {id:'claude-code',name:'Claude Code',logo:'claude-code.png',adapter:'claude-code',url:'https://code.claude.com/docs/'},
  {id:'cursor',name:'Cursor',logo:'cursor.png',url:'https://cursor.com/docs'},
  {id:'kimi',name:'Kimi Code',logo:'kimi.png',url:'https://www.kimi.com/code/docs/'},
  {id:'workbuddy',name:'WorkBuddy',logo:'workbuddy.svg',url:'https://www.workbuddy.cn/'},
  {id:'dsh',name:'DeepSeek Harness (DSH)',logo:'dsh.png',url:'https://github.com/ShuaiMXu/happyhands/blob/main/docs/dsh.md'}
];
export function setupAgent(search='',saved='codex'){
 const requested=new URLSearchParams(search).get('agent');
 return [requested,saved,'codex'].find(id=>agentPresets.some(agent=>agent.id===id));
}

const site = 'https://happyhands.cc';
export const setupGuide = (lang, section = 'setup') => `${lang === 'en' ? '/en' : ''}/guide/#${section}`;

export function harnessPrompt(id, lang) {
 const agent = agentPresets.find(item => item.id === id);
 if (!agent) throw Error('Unknown tool');
 const zh = lang === 'zh';
 const lite = site + setupGuide(lang);
 const workbench = site + setupGuide(lang, 'workbench');
 const dsh = site + setupGuide(lang, 'dsh');
 const upstreamDsh = zh ? 'https://github.com/ShuaiMXu/happyhands/blob/main/docs/dsh.zh-CN.md' : agent.url;
 const install = id === 'claude-code'
  ? (zh ? '安装命令末尾加 --agent claude-code。已支持 Skill 发现，完整 Claude Code 流程仍待验证。' : 'Append --agent claude-code to the install command. Skill discovery is supported; the full Claude Code workflow is not yet verified.')
  : id === 'dsh'
   ? (zh ? `安装命令末尾加 --agent dsh，仅用于安装。按 ${dsh} 和 ${upstreamDsh} 用 DSH 调度；内置截图诊断和复核仍需可用的视觉模型适配器，默认 Codex CLI。` : `Append --agent dsh to the install command only. Use DSH to coordinate as described at ${dsh} and ${upstreamDsh}; built-in screenshot diagnosis and review still need an available vision-model adapter, Codex CLI by default.`)
   : (zh ? '按指南默认安装到 Codex 用户 Skill 目录。' : 'Follow the guide’s default install into the Codex user Skill directory.');
 const executor = agent.adapter
  ? (zh ? `先验证 ${agent.adapter} 可用，再使用该适配器。不可用时说明阻碍，不要静默切换。` : `Verify ${agent.adapter} before using it. If unavailable, explain the blocker and do not switch silently.`)
  : (zh ? `${agent.name} 是流程操作端，不是专用执行器；不要把 --agent ${id} 当作执行器选项。如需其他执行器，先让我选择已验证可用的选项。` : `${agent.name} operates the workflow; it is not a dedicated executor. Do not use --agent ${id} as an executor flag. Ask me to choose a verified available executor if needed.`);
 return zh ? `请在 ${agent.name} 中帮我用 HappyHands Lite 审阅一个实际的产品任务。
1. 先问我目标产品的 Git 仓库、可访问的预览地址和一条用户任务。按 ${lite} 检查或安装已发布的轻量 Skill，在目标产品仓库操作，无需另取 HappyHands 源码或启动工作台。${install} 已安装就复用，不要覆盖。
2. 读取已安装的 SKILL.md，使用其中记录的 Lite CLI 路径和实际命令（先看 help，再用 doctor 检查仓库与预览）。单独确认浏览器可启动、模型已登录或配置可用；预检通过不代表诊断已完成。缺少仓库、预览或能力时，说明需要补什么。
3. 只采集任务所需页面和交互状态。对照项目 DESIGN.md、设计变量和组件，展示原始证据、问题及建议，等我确认修改范围。${executor}
4. 仅在批准后隔离修改，保留同一份运行记录、日志和差异。复采匹配的前后状态，独立复核并由我接受或拒绝。保留失败及未检查项。不自动推送、合并或部署。
如我明确需要源码或完整本地工作台，再走 ${workbench}。` : `Help me review one real product task in ${agent.name} using HappyHands Lite.
1. Ask for the target product’s Git repository, a reachable preview and one user task. Check or install the published lightweight Skill using ${lite}. Work from the target product repository without fetching HappyHands source or starting the workbench. ${install} Reuse an existing install without overwriting it.
2. Read the installed SKILL.md and use its documented Lite CLI path and actual commands (check help first, then use doctor for the repo and preview). Verify browser launch and model sign-in or configuration separately. Passing preflight is not a diagnosis. If the repo, preview or a capability is missing, say what is needed.
3. Capture only the relevant pages and states. Use the project’s DESIGN.md, tokens and components to present original evidence, findings and recommendations. Wait for me to confirm what to change. ${executor}
4. Make only approved changes in isolation and keep one run record, log and diff. Recapture matching before/after states, obtain independent review and let me accept or reject. Keep failures and unchecked items. Do not automatically push, merge or deploy.
Use ${workbench} only if I ask for the source or full local workbench.`;
}
