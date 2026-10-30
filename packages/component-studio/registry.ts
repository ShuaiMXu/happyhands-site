/** Coverage snapshot: https://ui.shadcn.com/docs/components, 2026-10-30.
 * Directory membership is not an implementation claim. */
export const groups = {
  actions: ["Button", "Button Group", "Toggle", "Toggle Group"],
  forms: [
    "Field",
    "Label",
    "Input",
    "Input Group",
    "Input OTP",
    "Textarea",
    "Checkbox",
    "Radio Group",
    "Switch",
    "Slider",
    "Select",
    "Native Select",
    "Combobox",
    "Calendar",
    "Date Picker",
    "Questionnaire",
  ],
  navigation: [
    "Breadcrumb",
    "Navigation Menu",
    "Menubar",
    "Dropdown Menu",
    "Context Menu",
    "Command",
    "Pagination",
    "Tabs",
    "Sidebar",
  ],
  overlays: [
    "Alert Dialog",
    "Dialog",
    "Drawer",
    "Sheet",
    "Popover",
    "Hover Card",
    "Tooltip",
  ],
  feedback: ["Alert", "Empty", "Progress", "Skeleton", "Spinner", "Toast"],
  content: [
    "Avatar",
    "Badge",
    "Card",
    "Item",
    "Table",
    "Data Table",
    "Chart",
    "Typography",
    "Code Block",
    "Kbd",
  ],
  layout: [
    "Accordion",
    "Aspect Ratio",
    "Carousel",
    "Collapsible",
    "Direction",
    "Resizable",
    "Scroll Area",
    "Separator",
  ],
  messages: [
    "Attachment",
    "Bubble",
    "Marker",
    "Message",
    "Message Scroller",
    "Trace",
  ],
} as const;
export type ComponentId = "button" | "input" | "card";
export type ComponentConfig = {
  component: ComponentId;
  variant: "solid" | "outline" | "soft";
  size: "compact" | "regular" | "large";
  state: "default" | "disabled";
  label: string;
};
export const defaultConfig: ComponentConfig = {
  component: "button",
  variant: "solid",
  size: "regular",
  state: "default",
  label: "Continue",
};
export function validateConfig(value: unknown): ComponentConfig {
  const v = value as ComponentConfig;
  if (
    !v ||
    !["button", "input", "card"].includes(v.component) ||
    !["solid", "outline", "soft"].includes(v.variant) ||
    !["compact", "regular", "large"].includes(v.size) ||
    !["default", "disabled"].includes(v.state) ||
    typeof v.label !== "string" ||
    v.label.length > 120
  )
    throw Error("Invalid component configuration");
  return {
    component: v.component,
    variant: v.variant,
    size: v.size,
    state: v.state,
    label: v.label,
  };
}
export const registry = Object.entries(groups).flatMap(([category, names]) =>
  names.map((name) => {
    const id = name.toLowerCase().replaceAll(" ", "-");
    const implemented = ["button", "input", "card"].includes(id);
    return {
      id,
      name,
      category,
      source: `https://ui.shadcn.com/docs/components/${id}`,
      catalogVersion: "2026-10-30",
      implementation: implemented ? "shadcn-radix-luma@2026-10-30" : null,
      dependencies: implemented ? ["React", "shadcn/radix-luma", "radix-ui"] : [],
      capabilities: {
        preview: implemented,
        interaction: implemented,
        theme: implemented,
        configuration: implemented,
        export: implemented,
      },
      verification: "pending" as "pending" | "verified",
      variants: implemented ? ["solid", "outline", "soft"] : [],
      states: implemented ? ["default", "hover", "focus", "disabled"] : [],
      previewEntry: implemented ? "componentDocument" : null,
      exportEntry: implemented ? "componentDocument" : null,
    };
  }),
);
