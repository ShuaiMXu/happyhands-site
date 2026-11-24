/** @jsxImportSource @solidjs/web */
import { Tabs, TabsList, TabsPanel, TabsTab } from '@ui-sdk/solid/tabs';
import { For } from 'solid-js';
import type { JSX } from '@solidjs/web';

export function ResourceTabs(props: {
  tabs: readonly { id: string; label: string }[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  listClass: string;
  panelClass?: string;
  panel: (id: string) => JSX.Element;
}) {
  return (
    <Tabs value={props.value} onValueChange={value => { if (value !== null) props.onChange(value); }}>
      <TabsList class={props.listClass} aria-label={props.label}>
        <For each={props.tabs} keyed={false}>
          {tab => (
            <TabsTab
              value={tab().id}
              class="resource-tab"
              onFocus={event => {
                const item = event.currentTarget;
                const list = item.parentElement!;
                const visible = list.getBoundingClientRect();
                const bounds = item.getBoundingClientRect();
                if (bounds.left < visible.left) list.scrollLeft -= visible.left - bounds.left;
                if (bounds.right > visible.right) list.scrollLeft += bounds.right - visible.right;
              }}
            >{tab().label}</TabsTab>
          )}
        </For>
      </TabsList>
      <For each={props.tabs} keyed={false}>
        {tab => (
          <TabsPanel value={tab().id} class={props.panelClass}>
            {props.panel(tab().id)}
          </TabsPanel>
        )}
      </For>
    </Tabs>
  );
}
