---
title: Mobbin MCP
description: Connect AI assistants and coding agents to Mobbin's design-reference library.
last_updated: 2026-10-31
canonical_url: https://mobbin.com/mcp
mcp_endpoint: https://api.mobbin.com/mcp
transport: Streamable HTTP
authentication: OAuth
availability:
  - Pro
  - Team
  - Enterprise
---

# Mobbin MCP

Mobbin MCP lets compatible AI assistants and coding agents search real screens, multi-step flows, and website sections from shipped digital products using natural language. Results can include screen images, app names, flow context, and links to the corresponding Mobbin pages.

## Access

- Endpoint: `https://api.mobbin.com/mcp`
- Transport: Streamable HTTP.
- Authorization: OAuth through the user's Mobbin account.
- Plans: Pro, Team, and Enterprise.
- Rate limit: 60 requests per 60 seconds per user.
- Interactive gallery: Supported in MCP Apps-compatible clients, including ChatGPT, Claude Desktop and Web, and Codex app.

On first connection, the MCP client opens a browser window so the user can sign in to Mobbin and authorize access. No manually copied API key is required for MCP.

MCP tools search design references and can also read and manage the user's saved content: list and read collections, create collections, save screens, flows or sections, and add comments.

## Tools

### Search

#### `search_screens`

Search individual mobile and web UI screens. Use it for a specific state or pattern such as a login screen, paywall, empty state, dialog, form, or navigation treatment.

#### `search_flows`

Search ordered, multi-step user flows. Use it when sequence and context matter, such as onboarding, checkout, account setup, identity verification, subscription, or cancellation.

#### `search_sections`

Search website sections. Use it for page-composition references such as heroes, pricing sections, testimonials, navigation, and footers.

### Saved

#### `list_collections`

Lists All saved and your collections.

#### `get_collection_contents`

Reads saved content in All saved or a collection.

#### `create_collection`

Creates a collection.

#### `save_content`

Saves screens, flows or sections.

#### `add_comment`

Comments on a screen, flow or section.

## What results contain

Depending on the search and client, results can include screen images, product names, flow or section context, and links back to Mobbin. MCP clients that support MCP Apps can render results as an interactive gallery.

Agents should preserve the product name and Mobbin URL for important references so users can inspect the source.

## Recommended workflow

1. Identify the platform, product category, user goal, and design question.
2. Choose screen, flow, or website-section search.
3. Review several relevant products rather than relying on one example.
4. Preserve the product name and Mobbin URL for each important reference.
5. Separate visible observations from interpretation and recommendations.
6. Adapt findings to the user's brand, audience, design system, accessibility needs, and product constraints.

## Evidence limitations

- A Mobbin example shows that a product used a design; it does not prove that the design improved conversion or another metric.
- A recurring pattern is a convention, not automatically a best practice.
- Check capture metadata when recency matters.
- Do not copy protected designs, branding, text, or assets verbatim.
- Evaluate accessibility independently.

## Errors and recovery

- Authorization failure: reconnect Mobbin and complete the OAuth sign-in flow.
- HTTP `429 Too Many Requests`: wait for the duration in the `Retry-After` header before retrying.
- Missing or weak results: make the request more specific by naming the platform, product category, user goal, pattern, or flow.
- Overly narrow results: remove unnecessary constraints or search screens, flows, and sections separately.
- Remove access: revoke the connected client from Mobbin account settings.

## Example prompts

- Search Mobbin for onboarding screens from banking apps.
- Compare how Airbnb and Booking.com handle checkout flows.
- Find mobile paywalls that explain quarterly and yearly billing clearly.
- Find SaaS pricing sections with complex feature comparison tables.
- Show notification-permission priming screens and identify recurring patterns.
- Find empty states used by collaborative productivity products.

## Setup and support

- Supported clients: https://docs.mobbin.com/mcp/clients/overview
- ChatGPT: https://docs.mobbin.com/mcp/clients/chatgpt
- Codex app: https://docs.mobbin.com/mcp/clients/codex-app
- Codex CLI: https://docs.mobbin.com/mcp/clients/codex-cli
- Claude Code: https://docs.mobbin.com/mcp/clients/claude-code-cli
- Claude Desktop and Web: https://docs.mobbin.com/mcp/clients/claude-desktop-web
- Cursor: https://docs.mobbin.com/mcp/clients/cursor
- Other clients: https://docs.mobbin.com/mcp/clients/other
- Revoke access: https://docs.mobbin.com/mcp/disconnect
- Privacy & data: https://docs.mobbin.com/mcp/privacy-and-data
- Rate limits: https://docs.mobbin.com/rate-limits
- Support: https://help.mobbin.com/en/contact-us

Pricing and plan access: https://mobbin.com/pricing.md

Product overview: https://mobbin.com/index.md

Complete agent context: https://mobbin.com/llms-full.txt
