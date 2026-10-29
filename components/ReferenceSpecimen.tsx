import React from "react";
import {
  buildComponentPreview,
  componentPreviewKind,
  type ReferenceComponent,
} from "./reference-component-preview";
export type ReferenceSystem = {
  theme?: string;
  typeScale?: {
    role: string;
    size: number;
    lineHeight?: number;
    letterSpacing?: number;
  }[];
  surfaces?: { hex: string; name: string; level: number; purpose: string }[];
  elevation?: { element: string; style: string }[];
  elevationPhilosophy?: string;
  imagery?: string;
  layout?: string;
  customSections?: { title: string; content: string }[];
  colors?: { hex: string; name: string; role: string; group?: string }[];
  typography?: {
    family: string;
    weight: string;
    sizes: string;
    lineHeight: string;
    letterSpacing?: string;
    substitute?: string;
    role?: string;
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
  components?: ReferenceComponent[];
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
      <nav
        className="reference-section-nav"
        aria-label={zh ? "规范目录" : "Guideline sections"}
      >
        {[
          ["reference-colors", zh ? "颜色" : "Colors"],
          ["reference-typography", zh ? "字体" : "Typography"],
          ["reference-components", zh ? "组件" : "Components"],
          ["reference-layout", zh ? "布局" : "Layout"],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
      {!!system.colors?.length && (
        <section>
          <h3 id="reference-colors">{zh ? "颜色" : "Color palette"}</h3>
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
          <h3 id="reference-typography">{zh ? "字体" : "Typography"}</h3>
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
                {f.letterSpacing && (
                  <div>
                    <dt>{zh ? "字距" : "Letter spacing"}</dt>
                    <dd>{f.letterSpacing}</dd>
                  </div>
                )}
                {f.substitute && (
                  <div>
                    <dt>{zh ? "替代字体" : "Fallback"}</dt>
                    <dd>{f.substitute}</dd>
                  </div>
                )}
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
            <>
              <h4>{zh ? "圆角" : "Corner radius"}</h4>
              <dl>
                {Object.entries(system.spacing.radius).map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </section>
      )}
      {!!system.typeScale?.length && (
        <section>
          <h3>{zh ? "字号阶梯" : "Type scale"}</h3>
          <div className="reference-type-scale">
            {system.typeScale.map((step, i) => (
              <div key={i}>
                <span>{step.role}</span>
                <code>{step.size}px</code>
                <span
                  style={{
                    fontSize: Math.min(
                      Math.max(Number(step.size) || 14, 12),
                      64,
                    ),
                  }}
                >
                  Aa
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
      {!!system.surfaces?.length && (
        <section>
          <h3>{zh ? "表面层级" : "Surfaces"}</h3>
          <div className="reference-swatches">
            {system.surfaces.map((surface, i) => (
              <div key={i}>
                <div
                  className="reference-swatch"
                  style={{
                    background: /^#[\da-f]{3,8}$/i.test(surface.hex)
                      ? surface.hex
                      : undefined,
                  }}
                />
                <strong>{surface.name}</strong>
                <code>{surface.hex}</code>
                <p>{surface.purpose}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {!!system.components?.length && (
        <section className="reference-component-section">
          <h3 id="reference-components">
            {zh ? "组件" : "Components"} <span>{system.components.length}</span>
          </h3>
          <p>
            {zh
              ? "依据规范重建的静态示例，包含补充状态与示例内容"
              : "Static guideline reconstructions with illustrative states and content"}
          </p>
          {system.components.map((component, i) => {
            const preview = buildComponentPreview(component, system, lang);
            return (
              <article className="reference-component" key={i}>
                <h4>{component.name}</h4>
                {preview && (
                  <iframe
                    data-kind={
                      component.html
                        ? "source"
                        : componentPreviewKind(component.name)
                    }
                    title={`${component.name} ${zh ? "规范示例" : "guideline example"}`}
                    srcDoc={preview}
                    sandbox=""
                    tabIndex={-1}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                )}
                <p>{component.description}</p>
              </article>
            );
          })}
        </section>
      )}
      {!!system.elevation?.length && (
        <section>
          <h3>{zh ? "阴影规则" : "Elevation rules"}</h3>
          <dl>
            {system.elevation.map((entry, i) => (
              <div key={i}>
                <dt>{entry.element}</dt>
                <dd>{entry.style}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
      {system.elevationPhilosophy && (
        <section>
          <h3>{zh ? "层次与阴影" : "Elevation"}</h3>
          <p>{system.elevationPhilosophy}</p>
        </section>
      )}
      {system.imagery && (
        <section>
          <h3>{zh ? "图像与图标" : "Imagery"}</h3>
          <p>{system.imagery}</p>
        </section>
      )}
      {system.layout && (
        <section>
          <h3 id="reference-layout">{zh ? "页面布局" : "Layout"}</h3>
          <p>{system.layout}</p>
        </section>
      )}
      {system.customSections?.map((section, i) => (
        <section key={i}>
          <h3>{section.title}</h3>
          <div className="reference-source-text">{section.content}</div>
        </section>
      ))}
      {system.dos?.length || system.donts?.length ? (
        <section>
          <h3>{zh ? "使用规则" : "Guidelines"}</h3>
          {[
            [zh ? "建议" : "Do", system.dos],
            [zh ? "避免" : "Avoid", system.donts],
          ].map(([label, list]) => (
            <div className="reference-guideline-group" key={String(label)}>
              <h4>{label as string}</h4>
              <ul>
                {(list as string[] | undefined)?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}
