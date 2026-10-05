# SAZÉ

A responsive press-on nail storefront built with Next.js, React, and Tailwind CSS.

## Local development

The application lives in the `saze/` directory inside the repository. From that directory:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`.

## Checks

```sh
pnpm lint
pnpm typecheck
pnpm build
```

## Updating the storefront

- **Products, prices, availability, and included accessories:** `lib/products.ts`.
- **Instagram account:** `lib/instagram.ts`. Every ordering link uses the same profile URL.
- **Photography:** `public/images/` and the image paths in `lib/products.ts`.
- **Homepage content:** `components/home/`.
- **Colours, motion, and shared styling:** `app/globals.css`.
- **Site URL and social previews:** `app/layout.tsx`.

## Instagram ordering

“Order on Instagram” links navigate directly to `https://www.instagram.com/_saze.in_/`.
Customers can order a single set directly or add several sets to their cart. The cart provides
a copyable order message with quantities and the subtotal, excluding shipping. Customers
paste that message into a conversation with SAZÉ, where availability, sizing, shipping, and
payment are confirmed. If clipboard access is unavailable, the message can be selected and
copied manually. The website does not send Instagram messages automatically.

## Vercel

Use **Next.js** as the framework and **`saze`** as the project's Root Directory. The install
command is `pnpm install --frozen-lockfile` and the build command is `pnpm build`.
The current storefront does not require environment variables. A deployment is triggered
when changes reach the branch connected to the Vercel project.
