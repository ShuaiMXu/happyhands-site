import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-compiler';

const project = new URL('../', import.meta.url);
const routes = [
  'components/DesignDocumentPreview.tsx',
  'components/ReferenceSpecimen.tsx',
  'components/CollectionsLibrary.tsx',
];
const entry = 'components/DesignComponentSpecimens.tsx';
const renderers = ['components/DesignSample.solid.tsx', 'components/DesignVisualSample.solid.tsx'];
const errors = [];

for (const file of [...routes, entry, ...renderers]) {
  const url = new URL(file, project);
  const source = ts.createSourceFile(fileURLToPath(url), readFileSync(url, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const tagNames = new Set();
  const check = node => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(source);
      tagNames.add(tag);
      const registeredSystemPreview = file === 'components/CollectionsLibrary.tsx' && tag === 'iframe' &&
        node.attributes.properties.some(attribute => ts.isJsxAttribute(attribute) &&
          attribute.name.getText(source) === 'src' &&
          attribute.initializer?.getText(source).startsWith('{previewFor(selected) + '));
      if ((tag === 'iframe' && !registeredSystemPreview) || tag === 'style' || (tag === 'HistorySafeFrame' && file !== entry)) {
        errors.push(`${file}: ${tag} bypasses archive composition`);
      }
      if (renderers.includes(file) && ['button', 'select', 'textarea'].includes(tag)) {
        errors.push(`${file}: ${tag} must use the shared control primitives`);
      }
    }
    if (ts.isJsxAttribute(node) && ['innerHTML', 'dangerouslySetInnerHTML'].includes(node.name.getText(source))) {
      errors.push(`${file}: use source text or the isolated original preview instead of markup injection`);
    }
    ts.forEachChild(node, check);
  };
  check(source);
  if (routes.includes(file) && !tagNames.has('DesignComponentSpecimens')) {
    errors.push(`${file}: render declarations through DesignComponentSpecimens`);
  }
  if (file === entry && (!tagNames.has('SolidControlHost') || !tagNames.has('HistorySafeFrame'))) {
    errors.push(`${file}: preserve the shared renderer and isolated originals`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Design.md component lineage check passed.');
}
