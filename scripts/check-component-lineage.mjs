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
const scenarioPicker = 'packages/ui/PreviewScenarioPicker.tsx';
const errors = [];

for (const file of [...routes, entry, ...renderers, scenarioPicker]) {
  const url = new URL(file, project);
  const source = ts.createSourceFile(fileURLToPath(url), readFileSync(url, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const tagNames = new Set();
  const sharedSelect = source.statements.some(statement => ts.isImportDeclaration(statement) &&
    ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text === './Select');
  const check = node => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(source);
      tagNames.add(tag);
      if (tag === 'iframe' || tag === 'style' || (tag === 'HistorySafeFrame' && file !== entry)) {
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
  if (file === scenarioPicker && (!sharedSelect || !tagNames.has('Select') || tagNames.has('select'))) {
    errors.push(`${file}: use the shared Select for the scenario picker`);
  }
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
