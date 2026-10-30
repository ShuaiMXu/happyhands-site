import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "../ui/shadcn/button";
import { Input } from "../ui/shadcn/input";
import { Textarea } from "../ui/shadcn/textarea";
import { Checkbox } from "../ui/shadcn/checkbox";
import { Switch } from "../ui/shadcn/switch";
import { Badge } from "../ui/shadcn/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/shadcn/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/shadcn/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/shadcn/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/shadcn/accordion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/shadcn/dialog";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../ui/shadcn/tooltip";
import type { ComponentConfig } from "./registry";
import "./runtime.css";
declare global {
  interface Window {
    __HH_COMPONENT__: {
      config: ComponentConfig;
      lang: "zh" | "en";
      overview?: boolean;
    };
  }
}
function Preview() {
  const { config: c, lang, overview } = window.__HH_COMPONENT__,
    zh = lang === "zh";
  const t = (a: string, b: string) => (zh ? a : b);
  const [notice, setNotice] = useState(""),
    [notifications, setNotifications] = useState(true);
  useEffect(() => {
    let scheduled = 0;
    const send = () => {
      cancelAnimationFrame(scheduled);
      scheduled = requestAnimationFrame(() => {
        parent.postMessage(
          {
            type: "hh:component-height",
            height:
              document.getElementById("component-root")!.getBoundingClientRect()
                .height + 64,
          },
          "*",
        );
      });
    };
    const observer = new ResizeObserver(send);
    observer.observe(document.getElementById("component-root")!);
    send();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(scheduled);
    };
  }, []);
  const variant =
    c.variant === "solid"
      ? "default"
      : c.variant === "outline"
        ? "outline"
        : "secondary";
  const size =
    c.size === "compact" ? "sm" : c.size === "large" ? "lg" : "default";
  const action = (
    <Button
      variant={variant}
      size={size}
      disabled={c.state === "disabled"}
      type={c.component === "input" ? "submit" : "button"}
      onClick={
        c.component === "input"
          ? undefined
          : () => setNotice(t("已完成操作", "Action completed"))
      }
    >
      {c.label || t("保存", "Save")}
    </Button>
  );
  if (!overview)
    return (
      <main
        className="runtime-main runtime-configured"
        data-component={c.component}
        data-variant={c.variant}
        data-size={c.size}
      >
        {c.component === "input" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNotice(t("已保存", "Saved"));
            }}
          >
            <label htmlFor="project-name">
              {t("项目名称", "Project name")}
            </label>
            <p id="input-hint">
              {t("输入名称后保存", "Enter a name and save")}
            </p>
            <Input
              id="project-name"
              name="name"
              required
              maxLength={120}
              disabled={c.state === "disabled"}
              aria-describedby="input-hint"
            />
            {action}
          </form>
        ) : c.component === "card" ? (
          <Card>
            <CardHeader>
              <CardTitle>{t("项目概览", "Project overview")}</CardTitle>
              <CardDescription>
                {t("查看内容与操作的组合", "Content and actions together")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {t(
                  "调整颜色、字体与形态，检查实际效果。",
                  "Adjust colors, typography and variants.",
                )}
              </p>
            </CardContent>
            <CardFooter>{action}</CardFooter>
          </Card>
        ) : (
          action
        )}
        <output role="status">{notice}</output>
      </main>
    );
  return (
    <main className="runtime-main runtime-overview">
      <header className="runtime-heading">
        <div>
          <h1>{t("我的工作空间", "Your workspace")}</h1>
          <p>{t("交互与状态示例", "Interactive examples and states")}</p>
        </div>
        <Badge variant="secondary">{t("设计预览", "Design preview")}</Badge>
      </header>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">{t("概览", "Overview")}</TabsTrigger>
          <TabsTrigger value="activity">{t("动态", "Activity")}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="runtime-grid">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("开始下一项工作", "Start your next project")}
                </CardTitle>
                <CardDescription>
                  {t(
                    "主要、次要与禁用操作",
                    "Primary, secondary and disabled actions",
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="runtime-actions">
                  <Button
                    onClick={() =>
                      setNotice(t("已创建示例项目", "Example project created"))
                    }
                  >
                    {t("创建项目", "Create project")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setNotice(t("已保存示例草稿", "Example draft saved"))
                    }
                  >
                    {t("保存草稿", "Save draft")}
                  </Button>
                  <Button disabled>{t("不可用", "Unavailable")}</Button>
                </div>
                <div className="runtime-tags">
                  <Badge>{t("已完成", "Complete")}</Badge>
                  <Badge variant="secondary">
                    {t("进行中", "In progress")}
                  </Badge>
                  <Badge variant="outline">{t("草稿", "Draft")}</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("项目设置", "Project settings")}</CardTitle>
                <CardDescription>
                  {t("输入与选择", "Inputs and choices")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setNotice(t("示例设置已保存", "Example settings saved"));
                  }}
                >
                  <label htmlFor="overview-name">
                    {t("项目名称", "Project name")}
                  </label>
                  <Input
                    id="overview-name"
                    required
                    placeholder={t("例如：产品首页", "e.g. Product homepage")}
                  />
                  <label htmlFor="overview-priority">
                    {t("优先级", "Priority")}
                  </label>
                  <Select defaultValue="normal">
                    <SelectTrigger id="overview-priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">
                        {t("常规", "Normal")}
                      </SelectItem>
                      <SelectItem value="high">{t("优先", "High")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <label className="runtime-check">
                    <Checkbox defaultChecked />
                    {t("完成后通知我", "Notify me when complete")}
                  </label>
                  <Button type="submit">
                    {t("保存设置", "Save settings")}
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("反馈与偏好", "Feedback and preferences")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <label htmlFor="overview-note">{t("备注", "Notes")}</label>
                <Textarea
                  id="overview-note"
                  placeholder={t(
                    "记录需要改进的地方",
                    "What would you like to improve?",
                  )}
                />
                <label className="runtime-check">
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                  {t("接收更新通知", "Receive updates")}
                </label>
                <p role="status">
                  {notifications
                    ? t("通知已开启", "Notifications enabled")
                    : t("通知已关闭", "Notifications disabled")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("确认与帮助", "Confirmation and help")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="details">
                    <AccordionTrigger>
                      {t("如何使用这套设计？", "How do I use this design?")}
                    </AccordionTrigger>
                    <AccordionContent>
                      {t(
                        "调整左侧设置，对照组件状态，再导出到项目。",
                        "Adjust the theme, compare component states, then export to your project.",
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="runtime-actions">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        {t("打开弹窗", "Open dialog")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {t("确认示例设置", "Confirm example settings")}
                        </DialogTitle>
                        <DialogDescription>
                          {t(
                            "此处操作仅用于设计预览。",
                            "This action is only part of the design preview.",
                          )}
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            onClick={() =>
                              setNotice(t("示例已确认", "Example confirmed"))
                            }
                          >
                            {t("确认", "Confirm")}
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost">
                          {t("查看提示", "Show hint")}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {t(
                          "支持鼠标与键盘查看",
                          "Available on hover and keyboard focus",
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>{t("最近动态", "Recent activity")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {t(
                  "示例项目已创建，等待下一步操作。",
                  "Example project created. Ready for your next step.",
                )}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <output role="status" aria-live="polite">
        {notice}
      </output>
    </main>
  );
}
createRoot(document.getElementById("component-root")!).render(<Preview />);
