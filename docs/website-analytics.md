# Website analytics

The public website uses Vercel Web Analytics for basic page-view reporting. This integration does not add paid custom events, session recording, heatmaps, form capture or a self-hosted analytics service. Umami deployment is deferred.

## Collection scope

- Production HTTPS domains only: happyhands.cc, www.happyhands.cc and the legacy happyhands-design.vercel.app alias (which normally redirects).
- Owned public pages only: portal, resource library, Theme Studio and the three design-system pages. The integration also recognizes the Chinese/English guide entries when they are present after the separate SEO PR is merged.
- Development, preview deployments, iframes, historical review exports, the local workbench, component preview hosts and third-party mirrors are excluded.
- All page URL query parameters and fragments are removed before sending, including project identifiers and user search terms. We do not send project names, local paths, pasted prompts, source code, draft contents or exported theme values as analytics properties.
- Do Not Track and Global Privacy Control opt-outs prevent initialization.

Vercel processes the request metadata needed for its visitor, referrer and device reports. This code does not add cookies or persistent user IDs. This is not a claim that no technical request data reaches Vercel; see the provider's privacy documentation.

## Activation and verification

Enable the project's basic Web Analytics feature in the Vercel dashboard and deploy the website change. The project is happyhands-design under shakaka. Do not enable Analytics Plus or upgrade the account plan for this integration.

Code installation alone does not prove the dashboard is activated or that production events have arrived. Confirm `/_vercel/insights/script.js` loads on the production website, a sanitized page view reaches the provider, and the dashboard begins showing data. Preview URLs deliberately do not report production traffic. Keep backend activation and production verification marked pending until actually confirmed.

The provider may enforce free-tier quotas; this change makes no free-unlimited claim. Custom button events are not implemented because they require a supported paid Vercel plan. A later Umami integration can cover those events separately.

Run `npm run test:analytics`, `npm run typecheck` and `npm run build`. Browser verification should exercise a mocked collector with production-like routing to inspect exact payloads without sending synthetic traffic to the real dashboard.

Sources:
- https://vercel.com/docs/analytics/quickstart
- https://vercel.com/docs/analytics/package
- https://vercel.com/docs/analytics/custom-events
- https://vercel.com/docs/analytics/privacy-policy
