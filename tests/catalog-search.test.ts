import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveCatalogItem,
  searchCatalog,
} from "../components/catalog-search";
const items = JSON.parse(
  readFileSync(
    new URL("../public/components/cult-ui/catalog.json", import.meta.url),
    "utf8",
  ),
).items;
test("old component names remain searchable without duplicate preview tiles", () => {
  for (const alias of items.filter((item: any) => item.aliasOf)) {
    assert.equal(resolveCatalogItem(items, alias.id)?.id, alias.aliasOf);
    assert.ok(
      searchCatalog(items, alias.id, "all", {}).some(
        (item) => item.id === alias.aliasOf,
      ),
      alias.id,
    );
  }
  assert.equal(
    searchCatalog(items, "", "all", {}).length,
    items.filter((item: any) => !item.aliasOf).length,
  );
  assert.equal(
    searchCatalog(items, "animated button", "all", {})[0]?.id,
    "halo-button",
  );
});
