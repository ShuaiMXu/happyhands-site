import React from "react";
export type ReferenceSystem = {
  colors?: { hex: string; name: string; role: string }[];
  typography?: {
    family: string;
    weight: string;
    sizes: string;
    lineHeight: string;
  }[];
  spacing?: {
    baseUnit?: number;
    density?: string;
    pageMaxWidth?: string;
    sectionGap?: string;
    cardPadding?: string;
    elementGap?: string;
    radius?: Record<string, string>;
  };
  components?: { name: string; role: string; description: string }[];
  dos?: string[];
  donts?: string[];
};
export function ReferenceSpecimen({
  system,
  lang,
}: {
  system: ReferenceSystem;
  lang: string;
}) {
  const zh = lang === "zh";
  return (
    <div className="reference-specimen">
      {!!system.colors?.length && (
        <section>
          <h3>{zh ? "颜色" : "Color palette"}</h3>
          <div className="reference-swatches">
            {system.colors.map((c, i) => (
              <div key={i}>
                <div
                  className="reference-swatch"
                  style={{
                    background: /^#[\da-f]{3,8}$/i.test(c.hex)
                      ? c.hex
                      : undefined,
                  }}
                />
                <strong>{c.name}</strong>
                <code>{c.hex}</code>
                <p>{c.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {!!system.typography?.length && (
        <section>
          <h3>{zh ? "字体" : "Typography"}</h3>
          {system.typography.map((f, i) => (
            <div className="reference-font" key={i}>
              <strong>{f.family}</strong>
              <dl>
                <div>
                  <dt>{zh ? "字重" : "Weight"}</dt>
                  <dd>{f.weight}</dd>
                </div>
                <div>
                  <dt>{zh ? "字号" : "Sizes"}</dt>
                  <dd>{f.sizes}</dd>
                </div>
                <div>
                  <dt>{zh ? "行高" : "Line height"}</dt>
                  <dd>{f.lineHeight}</dd>
                </div>
              </dl>
            </div>
          ))}
        </section>
      )}
      {system.spacing && (
        <section>
          <h3>{zh ? "间距与形状" : "Spacing and shape"}</h3>
          <dl>
            {Object.entries(system.spacing)
              .filter(([k]) => k !== "radius")
              .map(([k, v]) => (
                <div key={k}>
                  <dt>
                    {(
                      {
                        baseUnit: zh ? "基础单位" : "Base unit",
                        density: zh ? "密度" : "Density",
                        pageMaxWidth: zh ? "页面宽度" : "Page width",
                        sectionGap: zh ? "区块间距" : "Section gap",
                        cardPadding: zh ? "内边距" : "Card padding",
                        elementGap: zh ? "元素间距" : "Element gap",
                      } as Record<string, string>
                    )[k] || k}
                  </dt>
                  <dd>
                    {String(v)}
                    {k === "baseUnit" ? "px" : ""}
                  </dd>
                </div>
              ))}
          </dl>
          {system.spacing.radius && (
            <details>
              <summary>{zh ? "圆角" : "Corner radius"}</summary>
              <dl>
                {Object.entries(system.spacing.radius).map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </details>
          )}
        </section>
      )}
      {!!system.components?.length && (
        <section>
          <h3>{zh ? "组件" : "Components"}</h3>
          {system.components.map((c, i) => (
            <details key={i}>
              <summary>{c.name}</summary>
              <p>{c.role}</p>
              <p>{c.description}</p>
            </details>
          ))}
        </section>
      )}
      {system.dos?.length || system.donts?.length ? (
        <section>
          <h3>{zh ? "使用规则" : "Guidelines"}</h3>
          {[
            [zh ? "建议" : "Do", system.dos],
            [zh ? "避免" : "Avoid", system.donts],
          ].map(([label, list]) => (
            <details key={String(label)}>
              <summary>{label as string}</summary>
              <ul>
                {(list as string[] | undefined)?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </details>
          ))}
        </section>
      ) : null}
    </div>
  );
}
