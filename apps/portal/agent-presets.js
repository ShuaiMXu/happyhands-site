import {lightweightInstall} from './lightweight-release.js';
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
export function harnessPrompt(id,lang){
 const agent=agentPresets.find(item=>item.id===id);
 if(!agent)throw Error('Unknown tool');
 const guide=`https://github.com/ShuaiMXu/happyhands/blob/main/docs/${id==='dsh'?(lang==='zh'?'dsh.zh-CN.md':'dsh.md'):'harness.md'}`;
 return lang==='zh' ? `请在 ${agent.name} 中帮助我按 HappyHands Harness 流程审阅产品。先阅读 ${guide}，检查当前工程的命令与能力，不编造命令。
1. 先询问我要诊断的网站地址与主要用户任务。检查本机浏览器、终端和工程访问能力；缺少能力时说明需要的设置。复用已有 HappyHands Skill；未安装时，指导运行 ${lightweightInstall}。无需克隆源码或启动工作台，不覆盖已有 Skill。默认安装到 ~/.codex/skills/happyhands（或 CODEX_HOME 下）；Claude Code 的 Skill 发现可用安装选项 --agent claude-code，其完整执行闭环仍未验证。其他工具读取实际安装目录中的 SKILL.md。
2. 从 Skill 实际目录解析 bin/happyhands.mjs，在目标项目目录用 Node 调用，先运行 help、doctor --agent codex 和 agents。内置模型诊断与独立视觉复核仍需配置并登录 Codex CLI。通过 Harness 创建审阅记录、采集页面截图并诊断。先尝试网址诊断，按实际命令要求补充最少配置；如当前版本必须提供仓库，请解释限制，不假装已完成在线诊断。主动提取页面的设计语言、组件状态和一致性问题，区分观察与推断。
3. 展示截图依据和设计建议，让我确认问题及修改范围。需要修改代码时再连接目标仓库，读取 DESIGN.md、设计变量、组件及完整 Skills，确认设计规范；不要强制替换既有品牌。
4. 用 node /实际/Skill目录/bin/happyhands.mjs agents 核对已注册的执行器（先替换为真实路径）。${agent.adapter ? `优先使用 ${agent.adapter}，确认可用后再调用。` : `${agent.name} 作为流程操作端调用 Harness；不要假造 --agent ${id}。若没有对应执行器，先说明并让我选择已注册的执行器。未经选择不得静默切换。`} 在隔离工作区执行批准的修改，保留同一份 run 记录、日志及差异。
5. 重新采集匹配的前后页面，完成独立视觉复核并记录人工接受或拒绝。失败和未检查项如实保留。不自动推送、合并或部署。` : `Help me review a product in ${agent.name} using the HappyHands Harness workflow. Read ${guide} and inspect the current commands and capabilities first. Do not invent commands.
1. Ask for the website URL and key user task first. Check browser, terminal and project access. Explain missing capabilities. Reuse the installed HappyHands Skill; if missing, guide installation with ${lightweightInstall}. No source clone or workbench is required; do not overwrite an existing Skill. The default location is ~/.codex/skills/happyhands (or under CODEX_HOME). The install option --agent claude-code enables Claude Code Skill discovery, but its full execution loop remains unverified. Other tools should read SKILL.md in the actual installed directory.
2. Resolve bin/happyhands.mjs from the actual Skill directory and invoke it with Node from the target project. First run help, doctor --agent codex and agents. Built-in model diagnosis and independent visual review still require a configured, signed-in Codex CLI. Create a Harness run, capture screenshots and diagnose the pages. Try URL-based review first, requesting only configuration required by actual commands. If this version needs a repository, explain that limitation; do not claim an online diagnosis completed. Extract design language, component states and consistency issues, distinguishing observations from inferences.
3. Present evidence and design recommendations for scope confirmation. Connect the target repository when code changes are needed. Read DESIGN.md, tokens, components and complete Skills; confirm rules and preserve the existing brand.
4. Run node /actual/skill/directory/bin/happyhands.mjs agents to check registered executors (resolve the real path first). ${agent.adapter ? `Prefer ${agent.adapter} after verifying availability.` : `Use ${agent.name} to operate Harness; never invent --agent ${id}. If no matching executor exists, explain and ask me to choose a registered executor; never silently switch.`} Execute approved edits in an isolated worktree and preserve the same run, logs and diff.
5. Recapture matched before/after pages, obtain independent visual review and record human acceptance or rejection. Retain failures and unchecked items. Do not automatically push, merge or deploy.`;
}
