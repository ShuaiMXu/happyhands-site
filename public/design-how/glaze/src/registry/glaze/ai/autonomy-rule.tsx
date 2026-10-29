'use client';

import {useId, type ReactNode} from 'react';
import {cn} from '@/lib/glaze/utils';
import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle} from '@/components/glaze/ui/item';
import {SegmentedControl, SegmentedControlItem} from '@/components/glaze/ui/segmented-control';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/glaze/ui/select';

// One setting for what an agent may do on its own: the action and its limit as the row's title ("Refunds under $50"),
// an optional line under it, and the level at the end: Do it, Ask first or Never. It is an Item row, so a page of
// rules is an ItemGroup, one hairline between rows.
//
// The level is a value chosen inside a control, so the chosen one is the segmented control's glass thumb. control
// "select" puts the same levels in a Select, for a narrow column or more than three levels. The title names the
// control, so a screen reader hears "Refunds under $50, Ask first".
//
// A change takes effect at once; there is no Save per row. disabled holds a rule someone else set (an admin, a plan
// limit), with the reason in the description.
//
// On a narrow row the control drops under the title instead of squeezing it.

type AutonomyLevel = 'auto' | 'ask' | 'never';

type AutonomyOption<Value extends string> = {value: Value; label: string};

const defaultOptions: AutonomyOption<AutonomyLevel>[] = [
  {value: 'auto', label: 'Do it'},
  {value: 'ask', label: 'Ask first'},
  {value: 'never', label: 'Never'},
];

type AutonomyRuleProps<Value extends string = AutonomyLevel> = Omit<React.ComponentProps<'div'>, 'title' | 'children' | 'defaultValue' | 'onChange'> & {
  /** The action and its limit: "Refunds under $50". */
  title: ReactNode;
  /** One line under it: what the action touches, or why the rule is locked. */
  description?: ReactNode;
  value?: Value;
  defaultValue?: Value;
  onValueChange?: (value: Value) => void;
  /** The levels, most freedom first. Defaults to Do it, Ask first, Never. */
  options?: AutonomyOption<Value>[];
  /** segmented for up to three levels; select for a narrow column or more. */
  control?: 'segmented' | 'select';
  /** The rule is set elsewhere and cannot change here. */
  disabled?: boolean;
};

function AutonomyRule<Value extends string = AutonomyLevel>({
  title, description, value, defaultValue, onValueChange, options = defaultOptions as unknown as AutonomyOption<Value>[],
  control = 'segmented', disabled, className, ...props
}: AutonomyRuleProps<Value>) {
  const titleId = useId();
  const change = (next: string | null) => { if (next !== null) onValueChange?.(next as Value); };
  return <Item
    data-slot="autonomy-rule"
    data-control={control}
    disabled={disabled}
    className={cn('flex-wrap gap-y-2', className)}
    {...props}
  >
    <ItemContent className="min-w-40 basis-40">
      <ItemTitle id={titleId} data-slot="autonomy-rule-title"><span>{title}</span></ItemTitle>
      {description && <ItemDescription data-slot="autonomy-rule-description">{description}</ItemDescription>}
    </ItemContent>
    <ItemActions className="me-0 ms-auto">
      {control === 'select'
        ? <Select items={options} value={value} defaultValue={defaultValue} onValueChange={change} disabled={disabled}>
            <SelectTrigger size="sm" aria-labelledby={titleId} className="w-32"><SelectValue/></SelectTrigger>
            <SelectContent size="sm" align="end">{options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
          </Select>
        : <SegmentedControl size="sm" aria-labelledby={titleId} value={value} defaultValue={defaultValue} onValueChange={change} disabled={disabled}>
            {options.map(o => <SegmentedControlItem key={o.value} value={o.value}>{o.label}</SegmentedControlItem>)}
          </SegmentedControl>}
    </ItemActions>
  </Item>;
}

export {AutonomyRule, type AutonomyRuleProps, type AutonomyLevel, type AutonomyOption};
