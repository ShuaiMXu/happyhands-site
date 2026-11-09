import test from "node:test";
import assert from "node:assert/strict";
import { auditRegistry } from "../scripts/audit-registry.mjs";
import { zipEntries, unzipEntries } from "../scripts/registry-zip.mjs";
test("all hosted artifacts, dependency graphs, embedded source, metadata and ZIP downloads agree", async () => {
  const result = await auditRegistry();
  assert.equal(result.items, 308);
  assert.ok(result.publishedArtifacts > 620);
  assert.ok(
    result.buttonBytesAcrossFourSystems.after <
      result.buttonBytesAcrossFourSystems.before,
  );
});
test("registry ZIPs round-trip UTF-8 source and detect payload corruption", () => {
  const bytes = zipEntries([
    ["source/组件.tsx", Buffer.from('export const label="中文";')],
    ["empty.css", Buffer.alloc(0)],
  ]);
  const files = unzipEntries(bytes);
  assert.equal(
    files.get("source/组件.tsx").toString(),
    'export const label="中文";',
  );
  assert.equal(files.get("empty.css").length, 0);
  const changed = Buffer.from(bytes);
  changed[changed.indexOf(Buffer.from("PK\x01\x02", "binary")) + 16] ^= 1;
  assert.throws(() => unzipEntries(changed), /Corrupt/);
});
