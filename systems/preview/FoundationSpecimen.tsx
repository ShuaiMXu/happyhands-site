import React, { useEffect, useState } from "react";
import { TokenSpecimens } from "../../components/TokenSpecimens";
import type { SpecimenToken } from "../../components/specimen-model";
import manifest from "../../public/resources/v1/foundations.json";
type Foundation = {
  path: string;
  content: string;
  title: string;
  tokens: string[];
};
export function FoundationSpecimen({
  system,
  name,
}: {
  system: string;
  name: string;
}) {
  const doc = (manifest as Record<string, Foundation>)[system + "/" + name];
  const [tokens, setTokens] = useState<SpecimenToken[]>([]);
  useEffect(() => {
    const css = getComputedStyle(document.body);
    setTokens(
      (doc?.tokens || [])
        .map((name) => ({ name, value: css.getPropertyValue(name).trim() }))
        .filter((t) => t.value),
    );
  }, [doc]);
  if (!doc) return <p role="alert">Foundation unavailable</p>;
  const rules = doc.content
    .split("\n")
    .filter((line) => /^\d+\. |^\s*- (Correct|Wrong):/.test(line));
  return (
    <section className="foundation-specimen">
      <h1>{doc.title}</h1>
      {name === "grid" && (
        <div className="foundation-grid" aria-label="Source layout dimensions">
          <header>--topbar</header>
          <aside>--sidebar</aside>
          <article>
            --container
            <br />
            --measure
          </article>
          <aside>--toc</aside>
        </div>
      )}
      {tokens.length > 0 &&
        (name === "grid" ? (
          <details className="foundation-token-details">
            <summary>Layout tokens ({tokens.length})</summary>
            <TokenSpecimens tokens={tokens} />
          </details>
        ) : (
          <TokenSpecimens tokens={tokens} />
        ))}
      {rules.length > 0 && (
        <section aria-label="Documented rules and examples">
          {rules.map((rule, i) => (
            <p
              key={i}
              className={
                rule.includes("Correct:")
                  ? "foundation-correct"
                  : rule.includes("Wrong:")
                    ? "foundation-wrong"
                    : "foundation-rule"
              }
            >
              {rule.replace(/^\s*- /, "")}
            </p>
          ))}
        </section>
      )}
    </section>
  );
}
