import React, { useId } from "react";
import { Select } from "./Select";
import "./preview-scenario.css";

export function PreviewScenarioPicker({ lang, value, options, onChange }: {
  lang: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  if (options.length < 2) return null;

  return (
    <div className="hh-preview-scenario">
      <label htmlFor={id}>{lang === "zh" ? "示例场景" : "Scenario"}</label>
      <Select
        id={id}
        value={value}
        onChange={event => onChange(event.target.value)}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </Select>
    </div>
  );
}
