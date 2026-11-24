import { useId, useState } from 'react';
import { Button, Input, Textarea } from '../../packages/ui';
import { Select } from '../../packages/ui/Select';
import { SystemScenes } from '../../packages/ui/SystemScenes';
import { Card, CardContent, CardDescription, CardHeader } from '../../packages/ui/shadcn/card';
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from '../../packages/ui/shadcn/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../packages/ui/shadcn/tabs';
import { SystemDocumentLink } from '../../components/DesignSystemDocumentation';
import { SystemDocumentCode } from '../../components/SystemDocumentCode';
import { TokenReference } from './TokenReference';
import { ComponentShowcase, ScreenPatterns } from './Showcase';

export type SystemSection = 'overview' | 'foundations' | 'components' | 'files';

const repository = 'https://github.com/ShuaiMXu/happyhands-site/tree/main';
const translator = (lang: string) => (zh: string, en: string) => lang === 'zh' ? zh : en;

export function HappyHandsSystemSections({ lang, dark, section }: {
  lang: string;
  dark: boolean;
  section: SystemSection;
}) {
  const t = translator(lang);
  const localized = (path: string) => `${lang === 'en' ? '/en' : ''}${path}`;

  switch (section) {
    case 'overview':
      return <>
        <SystemScenes system="happyhands" lang={lang} dark={dark} />
        <ScreenPatterns lang={lang} />
        <div className="system-specimen-actions">
          <SystemDocumentLink href={localized('/apps/portal/')}>{t('打开官网', 'Open portal')}</SystemDocumentLink>
          <SystemDocumentLink href={localized('/components/')}>{t('浏览设计资源', 'Browse design resources')}</SystemDocumentLink>
          <SystemDocumentLink href={localized('/guide/') + '#setup'}>{t('本地工作台启动说明', 'Local workbench setup')}</SystemDocumentLink>
        </div>
      </>;
    case 'foundations':
      return <>
        <div className="system-specimen-grid">
          {[
            [t('文字', 'Typography'), t('西文使用 Inter，中文回退苹方。界面字重 400，技术编号使用等宽字体。', 'Use Inter with PingFang for Chinese. Use weight 400 for UI text and monospace for technical identifiers.')],
            [t('间距与圆角', 'Spacing and radius'), t('间距采用 4、8、12、16、24、32px。按钮与输入框圆角 12px，卡片与弹层 16px。', 'Use spacing increments of 4, 8, 12, 16, 24 and 32px. Buttons and fields use 12px corners; cards and panels use 16px.')],
            [t('操作与反馈', 'Actions and feedback'), t('黑白主按钮指向下一步。橙色用于品牌强调，结果状态配有明确文案。', 'Black and white primary buttons indicate the next step. Orange is a brand accent. Pair result states with explicit labels.')],
          ].map(([title, description]) => (
            <Card className="system-specimen" key={title} size="sm">
              <CardHeader>
                <h3>{title}</h3>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <TokenReference lang={lang} dark={dark} />
      </>;
    case 'components':
      return <ComponentStates lang={lang} />;
    case 'files':
      return <SetupPrompt lang={lang} />;
  }
}

function ComponentStates({ lang }: { lang: string }) {
  const t = translator(lang);
  const [buttonFeedback, setButtonFeedback] = useState('');
  const [formFeedback, setFormFeedback] = useState('');
  const [state, setState] = useState('empty');
  const labels = {
    primary: t('主要操作', 'Primary action'),
    secondary: t('次要操作', 'Secondary action'),
    ghost: t('轻量操作', 'Quiet action'),
    danger: t('危险操作', 'Destructive action'),
  };
  const states = [
    ['empty', t('空', 'Empty'), t('暂无审阅，连接项目后开始。', 'No reviews yet. Connect a project to begin.')],
    ['loading', t('加载', 'Loading'), t('正在采集页面，请稍候。', 'Capturing the page. Please wait.')],
    ['error', t('错误', 'Error'), t('无法连接预览，请检查地址后重试。', 'Preview unavailable. Check the address and retry.')],
    ['success', t('完成', 'Complete'), t('采集完成，等待核对证据。', 'Capture complete. Evidence awaits review.')],
  ];

  return <div id="components" className="system-specimen-stack">
    <Card className="system-specimen">
      <CardHeader><h3>{t('按钮', 'Buttons')}</h3></CardHeader>
      <CardContent className="system-specimen-stack">
        <div className="system-specimen-actions">
          {(['primary', 'secondary', 'ghost', 'danger'] as const).map(variant => (
            <Button key={variant} variant={variant} onClick={() => setButtonFeedback(labels[variant])}>
              {labels[variant]}
            </Button>
          ))}
          <Button disabled>{t('不可用', 'Unavailable')}</Button>
          <Button loading>{t('处理中', 'Working')}</Button>
        </div>
        <p className="system-specimen-feedback" role="status">
          {buttonFeedback && t(`已触发「${buttonFeedback}」。`, `${buttonFeedback} triggered.`)}
        </p>
        <SystemDocumentCode
          lang={lang}
          syntax="tsx"
          label="Button"
          source={`<Button variant="primary" loading={saving} onClick={save}>\n  ${t('保存', 'Save')}\n</Button>`}
        />
      </CardContent>
    </Card>
    <Card className="system-specimen">
      <CardHeader><h3>{t('表单与弹窗', 'Form and dialog')}</h3></CardHeader>
      <CardContent className="system-specimen-stack">
        <form className="system-specimen-stack" onSubmit={(event) => {
          event.preventDefault();
          setFormFeedback(t('验证通过。', 'Validation passed.'));
        }}>
          <label className="system-specimen-field">
            {t('项目名称', 'Project name')}
            <Input required name="project" placeholder={t('例如：产品工作台', 'e.g. Product workspace')} onChange={() => setFormFeedback('')} />
          </label>
          <div className="system-specimen-actions">
            <Button type="submit" variant="primary">{t('验证表单', 'Validate form')}</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>{t('打开确认弹窗', 'Open confirmation dialog')}</Button>
              </DialogTrigger>
              <DialogContent showCloseButton={false}>
                <DialogHeader>
                  <DialogTitle>{t('确认本次范围', 'Confirm scope')}</DialogTitle>
                  <DialogDescription>{t('这是交互演示，提交内容仅在当前页面使用。', 'This is a demo. Input stays on this page.')}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild><Button>{t('关闭', 'Close')}</Button></DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <p className="system-specimen-feedback" role="status">{formFeedback}</p>
        </form>
      </CardContent>
    </Card>
    <ComponentShowcase lang={lang} />
    <Card className="system-specimen">
      <CardHeader><h3>{t('任务反馈', 'Task feedback')}</h3></CardHeader>
      <CardContent>
        <Tabs value={state} onValueChange={setState}>
          <TabsList aria-label={t('反馈状态', 'Feedback states')}>
            {states.map(([id, label]) => <TabsTrigger key={id} value={id}>{label}</TabsTrigger>)}
          </TabsList>
          {states.map(([id, , message]) => (
            <TabsContent key={id} value={id}>
              <p className="system-specimen-feedback" role="status">{message}</p>
              {id === 'error' && (
                <div className="system-specimen-actions">
                  <Button onClick={() => setState('loading')}>{t('重试演示', 'Retry demo')}</Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  </div>;
}

function SetupPrompt({ lang }: { lang: string }) {
  const t = translator(lang);
  const modeId = useId();
  const [mode, setMode] = useState('existing');
  const [status, setStatus] = useState('');
  const prompt = t(
    `${mode === 'existing' ? '将本项目的一个页面逐步对齐' : '用本项目的技术栈构建采用'} HappyHands 设计系统。先读取 ${location.origin}/systems/happyhands/SKILL.md，并核对 happyhands-site 的 packages/design-tokens/happyhands.json、packages/ui 与 docs/studio-design-language.md，记录采用的提交版本。先检查现有规范和技术兼容性，保留已批准品牌、业务行为和数据；不修改被审阅项目的品牌。复用已有 Button 和设计变量，其他组件按真实需求实现并标记新增 API。检查中英文、深浅色、390/768/1280px、键盘焦点和加载/错误状态，交付前后截图与剩余问题。当前无公开安装包，不虚构安装命令。`,
    `${mode === 'existing' ? 'Migrate one screen in this project to' : 'Build a screen in the current stack with'} HappyHands. Read ${location.origin}/systems/happyhands/SKILL.md and inspect happyhands-site packages/design-tokens/happyhands.json, packages/ui and docs/studio-design-language.md. Record the adopted commit. Check existing rules and compatibility; preserve approved branding, data and business behavior. Do not rebrand reviewed products. Reuse Button and tokens, document any new component API. Verify Chinese/English, light/dark, 390/768/1280px, keyboard focus and loading/error states. Deliver before/after captures and remaining gaps. There is no public installer; do not invent installation commands.`,
  );

  return <Card id="adopt" className="system-specimen">
    <CardHeader>
      <h3>{t('AI 接入指令', 'AI setup prompt')}</h3>
      <CardDescription>{t('选择接入方式，将对应指令复制到你的 AI 工具。', 'Choose a setup mode and copy its prompt into your AI tool.')}</CardDescription>
    </CardHeader>
    <CardContent className="system-specimen-stack">
      <div className="system-specimen-field">
        <label htmlFor={modeId}>{t('接入方式', 'Setup mode')}</label>
        <Select id={modeId} value={mode} onChange={(event) => {
          setMode(event.target.value);
          setStatus('');
        }}>
          <option value="existing">{t('已有项目 / 逐页迁移', 'Existing project / migrate a screen')}</option>
          <option value="new">{t('新项目 / 从首屏开始', 'New project / first screen')}</option>
        </Select>
      </div>
      <label className="system-specimen-field">
        {t('接入指令', 'Setup prompt')}
        <Textarea value={prompt} readOnly rows={8} />
      </label>
      <div className="system-specimen-actions">
        <Button variant="primary" onClick={async () => {
          try {
            await navigator.clipboard.writeText(prompt);
            setStatus(t('指令已复制。', 'Prompt copied.'));
          } catch {
            setStatus(t('无法复制，请选中上方指令手动复制。', 'Copy unavailable. Select the prompt above manually.'));
          }
        }}>{t('复制指令', 'Copy prompt')}</Button>
        <SystemDocumentLink href={repository + '/packages/design-tokens'}>{t('查看设计变量源码', 'View token source')}</SystemDocumentLink>
      </div>
      <p className="system-specimen-feedback" role="status">{status}</p>
    </CardContent>
  </Card>;
}
