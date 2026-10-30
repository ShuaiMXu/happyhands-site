import React from 'react';
import {Button,Input} from '../../packages/ui';
import {Card} from '../../packages/ui/shadcn/card';
import {Badge} from '../../packages/ui/shadcn/badge';
import {Switch} from '../../packages/ui/shadcn/switch';
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription,DialogFooter,DialogClose} from '../../packages/ui/shadcn/dialog';
import "./component-examples.css";
import { useRef, useState } from "react";
import { t } from "./i18n";

export function ComponentExamples() {
  const [enabled, setEnabled] = useState(true);
  const [progress, setProgress] = useState(64);
  const [filter, setFilter] = useState("");
  const [saved, setSaved] = useState(false);
  const [open,setOpen]=useState(false);
  const dialogTrigger=useRef<HTMLButtonElement>(null);
  const [portalStyle,setPortalStyle]=useState<React.CSSProperties>({});
  const rows = [
    ["产品首页", "已完成"],
    ["账户设置", "进行中"],
    ["帮助中心", "待处理"],
  ];
  return (
    <>
      <Card data-token="card">
        <h3>{t("列表与标签")}</h3>
        <label>
          {t("搜索示例页面")}
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={t("输入页面名称")}
          />
        </label>
        <table className="specimen-table">
          <caption className="specimen-caption">{t("示例页面")}</caption>
          <thead>
            <tr>
              <th>{t("页面")}</th>
              <th>{t("状态")}</th>
            </tr>
          </thead>
          <tbody>
            {rows
              .filter(([name]) => t(name).includes(filter))
              .map(([name, status]) => (
                <tr key={name}>
                  <td>{t(name)}</td>
                  <td>
                    <Badge variant="secondary">{t(status)}</Badge>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!rows.some(([name]) => t(name).includes(filter)) && (
          <p role="status">{t("没有匹配的页面")}</p>
        )}
      </Card>
      <Card data-token="card">
        <h3>{t("开关与进度")}</h3>
        <label className="specimen-switch-row">
          {t("接收更新通知")}
          <Switch aria-label={t("接收更新通知")} checked={enabled} onCheckedChange={setEnabled}/>

        </label>
        <label>
          {t("完成进度")} / {progress}%
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
          />
        </label>
        <progress aria-label={t("完成进度")} max={100} value={progress} />
        <p>{enabled ? t("通知已开启") : t("通知已关闭")}</p>
      </Card>
      <Card data-token="card">
        <h3>{t("提示与反馈")}</h3>
        <div className="specimen-notice" data-token="muted">
          <b>{t("草稿已保存")}</b>
          <p>{t("可以继续编辑，确认后再导出。")}</p>
        </div>
        <div
          className="specimen-notice specimen-error"
          data-token="destructive"
        >
          <b>{t("示例连接失败")}</b>
          <p>{t("请检查地址后重试。")}</p>
        </div>
      </Card>
      <Card data-token="card">
        <h3>{t("弹窗与确认")}</h3>
        <p>{t("打开弹窗，检查浮层、背景遮罩与键盘操作。")}</p>
        <Button ref={dialogTrigger} onClick={event=>{const styles=getComputedStyle(event.currentTarget);setPortalStyle(Object.fromEntries(['bg','ink','bg-raised','bg-sunken','bg-hover','ink-muted','primary','on-primary','line','line-strong','ring','danger','font-sans'].map(k=>['--hh-'+k,styles.getPropertyValue('--hh-'+k)])));setOpen(true);}}>{t("打开示例弹窗")}</Button>
        <p role="status">{saved?t("示例设置已确认"):t("此处操作不会修改项目。")}</p>
        <Dialog open={open} onOpenChange={setOpen}><DialogContent style={portalStyle} onCloseAutoFocus={event=>{event.preventDefault();dialogTrigger.current?.focus();}}><DialogHeader><DialogTitle>{t("确认示例设置")}</DialogTitle><DialogDescription>{t("此处操作不会修改项目。")}</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button>{t("取消")}</Button></DialogClose><Button variant="primary" onClick={()=>{setSaved(true);setOpen(false);}}>{t("确认")}</Button></DialogFooter></DialogContent></Dialog>

      </Card>
    </>
  );
}
