# Sparkbar — Website

Marketing site for **Sparkbar**, an AI sales assistant for Shopify stores. It answers shoppers' questions straight from the store's catalog and walks them to checkout.

**Live:** [whoisarjun.github.io/sparkbar-website](https://whoisarjun.github.io/sparkbar-website/)

## Stack

Plain static site — no build step, no dependencies.

- `index.html` — single-page layout (hero, live demo, how it works, pricing, FAQ)
- `styles.css` — all styling, including mobile layouts
- `script.js` — nav menu, FAQ accordion, scroll reveals, and the self-playing demo chat

## Features

- **Self-playing demo chat** — a scripted conversation types, streams, and loops in both the hero mockup and the demo panel; store type and accent color are switchable live
- **Mobile-specific layouts** — the hero storefront becomes a phone frame with the chat widget rising as a bottom sheet, and the demo's customization controls dock as a sticky bar at the bottom of the screen

## Development

Open `index.html` in a browser, or serve locally:

```sh
python3 -m http.server
```

## Deployment

Deployed via GitHub Pages from the `main` branch (root). Every push to `main` republishes automatically.
