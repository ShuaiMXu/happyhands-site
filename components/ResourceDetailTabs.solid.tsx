/** @jsxImportSource @solidjs/web */
import { createSignal } from 'solid-js';
import { mountSolidControl } from '../packages/ui/mount-solid-control';
import { SolidPortalTarget } from '../packages/ui/SolidPortalTarget.solid';
import { ResourceTabs } from './ResourceTabs.solid';

type DetailTabs = {
  label: string;
  tabs: Array<{ id: string; label: string }>;
  onTarget: (id: string, element: HTMLDivElement | null) => void;
};

function DetailTabs(props: { data: DetailTabs }) {
  const [selected, setSelected] = createSignal('0');
  return <ResourceTabs
    tabs={props.data.tabs}
    label={props.data.label}
    listClass="resource-content-tabs"
    panelClass="resource-content-panel"
    value={selected()}
    onChange={setSelected}
    panel={id => <SolidPortalTarget onTarget={element => props.data.onTarget(id, element)} />}
  />;
}

export function mountResourceDetailTabs(element: HTMLElement, initial: DetailTabs) {
  return mountSolidControl(element, initial, props => <DetailTabs data={props()} />);
}
