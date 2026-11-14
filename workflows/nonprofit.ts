import {wikiHeader,wikiColumnsStart,wikiColumnsEnd,wikiFooter,type WikiSection} from "../guide/wiki-navigation.ts";
import {nonprofitPath,nonprofitMetadata} from "./nonprofit-metadata.ts";
export {nonprofitPath} from "./nonprofit-metadata.ts";
export const nonprofitCopy={
  "zh": {
    "title": nonprofitMetadata.zh.title,
    "description": nonprofitMetadata.zh.description,
    "h1": "公益网站设计评审：让参与路径更清楚",
    "intro": "这份指南面向维护公益网站的设计师与开发者。HappyHands 是开源 AI 辅助界面评审工具，不是公益组织。这里提供评审方法，不引用同名机构的案例，也不声称与其合作。",
    "sections": [
      [
        "scope",
        "先选一条任务，再确定评审范围",
        "不要把“让网站更好看”作为唯一目标。先选捐赠、志愿报名或查找服务信息中的一条任务，写下起点、完成条件和需要经过的页面。记录桌面与手机尺寸、语言、加载、错误和完成状态。",
        "准备有权访问的本地仓库与测试预览；第三方支付或报名服务只检查授权范围内的交接。使用沙箱和虚构测试数据，不进行真实捐款或提交真实报名。未测试的外部流程应明确标为未覆盖。"
      ],
      [
        "donation",
        "捐赠页面：先把金额与后续步骤讲清楚",
        "检查主要入口是否容易发现，链接与按钮是否准确说明下一步。一次性和定期选项、币种、金额及最终付款前的说明应前后一致；用途、费用和收据说明只填写机构确认的真实信息，不用未经证实的影响数字。",
        "在测试环境核对自定义金额为空、无效输入、返回上一步和取消等状态。记录读者在哪里无法判断下一步，不把仅看到成功截图当作支付流程已验证。金额、扣款周期和支付逻辑的改动需要另行确认，不能混进视觉修复。"
      ],
      [
        "volunteer",
        "志愿报名：减少不必要的信息负担",
        "在表单前说明活动地点、时间、职责和后续联系办法。逐项确认哪些字段是报名所必需的，明确标出可选项；保留清楚的标签与错误提示，测试错误后已填内容是否仍在。",
        "检查手机输入键盘是否遮住下一步、长表单返回后是否丢失内容，以及提交后的反馈能否让用户知道发生了什么。测试数据不使用志愿者、受助者或未成年人的真实资料，也不把成功反馈写成已经被录取。"
      ],
      [
        "accessibility",
        "移动端与基础无障碍检查",
        "用键盘走完主要任务，核对焦点是否可见、顺序是否合理，菜单和弹层能否关闭。查看窄屏、文本放大、按钮文字换行和错误状态，确保关键操作没有被固定导航遮住。",
        "表单标签、必填提示、错误说明与色彩对比需要专门检查。截图可以提示布局问题，但不能证明屏幕阅读器行为正确或满足无障碍标准。参考 W3C 的基础检查并安排人工测试；必要时请无障碍专业人员评估。"
      ],
      [
        "evidence",
        "把观察写成可复核的问题",
        "每条记录写清：页面地址、测试尺寸、步骤、观察到的结果、预期任务、截图与相关设计来源。例如“390px 宽时，底部导航遮挡报名按钮”是待验证的示例，不是已发生的客户问题；先在自己的页面复现，再检查样式与容器约束。",
        "按任务受阻程度排序，先处理阻止完成任务的问题，再处理信息理解和一致性问题。设计偏好与已证实缺陷分开记录，不用一个主观分数替代证据。"
      ],
      [
        "workflow",
        "在 HappyHands 中做有限范围修复",
        "通过轻量 Skill 或可选本地工作台接入自己的仓库、运行中的预览和任务说明，确认采集范围并提供项目设计规则。内置模型诊断和截图复核需要配置并登录 Codex CLI。对可复现且有依据的问题确认修复范围，修改后查看同一任务的前后记录，再由人接受或拒绝；提交草稿 PR 是单独操作，不会自动合并或部署。",
        "当前为 v1.0.0。轻量 Skill 的运行记录默认位于 ~/.happyhands/runs，源码 CLI 与工作台默认使用 .harness/；可显式指定其他输出目录。选定的源码与截图会经配置的 CLI 发送给模型服务，外部服务可能收费。采集前移除真实捐赠人、志愿者、受助者资料与密钥。这套方法不保证捐赠或报名增长，也不替代支付安全、隐私与无障碍审计。"
      ]
    ]
  },
  "en": {
    "title": nonprofitMetadata.en.title,
    "description": nonprofitMetadata.en.description,
    "h1": "Nonprofit website design review: clearer paths to participation",
    "intro": "A practical guide for designers and developers maintaining nonprofit websites. HappyHands is an open-source AI-assisted UI review tool, not a charity. This guide describes a method, not a case study or partnership with organizations sharing the name.",
    "sections": [
      [
        "scope",
        "Choose one task and define coverage",
        "Start with donating, applying to volunteer or finding service information rather than “make the site look better.” Write down the entry point, completion condition and pages involved. Record desktop and phone viewports, language, loading, error and completion states.",
        "Use a repository and test preview you are authorized to access. For an external payment or registration service, inspect only the permitted handoff. Use sandbox flows and fictional data, not real donations or applications. Mark any untested external steps as outside the review scope."
      ],
      [
        "donation",
        "Donation pages: explain the amount and next step",
        "Check whether the main entry is easy to find and its label describes the next step. One-time and recurring choices, currency, amounts and pre-payment explanations should agree across screens. Use only organization-confirmed information about purpose, fees and receipts; do not invent impact figures.",
        "In a test environment, inspect empty custom amounts, invalid input, going back and cancellation. Record where the next step becomes unclear. A success screenshot alone does not verify a payment flow. Changes to amounts, billing frequency or payment logic need separate approval, not a visual-repair shortcut."
      ],
      [
        "volunteer",
        "Volunteer forms: ask for what the task needs",
        "Before the form, explain location, timing, responsibilities and how the organization will follow up. Check which fields are essential and mark optional ones. Use clear labels and error guidance, then test whether entered information survives a validation error.",
        "Check whether the phone keyboard hides the next action, whether going back loses progress, and whether the submission feedback explains what happened. Use fictional test data rather than real volunteer, beneficiary or child information. A received application should not imply the applicant has already been accepted."
      ],
      [
        "accessibility",
        "Mobile layout and basic accessibility checks",
        "Follow the main task with a keyboard: inspect visible focus, a logical sequence and a way to close menus and dialogs. Check narrow screens, enlarged text, wrapped button labels and errors, including whether fixed navigation obscures an important action.",
        "Field labels, required-field guidance, errors and contrast need dedicated checks. Screenshots may reveal layout concerns but cannot establish screen-reader behavior or accessibility conformance. Use W3C’s preliminary checks alongside human testing and seek a specialist assessment where needed."
      ],
      [
        "evidence",
        "Make each observation reviewable",
        "Record the page URL, viewport, steps, observed result, intended task, screenshot and relevant design source. “Bottom navigation covers the application button at 390px” is an illustrative finding to verify, not a reported customer issue. Reproduce it on your own page before inspecting styles and container constraints.",
        "Prioritize obstacles to task completion, then comprehension and consistency. Keep design preferences separate from confirmed defects. A subjective score is not a substitute for evidence."
      ],
      [
        "workflow",
        "Use HappyHands for a scoped UI repair",
        "Use the lightweight Skill or optional local workbench with your repository, running preview and task. Confirm capture scope and supply project design rules. Built-in model diagnosis and screenshot review require a configured, signed-in Codex CLI. Scope a reproducible, supported issue, compare the same task after repair and let a person accept or reject it. Submitting a draft PR is a separate action; HappyHands does not merge or deploy it.",
        "The current release is v1.0.0. Lightweight runs default to ~/.happyhands/runs; the source CLI and workbench default to .harness/. An explicit output path can override these locations; selected source and screenshots are sent through your configured CLI to the model service, which may charge separately. Remove real donor, volunteer and beneficiary data and secrets before capture. This method does not guarantee donation or signup growth, or replace payment-security, privacy or accessibility audits."
      ]
    ]
  }
} as const;
export function nonprofitContent(lang:'zh'|'en') {
 const c=nonprofitCopy[lang],t=(zh:string,en:string)=>lang==='zh'?zh:en,prefix=lang==='en'?'/en':'';
 const articleSections:readonly (readonly [string,string,...string[]])[]=c.sections;
 const sections:WikiSection[]=[...articleSections.map(([id,title])=>[id,title] as const),['next',t('继续阅读与参考','Next steps and references')]];
 return `<div class="wiki-layout"><a class="guide-skip" href="#main">${t('跳到内容','Skip to content')}</a>${wikiHeader(lang,nonprofitPath)}<main id="main" class="guide-shell"><div class="guide-heading"><h1>${c.h1}</h1><p>${c.intro}</p></div>${wikiColumnsStart(lang,nonprofitPath,sections)}<div class="guide-body">${articleSections.map(([id,title,...paragraphs])=>`<section id="${id}"><h2>${title}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}</section>`).join('')}<section id="next"><h2>${t('继续阅读与参考','Next steps and references')}</h2><ul><li><a href="${prefix}/ai-ui-review/">${t('AI 界面评审：证据与修复流程','AI UI review: evidence and repair')}</a></li><li><a href="${prefix}/ai-website-design/">${t('AI 网站设计：初稿之后的优化','AI website design: improving the first build')}</a></li><li><a href="${prefix}/guide/#setup">${t('本地安装与能力边界','Local setup and product limits')}</a></li><li><a href="https://www.w3.org/WAI/tutorials/forms/">W3C WAI: Forms Tutorial</a></li><li><a href="https://www.w3.org/WAI/test-evaluate/preliminary/">W3C WAI: Easy Checks</a></li></ul></section></div>${wikiColumnsEnd(lang,nonprofitPath)}</main>${wikiFooter(lang,nonprofitPath,sections)}</div>`;
}
